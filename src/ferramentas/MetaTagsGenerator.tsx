import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

export function MetaTagsGenerator() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [url, setUrl] = useState("");
  const [image, setImage] = useState("");
  const [author, setAuthor] = useState("");
  const [keywords, setKeywords] = useState("");
  const [generated, setGenerated] = useState("");
  const [copied, setCopied] = useState(false);

  const gerar = () => {
    const meta = `
<!-- SEO -->
<title>${title}</title>
<meta name="description" content="${description}">
<meta name="keywords" content="${keywords}">
<meta name="author" content="${author}">
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<!-- Open Graph / Facebook -->
<meta property="og:type" content="website">
<meta property="og:url" content="${url}">
<meta property="og:title" content="${title}">
<meta property="og:description" content="${description}">
<meta property="og:image" content="${image}">

<!-- Twitter -->
<meta property="twitter:card" content="summary_large_image">
<meta property="twitter:url" content="${url}">
<meta property="twitter:title" content="${title}">
<meta property="twitter:description" content="${description}">
<meta property="twitter:image" content="${image}">
    `.trim();

    setGenerated(meta);
  };

  const copiar = () => {
    navigator.clipboard.writeText(generated);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const limpar = () => {
    setTitle("");
    setDescription("");
    setUrl("");
    setImage("");
    setAuthor("");
    setKeywords("");
    setGenerated("");
    setCopied(false);
  };

  return (
    <main className="mx-auto max-w-5xl px-4">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-24 space-y-10 text-center"
      >
        <h1 className="text-4xl font-extrabold text-neutral-50 md:text-6xl">
          Gerador de <span className="text-blue-400">Meta Tags</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Crie meta tags SEO, Open Graph e Twitter Cards para melhorar a
          visibilidade do seu site.
        </p>

        {/* Inputs */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Título da Página"
            className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Descrição da Página"
            className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="URL do Site"
            className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={image}
            onChange={(e) => setImage(e.target.value)}
            placeholder="URL da Imagem (Preview)"
            className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={author}
            onChange={(e) => setAuthor(e.target.value)}
            placeholder="Autor"
            className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <input
            type="text"
            value={keywords}
            onChange={(e) => setKeywords(e.target.value)}
            placeholder="Palavras-chave (separadas por vírgula)"
            className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Resultado */}
        <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-8 py-6 text-left">
          {generated ? (
            <pre className="whitespace-pre-wrap break-words text-sm text-neutral-50">
              {generated}
            </pre>
          ) : (
            <p className="text-sm text-neutral-400">
              O código gerado aparecerá aqui.
            </p>
          )}
        </div>

        {/* Botões */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={gerar}
            className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
          >
            Gerar Meta Tags
          </button>

          <button
            onClick={copiar}
            disabled={!generated}
            className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
              generated
                ? "border-blue-600 text-blue-400 hover:bg-neutral-900"
                : "cursor-not-allowed border-neutral-800 text-neutral-600"
            }`}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copiado" : "Copiar"}
          </button>

          <button
            onClick={limpar}
            className="flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-300 transition hover:bg-neutral-900"
          >
            <RefreshCcw size={18} /> Limpar
          </button>
        </div>

        {/* Voltar */}
        <div className="pt-6">
          <Link
            to="/ferramentas"
            className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm text-neutral-300 transition hover:bg-neutral-900"
          >
            <ArrowLeft size={18} />
            Voltar para Ferramentas
          </Link>
        </div>
      </motion.section>
    </main>
  );
}
