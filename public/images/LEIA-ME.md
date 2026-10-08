# Fotos do site

**Logo:** `logo.png` (PNG com fundo transparente), registrada em `brand.logo` no `src/content/site.ts`.
Ao trocar a logo, atualize lá as dimensões do arquivo e o `crop` (área útil sem margens transparentes)
e gere de novo os favicons `src/app/icon.png` e `src/app/apple-icon.png`.

Enquanto as fotos reais não chegam, o site mostra placeholders com a mesma proporção.
Para trocar um placeholder pela foto:

1. Salve a foto aqui, com o nome indicado em `src` no `src/content/site.ts`.
2. No mesmo item, mude `ready: false` para `ready: true`.

Fotos esperadas (proporção sugerida):

| Arquivo | Onde aparece | Proporção |
|---|---|---|
| `hero-salao-decorado.jpg` | Hero | 4:5 (mín. 1200×1500) |
| `espaco-salao-principal.jpg` | O espaço | 4:3 ou 1:1 |
| `espaco-brinquedoteca.jpg` | O espaço | 16:9 |
| `espaco-area-baby.jpg` | O espaço | 4:3 |
| `espaco-gourmet-adulto.jpg` | O espaço | 4:3 |
| `equipe-renata.jpg`, `equipe-juliana.jpg`, `equipe-camila.jpg`, `equipe-patricia.jpg` | Quem cuida da sua festa | 4:5 |
| `depoimento-jardim-encantado.jpg` | Depoimento em destaque | 4:3 |
| `festa-*.jpg` (7 temas) | Famílias que confiam em nós | 1:1 a 16:10 |

Regras (CLAUDE.md):

- Nada de fotos identificáveis de crianças reais sem autorização por escrito.
- Banco de imagens só com licença livre para uso comercial (Unsplash/Pexels), registrando a origem em `CREDITS.md` na raiz.
- Exporte em JPG ou WebP, com no máximo ~400 KB por arquivo; o `next/image` gera os tamanhos menores.
