# AI Coding Agent Instructions – iPocket Brasil

## Objetivo
Tornar produtivo imediatamente ao evoluir a landing em Next.js mantendo estética premium minimalista e copy honesta (inspirado, não oficial). Este documento orienta padrões técnicos e de estrutura; o brief original permanece abaixo.

## Stack & Libs
Next.js App Router (`app/`), Tailwind CSS v4 (tokens em `app/styles/tokens.css`), Framer Motion (`AnimateInView`), Radix Accordion (FAQ), Embla Carousel (Depoimentos), React Hook Form + Zod (formulário), util `cn()` para mesclar classes (clsx + tailwind-merge).

## Estrutura
`app/page.tsx` monta as seções em ordem fixa.
`components/sections/*Section.tsx` cada seção isolada; usar `<Section id="...">` para âncora de navegação.
`components/ui/*` são blocos reutilizáveis (Button, Card, Container, SectionHeading, Accordion, ColorSwatches).
`app/api/encomenda/route.ts` endpoint POST mock (persistência futura).
`lib/cn.ts` util de composição de classes.

## Padrão de Seção
Cada seção: `<Section id="slug">` + `<Container>` interno para largura. Conteúdo animável envolve `<AnimateInView>` (opcional `delay`). Evite lógica pesada dentro das seções; extraia helpers se necessário.

## Tokens & Estilo
Design tokens centralizados em `app/styles/tokens.css` (cores neutras, swatches de produto, radius, shadow). Preferir classes semânticas (e.g. `bg-[--color-base]`, `rounded-[var(--radius-lg)]`). Não duplicar valores hardcoded; estender tokens se precisar novas cores/acentos.

## Componentes Principais
`Section`: aplica padding consistente (`section-pad` via Tailwind). Aceita `padded=false` para layouts especiais.
`AnimateInView`: anima fade/translate on-scroll; mantenha transições suaves (<=0.7s).
`OrderForm`: padrão para novos formulários (React Hook Form + Zod). Validar no client antes de enviar.

## Formulário & Encomenda
Para novos campos: estender `schema` em `OrderForm` (Zod), atualizar tipos e adicionar inputs mantendo mensagens de erro curtas (classe `text-sm text-red-600`). POST ainda é mock: ao integrar, adicionar serviço de persistência ou chamada externa no handler de `route.ts`.

## Convensões
Texto e copy em PT-BR; frases curtas. Jamais insinuar oficial Apple/ISSEY MIYAKE. Usar ids de seção em minúsculo sem acentos (`topo`, `encomenda`, etc.). Animações discretas; evitar parallax pesado.

## Adicionando Nova Seção
1. Criar `components/sections/NomeSection.tsx`.
2. Estrutura mínima: `<Section id="nome"><Container>...</Container></Section>`.
3. Importar e inserir ordem correta em `app/page.tsx`.
4. Se precisar FAQ/accordion, reutilizar `Accordion` existente.
5. Garantir responsividade (grid `sm:` breakpoints; testar mobile first).

## Acessibilidade
Imagens com `alt` claro (ver Hero). Botões com texto legível; evitar ícones sem rótulo crítico. Form: usar `Label` e feedback de erro textual.

## Build & Dev
Instalação: `npm install`. Desenvolvimento: `npm run dev` (porta 3000). Verificar logs de encomenda em terminal (console do route). Após dependência nova, validar Tailwind classes continuam mescladas (evitar conflitos).

## Não Fazer
- Não criar estilos inline para valores de token existentes.
- Não misturar variantes de cor fora do set definido.
- Não adicionar bibliotecas pesadas de animação além de Framer Motion.
- Não alterar ordem sem validar navegação e CTAs.

## Próximos Pontos Fáceis
Implementar persistência real da encomenda (e-mail ou DB), estilizar carousel real, adicionar SEO (Open Graph image real).

---
# Original Product & Copy Brief
# Brief de Landing Page – iPocket Brasil (Next.js)

## Papel da IA

Você é um(a) designer + dev front-end criando uma landing page em **Next.js** para o produto **iPocket Brasil**, um bolso de tecido premium para carregar e usar o iPhone no corpo, inspirado na tendência global do “iPhone Pocket” lançado lá fora.

O foco é:
- **design premium, minimalista e elegante**, bem próximo do padrão visual da Apple;
- **alta conversão** para vendas via **PIX**;
- **comunicação honesta**: deixar claro que é **versão nacional inspirada**, não produto oficial Apple.

