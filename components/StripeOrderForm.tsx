"use client";
import React from "react";
import type { Stripe, Appearance } from "@stripe/stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import {
  Elements,
  PaymentElement,
  AddressElement,
  useStripe,
  useElements,
} from "@stripe/react-stripe-js";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Label, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ColorSwatches } from "@/components/ui/ColorSwatches";
import { Modal } from "@/components/ui/Modal";

// =========================
// Schema & tipos
// =========================

const schema = z.object({
  modelo: z.enum(["curta", "longa"]),
  cor: z.string().min(1),
});

type FormValues = z.infer<typeof schema>;

const PRICE_MAP: Record<FormValues["modelo"], number> = {
  curta: 299.9,
  longa: 599.9,
};

interface AddressData {
  address: {
    line1: string;
    line2: string | null;
    city: string;
    state: string;
    postal_code: string;
    country: string;
  };
  name?: string;
  phone?: string;
}

// =========================
// Form interno (usa Elements)
// =========================

type StripeFormInnerProps = {
  paymentIntentId?: string;
  modelo: FormValues["modelo"];
  onModeloChange: (modelo: FormValues["modelo"]) => void;
};

function StripeFormInner({
  paymentIntentId,
  modelo,
  onModeloChange,
}: StripeFormInnerProps) {
  const stripe = useStripe();
  const elements = useElements();

  const [selectedColor, setSelectedColor] = React.useState<string>();
  const [submitting, setSubmitting] = React.useState(false);
  const [feedback, setFeedback] = React.useState<string | null>(null);
  const [addressComplete, setAddressComplete] = React.useState(false);
  const [addressValue, setAddressValue] =
    React.useState<AddressData | null>(null);
  const [successOpen, setSuccessOpen] = React.useState(false);
  const [successStatus, setSuccessStatus] = React.useState<string | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      modelo,
    },
  });

  // garante que o RHF e o estado externo fiquem em sincronia
  React.useEffect(() => {
    setValue("modelo", modelo);
  }, [modelo, setValue]);

  const selectColor = (key: string) => {
    setSelectedColor(key);
    setValue("cor", key, { shouldValidate: true });
  };

  const onSubmit = async (data: FormValues) => {
    if (!stripe || !elements) return;
    if (!paymentIntentId) {
      setFeedback("Falha ao preparar pagamento. Tente recarregar a página.");
      return;
    }
    if (!addressComplete || !addressValue) {
      setFeedback("Preencha o endereço completo antes de pagar.");
      return;
    }

    setSubmitting(true);
    setFeedback(null);

    try {
      const addr = addressValue.address || {};
      const endereco = [
        addr.line1,
        addr.line2,
        addr.city,
        addr.state,
        addr.postal_code,
        addr.country,
      ]
        .filter(Boolean)
        .join(", ");

      // Atualiza metadata do PaymentIntent com dados do pedido
      await fetch("/api/checkout", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          paymentIntentId,
          metadata: {
            ...data,
            endereco,
          },
          description: `iPocket Brasil – modelo: ${data.modelo} – cor: ${data.cor}`,
        }),
      });

      const { error, paymentIntent } = await stripe.confirmPayment({
        elements,
        redirect: "if_required",
      });

      if (error) {
        setFeedback(error.message || "Erro ao processar pagamento.");
      } else {
        const status = paymentIntent?.status;
        setSuccessStatus(status || null);
        setSuccessOpen(true);
        setFeedback(null);
      }
    } catch (e: unknown) {
      const msg =
        e instanceof Error ? e.message : "Falha inesperada ao processar.";
      setFeedback(msg);
    } finally {
      setSubmitting(false);
    }
  };

  const valor = PRICE_MAP[modelo];

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-6 rounded-3xl p-6 sm:p-8 card-surface muted-border"
    >
      {/* Endereço (Stripe AddressElement) */}
      <div className="grid gap-2">
        <AddressElement
          options={{
            mode: "shipping",
            allowedCountries: ["BR"],
            fields: { phone: "always" },
          }}
          onChange={(e) => {
            setAddressComplete(e.complete);
            setAddressValue(e.value as AddressData);
          }}
        />
      </div>

      {/* Modelo + Cor */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label>Modelo</Label>
          <Select
            value={modelo}
            onChange={(e) =>
              onModeloChange(e.target.value as FormValues["modelo"])
            }
          >
            <option value="curta">
              Alça curta – R$
              {PRICE_MAP.curta.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </option>
            <option value="longa">
              Alça longa – R$
              {PRICE_MAP.longa.toLocaleString("pt-BR", {
                minimumFractionDigits: 2,
              })}
            </option>
          </Select>
        </div>

        <div className="grid gap-2">
          <Label>Cor desejada</Label>
          <input type="hidden" {...register("cor")} />
          <ColorSwatches selected={selectedColor} onSelect={selectColor} />
          {errors.cor && (
            <p className="text-sm text-red-600">Selecione uma cor.</p>
          )}
        </div>
      </div>

      {/* Payment Element */}
      <PaymentElement options={{ layout: "tabs" }} />

      <Button
        type="submit"
        disabled={submitting || !stripe || !addressComplete}
        className="mt-2 w-full sm:w-auto text-base px-6 py-3 rounded-xl"
      >
        {submitting
          ? "Processando..."
          : `Pagar R$ ${valor.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
          })}`}
      </Button>

      <p className="text-xs subtle leading-relaxed">
        Produção sob encomenda (2 semanas a 1 mês). Após confirmação do
        pagamento você entra na fila de produção.
      </p>

      {feedback && (
        <p className="text-sm font-medium" role="status">
          {feedback}
        </p>
      )}

      <Modal
        open={successOpen}
        onClose={() => setSuccessOpen(false)}
        title="Pagamento confirmado"
      >
        <div className="grid gap-3">
          {successStatus === "processing" && (
            <p>
              Pagamento recebido e está sendo processado. Você entrará na fila de
              produção assim que a confirmação for concluída.
            </p>
          )}
          {successStatus === "succeeded" && (
            <p>
              Pagamento aprovado! Recebemos sua encomenda e em breve entraremos
              em contato pelo WhatsApp/E-mail com os próximos passos.
            </p>
          )}
          {!successStatus && (
            <p>
              Pagamento enviado para confirmação. Verifique seu e-mail/WhatsApp
              para atualizações.
            </p>
          )}
          <p className="text-xs subtle leading-relaxed">
            Produção sob encomenda: 2 semanas a 1 mês. Cada peça é feita de
            forma artesanal para evitar desperdício e garantir acabamento.
          </p>
        </div>
      </Modal>
    </form>
  );
}

