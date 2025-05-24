import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import md5 from "blueimp-md5";

export function GeradorMD5() {
  const [texto, setTexto] = useState("");
  const [hash, setHash] = useState("");
  const [copied, setCopied] = useState(false);

  const gerar = () => {
    const resultado = md5(texto);
    setHash(resultado);
  };

  const copiar = () => {
    navigator.clipboard.writeText(hash);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const limpar = () => {
    setTexto("");
    setHash("");
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
          Gerador de <span className="text-blue-400">Hash MD5</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Converta qualquer texto em um hash MD5.
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
              {hash || "O hash MD5 aparecerá aqui"}
            </p>
          </div>

          {/* Botões */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={gerar}
              disabled={!texto}
              className={`flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 ${
                !texto ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <RefreshCcw size={18} /> Gerar Hash
            </button>

            <button
              onClick={copiar}
              disabled={!hash}
              className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
                hash
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