---

## Objetivo da página

- Apresentar o **iPocket Brasil** como:
  - uma forma **estilosa e funcional** de carregar o iPhone;
  - uma alternativa **nacional**, com **preço muito mais acessível** do que o acessório vendido lá fora.
- Gerar **encomendas** do produto com:
  - botão **“Encomende já o seu”**;
  - formulário simples com **dados pessoais + endereço + cor + tipo de alça**;
  - instruções de pagamento via **PIX**.
- Usar **gatilhos psicológicos**:
  - urgência;
  - escassez;
  - novidade;
  - ancoragem de preço;
  - pertencimento/status.

---

## Público-alvo

- Donos de iPhone que:
  - gostam de **produtos de design**, moda, lifestyle;
  - acompanham lançamentos da Apple e tendências tech;
  - se incomodam de carregar o celular na mão ou no bolso tradicional;
  - querem **“look internacional” com preço brasileiro**.

---

## Tom de voz e linguagem

- Português brasileiro.
- Vocabulário simples, mas com **pegada sofisticada** e inspirada em Apple:
  - frases curtas;
  - foco na experiência;
  - sem exagero visual.
- Evitar:
  - parecer produto oficial da Apple;
  - usar logos da Apple ou termos que indiquem parceria oficial.
- Pode fazer referências como:
  - “inspirado na tendência global do iPhone Pocket”;
  - “mesma ideia de usar o iPhone como parte do seu look”.

---

## Diretrizes de design

### Estilo geral

- Estética **clean**:
  - muito **espaço em branco**;
  - background **branco ou cinza muito claro**;
  - tipografia sem serifa, elegante.
- Layout:
  - largura máxima ~1200px;
  - seções com boa respiração (padding generoso);
  - foco em **boas fotos/mockups** do iPocket Brasil.
- Cores:
  - base em **tons neutros** (branco, cinza, preto);
  - usar cores do produto (ex.: preto, canela, safira, limão, tangerina, etc.) apenas como **toques de destaque** (botões, badges, pequenos detalhes).
- Componentes com:
  - cantos levemente arredondados;
  - sombras suaves;
  - micro animações discretas em hover.

### Tipografia

- Títulos grandes, lembrando landing da Apple:
  - `h1`: bem grande e fino;
  - `h2 / h3`: limpos, com espaçamento confortável.
- Subtítulos e parágrafos curtos, com bastante espaço entre linhas.

---

## Estrutura da página

A landing deve ter, no mínimo, as seções abaixo, nesta ordem:

### 1. Hero (dobrada principal)

Objetivo: explicar em 3 segundos o que é o produto e ativar desejo.

Elementos:

- Fundo claro.
- À esquerda (em telas grandes):
  - **Headline principal** (exemplo, que pode ser ajustado):
    - “Um bolso pensado para o seu iPhone.”
  - **Subheadline com gatilho de novidade + Brasil**. Use variações como:
    - “Seja um dos primeiros a usar no Brasil a tendência que acabou de sair das vitrines internacionais.”
    - “Inspirado no iPhone Pocket vendido lá fora, agora em uma versão feita no Brasil, com preço nacional.”
  - Bullets de benefício rápido, em 3 itens:
    - “Compatível com qualquer iPhone.”
    - “Tecido 3D flexível que abraça o aparelho.”
    - “Ideal para usar no corpo, preso em bolsas ou na mão.”
- À direita:
  - Mockup/foto grande do iPocket Brasil com um iPhone encaixado.

CTA:

- Botão principal **“Encomende já o seu”** (rolando para a seção de formulário).
- Texto de apoio abaixo do botão, com urgência/escassez, por exemplo:
  - “Primeiro lote com quantidade limitada.”
  - “Prazo de produção de 2 semanas a 1 mês por unidade.”

---

### 2. Seção “Como funciona”

Objetivo: mostrar de forma visual e simples a ideia do produto.

Elementos:

- Título: algo como “Um bolso extra para o seu iPhone”.
- Subtítulo explicando a experiência:
  - “O iPocket Brasil é um bolso em tecido 3D elástico que envolve o seu iPhone e se adapta também a cartões, chaves e pequenos itens do dia a dia.”
- Três ou quatro cards com ícone + texto curto:
  1. **Envolve** – “Envolve o seu iPhone com segurança e conforto.”
  2. **Expande** – “O tecido se expande para acomodar outros itens essenciais.”
  3. **Revela** – “Quando esticado, deixa você ver a tela e notificações.”
  4. **Veste** – “Use na mão, no corpo ou preso à sua bolsa.”

