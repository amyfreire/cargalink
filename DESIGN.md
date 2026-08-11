# CargaLink — Direção de design (aprovada no protótipo)

> **Status:** referência visual e de tom aprovada para o produto real.  
> **Origem:** protótipo de apresentação (sem backend).  
> **Quando usar:** ao subir auth, banco, API e produção — manter esta pegada.

---

## 1. Essência do produto

CargaLink **não** é um SaaS genérico de startup.

É uma ferramenta de frete para quem:

- vive de prazo e de estrada  
- não tem tempo de “explorar features”  
- quer publicar, achar motorista e fechar — sem planilha e sem grupo de WhatsApp  

**Tagline:** *O frete certo, sem enrolação.*

**Descrição curta:**  
*Publique a carga, encontre quem leva e feche o frete. Feito para quem vive de estrada e de prazo.*

---

## 2. O que NÃO fazer (anti-padrão “cara de IA”)

Evitar em qualquer tela futura:

| Evitar | Por quê |
|--------|---------|
| Mesh / blobs / glassmorphism excessivo | Template genérico |
| Glow, shimmer, sparkles, “live dots” | Decoração vazia |
| Gradientes laranja em tudo | Visual de demo de IA |
| Inter + cantos ultra arredondados + sombras suaves | SaaS clone |
| Ícones em bolhas coloridas em todo card | Repetição de shadcn demo |
| Copy: “nova geração”, “melhor experiência do mercado”, “revolucione” | Marketing vazio |
| Emojis no dashboard (“Olá 👋”) | Informal demais / IA |
| KPI com ícone grande + blob de fundo + hover scale | Dashboard de template |
| Mock de “produto com 4 cards mágicos” no hero | Clichê de landing AI |
| Animações em cascata em tudo | Barulho visual |

---

## 3. O que fazer (pegada aprovada)

### Identidade

- **Utilitário, editorial, industrial-leve**
- Laranja **só como acento**, não como wallpaper
- Muita borda fina, pouco shadow
- Cantos **discretos** (≈ 4–8px), não “pill” em tudo
- Números e valores em **fonte mono** (`font-data` / IBM Plex Mono)
- Hierarquia tipográfica calma: `font-semibold`, não `extrabold` em tudo

### Metáfora de produto

O hero não deve ser um “dashboard fake”.  
Prefira algo **do domínio**:

- **Quadro de fretes** (lista rota + valor + tipo de veículo)
- Listas densas, como load board real
- Status e preços legíveis no polegar

### Tom de voz (PT-BR)

- Direto, operacional, brasileiro  
- Frases curtas  
- Fala de frete, não de “ecossistema”  
- Pode ser seco; não precisa ser fofo  

**Exemplos bons:**

- “Menos telefone, mais frete.”  
- “Três passos. Acabou.”  
- “Sem planilha e sem grupo de WhatsApp.”  
- “Protótipo · dados de demonstração” (quando for demo)  

**Exemplos ruins:**

- “Marketplace de fretes de nova geração com a melhor UX do mercado.”  
- “Transforme sua operação logística com inteligência.”  

---

## 4. Design tokens

### Tipografia

| Uso | Família |
|-----|---------|
| UI / textos | **IBM Plex Sans** |
| Dados / preços / IDs | **IBM Plex Mono** |

Pesos principais: 400, 500, 600.  
Evitar 800 em blocos grandes.

### Cores (light — base do protótipo)

| Token | Valor | Uso |
|-------|-------|-----|
| Background | `#F7F5F2` | Papel / off-white quente |
| Card | `#FFFCF8` | Superfícies |
| Foreground | `#1C1917` | Texto principal (stone) |
| Muted text | `#57534E` | Secundário |
| Border | `#D6D3D1` | Divisores |
| Primary | `#C2410C` | Laranja queimado (ação) |
| Primary hover | `#9A3412` | Hover de botão |
| Accent soft | `#FFEDD5` | Highlights leves |
| Success | `#15803D` | Status positivo |
| Error | `#B91C1C` | Erro |

Dark mode: base stone/near-black (`#0C0A09`), primary mais claro (`#EA580C`).

### Radius

- Base: **0.5rem** (8px)  
- Inputs/botões: `rounded-md`  
- Badges: `rounded-sm`  
- Evitar `rounded-2xl` / `rounded-3xl` em tudo  

### Sombra

- Preferir **borda** a sombra  
- Shadow só quando houver real elevação (dropdown, sheet)  

---

## 5. Layout & mobile

### Mobile-first (prioridade)

