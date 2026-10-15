/**
 * CONTEÚDO CENTRAL DO SITE
 *
 * Todo texto, número, contato e dado de negócio vive aqui. Para usar este modelo com
 * outro cliente, edite este arquivo e coloque as fotos em /public/images. Os componentes
 * apenas leem estes dados.
 *
 * Marca, pessoas, depoimentos e números são FICTÍCIOS
 * (projeto de portfólio), mas foram escritos para parecer um cliente real.
 *
 * Use *asteriscos* em títulos para destacar um trecho (marca-texto rosa).
 */
import type {
  BrandLogo,
  Cta,
  FamilyParty,
  FaqItem,
  Feature,
  Package,
  PolicySection,
  SiteImage,
  SpaceArea,
  Stat,
  TeamMember,
  Testimonial,
} from "./types";

/* -------------------------------------------------------------------------- */
/* Números do negócio: altere aqui e todos os textos acompanham.               */
/* -------------------------------------------------------------------------- */

export const numbers = {
  foundedYear: 2014,
  years: 12,
  parties: 1800,
  rating: 4.9,
  reviews: 320,
  maxGuests: 150,
  areaM2: 1200,
  childrenPerMonitor: 6,
  childrenPerMonitorBaby: 3,
} as const;

const fmt = (n: number) => n.toLocaleString("pt-BR");
const fmtRating = (n: number) =>
  n.toLocaleString("pt-BR", { minimumFractionDigits: 1, maximumFractionDigits: 1 });

/* -------------------------------------------------------------------------- */
/* Marca e contato                                                             */
/* -------------------------------------------------------------------------- */

export const brand = {
  /** Nome da marca (fictícia), conforme a logo oficial. Também é o texto alternativo da logo. */
  name: "Doce Aventura",
  category: "Buffet infantil",
  tagline: "Buffet infantil de alto padrão",
  description: `Buffet infantil de alto padrão em Americana – SP. Uma festa por vez, desde ${numbers.foundedYear}.`,
  /**
   * Logo oficial (PNG com fundo transparente), usada no header, no rodapé e na imagem de
   * compartilhamento. Para outro cliente: troque o arquivo e atualize width/height e `crop`.
   * O favicon (src/app/icon.png e apple-icon.png) é gerado a partir desta logo.
   */
  logo: {
    src: "/images/logo.png",
    width: 1920,
    height: 1080,
    /**
     * Área útil do desenho dentro do arquivo (o PNG tem margens transparentes).
     * Os componentes exibem só este recorte, sem alterar a imagem.
     */
    crop: { x: 463, y: 294, width: 993, height: 479 },
  } satisfies BrandLogo,
};