---

### 3. Seção “Por que agora?” (gatilhos de tendência + early adopter)

Objetivo: usar a hype do lançamento oficial lá fora e mostrar oportunidade.

Sugestões de texto:

- Título sugerido:
  - “O acessório que acabou de chegar ao mundo, agora na sua mão.”
- Parágrafos (a IA deve escrever algo nessa linha):
  - “Lá fora, o iPhone Pocket chegou como um acessório de moda tech e já está esgotando em várias lojas.”
  - “Aqui no Brasil, o iPocket Brasil traz a mesma ideia: transformar o seu iPhone em parte do seu look — só que com preço em real e fabricação local.”
- Gatilhos:
  - “Seja um dos primeiros a usar essa tendência nas ruas do Brasil.”
  - “Enquanto o modelo oficial custa mais de mil reais lá fora, aqui você garante o seu com preço nacional e produção sob encomenda.”

---

### 4. Seção “Design & Materiais”

Objetivo: passar percepção de qualidade, mesmo sendo versão nacional.

Diretrizes:

- Título:
  - “Tecido tecnológico, pensado para o dia a dia.”
- Texto explicando:
  - Que o iPocket Brasil se inspira em **tecidos 3D tricotados/canelados**, semelhantes aos usados em peças de moda de alto padrão.
  - Que o foco é ter:
    - toque agradável,
    - leve elasticidade,
    - boa resistência,
    - caimento bonito com o iPhone dentro.
- Instruir a IA a escrever com “vibe Apple”, mas sem prometer material idêntico ao importado.
- Colocar 3 bullets de benefícios do material:
  - “Flexível e ajustável a diferentes modelos de iPhone.”
  - “Textura que cria um visual marcante, sem ser chamativo demais.”
  - “Leve e confortável para uso no dia a dia.”

---

### 5. Seção “Cores e modelos”

Objetivo: espelhar a lógica da Apple (curta vs longa) sem copiar.

Elementos:

- Título:
  - “Escolha como você quer usar.”
- Texto:
  - Explicar que existem **dois modelos**:
    - **Alça curta** – ideal para usar na mão ou preso à bolsa.
    - **Alça longa** – estilo tiracolo / crossbody, pra usar no corpo.
- Tabelas ou cards:

  - **Modelo Alça Curta – R$ 600**
    - Mostrar grid com cores disponíveis (inspiradas em: limão, tangerina, roxo, rosa, pavão, safira, canela, preto).
    - Cada cor com um pequeno círculo (swatch) e nome.

  - **Modelo Alça Longa – R$ 1.200**
    - Grid com 3 cores principais (ex.: safira, canela, preto).
    - Também com swatches.

- Gatilho de ancoragem de preço:
  - Texto sugerido:
    - “Lá fora, modelos semelhantes chegam a quase R$ 1.300 na conversão direta. Aqui, você leva a ideia com tecido premium e acabamento artesanal brasileiro.”

---

### 6. Seção “Comparativo de preço” (ancoragem)

Objetivo: deixar claro o “superfaturado lá fora vs preço BR”.

Elementos:

- Título:
  - “Preço de acessório de luxo, sem custo de acessório de luxo.”
- Criar um comparativo em 2 colunas:

  - Coluna 1 – “Lá fora”
    - “Acessório similar vendido por empresa internacional.”
    - “Preço médio: US$ 149,95 (curto) e US$ 229,95 (longo).”
    - “Conversão aproximada: mais de R$ 1.000 em muitos casos.”

  - Coluna 2 – “iPocket Brasil”
    - “Versão inspirada, feita no Brasil.”
    - “Alça curta: R$ 600.”
    - “Alça longa: R$ 1.200.”
    - “Pagamento via PIX, sem IOF e sem surpresa na fatura.”

- Gatilho:
  - “Qualidade de acessório de moda internacional, com preço pensado para o mercado brasileiro.”

---

### 7. Seção “Como comprar” (fluxo + prazo)

Objetivo: explicar o processo e reduzir objeções.

Elementos:

- Título:
  - “Como funciona a sua encomenda.”
- Texto explicando, em 3 passos:

  1. **Você escolhe modelo e cor.**
  2. **Preenche seus dados e endereço.**
  3. **Recebe a chave PIX para pagamento e entra na fila de produção.**

