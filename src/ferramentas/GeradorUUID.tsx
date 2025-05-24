import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, Check, ArrowLeft, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

export function GeradorUUID() {
  const [uuid, setUuid] = useState("");
  const [copied, setCopied] = useState(false);

  // Função para gerar UUID (v4)
  const gerarUUID = () => {
    const u = crypto.randomUUID();
    setUuid(u);
  };

  const copiar = () => {
    navigator.clipboard.writeText(uuid);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
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
          Gerador de <span className="text-blue-400">UUID</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Gere UUI1Ds válidos (versão 4) para identificação única em sistemas.
          Simples, rápido e gratuito.
        </p>

        <div className="flex flex-col gap-6">
          {/* UUID */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-8 py-6">
            <p className="break-all text-2xl font-bold text-neutral-50 md:text-3xl">
              {uuid || "Seu UUID vai aparecer aqui"}
            </p>
          </div>

          {/* Botões */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={gerarUUID}
              className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <RefreshCcw size={18} /> Gerar UUID
            </button>

            <button
              onClick={copiar}
              disabled={!uuid}
              className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
                uuid
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