export const contact = {
  /** Número no formato internacional, só dígitos (placeholder, DDD 19). */
  whatsapp: "5519999999999",
  phoneDisplay: "(19) 99999-9999",
  phoneInternational: "+55 19 99999-9999",
  instagram: "@{{instagram}}",
  instagramUrl: "https://www.instagram.com/{{instagram}}/",
  address: {
    street: "Rua das Brincadeiras, 250",
    neighborhood: "Jardim Colina",
    city: "Americana",
    state: "SP",
    country: "BR",
    /** Endereço fictício: o mapa fica centralizado na cidade, não em um ponto exato. */
    full: "Rua das Brincadeiras, 250 – Jardim Colina, Americana/SP",
  },
  /** Centro aproximado de Americana/SP (usado nos dados estruturados). */
  geo: { latitude: -22.7374, longitude: -47.3331 },
  visitHours: {
    label: "Terça a sábado, das 10h às 19h",
    days: ["Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    opens: "10:00",
    closes: "19:00",
  },
  mapEmbedUrl: "https://maps.google.com/maps?q=Americana%2C%20SP&z=13&output=embed",
  mapLinkUrl: "https://www.google.com/maps/search/?api=1&query=Americana%2C%20SP",
  areaServed: ["Americana", "Santa Bárbara d'Oeste", "Nova Odessa", "Sumaré", "Limeira", "Campinas"],
};

export const rating = {
  value: numbers.rating,
  display: fmtRating(numbers.rating),
  count: numbers.reviews,
  source: "Google",
  label: `${fmt(numbers.reviews)} avaliações no Google`,
};

/* -------------------------------------------------------------------------- */
/* SEO                                                                         */
/* -------------------------------------------------------------------------- */

export const seo = {
  title: `Buffet Infantil em Americana – SP | ${brand.name}`,
  description: `Buffet infantil de alto padrão em Americana – SP. Uma festa por vez, ${numbers.years} anos de experiência, +${fmt(numbers.parties)} festas e nota ${fmtRating(numbers.rating)} no Google. Agende sua visita.`,
  ogImageAlt: `${brand.name}: buffet infantil de alto padrão em Americana – SP`,
  keywords: [
    "buffet infantil Americana",
    "festa infantil alto padrão",
    "buffet infantil Santa Bárbara d'Oeste",
    "buffet infantil Nova Odessa",
    "festa infantil Americana SP",
  ],
};

/* -------------------------------------------------------------------------- */
/* CTAs (todos levam ao WhatsApp, cada um com sua mensagem e cta_location)     */
/* -------------------------------------------------------------------------- */

export const ctas = {
  header: {
    label: "Agendar visita",
    shortLabel: "Agendar",
    location: "header",
    message: "Olá! Gostaria de agendar uma visita ao buffet.",
  },
  /** Botão flutuante (tablet e desktop). */
  float: {
    label: "Agendar visita",
    location: "flutuante",
    message: "Olá! Estou no site e gostaria de agendar uma visita ao buffet.",
  },
  /** Barra fixa no rodapé da tela (mobile). */
  stickyBar: {
    label: "Agendar minha visita pelo WhatsApp",
    location: "barra_fixa",
    message: "Olá! Estou no site e gostaria de agendar uma visita ao buffet.",
  },
  hero: {
    label: "Agendar minha visita",
    location: "hero",
    message:
      "Olá! Gostaria de agendar uma visita para conhecer o buffet e a estrutura para a festa do meu filho.",
  },
  space: {
    label: "Conhecer o espaço pessoalmente",
    shortLabel: "Conhecer o espaço",
    location: "espaco",
    message: "Olá! Vi as fotos do espaço no site e gostaria de agendar uma visita para conhecer pessoalmente.",
  },
  team: {
    label: "Conhecer a equipe na visita",
    location: "equipe",
    message: "Olá! Gostaria de agendar uma visita para conhecer o espaço e a equipe que cuida das festas.",
  },
  families: {
    label: "Conhecer o espaço",
    location: "familias",
    message: "Olá! Vi as festas de outras famílias no site e gostaria de agendar uma visita para conhecer o espaço.",
  },
  safety: {
    label: "Conhecer a estrutura",
    location: "seguranca",
    message:
      "Olá! Segurança é prioridade para mim. Gostaria de agendar uma visita para conhecer a estrutura e a equipe.",
  },
  schedule: {
    label: "Ver datas disponíveis",
    location: "agenda",
    message: "Olá! Gostaria de consultar as datas disponíveis e agendar uma visita.",
  },
  faq: {
    label: "Tirar dúvidas e agendar visita",
    location: "faq",
    message: "Olá! Li as perguntas frequentes no site e gostaria de tirar algumas dúvidas antes de agendar uma visita.",
  },
  finalCta: {
    label: "Agendar minha visita",
    location: "cta_final",
    message: "Olá! Quero agendar uma visita para conhecer o buffet.",
  },
  location: {
    label: "Agendar visita",
    location: "localizacao",
    message: "Olá! Gostaria de agendar uma visita ao buffet. Quais horários estão disponíveis?",
  },
} satisfies Record<string, Cta>;

const packageCta = (id: string, name: string): Cta => ({
  label: "Agendar visita",
  location: `pacote_${id}`,
  package: name,
  message: `Olá! Tenho interesse no pacote ${name} e gostaria de agendar uma visita.`,
});

/* -------------------------------------------------------------------------- */
/* Header                                                                      */
/* -------------------------------------------------------------------------- */

export const nav = [
  { label: "Espaço", href: "#espaco" },
  { label: "Pacotes", href: "#pacotes" },
  { label: "Depoimentos", href: "#depoimentos" },
  { label: "FAQ", href: "#faq" },
];

/* -------------------------------------------------------------------------- */
/* 1. Hero                                                                     */
/* -------------------------------------------------------------------------- */

export const hero = {
  eyebrow: "Buffet infantil de alto padrão em Americana – SP",
  /*
   * Opções de headline (benefício + localização + autoridade):
   *
   * 1. "Mais de 1.800 festas. Nenhuma preocupação para você."  <- ESCOLHIDA
   *    Une autoridade (número específico) e o benefício que os pais mais buscam
   *    (tranquilidade) em oito palavras. A localização vem no eyebrow, que faz parte
   *    do mesmo <h1> e responde à busca "buffet infantil Americana" do Google Ads.
   *
   * 2. "A festa do seu filho nas mãos de quem já realizou mais de 1.800 em Americana."
   *    Tem tudo, mas fica longa no mobile e o número aparece no fim, onde perde força.
   *
   * 3. "Há 12 anos, o buffet infantil que Americana escolhe para os dias que não se repetem."
   *    Forte em autoridade e emoção, fraca em benefício concreto para os pais.
   */
  title: `Mais de ${fmt(numbers.parties)} festas. *Nenhuma preocupação* para você.`,
  subtitle:
    "Uma festa por vez, com o espaço inteiro só para o seu filho. Cardápio assinado, decoração do nosso ateliê e uma coordenadora cuidando de cada detalhe para você aproveitar o dia ao lado dele.",
  /** Subtítulo do mobile: curto para o CTA e o selo caberem na primeira dobra. */
  subtitleShort: "Uma festa por vez, com o espaço inteiro só para o seu filho e uma equipe cuidando de tudo.",
  ctaNote: "Visitas de terça a sábado, com hora marcada.",
  exclusive: {
    title: "Uma festa por vez",
    text: "O espaço inteiro só para o seu filho",
  },
  /** Fotos do topo (passam sozinhas). A primeira é a que carrega com prioridade. */
  images: [
    {
      src: "/images/imagens_site/uma_por_vez/Festa Baby Shark no fundo do mar.png",
      ready: true,
      alt: "Mesa de festa no tema fundo do mar, com arco de balões azuis, cortina de luzes e personagens do Baby Shark",
      label: "Festa Baby Shark",
      tone: "blue",
    },
    {
      src: "/images/imagens_site/uma_por_vez/Mesa de doces do circo do Eduardo.png",
      ready: true,
      alt: "Mesa principal com tema circo, cortina vermelha, letreiro luminoso com o nome do aniversariante e bolo de três andares",
      label: "Festa O Circo",
      tone: "yellow",
    },
    {
      src: "/images/imagens_site/uma_por_vez/Festa Circense Pastel da Betina.png",
      ready: true,
      alt: "Decoração de circo em tons pastel, com arco de balões, letreiro iluminado com o nome da aniversariante e bolo de 1 ano",
      label: "Festa Circo Pastel",
      tone: "pink",
    },
    {
      src: "/images/imagens_site/uma_por_vez/Festa Masha e o Urso no Jardim.png",
      ready: true,
      alt: "Cenário de jardim com tema Masha e o Urso, painel de folhagens, flores de balão e piquenique",
      label: "Festa Masha e o Urso",
      tone: "mint",
    },
    {
      src: "/images/imagens_site/uma_por_vez/Mesa de Festa Sonic Colorida e Encantadora.png",
      ready: true,
      alt: "Mesa de festa com tema Sonic, arco de balões coloridos e bolo de 7 anos",
      label: "Festa Sonic",
      tone: "blue",
    },
    {
      src: "/images/imagens_site/uma_por_vez/Mesa de Doces Circo Colorido.png",
      ready: true,
      alt: "Mesa de doces com tema de palhaços, cupcakes coloridos personalizados e cata-ventos",
      label: "Festa Palhaços",
      tone: "yellow",
    },
  ] satisfies SiteImage[],
  imagesLabel: "Festas realizadas no buffet",
};

/* -------------------------------------------------------------------------- */
/* 2. Barra de confiança                                                       */
/* -------------------------------------------------------------------------- */

export const trustBar = {
  label: "Nossos números",
  stats: [
    {
      value: numbers.parties,
      prefix: "+",
      label: "festas realizadas",
    },
    {
      value: numbers.rating,
      decimals: 1,
      star: true,
      label: "no Google",
      detail: `(${fmt(numbers.reviews)} avaliações)`,
    },
  ] satisfies Stat[],
};

/* -------------------------------------------------------------------------- */
/* 3. Por que nos escolher                                                     */
/* -------------------------------------------------------------------------- */

export const whyUs = {
  eyebrow: "Por que nos escolher",
  title: "Seis motivos que as famílias citam *quando nos indicam*",
  description:
    "Alto padrão, para nós, é o que você não precisa resolver. Cada item abaixo existe para que você chegue à festa como convidado de honra.",
  items: [
    {
      icon: "sparkles",
      tone: "blue",
      title: "Uma festa por vez",
      text: `No seu horário, os ${fmt(numbers.areaM2)} m² são só da sua família. Sem dividir entrada, salão ou brinquedos com outro aniversário.`,
      short: "O espaço inteiro só para a sua família.",
    },
    {
      icon: "shield",
      tone: "mint",
      title: `Um monitor para cada ${numbers.childrenPerMonitor} crianças`,
      text: "Monitores separados por faixa etária, pulseiras de identificação e saída liberada só com o responsável cadastrado.",
      short: "Pulseira de identificação e saída só com o responsável.",
    },
    {
      icon: "chef",
      tone: "yellow",
      title: "Cozinha própria, cardápio assinado",
      text: "Mais de 30 opções entre infantil e adulto, preparadas na hora pela nossa chef, com nutricionista responsável.",
      short: "Mais de 30 opções, com nutricionista responsável.",
    },
    {
      icon: "palette",
      tone: "pink",
      title: "Decoração do nosso ateliê",
      text: "Cenografia criada para o tema do seu filho, com peças exclusivas e acabamento pensado para as fotos.",
      short: "Cenografia exclusiva para o tema do seu filho.",
    },
    {
      icon: "clipboard",
      tone: "blue",
      title: "Uma coordenadora só para você",
      text: "Do primeiro alinhamento ao último convidado, a mesma pessoa cuida do roteiro, dos horários e dos fornecedores.",
      short: "A mesma pessoa do primeiro contato ao fim da festa.",
    },
    {
      icon: "sofa",
      tone: "mint",
      title: "Os adultos também aproveitam",
      text: "Lounge climatizado com vista para o salão, cardápio adulto de verdade e manobrista na porta.",
      short: "Lounge climatizado, cardápio adulto e manobrista.",
    },
  ] satisfies Feature[],
};

/* -------------------------------------------------------------------------- */
/* 4. O espaço                                                                 */
/* -------------------------------------------------------------------------- */

export const space = {
  eyebrow: "O espaço",
  title: `${fmt(numbers.areaM2)} m² pensados para as crianças *e confortáveis para os adultos*`,
  description:
    "Cada ambiente foi projetado para que as crianças brinquem com liberdade e os pais acompanhem tudo de perto, sem sair do conforto.",
  // Áreas com mais de uma foto viram slideshow automático.
  areas: [
    {
      name: "Brinquedoteca",
      spec: "Tirolesa indoor, cama elástica, piscina de bolinhas e circuito de escalada",
      images: [
        {
          src: "/images/imagens_site/brinquedoteca/Escorregadores Coloridos no Piscina de Bolinhas.png",
          ready: true,
          alt: "Escorregador de quatro pistas coloridas que termina na piscina de bolinhas",
          label: "Escorregadores",
          tone: "mint",
        },
        {
          src: "/images/imagens_site/brinquedoteca/Parque Infantil Colorido e Vibrante.png",
          ready: true,
          alt: "Brinquedoteca com estrutura de escalada, carrossel, gangorras e piso emborrachado colorido",
          label: "Parque infantil",
          tone: "mint",
        },
        {
          src: "/images/imagens_site/brinquedoteca/Playground Infantil Colorido e Vibrante.png",
          ready: true,
          alt: "Área de brinquedos com estrutura suspensa com rede de proteção, roda infantil e mesas para os pais",
          label: "Playground",
          tone: "mint",
        },
      ],
    },
    {
      name: "Área baby",
      spec: "Espaço acolchoado para crianças de 0 a 3 anos, com monitora exclusiva",
      images: [
        {
          src: "/images/imagens_site/baby/Sala Infantil Colorida com Piscina de Bolinhas.png",
          ready: true,
          alt: "Sala baby com piscina de bolinhas, piso e paredes acolchoados coloridos e blocos de espuma",
          label: "Área baby",
          tone: "pink",
        },
      ],
    },
    {
      name: "Espaço gourmet adulto",
      spec: "Lounge climatizado com vista para o salão",
      images: [
        {
          src: "/images/imagens_site/adulto/Recepção Elegante com Balões Azuis e Dourados.png",
          ready: true,
          alt: "Salão de recepção com mesas redondas postas, centros de mesa com balões azuis e dourados e lustres",
          label: "Recepção",
          tone: "yellow",
        },
        {
          src: "/images/imagens_site/adulto/Festa Infantil com Tema Marinho.png",
          ready: true,
          alt: "Salão visto do alto, com mesas para os convidados, mesa decorada no tema marinho e área de brinquedos ao fundo",
          label: "Salão",
          tone: "yellow",
        },
      ],
    },
  ] satisfies SpaceArea[],
};

/* -------------------------------------------------------------------------- */
/* 5. Quem cuida da sua festa (pessoas fictícias)                              */
/* -------------------------------------------------------------------------- */

export const team = {
  eyebrow: "Quem cuida da sua festa",
  title: "Especialistas por trás *de cada detalhe*",
  description:
    "Uma equipe fixa, que trabalha junta há anos. É ela que recebe você na visita e está ao seu lado no dia da festa.",
  quote: {
    text: "Quando a família chega, a festa já está pronta. Nosso trabalho é fazer com que os pais só precisem se preocupar com uma coisa: estar presentes.",
    author: "Renata Albuquerque",
    role: "Fundadora",
  },
  members: [
    {
      name: "Renata Albuquerque",
      role: "Fundadora e diretora",
      credential: `Pedagoga, à frente de mais de ${fmt(numbers.parties)} festas desde ${numbers.foundedYear}`,
      image: {
        src: "/images/equipe-renata.jpg",
        ready: false,
        alt: "Retrato de Renata Albuquerque, fundadora do buffet, sorrindo no salão principal",
        label: "Retrato da fundadora",
        tone: "pink",
        icon: "user",
      },
    },
    {
      name: "Juliana Prado",
      role: "Chef executiva",
      credential: "Chef formada pelo Senac, 15 anos em eventos",
      image: {
        src: "/images/equipe-juliana.jpg",
        ready: false,
        alt: "Retrato da chef Juliana Prado na cozinha do buffet, de dólmã branco",
        label: "Retrato da chef",
        tone: "yellow",
        icon: "user",
      },
    },
    {
      name: "Camila Rocha",
      role: "Diretora de decoração",
      credential: "Arquiteta, assina a cenografia de cada tema no ateliê",
      image: {
        src: "/images/equipe-camila.jpg",
        ready: false,
        alt: "Retrato de Camila Rocha, diretora de decoração, no ateliê de cenografia",
        label: "Retrato da decoradora",
        tone: "blue",
        icon: "user",
      },
    },
    {
      name: "Patrícia Lemos",
      role: "Coordenadora de recreação",
      credential: "Educadora física, instrutora de primeiros socorros pediátricos",
      image: {
        src: "/images/equipe-patricia.jpg",
        ready: false,
        alt: "Retrato de Patrícia Lemos, coordenadora de recreação, na brinquedoteca",
        label: "Retrato da coordenadora",
        tone: "mint",
        icon: "user",
      },
    },
  ] satisfies TeamMember[],
};

/* -------------------------------------------------------------------------- */
/* 6. Pacotes                                                                  */
/* -------------------------------------------------------------------------- */

export const packages = {
  eyebrow: "Pacotes",
  title: "Três formatos, *o mesmo padrão* em todos",
  description:
    "Todos incluem cardápio completo, decoração temática, monitores e cerimonial. O que muda é o tamanho da festa e as experiências extras.",
  priceLabel: "a partir de",
  guestsLabel: (n: number) => `Até ${n} convidados`,
  note: "Valores de referência. O orçamento final é apresentado na visita, de acordo com a data e o número de convidados.",
  items: [
    {
      id: "encanto",
      name: "Encanto",
      tagline: "Festa completa para celebrações mais intimistas.",
      guests: 60,
      duration: "4h de festa",
      priceFrom: 9900,
      includesTitle: "O que está incluso:",
      includes: [
        "Cardápio infantil e adulto com finger foods",
        "Bebidas não alcoólicas à vontade",
        "Bolo e doces finos da nossa confeitaria",
        "Decoração temática",
        "Monitores por faixa etária e recreação",
        "Cama elástica, piscina de bolinhas e área baby",
        "Cerimonial do início ao fim",
        "Convites digitais",
      ],
      cta: packageCta("encanto", "Encanto"),
    },
    {
      id: "fantasia",
      name: "Fantasia",
      tagline: "Inclui decoração temática premium e fotógrafo.",
      guests: 90,
      duration: "4h30 de festa",
      priceFrom: 13900,
      featured: true,
      badge: "Mais escolhido",
      includesTitle: "Tudo do Encanto, mais:",
      includes: [
        "Decoração temática premium do nosso ateliê",
        "Fotógrafo profissional durante toda a festa",
        "Mini-pratos quentes no cardápio adulto",
        "Tirolesa indoor",
        "Lembrancinhas personalizadas",
        "Estacionamento com manobrista",
      ],
      cta: packageCta("fantasia", "Fantasia"),
    },
    {
      id: "grand_celebration",
      name: "Grand Celebration",
      tagline: "Experiência completa com atrações exclusivas e open bar adulto.",
      guests: 150,
      duration: "5h de festa",
      priceFrom: 19900,
      includesTitle: "Tudo do Fantasia, mais:",
      includes: [
        "Ilha gastronômica para os adultos",
        "Open bar de chope e drinks",
        "Atração exclusiva: mágico, teatro de bonecos ou oficina",
        "Mesa de doces finos ampliada",
        "Espaço inteiro para até 150 convidados",
      ],
      cta: packageCta("grand_celebration", "Grand Celebration"),
    },
  ] satisfies Package[],
};

/* -------------------------------------------------------------------------- */
/* 7. Compromissos (redução de risco)                                          */
/* -------------------------------------------------------------------------- */

export const commitments = {
  eyebrow: "Nossos compromissos",
  title: "O que garantimos, *por escrito*, em todos os pacotes",
  description: "Cada item abaixo está no contrato. É assim que trabalhamos há 12 anos.",
  items: [
    {
      icon: "handshake",
      tone: "blue",
      title: "Reunião de alinhamento",
      text: "Com a coordenadora da sua festa, para definir roteiro, horários e as preferências da família.",
      short: "Roteiro e horários definidos com a coordenadora.",
    },
    {
      icon: "utensils",
      tone: "pink",
      title: "Degustação antes da festa",
      text: "Você prova o cardápio com antecedência e ajusta o que quiser.",
      short: "Você prova e ajusta o cardápio.",
    },
    {
      icon: "file-text",
      tone: "mint",
      title: "Contrato transparente",
      text: "Tudo o que está incluso, descrito item a item. Sem taxas escondidas nem cobranças no dia.",
      short: "Item a item, sem taxas escondidas.",
    },
    {
      icon: "zap",
      tone: "yellow",
      title: "Gerador próprio",
      text: "Se faltar energia na rua, a festa continua: luz, som, climatização e cozinha seguem funcionando.",
      short: "Se faltar energia, a festa continua.",
    },
  ] satisfies Feature[],
};

/* -------------------------------------------------------------------------- */
/* 8. Depoimentos (fictícios)                                                  */
/* -------------------------------------------------------------------------- */

export const testimonials = {
  eyebrow: "Depoimentos",
  title: "O que as famílias contam *depois da festa*",
  carouselLabel: "Mais depoimentos de famílias",
  previousLabel: "Depoimento anterior",
  nextLabel: "Próximo depoimento",
  featured: {
    name: "Mariana C.",
    relation: "mãe da Helena, 5 anos",
    theme: "Jardim Encantado",
    city: "Americana",
    rating: 5,
    quote:
      "Eu tinha medo de passar a festa resolvendo problemas. Não resolvi nenhum. A coordenadora sabia o nome de cada convidado, a decoração ficou mais bonita do que as referências que levei e eu consegui cantar parabéns abraçada na Helena, sem pensar em mais nada.",
    image: {
      src: "/images/depoimento-jardim-encantado.jpg",
      ready: false,
      alt: "Mesa principal da festa com tema Jardim Encantado, com flores, borboletas de papel e bolo de três andares",
      label: "Festa Jardim Encantado",
      tone: "pink",
      icon: "cake",
    } satisfies SiteImage,
  } satisfies Testimonial & { image: SiteImage },
  items: [
    {
      name: "Rodrigo e Ana P.",
      relation: "pais do Theo, 4 anos",
      theme: "Safari",
      city: "Santa Bárbara d'Oeste",
      rating: 5,
      quote:
        "Visitamos quatro buffets antes de fechar. A diferença apareceu na visita: explicaram como funciona a saída das crianças, mostraram a cozinha e o gerador. Fechamos no mesmo dia.",
    },
    {
      name: "Fernanda L.",
      relation: "mãe da Alice, 1 ano",
      theme: "Ursinhos",
      city: "Nova Odessa",
      rating: 5,
      quote:
        "Festa de 1 ano tem muito bebê e muitos avós. A área baby tinha monitora só para os pequenos e os adultos ficaram à vontade no lounge. Minha mãe elogiou até o café.",
    },
    {
      name: "Carla M.",
      relation: "mãe do Miguel, 8 anos",
      theme: "Fórmula 1",
      city: "Campinas",
      rating: 5,
      quote:
        "O Miguel queria tirolesa, os amigos queriam cama elástica e eu queria comida boa para os adultos. Todo mundo saiu feliz. Já reservamos o aniversário da irmã dele.",
    },
    {
      name: "Juliana e Rafael S.",
      relation: "pais da Laura, 6 anos",
      theme: "Fundo do Mar",
      city: "Limeira",
      rating: 5,
      quote:
        "Contrato claro, nenhuma surpresa no dia. A degustação fez diferença: trocamos dois itens do cardápio e ficou do jeito que imaginamos.",
    },
    {
      name: "Beatriz R.",
      relation: "mãe do Davi, 3 anos",
      theme: "Fazendinha",
      city: "Sumaré",
      rating: 5,
      quote:
        "O Davi tem alergia a leite. A nutricionista montou opções separadas, identificadas na mesa, e os monitores sabiam. Foi a primeira festa em que relaxei de verdade.",
    },
  ] satisfies Testimonial[],
};

/* -------------------------------------------------------------------------- */
/* 9. Famílias que confiam em nós (mosaico)                                    */
/* -------------------------------------------------------------------------- */

// Fotos de decoração e ambientes, sem crianças identificáveis.
export const families = {
  eyebrow: "Famílias que confiam em nós",
  title: `Mais de ${fmt(numbers.parties)} festas, *cada uma com a cara* de quem comemora`,
  description: "Alguns dos temas que criamos no nosso ateliê nos últimos meses.",
  parties: [
    {
      theme: "Jardim Encantado",
      child: "Helena, 5 anos",
      image: {
        src: "/images/imagens_site/imagens_fml_confiam/helena_jardim.png",
        ready: true,
        alt: "Decoração tema Jardim Encantado com balões em tons pastel, borboletas, flores e bolo de andares na mesa com o nome Helena",
        label: "Jardim Encantado",
        tone: "pink",
        icon: "trees",
      },
    },
    {
      theme: "Safari",
      child: "Theo, 4 anos",
      image: {
        src: "/images/imagens_site/imagens_fml_confiam/safari_theo.png",
        ready: true,
        alt: "Decoração tema Safari com painel de girafas, leão e zebra de pelúcia, balões em verde e rosa e o nome Theo",
        label: "Safari",
        tone: "mint",
        icon: "trees",
      },
    },
    {
      theme: "Fundo do Mar",
      child: "Laura, 6 anos",
      image: {
        src: "/images/imagens_site/imagens_fml_confiam/fundo_mar_laura.png",
        ready: true,
        alt: "Decoração tema Fundo do Mar com polvo de balões azuis, baleia, corais e o número 6 em neon",
        label: "Fundo do Mar",
        tone: "blue",
        icon: "sparkles",
      },
    },
    {
      theme: "Circo Vintage",
      child: "Lucas, 2 anos",
      image: {
        src: "/images/imagens_site/imagens_fml_confiam/circo_lucas.png",
        ready: true,
        alt: "Decoração tema Circo com tenda listrada, leão e tigre de pelúcia, balões coloridos e o nome Lucas no letreiro",
        label: "Circo Vintage",
        tone: "yellow",
        icon: "crown",
      },
    },
    {
      theme: "Fórmula 1",
      child: "Miguel, 8 anos",
      image: {
        src: "/images/imagens_site/imagens_fml_confiam/f1_miguel.png",
        ready: true,
        alt: "Decoração tema Fórmula 1 com carrinhos de corrida, piso quadriculado, balões vermelhos, pretos e brancos e o nome Miguel",
        label: "Fórmula 1",
        tone: "blue",
        icon: "award",
      },
    },
    {
      theme: "Ursinhos",
      child: "Alice, 1 ano",
      image: {
        src: "/images/imagens_site/imagens_fml_confiam/ursinho_alice.png",
        ready: true,
        alt: "Decoração tema Ursinhos em rosa e dourado, com ursinha de coroa, arco de balões e painel com o nome Alice",
        label: "Ursinhos",
        tone: "pink",
        icon: "heart",
      },
    },
    {
      theme: "Astronauta",
      child: "Gabriel, 7 anos",
      image: {
        src: "/images/imagens_site/imagens_fml_confiam/astronauta_gabriel.png",
        ready: true,
        alt: "Decoração tema Astronauta com foguete, astronauta, planetas, balões azuis e dourados e o número 7 em neon",
        label: "Astronauta",
        tone: "mint",
        icon: "sparkles",
      },
    },
  ] satisfies FamilyParty[],
};

/* -------------------------------------------------------------------------- */
/* 10. Segurança e credenciais                                                 */
/* -------------------------------------------------------------------------- */

export const safety = {
  eyebrow: "Segurança e credenciais",
  title: "Segurança não é promessa. *É o que comprovamos.*",
  description:
    "Para os pais, tranquilidade vem de fatos. Estes são os nossos, e todos podem ser conferidos na visita.",
  seals: [
    {
      icon: "heart-pulse",
      tone: "pink",
      title: "Primeiros socorros pediátricos",
      text: "100% da equipe certificada, com reciclagem anual.",
      short: "Toda a equipe certificada.",
    },
    {
      icon: "badge-check",
      tone: "mint",
      title: "Brinquedos certificados pelo INMETRO",
      text: "Inspeção técnica mensal, registrada em laudo.",
      short: "Laudo de inspeção mensal.",
    },
    {
      icon: "fire-extinguisher",
      tone: "yellow",
      title: "Alvará e AVCB em dia",
      text: "Vistoria do Corpo de Bombeiros vigente e brigada de incêndio treinada.",
      short: "Vistoria dos Bombeiros vigente.",
    },
    {
      icon: "salad",
      tone: "mint",
      title: "Nutricionista responsável",
      text: "Fichas técnicas e controle de alergênicos em todo o cardápio.",
      short: "Controle de alergênicos.",
    },
    {
      icon: "users",
      tone: "blue",
      title: `1 monitor para cada ${numbers.childrenPerMonitor} crianças`,
      text: `Na área baby, 1 para cada ${numbers.childrenPerMonitorBaby}, com monitoras exclusivas.`,
      short: `Na área baby, 1 para cada ${numbers.childrenPerMonitorBaby}.`,
    },
    {
      icon: "id-card",
      tone: "pink",
      title: "Pulseiras e acesso controlado",
      text: "Cada criança sai somente com o adulto cadastrado na entrada.",
      short: "Saída só com o adulto cadastrado.",
    },
  ] satisfies Feature[],
  documentsNote:
    "Alvará, AVCB, laudos dos brinquedos e certificados da equipe ficam disponíveis para consulta durante a visita.",
};

/* -------------------------------------------------------------------------- */
/* 11. Agenda (escassez honesta)                                               */
/* -------------------------------------------------------------------------- */

export const schedule = {
  eyebrow: "Agenda",
  title: "As datas de fim de semana para os próximos meses *estão sendo reservadas*",
  description:
    "Como fazemos uma festa por vez, cada sábado e domingo tem apenas dois horários. A maioria das famílias reserva com 4 a 6 meses de antecedência.",
  slots: [
    { day: "Sábados", detail: "Almoço e noite" },
    { day: "Domingos", detail: "Almoço e fim de tarde" },
    { day: "Sextas e feriados", detail: "Consulte condições especiais" },
  ],
};

/* -------------------------------------------------------------------------- */
/* 12. FAQ                                                                     */
/* -------------------------------------------------------------------------- */

export const faq = {
  eyebrow: "Perguntas frequentes",
  title: "Tudo o que os pais *costumam perguntar*",
  description: "Não encontrou sua dúvida? A coordenadora responde pelo WhatsApp, no horário de atendimento.",
  items: [
    {
      question: "Com quanto tempo de antecedência devo reservar?",
      answer:
        "Para sábados e domingos, recomendamos de 4 a 6 meses. Dias de semana costumam ter mais disponibilidade. A data fica garantida com a assinatura do contrato e o pagamento do sinal.",
    },
    {
      question: "Posso levar bolo ou doces de fora?",
      answer:
        "Bolo e doces finos já estão inclusos e são produzidos pela nossa confeitaria. Se a família quiser trazer algo especial, como o bolo de uma confeiteira de confiança, combinamos na reunião de alinhamento, com as condições descritas no contrato.",
    },
    {
      question: "Quantos monitores ficam com as crianças?",
      answer: `Um monitor para cada ${numbers.childrenPerMonitor} crianças, divididos por faixa etária. Na área baby, a proporção é de um para cada ${numbers.childrenPerMonitorBaby}. Toda a equipe é certificada em primeiros socorros pediátricos.`,
    },
    {
      question: "Como funciona o pagamento?",
      answer:
        "Sinal de 30% na assinatura do contrato e o restante parcelado em até 10 vezes sem juros, com quitação até 15 dias antes da festa. Aceitamos Pix, transferência e cartão de crédito.",
    },
    {
      question: "Posso visitar o espaço antes de fechar?",
      answer: `Deve. As visitas acontecem de ${contact.visitHours.label.toLowerCase()}, com hora marcada e acompanhadas pela coordenadora. É só agendar pelo WhatsApp.`,
    },
    {
      question: "Tem estacionamento?",
      answer:
        "Sim. Estacionamento próprio para 60 carros, com manobrista nos pacotes Fantasia e Grand Celebration.",
    },
    {
      question: "Vocês atendem restrições alimentares?",
      answer:
        "Sim. Nossa nutricionista prepara opções sem glúten, sem lactose, veganas e para alergias específicas. Tudo é identificado na mesa e informado à equipe antes da festa.",
    },
    {
      question: "E se faltar energia durante a festa?",
      answer:
        "Temos gerador próprio, que assume luz, som, climatização e cozinha automaticamente. A festa continua normalmente.",
    },
  ] satisfies FaqItem[],
};

/* -------------------------------------------------------------------------- */
/* 13. CTA final                                                               */
/* -------------------------------------------------------------------------- */

export const finalCta = {
  title: "Cada aniversário acontece uma vez só. *Esteja nele por inteiro.*",
  description:
    "Agende sua visita, conheça o espaço e veja de perto como cuidamos de cada detalhe para que você só precise aproveitar.",
  note: "Atendimento pelo WhatsApp · Visitas de terça a sábado",
};

/* -------------------------------------------------------------------------- */
/* 14. Localização                                                             */
/* -------------------------------------------------------------------------- */

export const location = {
  eyebrow: "Localização",
  title: "Venha nos visitar *em Americana*",
  description: "Fácil acesso pela Rodovia Anhanguera, a cerca de 35 minutos de Campinas.",
  addressLabel: "Endereço",
  hoursLabel: "Horário de visitas",
  whatsappLabel: "WhatsApp",
  instagramLabel: "Instagram",
  mapTitle: "Mapa de Americana – SP",
  mapLinkLabel: "Abrir no Google Maps",
};

/* -------------------------------------------------------------------------- */
/* Rodapé, cookies e privacidade                                               */
/* -------------------------------------------------------------------------- */

export const footer = {
  since: `Desde ${numbers.foundedYear}`,
  contactTitle: "Contato",
  linksTitle: "Links",
  privacyLabel: "Política de Privacidade",
  cookiesLabel: "Preferências de cookies",
  disclaimer: "Projeto de portfólio — marca e dados fictícios.",
};

export const cookieBanner = {
  title: "Sua privacidade",
  text: "Usamos cookies para medir os anúncios e melhorar sua experiência. Saiba mais na",
  policyLabel: "Política de Privacidade",
  acceptLabel: "Aceitar",
  rejectLabel: "Recusar",
};

export const privacyPolicy = {
  title: "Política de Privacidade",
  description: `Como o ${brand.name} trata os dados pessoais de quem visita este site.`,
  updatedAt: "Última atualização: {{DATA_DE_ATUALIZACAO}}",
  backLabel: "Voltar para a página inicial",
  sections: [
    {
      heading: "1. Quem é o controlador dos dados",
      paragraphs: [
        "{{RAZAO_SOCIAL}}, inscrita no CNPJ sob o nº {{CNPJ}}, com sede na {{ENDERECO_DO_CONTROLADOR}}, é a controladora dos dados pessoais tratados neste site, nos termos da Lei nº 13.709/2018 (Lei Geral de Proteção de Dados, LGPD).",
      ],
    },
    {
      heading: "2. Quais dados coletamos",
      paragraphs: [
        "Este site não possui formulários. O contato acontece pelo WhatsApp, e as informações que você enviar por lá são tratadas apenas para responder ao seu pedido e organizar sua visita ou festa.",
        "Durante a navegação, podemos coletar dados de forma automática:",
      ],
      list: [
        "parâmetros de campanha da URL (como utm_source e gclid), para saber de qual anúncio ou rede você veio;",
        "dados de navegação e dispositivo coletados por cookies de medição, somente se você aceitar.",
      ],
    },
    {
      heading: "3. Para que usamos os dados",
      paragraphs: [
        "Usamos esses dados para responder ao seu contato, entender quais canais trazem visitas ao buffet e melhorar nossos anúncios e o próprio site.",
      ],
    },
    {
      heading: "4. Cookies e consentimento",
      paragraphs: [
        "Ao entrar no site, você escolhe se aceita ou recusa os cookies de medição e publicidade. Se recusar, as ferramentas do Google funcionam em modo restrito (Consent Mode), sem gravar cookies de anúncios ou de análise no seu navegador.",
        "Você pode mudar sua escolha a qualquer momento pelo link “Preferências de cookies”, no rodapé.",
      ],
    },
    {
      heading: "5. Compartilhamento",
      paragraphs: [
        "Não vendemos dados pessoais. Utilizamos fornecedores que nos ajudam a operar o site e a medir resultados, como Google (Tag Manager, Analytics e Ads), Meta (WhatsApp) e o provedor de hospedagem, sempre de acordo com a LGPD.",
      ],
    },
    {
      heading: "6. Seus direitos",
      paragraphs: [
        "Você pode, a qualquer momento, solicitar confirmação de tratamento, acesso, correção, anonimização, portabilidade ou exclusão dos seus dados, além de revogar consentimentos, conforme o art. 18 da LGPD.",
      ],
    },
    {
      heading: "7. Contato do encarregado",
      paragraphs: [
        "Para exercer seus direitos ou tirar dúvidas sobre esta política, escreva para {{EMAIL_DO_ENCARREGADO}}.",
      ],
    },
    {
      heading: "8. Atualizações desta política",
      paragraphs: [
        "Esta política pode ser atualizada para refletir mudanças no site ou na legislação. A data da última atualização fica no topo da página.",
      ],
    },
  ] satisfies PolicySection[],
};
