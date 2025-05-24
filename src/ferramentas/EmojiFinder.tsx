import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";
import emojiList from "../data/emojiList.json";

const categorias = [
  "Todos",
  "Pessoas",
  "Animais",
  "Natureza",
  "Comida",
  "Viagem",
  "Atividades",
  "Objetos",
  "Símbolos",
  "Bandeiras",
];

export function EmojiFinder() {
  const [query, setQuery] = useState("");
  const [categoria, setCategoria] = useState("Todos");
  const [copied, setCopied] = useState<string | null>(null);

  const resultados = emojiList.filter(
    (emoji: any) =>
      (categoria === "Todos" || emoji.category === categoria) &&
      (emoji.name.toLowerCase().includes(query.toLowerCase()) ||
        emoji.category.toLowerCase().includes(query.toLowerCase()) ||
        emoji.keywords.some((kw: string) =>
          kw.toLowerCase().includes(query.toLowerCase()),
        )),
  );

  const copiar = (emoji: string) => {
    navigator.clipboard.writeText(emoji);
    setCopied(emoji);
    setTimeout(() => setCopied(null), 1500);
  };

  const limpar = () => {
    setQuery("");
    setCategoria("Todos");
    setCopied(null);
  };

  return (
    <main className="mx-auto max-w-6xl px-4">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-24 space-y-10 text-center"
      >
        <h1 className="text-4xl font-extrabold text-neutral-50 md:text-6xl">
          Buscador de <span className="text-blue-400">Emojis</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Encontre qualquer emoji por nome, categoria ou palavra-chave. Clique
          para copiar!
        </p>

        {/* Filtro e Busca */}
        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="🔍 Ex.: coração, foguete, pizza..."
            className="w-full max-w-lg rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          <button
            onClick={limpar}
            className="flex items-center gap-2 rounded-full border border-neutral-700 px-5 py-2 text-sm text-neutral-300 transition hover:bg-neutral-900"
          >
            <RefreshCcw size={16} /> Limpar
          </button>
        </div>

        {/* Categorias */}
        <div className="flex flex-wrap justify-center gap-2">
          {categorias.map((cat) => (
            <button
              key={cat}
              onClick={() => setCategoria(cat)}
              className={`rounded-full border px-4 py-1 text-xs transition ${
                categoria === cat
                  ? "border-blue-600 bg-blue-600/20 text-blue-400"
                  : "border-neutral-700 text-neutral-400 hover:bg-neutral-900"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Resultado */}
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
          {resultados.length > 0 ? (
            resultados.map((emoji: any) => (
              <motion.div
                key={`${emoji.symbol}-${emoji.name}`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => copiar(emoji.symbol)}
                className="group flex cursor-pointer flex-col items-center justify-center gap-2 rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-6 transition hover:shadow-lg"
              >
                <div className="text-4xl">{emoji.symbol}</div>
                <p className="text-xs text-neutral-100">{emoji.name}</p>
                {copied === emoji.symbol ? (
                  <span className="text-xs text-green-400">
                    <Check size={12} className="inline" /> Copiado!
                  </span>
                ) : (
                  <button className="flex items-center gap-1 text-xs text-blue-400 opacity-0 transition hover:underline group-hover:opacity-100">
                    <Copy size={12} /> Copiar
                  </button>
                )}
              </motion.div>
            ))
          ) : (
            <p className="col-span-full text-sm text-neutral-400">
              Nenhum emoji encontrado.
            </p>
          )}
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
