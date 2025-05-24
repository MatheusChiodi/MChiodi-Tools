import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";

export function EditorMarkdown() {
  const [texto, setTexto] = useState(`# Bem-vindo ao **Editor de Markdown** 🔥

## Funcionalidades:
- Editor de Markdown à esquerda
- Preview ao vivo à direita
- Suporte a listas, negrito, títulos, tabelas, links e mais

> Experimente editar este texto!

**_Simples, rápido e gratuito._**`);

  const [copied, setCopied] = useState<"markdown" | "html" | null>(null);

  const copiar = (tipo: "markdown" | "html") => {
    if (tipo === "markdown") {
      navigator.clipboard.writeText(texto);
    } else {
      const tempDiv = document.createElement("div");
      tempDiv.innerHTML = document.getElementById("preview")?.innerHTML || "";
      navigator.clipboard.writeText(tempDiv.innerHTML);
    }
    setCopied(tipo);
    setTimeout(() => setCopied(null), 1500);
  };

  const limpar = () => {
    setTexto("");
    setCopied(null);
  };

  return (
    <main className="mx-auto max-w-7xl px-4">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-24 space-y-8"
      >
        <h1 className="text-center text-4xl font-extrabold text-neutral-50 md:text-6xl">
          Editor de <span className="text-blue-400">Markdown</span>
        </h1>
        <p className="text-center text-base text-neutral-400 md:text-lg">
          Edite Markdown e veja o preview em tempo real. Simples, rápido e
          gratuito.
        </p>

        <div className="flex flex-col gap-4 md:flex-row">
          {/* Editor */}
          <div className="flex w-full flex-col gap-3">
            <h2 className="text-left text-sm font-semibold text-neutral-400">
              Markdown
            </h2>
            <textarea
              rows={20}
              value={texto}
              onChange={(e) => setTexto(e.target.value)}
              placeholder="Digite seu markdown aqui..."
              className="h-full w-full rounded-3xl border border-neutral-800 bg-neutral-950 px-6 py-4 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Preview */}
          <div className="flex w-full flex-col gap-3">
            <h2 className="text-left text-sm font-semibold text-neutral-400">
              Preview
            </h2>
            <div
              id="preview"
              className="prose prose-invert h-full max-w-full rounded-3xl border border-neutral-800 bg-neutral-950 px-6 py-4 text-neutral-100"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{texto}</ReactMarkdown>
            </div>
          </div>
        </div>

        {/* Botões */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={() => copiar("markdown")}
            className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
              texto
                ? "border-blue-600 text-blue-400 hover:bg-neutral-900"
                : "cursor-not-allowed border-neutral-800 text-neutral-600"
            }`}
            disabled={!texto}
          >
            {copied === "markdown" ? <Check size={18} /> : <Copy size={18} />}
            {copied === "markdown" ? "Markdown Copiado" : "Copiar Markdown"}
          </button>

          <button
            onClick={() => copiar("html")}
            className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
              texto
                ? "border-blue-600 text-blue-400 hover:bg-neutral-900"
                : "cursor-not-allowed border-neutral-800 text-neutral-600"
            }`}
            disabled={!texto}
          >
            {copied === "html" ? <Check size={18} /> : <Copy size={18} />}
            {copied === "html" ? "HTML Copiado" : "Copiar HTML"}
          </button>

          <button
            onClick={limpar}
            className="flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-300 transition hover:bg-neutral-900"
          >
            <RefreshCcw size={18} /> Limpar
          </button>
        </div>

        {/* Voltar */}
        <div className="pt-4 text-center">
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
