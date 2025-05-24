import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

function renderJson(obj: any, depth = 0) {
  return Object.entries(obj).map(([key, value], index) => {
    const padding = "pl-" + depth * 4;

    if (typeof value === "object" && value !== null) {
      return (
        <div key={index} className={`text-sm ${padding} text-neutral-100`}>
          <details open className="group">
            <summary className="cursor-pointer select-none">
              <span className="text-blue-400">"{key}"</span> :{" "}
              {Array.isArray(value) ? "[ ]" : "{ }"}
            </summary>
            <div className="ml-4">{renderJson(value, depth + 1)}</div>
          </details>
        </div>
      );
    } else {
      return (
        <div key={index} className={`text-sm ${padding} text-neutral-100`}>
          <span className="text-blue-400">"{key}"</span> :{" "}
          <span className="text-green-400">
            {typeof value === "string" ? `"${value}"` : String(value)}
          </span>
        </div>
      );
    }
  });
}

export function VisualizadorJSON() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  let parsed;
  try {
    parsed = JSON.parse(input);
    if (error) setError("");
  } catch (e) {
    parsed = null;
    if (input.trim() !== "") setError("JSON inválido");
  }

  const copiar = () => {
    navigator.clipboard.writeText(JSON.stringify(parsed, null, 2) || input);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const limpar = () => {
    setInput("");
    setCopied(false);
    setError("");
  };

  return (
    <main className="mx-auto max-w-6xl px-4">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-24 space-y-10"
      >
        <h1 className="text-center text-4xl font-extrabold text-neutral-50 md:text-6xl">
          Visualizador de <span className="text-blue-400">JSON</span>
        </h1>
        <p className="text-center text-base text-neutral-400 md:text-lg">
          Cole seu JSON bruto para visualizar de forma organizada e legível.
        </p>

        <textarea
          rows={8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder='Cole seu JSON aqui... Ex.: { "nome": "João", "idade": 25 }'
          className="w-full rounded-3xl border border-neutral-800 bg-neutral-950 px-6 py-4 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && (
          <div className="rounded-xl border border-red-500 bg-red-500/20 px-4 py-2 text-sm text-red-400">
            ❌ {error}
          </div>
        )}

        {parsed && (
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-6 py-6">
            {renderJson(parsed)}
          </div>
        )}

        {/* Botões */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={copiar}
            disabled={!parsed}
            className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
              parsed
                ? "border-blue-600 text-blue-400 hover:bg-neutral-900"
                : "cursor-not-allowed border-neutral-800 text-neutral-600"
            }`}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copiado" : "Copiar JSON"}
          </button>

          <button
            onClick={limpar}
            className="flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-300 transition hover:bg-neutral-900"
          >
            <RefreshCcw size={18} /> Limpar
          </button>
        </div>

        {/* Voltar */}
        <div className="pt-6 text-center">
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
