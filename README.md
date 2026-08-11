# CargaLink — Protótipo para apresentação

Marketplace de fretes com visual **utilitário / operacional** e **100% navegável sem banco de dados**.

Ideal para apresentar ao cliente: landing, login, dashboard, cargas, motoristas, chat, financeiro — dados de demonstração.

## Direção de design (aprovada)

A pegada visual e o tom de voz validados neste protótipo estão documentados em:

**[DESIGN.md](./DESIGN.md)**

Use esse arquivo como referência quando formos desenvolver o produto real (auth, banco, API). Não voltar ao visual “SaaS genérico / cara de IA”.

## Como abrir (Windows)

```bash
cd cargalink
npm install
npm run dev
```

No navegador: **http://localhost:5173**

### Roteiro de apresentação (2 minutos)

1. **Landing** (`/`) — mostre o site institucional  
2. Clique em **Ver protótipo agora** — entra no painel em 1 clique  
3. **Dashboard** — KPIs, gráficos, mapa, notificações  
4. **Cargas** — filtros, cards, detalhe, publicar  
5. **Mensagens / Financeiro / Motoristas** — navegue pelo menu lateral  

Não precisa configurar nada. Sem Supabase, sem PostgreSQL, sem API.

## O que está incluso

- Landing page profissional (SEO, FAQ, depoimentos)
- Autenticação simulada (localStorage)
- Dashboard completo
- Cargas, motoristas, veículos, mapa, chat, financeiro
- Avaliações, notificações, perfil, configurações, admin
- Dark mode, layout responsivo (celular → desktop)

## Conta demo (opcional)

- E-mail: `demo@cargalink.app`  
- Senha: `demo1234`  

Ou use o botão **Entrar no protótipo (1 clique)**.

## Scripts

| Comando | Uso |
|---------|-----|
| `npm run dev` | Apresentação / desenvolvimento |
| `npm run build` | Build de produção |
| `npm run preview` | Preview do build |

## Depois da aprovação

Quando o dono validar o visual e o fluxo, aí sim evoluímos com:

- Banco real (Supabase)
- Login de verdade
- Uploads, chat em tempo real, pagamentos

---

**CargaLink** · protótipo visual pronto para pitch.
