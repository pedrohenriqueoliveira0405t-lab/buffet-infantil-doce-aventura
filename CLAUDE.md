# CLAUDE.md — Landing Page de Buffet Infantil (modelo de portfólio)

## 1. Visão geral

Este projeto é uma **landing page de alta conversão para buffet infantil de alto padrão**, criada como **modelo reutilizável de portfólio**.

- A marca é **fictícia**. O nome final ainda não foi definido: use o placeholder `{{NOME_DO_BUFFET}}` (ou o valor em `content/site.ts`) e **nunca escreva o nome direto nos componentes**.
- Todo o conteúdo (pacotes, depoimentos, números, endereço) é **fictício**, mas deve parecer **verossímil e profissional**, como se fosse um cliente real.
- Como é um modelo, **todo texto, cor, contato e dado de negócio deve viver em arquivos de configuração**, para que trocar de cliente seja editar dados, não componentes.

## 2. Objetivo de conversão

**Conversão principal:** o visitante clicar para **conversar no WhatsApp e agendar uma visita** ao buffet.

- Não há formulário de orçamento nesta versão. O WhatsApp é o único canal de lead.
- Todo CTA leva ao WhatsApp com **mensagem pré-preenchida diferente por contexto** (ex.: hero, pacote escolhido, FAQ), para o atendente saber de onde o lead veio.
- Texto dos CTAs gira em torno de **"Agendar minha visita"** / **"Conhecer o espaço"**, não "Comprar" ou "Orçamento".
- Botão flutuante de WhatsApp visível em todas as seções (canto inferior direito, sem cobrir conteúdo no mobile).
- Deve haver um CTA visível **na primeira dobra** e um CTA ao final de cada seção-chave.

### Origem do tráfego

1. **Google Ads** (pesquisa): visitante com intenção alta, buscando "buffet infantil Americana", "festa infantil alto padrão" etc. A headline precisa responder a essa busca imediatamente (o que é + onde fica + diferencial).
2. **Instagram orgânico** (link na bio): visitante que já conhece um pouco a marca; valoriza fotos, vídeos e prova social.

Capture os parâmetros UTM e `gclid` da URL e inclua a origem (de forma discreta) na mensagem do WhatsApp ou em um evento de analytics.

## 3. Público-alvo

