export const tools = [
  {
    id: "cpf",
    name: "Gerador de CPF",
    description: "Gere CPFs válidos para testes de sistemas.",
    path: "/ferramentas/cpf",
    type: "documentos",
  },
  {
    id: "cnpj",
    name: "Gerador de CNPJ",
    description: "Gere CNPJs válidos para desenvolvimento e testes.",
    path: "/ferramentas/cnpj",
    type: "documentos",
  },
  {
    id: "cep",
    name: "Busca de CEP",
    description: "Encontre informações completas de qualquer CEP.",
    path: "/ferramentas/cep",
    type: "documentos",
  },

  {
    id: "uuid",
    name: "Gerador de UUID",
    description: "Gere UUIDs únicos e válidos.",
    path: "/ferramentas/uuid",
    type: "devtools",
  },
  {
    id: "slug",
    name: "Gerador de Slug",
    description: "Transforme textos em slugs para URLs.",
    path: "/ferramentas/slug",
    type: "texto",
  },

  {
    id: "hash-md5",
    name: "Gerador de Hash MD5",
    description: "Gere hash MD5 de qualquer texto.",
    path: "/ferramentas/hash-md5",
    type: "seguranca",
  },
  {
    id: "hash-sha256",
    name: "Gerador de Hash SHA-256",
    description: "Gere hash SHA-256 de qualquer texto.",
    path: "/ferramentas/hash-sha256",
    type: "seguranca",
  },

  {
    id: "b64-encode",
    name: "Base64 Encode",
    description: "Codifique textos para Base64.",
    path: "/ferramentas/base64-encode",
    type: "conversores",
  },
  {
    id: "b64-decode",
    name: "Base64 Decode",
    description: "Decodifique textos de Base64.",
    path: "/ferramentas/base64-decode",
    type: "conversores",
  },

  {
    id: "lorem",
    name: "Gerador de Lorem Ipsum",
    description: "Gere textos Lorem Ipsum personalizados.",
    path: "/ferramentas/lorem",
    type: "texto",
  },

  {
    id: "qr-code",
    name: "Gerador de QR Code",
    description: "Crie QR Codes personalizados.",
    path: "/ferramentas/qr-code",
    type: "devtools",
  },

  {
    id: "color-picker",
    name: "Color Picker",
    description: "Escolha e copie cores facilmente.",
    path: "/ferramentas/color-picker",
    type: "design",
  },
  {
    id: "gradient",
    name: "Gerador de Gradiente",
    description: "Monte gradientes CSS personalizados.",
    path: "/ferramentas/gradient",
    type: "design",
  },

  {
    id: "json-formatter",
    name: "Formatador de JSON",
    description: "Valide e formate JSON de forma elegante.",
    path: "/ferramentas/json-formatter",
    type: "devtools",
  },
  {
    id: "json-yaml",
    name: "Conversor JSON ↔️ YAML",
    description: "Converta JSON para YAML e vice-versa.",
    path: "/ferramentas/json-yaml",
    type: "conversores",
  },
  {
    id: "csv-json",
    name: "Conversor CSV ↔️ JSON",
    description: "Converta arquivos CSV em JSON e vice-versa.",
    path: "/ferramentas/csv-json",
    type: "conversores",
  },
  {
    id: "xml-json",
    name: "Conversor XML ↔️ JSON",
    description: "Converta XML em JSON e vice-versa.",
    path: "/ferramentas/xml-json",
    type: "conversores",
  },

  {
    id: "url-encode",
    name: "URL Encode/Decode",
    description: "Codifique ou decodifique URLs.",
    path: "/ferramentas/url-encode",
    type: "conversores",
  },
  {
    id: "html-entities",
    name: "HTML Entities Encoder/Decoder",
    description: "Codifique ou decodifique entidades HTML.",
    path: "/ferramentas/html-entities",
    type: "conversores",
  },

  {
    id: "cron",
    name: "Gerador de Cron",
    description: "Monte expressões CRON facilmente.",
    path: "/ferramentas/cron",
    type: "devtools",
  },

  {
    id: "jwt-decode",
    name: "Decoder de JWT",
    description: "Decode e visualize tokens JWT.",
    path: "/ferramentas/jwt-decode",
    type: "seguranca",
  },

  {
    id: "timestamp",
    name: "Conversor de Timestamp",
    description: "Converta timestamps Unix para data e hora.",
    path: "/ferramentas/timestamp",
    type: "conversores",
  },

  {
    id: "regex-tester",
    name: "Regex Tester",
    description: "Teste expressões regulares facilmente.",
    path: "/ferramentas/regex-tester",
    type: "devtools",
  },

  {
    id: "ip-info",
    name: "Localizador de IP",
    description: "Obtenha informações sobre IPs.",
    path: "/ferramentas/ip-info",
    type: "rede",
  },
  {
    id: "mac-generator",
    name: "Gerador de MAC Address",
    description: "Gere endereços MAC válidos.",
    path: "/ferramentas/mac-generator",
    type: "rede",
  },

  {
    id: "password-generator",
    name: "Gerador de Senhas",
    description: "Gere senhas seguras e aleatórias.",
    path: "/ferramentas/password-generator",
    type: "seguranca",
  },

  {
    id: "credit-card",
    name: "Gerador de Cartão de Crédito",
    description: "Gere cartões válidos para testes.",
    path: "/ferramentas/credit-card",
    type: "documentos",
  },

  {
    id: "json-diff",
    name: "Comparador de JSON",
    description: "Compare dois objetos JSON.",
    path: "/ferramentas/json-diff",
    type: "devtools",
  },

  {
    id: "image-compressor",
    name: "Compressor de Imagem",
    description: "Comprimir imagens para web rapidamente.",
    path: "/ferramentas/image-compressor",
    type: "design",
  },

  {
    id: "favicon-generator",
    name: "Gerador de Favicon",
    description: "Crie favicons para seu site.",
    path: "/ferramentas/favicon-generator",
    type: "design",
  },

  {
    id: "css-minifier",
    name: "Minificador de CSS",
    description: "Minifique seu código CSS.",
    path: "/ferramentas/css-minifier",
    type: "devtools",
  },
  {
    id: "js-minifier",
    name: "Minificador de JS",
    description: "Minifique seu código JavaScript.",
    path: "/ferramentas/js-minifier",
    type: "devtools",
  },
  {
    id: "html-minifier",
    name: "Minificador de HTML",
    description: "Otimize e minifique HTML.",
    path: "/ferramentas/html-minifier",
    type: "devtools",
  },

  {
    id: "meta-tag-generator",
    name: "Gerador de Meta Tags",
    description: "Crie meta tags para SEO rapidamente.",
    path: "/ferramentas/meta-tag-generator",
    type: "seo",
  },
  {
    id: "robots-txt",
    name: "Gerador de Robots.txt",
    description: "Gere o arquivo robots.txt para SEO.",
    path: "/ferramentas/robots-txt",
    type: "seo",
  },
  {
    id: "sitemap-generator",
    name: "Gerador de Sitemap",
    description: "Crie sitemaps XML facilmente.",
    path: "/ferramentas/sitemap-generator",
    type: "seo",
  },

  {
    id: "dns-lookup",
    name: "Consulta de DNS",
    description: "Consulte registros DNS de domínios.",
    path: "/ferramentas/dns-lookup",
    type: "rede",
  },

  {
    id: "emoji-finder",
    name: "Buscador de Emoji",
    description: "Encontre e copie emojis rapidamente.",
    path: "/ferramentas/emoji-finder",
    type: "design",
  },

  {
    id: "text-case",
    name: "Conversor de Texto",
    description: "Mude texto para maiúsculo, minúsculo, snake_case, etc.",
    path: "/ferramentas/text-case",
    type: "texto",
  },

  {
    id: "markdown-editor",
    name: "Editor de Markdown",
    description: "Edite e visualize Markdown instantaneamente.",
    path: "/ferramentas/markdown-editor",
    type: "devtools",
  },
  {
    id: "json-viewer",
    name: "Visualizador de JSON",
    description: "Visualize objetos JSON de forma organizada.",
    path: "/ferramentas/json-viewer",
    type: "devtools",
  },
  {
    id: "csv-viewer",
    name: "Visualizador de CSV",
    description: "Veja e edite arquivos CSV online.",
    path: "/ferramentas/csv-viewer",
    type: "devtools",
  },

  {
    id: "hexto-rgb",
    name: "Conversor HEX → RGB",
    description: "Converta códigos de cores HEX para RGB.",
    path: "/ferramentas/hex-to-rgb",
    type: "conversores",
  },
  {
    id: "rgb-to-hex",
    name: "Conversor RGB → HEX",
    description: "Converta RGB para código HEX.",
    path: "/ferramentas/rgb-to-hex",
    type: "conversores",
  },
];
