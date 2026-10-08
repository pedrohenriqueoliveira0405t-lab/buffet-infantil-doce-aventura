# Landing page — Buffet infantil (modelo de portfólio)

Landing page de alta conversão para buffet infantil de alto padrão em Americana – SP.
Marca e dados são fictícios. Regras do projeto em [CLAUDE.md](CLAUDE.md).

## Rodar

```bash
npm install
npm run dev
```

Abra http://localhost:3000. Antes de publicar: `npm run lint` e `npm run build`.

## Onde editar

- **Todo o conteúdo** (textos, números, pacotes, depoimentos, FAQ, contato, mensagens do WhatsApp): `src/content/site.ts`
- **Cores e fontes**: tokens em `src/app/globals.css` (espelhados em `src/content/theme.ts`)
- **Fotos**: `public/images` (veja `public/images/LEIA-ME.md`)
- **Variáveis de ambiente**: copie `.env.example` para `.env.local`

## Conversão e rastreamento

- Todo CTA abre o WhatsApp com mensagem própria e uma referência discreta no fim
  (posição do botão + origem do tráfego), e dispara `whatsapp_click` no dataLayer
  com `cta_location`, `package`, UTMs e `gclid`.
- UTMs e `gclid` ficam em `sessionStorage` durante a visita.
- No link da bio do Instagram, use `?utm_source=instagram&utm_medium=bio` para a origem aparecer.
- GTM carrega só com `NEXT_PUBLIC_GTM_ID` definido, com Google Consent Mode v2 (padrão negado até o aceite no banner).
