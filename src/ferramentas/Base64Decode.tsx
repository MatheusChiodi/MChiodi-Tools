import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

export function Base64Decode() {
  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState("");
  const [copied, setCopied] = useState(false);

  const decodificarBase64 = () => {
    try {
      const decoded = decodeURIComponent(
        escape(window.atob(texto.trim()))
      );
      setResultado(decoded);
    } catch {
      setResultado("Erro ao decodificar. Verifique se o texto está em Base64 válido.");
    }
  };

  const copiar = () => {
    navigator.clipboard.writeText(resultado);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const limpar = () => {
    setTexto("");
    setResultado("");
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
          Base64 <span className="text-blue-400">Decode</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Decodifique qualquer texto em Base64 para texto normal.
        </p>

        <div className="flex flex-col gap-6">
          {/* Input */}
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Cole o texto em Base64 aqui..."
            rows={4}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Resultado */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-8 py-6">
            <p className="break-words whitespace-pre-wrap text-center text-sm text-neutral-50">
              {resultado || "O texto decodificado aparecerá aqui"}
            </p>
          </div>

          {/* Botões */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={decodificarBase64}
              disabled={!texto}
              className={`flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 ${
                !texto ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <RefreshCcw size={18} /> Decodificar
            </button>

            <button
              onClick={copiar}
              disabled={!resultado}
              className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
                resultado
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
