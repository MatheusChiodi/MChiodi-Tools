import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

export function RegexTester() {
  const [regex, setRegex] = useState("");
  const [flags, setFlags] = useState("g");
  const [texto, setTexto] = useState("");
  const [resultado, setResultado] = useState<string[]>([]);
  const [erro, setErro] = useState("");

  const testarRegex = () => {
    try {
      const exp = new RegExp(regex, flags);
      const matches = texto.match(exp) || [];
      setResultado(matches);
      setErro("");
    } catch (err) {
      setResultado([]);
      setErro("Regex inválida. Verifique a expressão.");
    }
  };

  const limpar = () => {
    setRegex("");
    setFlags("g");
    setTexto("");
    setResultado([]);
    setErro("");
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
          Regex <span className="text-blue-400">Tester</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Teste expressões regulares em tempo real. Simples, rápido e gratuito.
        </p>

        <div className="flex flex-col gap-6">
          {/* Regex */}
          <input
            type="text"
            value={regex}
            onChange={(e) => setRegex(e.target.value)}
            placeholder="Digite sua regex (ex: \d+)"
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Flags */}
          <input
            type="text"
            value={flags}
            onChange={(e) => setFlags(e.target.value)}
            placeholder="Flags (ex: g, i, m)"
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Texto */}
          <textarea
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Texto para testar..."
            rows={6}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Resultado */}
          <div className="space-y-3 rounded-3xl border border-neutral-800 bg-neutral-950 px-8 py-6">
            {erro ? (
              <p className="text-sm text-red-400">{erro}</p>
            ) : resultado.length > 0 ? (
              <>
                <p className="text-sm text-neutral-400">
                  Encontrado {resultado.length} match(es):
                </p>
                <ul className="space-y-2 text-left text-sm text-neutral-50">
                  {resultado.map((item, idx) => (
                    <li
                      key={idx}
                      className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </>
            ) : (
              <p className="text-sm text-neutral-400">
                Nenhum resultado encontrado.
              </p>
            )}
          </div>

          {/* Botões */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={testarRegex}
              disabled={!regex || !texto}
              className={`rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 ${
                !regex || !texto ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              Testar
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
