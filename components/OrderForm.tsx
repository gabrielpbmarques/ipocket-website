"use client";
import React from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input, Label, Select } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { ColorSwatches } from "@/components/ui/ColorSwatches";

// Novo schema: campos de endereço separados + CEP
const schema = z.object({
  nome: z.string().min(3),
  email: z.string().email(),
  whatsapp: z.string().min(8),
  modelo: z.enum(["curta", "longa"]),
  cor: z.string().min(1),
  cep: z.string().min(9), // 00000-000
  rua: z.string().min(3),
  numero: z.string().min(1),
  complemento: z.string().optional(),
  bairro: z.string().min(2),
  cidade: z.string().min(2),
  estado: z.string().min(2).max(2),
});

type FormValues = z.infer<typeof schema>;

export function OrderForm() {
  const [selectedColor, setSelectedColor] = React.useState<string>();
  const [cepLoading, setCepLoading] = React.useState(false);
  const [cepError, setCepError] = React.useState<string | undefined>();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setValue,
    control,
  } = useForm<FormValues>({
    resolver: zodResolver(schema),
  });

  const watchCep = useWatch<FormValues>({ control, name: "cep" }) as string | undefined;
  const watchWhatsapp = useWatch<FormValues>({ control, name: "whatsapp" }) as string | undefined;

  const formatCep = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 8);
    if (digits.length <= 5) return digits;
    return digits.slice(0, 5) + "-" + digits.slice(5);
  };

  const formatWhatsapp = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 6) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 3)} ${digits.slice(3, 7)}-${digits.slice(7)}`;
  };

  React.useEffect(() => {
    const raw = (watchCep || "").replace(/\D/g, "");
    if (raw.length === 8) {
      setCepLoading(true);
      setCepError(undefined);
      fetch(`https://viacep.com.br/ws/${raw}/json/`)
        .then((r) => r.json())
        .then((data) => {
          if (data.erro) {
            setCepError("CEP não encontrado.");
            return;
          }
          setValue("rua", data.logradouro || "");
          setValue("bairro", data.bairro || "");
          setValue("cidade", data.localidade || "");
          setValue("estado", data.uf || "");
        })
        .catch(() => setCepError("Erro ao buscar CEP."))
        .finally(() => setCepLoading(false));
    }
  }, [watchCep, setValue]);

  const onSubmit = async (data: FormValues) => {
    const enderecoCompleto = `${data.rua}, ${data.numero}${data.complemento ? " - " + data.complemento : ""}, ${data.bairro}, ${data.cidade} - ${data.estado}, CEP ${data.cep}`;
    const payload = { ...data, endereco: enderecoCompleto };
    const res = await fetch("/api/encomenda", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const json = await res.json();
    alert(json.message || "Recebemos sua encomenda!");
  };

  const selectColor = (key: string) => {
    setSelectedColor(key);
    setValue("cor", key, { shouldValidate: true });
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="grid gap-6 rounded-3xl p-6 sm:p-8 bg-white/70 backdrop-blur-sm border border-zinc-200/60 dark:bg-zinc-950/60 dark:border-zinc-800/60 shadow-sm"
    >
      {/* Nome */}
      <div className="grid gap-2">
        <Label>Nome completo</Label>
        <Input placeholder="Seu nome" {...register("nome")} />
        {errors.nome && (
          <p className="text-sm text-red-600">Informe seu nome completo.</p>
        )}
      </div>

      {/* Email + WhatsApp */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label>E-mail</Label>
          <Input
            placeholder="voce@email.com"
            type="email"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-sm text-red-600">E-mail inválido.</p>
          )}
        </div>
        <div className="grid gap-2">
          <Label>WhatsApp</Label>
          <Input
            placeholder="(11) 9 9999-9999"
            value={watchWhatsapp || ""}
            {...register("whatsapp")}
            onChange={(e) => {
              const formatted = formatWhatsapp(e.target.value);
              setValue("whatsapp", formatted, { shouldValidate: true });
            }}
          />
          {errors.whatsapp && (
            <p className="text-sm text-red-600">Informe um número válido.</p>
          )}
        </div>
      </div>

      {/* CEP */}
      <div className="grid gap-2">
        <Label>CEP</Label>
        <Input
          placeholder="00000-000"
          value={watchCep || ""}
          {...register("cep")}
          onChange={(e) => {
            const formatted = formatCep(e.target.value);
            setValue("cep", formatted, { shouldValidate: true });
          }}
        />
        <div className="flex items-center gap-2 min-h-[1.25rem]">
          {cepLoading && <p className="text-xs text-zinc-500">Buscando endereço...</p>}
          {cepError && <p className="text-xs text-red-600">{cepError}</p>}
        </div>
        {errors.cep && (
          <p className="text-sm text-red-600">Informe um CEP válido.</p>
        )}
      </div>

      {/* Rua / Número / Complemento */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="grid gap-2">
          <Label>Rua</Label>
          <Input placeholder="Logradouro" {...register("rua")} />
          {errors.rua && <p className="text-sm text-red-600">Informe a rua.</p>}
        </div>
        <div className="grid gap-2">
          <Label>Número</Label>
          <Input placeholder="Número" {...register("numero")} />
          {errors.numero && <p className="text-sm text-red-600">Informe o número.</p>}
        </div>
        <div className="grid gap-2">
          <Label>Complemento</Label>
          <Input placeholder="Apto, bloco, referência" {...register("complemento")} />
        </div>
      </div>

      {/* Bairro / Cidade / Estado */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="grid gap-2">
          <Label>Bairro</Label>
          <Input placeholder="Bairro" {...register("bairro")} />
          {errors.bairro && <p className="text-sm text-red-600">Informe o bairro.</p>}
        </div>
        <div className="grid gap-2">
          <Label>Cidade</Label>
          <Input placeholder="Cidade" {...register("cidade")} />
          {errors.cidade && <p className="text-sm text-red-600">Informe a cidade.</p>}
        </div>
        <div className="grid gap-2">
          <Label>Estado (UF)</Label>
          <Input
            placeholder="SP"
            maxLength={2}
            {...register("estado")}
            onChange={(e) => {
              setValue("estado", e.target.value.toUpperCase(), { shouldValidate: true });
            }}
          />
          {errors.estado && <p className="text-sm text-red-600">Informe UF (ex: SP).</p>}
        </div>
      </div>

      {/* Modelo + Cor */}
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="grid gap-2">
          <Label>Modelo</Label>
          <Select {...register("modelo")} defaultValue="curta">
            <option value="curta">Alça curta – R$ 600</option>
            <option value="longa">Alça longa – R$ 1.200</option>
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


      {/* CTA */}
      <Button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full sm:w-auto text-base px-6 py-3 rounded-xl"
      >
        {isSubmitting ? "Enviando..." : "Enviar encomenda"}
      </Button>

      {/* Informações finais */}
      <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
        Ao enviar, você receberá a chave PIX por WhatsApp para confirmar seu
        pedido.  
        <br />Prazo estimado de produção: **2 semanas a 1 mês**.
      </p>
    </form>
  );
}
