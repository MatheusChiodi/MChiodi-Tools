import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

export function ConversorTexto() {
  const [texto, setTexto] = useState("");
  const [copied, setCopied] = useState(false);

  const copiar = () => {
    navigator.clipboard.writeText(texto);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const limpar = () => {
    setTexto("");
    setCopied(false);
  };

  const transformar = {
    maiuscula: () => setTexto(texto.toUpperCase()),
    minuscula: () => setTexto(texto.toLowerCase()),
    capitalizar: () =>
      setTexto(
        texto
          .toLowerCase()
          .split(" ")
          .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
          .join(" ")
      ),
    inverter: () => setTexto([...texto].reverse().join("")),
    removerEspacos: () => setTexto(texto.replace(/\s+/g, " ").trim()),
  };

  return (
    <main className="mx-auto max-w-5xl px-4">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-24 space-y-8 text-center"
      >
        <h1 className="text-4xl font-extrabold text-neutral-50 md:text-6xl">
          Conversor de <span className="text-blue-400">Texto</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Faça transformações no seu texto: caixa alta, baixa, capitalizar,
          inverter, remover espaços e muito mais.
        </p>

        <textarea
          rows={6}
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Digite ou cole seu texto aqui..."
          className="w-full rounded-3xl border border-neutral-800 bg-neutral-950 px-6 py-4 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <div className="flex flex-wrap justify-center gap-3">
          <button
            onClick={transformar.maiuscula}
            className="rounded-full border border-neutral-700 px-5 py-2 text-xs text-neutral-300 transition hover:bg-neutral-900"
          >
            MAIÚSCULA
          </button>
          <button
            onClick={transformar.minuscula}
            className="rounded-full border border-neutral-700 px-5 py-2 text-xs text-neutral-300 transition hover:bg-neutral-900"
          >
            minúscula
          </button>
          <button
            onClick={transformar.capitalizar}
            className="rounded-full border border-neutral-700 px-5 py-2 text-xs text-neutral-300 transition hover:bg-neutral-900"
          >
            Capitalizar
          </button>
          <button
            onClick={transformar.inverter}
            className="rounded-full border border-neutral-700 px-5 py-2 text-xs text-neutral-300 transition hover:bg-neutral-900"
          >
            Inverter Texto
          </button>
          <button
            onClick={transformar.removerEspacos}
            className="rounded-full border border-neutral-700 px-5 py-2 text-xs text-neutral-300 transition hover:bg-neutral-900"
          >
            Remover Espaços
          </button>
        </div>

        <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
          <button
            onClick={copiar}
            disabled={!texto}
            className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
              texto
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

        {/* Infos */}
        <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-6 py-4 text-left text-sm text-neutral-400">
          <p>
            📄 <strong>Caracteres:</strong> {texto.length} | <strong>Palavras:</strong>{" "}
            {texto.trim() === "" ? 0 : texto.trim().split(/\s+/).length}
          </p>
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
