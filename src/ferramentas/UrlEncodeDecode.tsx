import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw, Repeat } from "lucide-react";
import { Link } from "react-router-dom";

export function UrlEncodeDecode() {
  const [input, setInput] = useState("");
  const [resultado, setResultado] = useState("");
  const [modo, setModo] = useState<"encode" | "decode">("encode");
  const [copied, setCopied] = useState(false);

  const converter = () => {
    try {
      const res =
        modo === "encode"
          ? encodeURIComponent(input)
          : decodeURIComponent(input);
      setResultado(res);
    } catch {
      setResultado("Erro na conversão. Verifique o texto.");
    }
  };

  const copiar = () => {
    navigator.clipboard.writeText(resultado);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const limpar = () => {
    setInput("");
    setResultado("");
    setCopied(false);
  };

  const toggleModo = () => {
    setModo(modo === "encode" ? "decode" : "encode");
    setResultado("");
    setCopied(false);
  };

  return (
    <main className="mx-auto max-w-4xl px-4">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-24 space-y-10 text-center"
      >
        <h1 className="text-4xl font-extrabold text-neutral-50 md:text-6xl">
          URL <span className="text-blue-400">Encode/Decode</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Codifique ou decodifique URLs de forma fácil, rápida e gratuita.
        </p>

        <div className="flex flex-col gap-6">
          {/* Input */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder={`Digite o texto para ${modo === "encode" ? "codificar" : "decodificar"}...`}
            rows={6}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Resultado */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-8 py-6">
            {resultado ? (
              <pre className="whitespace-pre-wrap break-words text-left text-sm text-neutral-50">
                {resultado}
              </pre>
            ) : (
              <p className="text-sm text-neutral-400">
                O resultado da conversão aparecerá aqui.
              </p>
            )}
          </div>

          {/* Botões */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={converter}
              disabled={!input}
              className={`flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 ${
                !input ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Converter
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
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copiado" : "Copiar"}
            </button>

            <button
              onClick={limpar}
              className="flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-300 transition hover:bg-neutral-900"
            >
              <RefreshCcw size={18} /> Limpar
            </button>

            <button
              onClick={toggleModo}
              className="flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-300 transition hover:bg-neutral-900"
            >
              <Repeat size={18} /> {modo === "encode" ? "Encode → Decode" : "Decode → Encode"}
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
