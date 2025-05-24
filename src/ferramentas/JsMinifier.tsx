import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw, Scissors } from "lucide-react";
import { Link } from "react-router-dom";

export function JsMinifier() {
  const [js, setJs] = useState("");
  const [minified, setMinified] = useState("");
  const [copied, setCopied] = useState(false);

  const minificar = () => {
    try {
      const resultado = js
        .replace(/\/\/.*(?=[\n\r])/g, "") // Remove comentários de linha //
        .replace(/\/\*[\s\S]*?\*\//g, "") // Remove comentários de bloco /* */
        .replace(/\n/g, "") // Remove quebras de linha
        .replace(/\s{2,}/g, " ") // Remove múltiplos espaços
        .replace(/\s*([{};,:=()+\-*/<>])\s*/g, "$1") // Remove espaços antes e depois de caracteres
        .trim();

      setMinified(resultado);
    } catch {
      setMinified("// ⚠️ Erro na minificação. Verifique o código.");
    }
  };

  const copiar = () => {
    navigator.clipboard.writeText(minified);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const limpar = () => {
    setJs("");
    setMinified("");
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
          Minificador de <span className="text-blue-400">JavaScript</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Cole seu JavaScript e otimize-o removendo espaços, quebras de linha e
          comentários.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <textarea
            value={js}
            onChange={(e) => setJs(e.target.value)}
            placeholder="Cole seu JavaScript aqui..."
            rows={10}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            value={minified}
            readOnly
            placeholder="O JavaScript minificado aparecerá aqui..."
            rows={10}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-neutral-100 focus:outline-none"
          />
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={minificar}
            disabled={!js}
            className={`flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 ${
              !js ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <Scissors size={18} /> Minificar
          </button>

          <button
            onClick={copiar}
            disabled={!minified}
            className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
              minified
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