- Uso principal no telefone  
- Bottom nav: Início · Cargas · Chat · Motoristas · Financeiro  
- CTA fixo na landing só se for necessário e **sem** sparkle  
- Touch targets ≥ 40–44px  
- Inputs 16px no mobile (evitar zoom iOS)  
- Safe area (`env(safe-area-inset-*)`)  

### App shell

- Header fino, fundo de card, borda inferior  
- Sidebar limpa (sem blur glass)  
- Faixa de demo, se existir: texto mínimo, sem animação  

### Landing (estrutura que funcionou)

1. Header simples: logo + Entrar + Abrir app  
2. Hero editorial + **quadro de fretes**  
3. Faixa de números secos (3 colunas, com divisor)  
4. “Por que existe” em colunas com borda (sem ícone bolha)  
5. Fluxo em 3 passos numerados grandes e apagados  
6. Depoimentos com aspas e rodapé seco  
7. FAQ em duas colunas no desktop  
8. CTA final em bloco **escuro sólido** (foreground), sem gradient  

---

## 6. Componentes — regras

### Botão

- Sólido primary, hover mais escuro  
- Sem shine / glow / translateY exagerado  
- `rounded-md`, peso medium  

### Card / KPI

- Borda, fundo card, padding confortável  
- KPI: título pequeno + valor mono grande + hint opcional  
- **Sem** ícone decorativo obrigatório  

### Load card (carga)

- Título + empresa  
- Rota com **borda esquerda primary** e seta `→`  
- Grid de meta (carga, veículo, coleta, candidaturas)  
- Preço em mono + cor primary  
- Botão outline “Abrir carga”  

### Badge

- `rounded-sm`, texto 11px, peso medium  
- Variantes de status discretas  

### Mapa (se não houver Mapbox ainda)

- Grade simples + pins como chips com borda  
- Legenda textual — sem “mapa mágico”  

---

## 7. Motion

- Pouco e funcional  
- Fade / slide curto (≤ 400ms) no enter de página ou scroll reveal  
- Respeitar `prefers-reduced-motion`  
- Nada de float infinito, pulse glow, shimmer de CTA  

---

## 8. Conteúdo de domínio (demo realista)

Rotas e fretes devem parecer BR de verdade:

- Rondonópolis/MT → Santos/SP  
- Soja, frigorificado, carga seca, VUC, carreta  
- Valores em R$ legíveis (`formatCurrency` pt-BR)  

Personas de demo:

- Empresa / embarcador  
- Motorista  
- Admin (só se necessário)  

---

## 9. Stack (quando for o real)

Manter alinhado ao protótipo, salvo decisão contrária:

- React + TypeScript + Vite  
- Tailwind + componentes no estilo shadcn (customizados para **esta** identidade)  
- React Router, React Hook Form, Zod, React Query  
- Supabase (Auth + Postgres + Storage + RLS)  

**Importante:** shadcn é base de acessibilidade/estrutura — **não** copiar o visual default “new-york zinc”. Aplicar os tokens desta página.

---

## 10. Checklist antes de merge (produto real)

- [ ] Zero mesh/glow/sparkle desnecessário  
- [ ] Primary só em ação e destaque  
- [ ] Preços/KPIs em mono  
- [ ] Copy operacional (sem jargão de pitch deck)  
- [ ] Mobile: bottom nav + formulários usáveis com uma mão  
- [ ] Landing/hero com cara de frete, não de template  
- [ ] Dark mode opcional, mas consistente com stone + laranja  

---

## 11. Arquivos de referência no protótipo

| Arquivo | O que guarda |
|---------|----------------|
| `src/styles/globals.css` | Tokens de cor e base |
| `src/styles/utilities.css` | `font-data`, `label-caps`, layout |
| `src/styles/animations.css` | Motion mínimo |
| `src/pages/landing.tsx` | Estrutura e tom da landing |
| `src/components/loads/load-card.tsx` | Card de frete |
| `src/components/dashboard/kpi-card.tsx` | KPI seco |
| `src/components/layout/logo.tsx` | Marca CL |
| `src/components/layout/mobile-bottom-nav.tsx` | Nav mobile |
| `src/constants/index.ts` | Nome, tagline, descrição |

---

## 12. Frase-guia

> **Se parecer landing de IA ou dashboard de template, está errado.**  
> **Se parecer quadro de frete / ferramenta de operação, está certo.**

---

*Última atualização: protótipo validado visualmente pelo solicitante. Usar como fonte da verdade de design no desenvolvimento real.*