- Pais e mães de **classe A/B**, 28–45 anos, de **Americana e região** (Santa Bárbara d'Oeste, Nova Odessa, Sumaré, Limeira, Campinas).
- Filhos de 1 a 10 anos.
- Valorizam: **segurança, exclusividade, gastronomia de qualidade, decoração impecável e não precisar se preocupar com nada**.
- Objeções típicas a responder na página:
  - "Será que vale o preço?" → mostrar tudo que está incluso e o padrão de acabamento.
  - "Meu filho vai estar seguro?" → monitores, controle de acesso, pulseiras de identificação, equipe treinada.
  - "E os adultos?" → cardápio adulto de verdade, área de estar confortável.
  - "Tem data disponível?" → escassez honesta (agenda concorrida, festas exclusivas).
  - "Dá trabalho organizar?" → assessoria/cerimonial incluso.

## 4. Dados fictícios do negócio

| Campo | Valor |
|---|---|
| Nome | `{{NOME_DO_BUFFET}}` (definir depois) |
| Cidade | Americana – SP |
| Endereço | Rua das Brincadeiras, 250 – Jardim Colina, Americana/SP (fictício) |
| WhatsApp | `5519999999999` (placeholder, DDD 19) |
| Instagram | `@{{instagram}}` (placeholder) |
| Horário de visitas | Terça a sábado, 10h às 19h |
| Tempo de mercado | 12 anos |
| Festas realizadas | +1.800 |
| Avaliação Google | 4,9 ★ (320 avaliações) |
| Capacidade | até 150 convidados |
| Diferencial-chave | **Uma festa por vez** — espaço exclusivo para cada aniversariante |

Para o mapa, use um embed do Google Maps centralizado em **Americana/SP** (não em um endereço específico, já que o endereço é fictício).

## 5. Pacotes (fictícios)

Faixas coerentes com buffets infantis de alto padrão no interior de SP. Mostrar "a partir de" para qualificar o lead, sem ficar com cara de tabela de preço.

| Pacote | Convidados | Duração | A partir de | Destaque |
|---|---|---|---|---|
| **Encanto** | até 60 | 4h | R$ 9.900 | Festa completa para celebrações mais intimistas |
| **Fantasia** ⭐ Mais escolhido | até 90 | 4h30 | R$ 13.900 | Inclui decoração temática premium e fotógrafo |
| **Grand Celebration** | até 150 | 5h | R$ 19.900 | Experiência completa com atrações exclusivas e open bar adulto |

Itens que podem aparecer distribuídos entre os pacotes: cardápio infantil e adulto (finger foods, mini-pratos, ilha gastronômica), bebidas não alcoólicas, bolo e doces finos, decoração temática, monitores por faixa etária, recreação, brinquedos (cama elástica, piscina de bolinhas, tirolesa indoor, área baby), cerimonial, fotógrafo, convites digitais, lembrancinhas, estacionamento com manobrista, open bar de chope/drinks (somente Grand Celebration).

O card **Fantasia** fica visualmente destacado (efeito de ancoragem). Cada card tem seu próprio CTA com mensagem do tipo: _"Olá! Tenho interesse no pacote Fantasia e gostaria de agendar uma visita."_

## 6. Estrutura da página (ordem das seções)

1. **Header** fixo e enxuto: logo, 3–4 âncoras (Espaço, Pacotes, Depoimentos, FAQ) e botão "Agendar visita". No mobile, apenas logo + botão.
2. **Hero**: headline com benefício + localização (ex.: "A festa dos sonhos do seu filho, sem nenhuma preocupação para você — em Americana"), subtítulo com o diferencial "uma festa por vez", CTA principal, selo de avaliação 4,9 ★ e foto/vídeo do espaço decorado.
3. **Barra de confiança**: 12 anos · +1.800 festas · 4,9 no Google · Equipe certificada em primeiros socorros.
4. **Por que nos escolher**: 4–6 benefícios com ícones (exclusividade, segurança, gastronomia, decoração, cerimonial, conforto para adultos).
5. **O espaço / atrações**: galeria (grid ou carrossel) com as áreas — salão principal, brinquedoteca, área baby, espaço gourmet adulto.
6. **Como funciona**: 3–4 passos (Agende sua visita → Escolha o pacote e o tema → Nós cuidamos de tudo → Aproveite a festa). CTA.
7. **Pacotes**: os 3 cards da seção 5.
8. **Depoimentos**: 4–6 depoimentos fictícios (nome, idade do filho, tema da festa, nota), preferencialmente em carrossel, com selo do Google.
9. **Segurança**: seção dedicada para tranquilizar os pais (monitores, pulseiras de identificação, acesso controlado, brinquedos certificados).
10. **Agenda / escassez**: "As datas de fim de semana para os próximos meses estão sendo reservadas" + CTA. Escassez sem números falsos agressivos.
11. **FAQ**: 6–8 perguntas (antecedência para reservar, posso levar bolo/doces de fora, quantos monitores, como funciona o pagamento, posso visitar antes, tem estacionamento, atende restrições alimentares, tem gerador).
12. **CTA final**: bloco grande com fundo colorido, frase emocional e botão de WhatsApp.
13. **Localização**: endereço, horário de visitas, mapa embed.
14. **Footer**: logo, contato, Instagram, link para Política de Privacidade, aviso "Projeto de portfólio — marca e dados fictícios" (discreto).

## 7. Identidade visual

### Paleta (definir como tokens/variáveis CSS, nunca hex solto nos componentes)

| Token | HEX | Uso |
|---|---|---|
| `baby-blue` | `#A9D9F5` | Fundos de seções especiais, cards de atrações, elementos gráficos |
| `pastel-pink` | `#F7B4C9` | Detalhes decorativos, títulos destacados, cards temáticos |
| `soft-yellow` | `#FFE29A` | Selos, avaliações, ofertas e destaques |
| `mint` | `#BCE7CE` | Benefícios, ícones, checklists, decorações |
| `warm-white` | `#FFFDF8` | Fundo principal da página |
| `deep-blue` | `#235E83` | Botões principais, links e títulos |
| `graphite` | `#343746` | Parágrafos, descrições e informações |

### Regras de uso

- **Contraste (WCAG AA):** textos sobre os pastéis sempre em `graphite` ou `deep-blue`. **Nunca texto branco sobre azul bebê, rosa, amarelo ou menta.** Botões `deep-blue` com texto branco.
- **Alto padrão ≠ infantilizado demais.** Pastel com bastante respiro (espaço em branco), poucos elementos decorativos por seção, fotos grandes e bem cuidadas. Evitar visual "festa de criança genérica" (excesso de balões, fontes cartunescas, cores saturadas).
- Formas orgânicas suaves (blobs, ondas entre seções, bordas arredondadas de 16–24px) para trazer leveza.
- Sombras suaves e discretas.

### Tipografia (sugestão, via `next/font`)

- **Títulos:** uma fonte arredondada e elegante, como *Fredoka* (pesos 500–600) ou *Quicksand*.
- **Texto:** *Nunito* ou *DM Sans* (400–700).
- Máximo de 2 famílias.

### Imagens

- Usar placeholders com proporção correta e texto alternativo descritivo; marcar no código onde entram as fotos reais (`/public/images/...`).
- Se usar banco de imagens, somente com licença livre para uso comercial (Unsplash/Pexels) e registrar a origem em `CREDITS.md`.
- Nenhuma foto identificável de crianças reais sem licença.

## 8. Tom de voz e copy

- Português do Brasil, acolhedor, seguro e sofisticado. Fala com os pais, não com a criança.
- Foco em **tranquilidade e memória afetiva** ("você aproveita a festa junto com seu filho").
- Frases curtas, escaneáveis, verbos de ação nos CTAs.
- Evitar clichês exagerados, excesso de pontos de exclamação e emojis.
- Não copiar textos dos sites de referência; usar apenas como inspiração de estrutura.

## 9. Stack técnica

- **Next.js** (App Router) + **TypeScript**.
- **Tailwind CSS** com a paleta configurada como tema (cores, fontes, raios).
- Componentes por seção em `src/components/sections/` (ex.: `Hero.tsx`, `Packages.tsx`).
- **Conteúdo centralizado** em `src/content/site.ts` (marca, contato, pacotes, depoimentos, FAQ, textos). Componentes só leem dados daqui.
- Utilitário `src/lib/whatsapp.ts` que monta o link `https://wa.me/{numero}?text={mensagem}` com `encodeURIComponent`.
- Animações leves (Framer Motion ou CSS) respeitando `prefers-reduced-motion`.
- Página estática (SSG); deploy previsto na **Vercel**.
- Sem dependências desnecessárias.

### Estrutura sugerida

```
src/
  app/
    layout.tsx
    page.tsx
    politica-de-privacidade/page.tsx
  components/
    sections/      # uma seção por arquivo
    ui/            # Button, Card, Badge, WhatsAppFloat, CookieBanner
  content/
    site.ts        # TODOS os dados do cliente
  lib/
    whatsapp.ts
    analytics.ts
public/
  images/
```

## 10. Rastreamento e conversão

- **Google Tag Manager** (ID em variável de ambiente `NEXT_PUBLIC_GTM_ID`).
- Disparar evento `whatsapp_click` em todo clique de CTA, com parâmetros `cta_location` (hero, pacote_fantasia, faq, flutuante...) e `package` quando houver.
- Esse evento será usado como **conversão no Google Ads**.
- Preservar UTMs/`gclid` em `sessionStorage` para enviar junto com o evento.
- Opcional: GA4 via GTM.

## 11. LGPD e privacidade

- Banner de cookies com opções **Aceitar** / **Recusar**, integrado ao **Google Consent Mode v2** (tags só disparam totalmente após consentimento).
- Página de **Política de Privacidade** simples, com placeholder para dados do controlador.

## 12. SEO local

- `metadata` do Next com title/description focados em "Buffet infantil em Americana – SP".
- Open Graph e imagem de compartilhamento.
- Dados estruturados JSON-LD (`LocalBusiness` / `EventVenue`) com endereço, horário, avaliação e telefone vindos de `site.ts`.
- Um único `h1` (no hero), hierarquia de headings correta.
- `sitemap.ts` e `robots.ts`.

## 13. Performance e acessibilidade

- **Mobile-first** (a maior parte do tráfego de Google Ads e Instagram é mobile).
- Metas: Lighthouse ≥ 90 em todas as categorias; LCP < 2,5s; CLS < 0,1.
- `next/image` com tamanhos corretos, `priority` só na imagem do hero; lazy-load no resto.
- Navegação por teclado, foco visível, `alt` em todas as imagens, `aria-label` nos botões só com ícone.
- Alvos de toque de no mínimo 44px.

## 14. Referências (inspiração de estrutura, não copiar)

- La Boom Kids — https://www.laboomkids.com.br/
- Floresta Mágica — https://florestamaaaagica.com/

## 15. Regras para o Claude ao trabalhar neste projeto

- Antes de criar ou alterar uma seção, confira se ela segue a ordem e o objetivo descritos aqui.
- Nunca escrever dados do negócio direto nos componentes: sempre em `src/content/site.ts`.
- Nunca usar cores fora da paleta sem perguntar.
- Todo novo CTA precisa: levar ao WhatsApp, ter mensagem pré-preenchida própria e disparar `whatsapp_click`.
- Manter o texto em português do Brasil.
- Ao terminar uma tarefa, rodar `npm run lint` e `npm run build` e corrigir erros.

## 16. Pendências

- [ ] Definir nome fictício da marca e logo
- [ ] Definir handle do Instagram fictício
- [ ] Escolher fotos (ou gerar placeholders definitivos)
- [ ] Criar o ID do GTM e a conversão no Google Ads (quando for usar com cliente real)