- Reforçar prazo:
  - “Prazo estimado de produção e envio: entre 2 semanas e 1 mês.”
- Adicionar microcopy de transparência:
  - “Cada peça é feita sob encomenda, em parceria com costureira local, o que garante acabamento cuidadoso e evita desperdício de material.”

---

### 8. Seção “Depoimentos / Social proof” (placeholder)

Mesmo que ainda não existam clientes, a IA deve:

- Criar uma estrutura para depoimentos (cards em carrossel), mas deixar textos curtos genéricos que possam ser substituídos depois.
- Título sugerido:
  - “Pensado para quem vive com o iPhone na mão.”
- Subtítulo:
  - “Em breve, aqui entram fotos reais de clientes usando o iPocket Brasil nas ruas.”

---

### 9. FAQ

Criar um bloco de perguntas e respostas, incluindo:

1. **É produto oficial Apple?**
   - Resposta clara: não, é um produto nacional **inspirado** na tendência, sem vínculo com Apple ou ISSEY MIYAKE.

2. **Serve em qualquer iPhone?**
   - Explicar que o tecido é flexível e foi pensado para se adaptar à maioria dos modelos recentes.

3. **Posso levar outros itens junto?**
   - Sim, mencionar cartões, chaves, fones pequenos etc.

4. **Qual o prazo de entrega?**
   - Reforçar “2 semanas a 1 mês” após confirmação do pagamento.

5. **Como funciona o pagamento?**
   - Explicar sobre PIX, confirmação e envio.

---

### 10. Seção final com CTA forte

Elementos:

- Headline curta:
  - “Pronto para vestir o seu iPhone?”
- Subheadline:
  - “Garanta o seu iPocket Brasil no primeiro lote e use antes de virar modinha por aqui.”
- Botão final:
  - “Quero encomendar agora” (ancorado no formulário).

---

## Formulário de encomenda

Instruções para a IA:

- Criar um formulário simples com os campos:
  - Nome completo
  - E-mail
  - WhatsApp
  - Endereço completo (rua, número, complemento, bairro, cidade, estado, CEP)
  - Modelo:
    - [ ] Alça curta – R$ 600
    - [ ] Alça longa – R$ 1.200
  - Cor desejada (select ou buttons com swatches)
  - Observações adicionais (campo texto livre)

- Ao enviar o formulário:
  - Mostrar mensagem de confirmação:
    - “Recebemos sua encomenda! Em breve entraremos em contato pelo WhatsApp com os dados para pagamento via PIX e prazo estimado de entrega.”

---

## Requisitos técnicos (Next.js)

- Página única (Single Page) com seções navegáveis por **anchors** no menu.
- Layout **responsivo**:
  - mobile-first;
  - hero adaptando imagem/CTA para telas pequenas.
- Usar componentes reutilizáveis para:
  - Cards de benefício;
  - Lista de cores;
  - FAQ (accordion);
  - Depoimentos.
- Preparar o código para fácil integração com:
  - backend de envio de formulário (API route em `/api/encomenda` ou similar);
  - futura automação de pagamento via PIX.

---

## Metadados e SEO

- Título da página:
  - “iPocket Brasil – Seu iPhone, seu bolso de design.”
- Descrição:
  - “Bolso em tecido 3D inspirado no iPhone Pocket, feito no Brasil, compatível com qualquer iPhone. Encomende o seu com pagamento via PIX.”
- Open Graph:
  - Imagem destacada com mockup do iPocket Brasil + iPhone;
  - Título e descrição alinhados com o hero.

---

## Gatilhos psicológicos que DEVEM aparecer na copy

Instrua a copy da página a incluir, em variações:

- **Tendência / novidade**
  - “Seja um dos primeiros a usar essa tendência no Brasil.”
- **Escassez**
  - “Primeiro lote com quantidade limitada.”
- **Urgência**
  - “Produção sob encomenda, por tempo limitado.”
- **Ancoragem de preço**
  - “Lá fora custa em dólar. Aqui, você paga em real.”
- **Status / pertencimento**
  - “Para quem enxerga o iPhone como parte do estilo, não só um aparelho.”
- **Preço nacional x conceito importado**
  - “Qualidade inspirada na moda internacional, com preço brasileiro.”

Ajuste textos, microcopys e headings para soar natural e fluido, mantendo sempre uma estética e tom próximos das páginas de produto da Apple, mas deixando claro que o iPocket Brasil é uma criação independente, inspirada na tendência, e não um produto oficial Apple.