// =========================
// Wrapper: carrega Stripe + cria PaymentIntent
// =========================

export function StripeOrderForm() {
  const [stripePromise, setStripePromise] =
    React.useState<Promise<Stripe | null> | null>(null);
  const [clientSecret, setClientSecret] = React.useState<string>();
  const [paymentIntentId, setPaymentIntentId] = React.useState<string>();
  const [modelo, setModelo] = React.useState<FormValues["modelo"]>("curta");
  const [appearance, setAppearance] = React.useState<Appearance | null>(null);

  const buildAppearance = React.useCallback(() => {
    if (typeof window === "undefined") return null;
    const root = document.documentElement;
    const css = getComputedStyle(root);
    const bg = "#ffffff";
    const text = "#111827";
    const radius = css.getPropertyValue("--radius-md").trim() || "12px";
    const secondary = "#6b7280";

    return {
      theme: "flat" as const,
      variables: {
        colorPrimary: text,
        colorBackground: bg,
        color: localStorage.getItem("theme") === "dark" ? "#ffffff" : "#111827",
        colorTextSecondary: secondary,
        colorTextPlaceholder: secondary,
        borderRadius: radius,
        spacingUnit: "6px",
      },
      rules: {
        ".Label": {
          color: localStorage.getItem("theme") === "dark" ? "#ffffff" : "#111827",
          fontWeight: "500"
        },
        ".Input": {
          color: text,
          border: "1px solid var(--color-border-subtle)",
          backgroundColor: "#ffffff"
        },
        ".Input::placeholder": { color: secondary },
        ".Error": { color: "#ef4444" },
        ".Tab, .Block": { borderRadius: radius },
      },
    };
  }, []);

  // Carrega publishable key
  React.useEffect(() => {
    fetch("/api/stripe-publishable")
      .then((r) => r.json())
      .then((data) => {
        if (data.publishableKey) {
          setStripePromise(loadStripe(data.publishableKey));
        }
      })
  }, []);

  // Cria / recria PaymentIntent sempre que modelo mudar
  React.useEffect(() => {
    if (!modelo) return;

    fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ modelo }),
    })
      .then((r) => r.json())
      .then((data) => {
        setClientSecret(data.clientSecret);
        setPaymentIntentId(data.paymentIntentId);
      })
  }, [modelo]);

  // Inicializa e observa alterações de tema (classe .dark ou media query)
  React.useEffect(() => {
    const apply = () => setAppearance(buildAppearance());
    apply();
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const onMQ = () => apply();
    if (typeof mq.addEventListener === 'function') {
      mq.addEventListener('change', onMQ);
    } else {
      const legacyListener: (this: MediaQueryList, ev: MediaQueryListEvent) => void = () => apply();
      mq.addListener(legacyListener);
    }
    const obs = new MutationObserver((muts) => {
      for (const m of muts) {
        if (m.type === 'attributes' && m.attributeName === 'class') {
          apply();
          break;
        }
      }
    });
    obs.observe(document.documentElement, { attributes: true });
    return () => {
      if (typeof mq.removeEventListener === 'function') {
        mq.removeEventListener('change', onMQ);
      } else {
        const legacyListener: (this: MediaQueryList, ev: MediaQueryListEvent) => void = () => apply();
        mq.removeListener(legacyListener);
      }
      obs.disconnect();
    };
  }, [buildAppearance]);

  if (!stripePromise || !clientSecret || !appearance) {
    return (
      <div className="rounded-3xl p-6 sm:p-8 card-surface muted-border text-sm">
        Carregando checkout...
      </div>
    );
  }

  return (
    <Elements stripe={stripePromise} options={{ clientSecret, appearance, locale: "pt-BR" }}>
      <StripeFormInner
        paymentIntentId={paymentIntentId}
        modelo={modelo}
        onModeloChange={setModelo}
      />
    </Elements>
  );
}
