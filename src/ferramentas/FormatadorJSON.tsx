import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw, Code } from "lucide-react";
import { Link } from "react-router-dom";

export function FormatadorJSON() {
  const [input, setInput] = useState("");
  const [resultado, setResultado] = useState("");
  const [erro, setErro] = useState("");
  const [copied, setCopied] = useState(false);

  const formatarJSON = () => {
    try {
      const obj = JSON.parse(input);
      const jsonFormatado = JSON.stringify(obj, null, 2);
      setResultado(jsonFormatado);
      setErro("");
    } catch {
      setResultado("");
      setErro("JSON inválido. Verifique a sintaxe.");
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
    setErro("");
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
          Formatador de <span className="text-blue-400">JSON</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Cole seu JSON bagunçado e formate instantaneamente.
        </p>

        <div className="flex flex-col gap-6">
          {/* Input */}
          <textarea
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Cole seu JSON aqui..."
            rows={8}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Resultado */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-8 py-6">
            {erro ? (
              <p className="text-sm text-red-400">{erro}</p>
            ) : resultado ? (
              <pre className="whitespace-pre-wrap break-words text-left text-sm text-neutral-50">
                {resultado}
              </pre>
            ) : (
              <p className="text-sm text-neutral-400">
                O JSON formatado aparecerá aqui.
              </p>
            )}
          </div>

          {/* Botões */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={formatarJSON}
              disabled={!input}
              className={`flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 ${
                !input ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <Code size={18} /> Formatar JSON
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
