import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, Check, ArrowLeft, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

export function GeradorSlug() {
  const [texto, setTexto] = useState("");
  const [slug, setSlug] = useState("");
  const [copied, setCopied] = useState(false);

  const gerarSlug = () => {
    const resultado = texto
      .toLowerCase()
      .normalize("NFD") // remove acentos
      .replace(/[\u0300-\u036f]/g, "") // remove caracteres especiais
      .replace(/[^a-z0-9\s-]/g, "") // remove símbolos
      .trim()
      .replace(/\s+/g, "-") // substitui espaços por hífen
      .replace(/-+/g, "-"); // remove hífens duplicados

    setSlug(resultado);
  };

  const copiar = () => {
    navigator.clipboard.writeText(slug);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const limpar = () => {
    setTexto("");
    setSlug("");
    setCopied(false);
  };

  return (
    <main className="mx-auto max-w-3xl px-4">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-24 space-y-10 text-center"
      >
        <h1 className="text-4xl font-extrabold text-neutral-50 md:text-6xl">
          Gerador de <span className="text-blue-400">Slug</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Converta qualquer texto em um slug amigável para URL.
        </p>

        <div className="flex flex-col gap-6">
          {/* Input */}
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Digite seu texto aqui..."
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Resultado */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-8 py-6">
            <p className="break-words text-center text-2xl font-bold text-neutral-50 md:text-3xl">
              {slug || "O slug aparecerá aqui"}
            </p>
          </div>

          {/* Botões */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={gerarSlug}
              disabled={!texto}
              className={`flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 ${
                !texto ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <RefreshCcw size={18} /> Gerar Slug
            </button>

            <button
              onClick={copiar}
              disabled={!slug}
              className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
                slug
                  ? "border-blue-600 text-blue-400 hover:bg-neutral-900"
                  : "cursor-not-allowed border-neutral-800 text-neutral-600"
              }`}
            >
              {copied ? (
                <>
                  <Check size={18} /> Copiado
                </>
              ) : (
                <>
                  <Copy size={18} /> Copiar
                </>
              )}
            </button>

            <button
              onClick={limpar}
              className="flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-300 transition hover:bg-neutral-900"
            >
              <RefreshCcw size={18} /> Limpar
            </button>
          </div>

          {/* Botão Voltar */}
          <div className="pt-6">
            <Link
              to="/ferramentas"
              className="inline-flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm text-neutral-300 transition hover:bg-neutral-900"
            >
              <ArrowLeft size={18} />
              Voltar para Ferramentas
            </Link>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
