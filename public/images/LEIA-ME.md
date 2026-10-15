# Fotos do site

**Logo:** `logo.png` (PNG com fundo transparente), registrada em `brand.logo` no `src/content/site.ts`.
Ao trocar a logo, atualize lá as dimensões do arquivo e o `crop` (área útil sem margens transparentes)
e gere de novo os favicons `src/app/icon.png` e `src/app/apple-icon.png`.

## Fotos em uso (`imagens_site/`)

| Pasta | Onde aparece | Como aparece |
|---|---|---|
| `imagens_site/uma_por_vez/` | Topo da página (foto com o selo "Uma festa por vez") | Slideshow automático |
| `imagens_site/brinquedoteca/` | O espaço → Brinquedoteca | Slideshow automático |
| `imagens_site/baby/` | O espaço → Área baby | Foto fixa |
| `imagens_site/adulto/` | O espaço → Espaço gourmet adulto | Slideshow automático |

Para adicionar, trocar ou remover uma foto: coloque o arquivo na pasta e ajuste a lista
correspondente no `src/content/site.ts` (`hero.images` ou `space.areas[].images`), com um
texto alternativo (`alt`) que descreva a foto. Uma foto fica fixa; duas ou mais viram slideshow.
A primeira foto de `hero.images` é a que carrega com prioridade.

## Ainda com placeholder

| Arquivo esperado | Onde aparece | Proporção |
|---|---|---|
| `equipe-renata.jpg`, `equipe-juliana.jpg`, `equipe-camila.jpg`, `equipe-patricia.jpg` | Quem cuida da sua festa | 4:5 |
| `depoimento-jardim-encantado.jpg` | Depoimento em destaque | 4:3 |
| `festa-*.jpg` (7 temas) | Famílias que confiam em nós | 1:1 a 16:10 |

Para ativar: salve com o nome indicado em `src` no `site.ts` e mude `ready: false` para `ready: true`.

## Regras (CLAUDE.md)

- Nada de fotos identificáveis de crianças reais sem autorização por escrito.
- Banco de imagens só com licença livre para uso comercial (Unsplash/Pexels), registrando a origem em `CREDITS.md` na raiz.
- Prefira JPG ou WebP de até ~400 KB; o `next/image` gera os tamanhos menores (AVIF/WebP) automaticamente.
