import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, RefreshCcw, Search } from "lucide-react";
import { Link } from "react-router-dom";

export function JsonComparator() {
  const [jsonA, setJsonA] = useState("");
  const [jsonB, setJsonB] = useState("");
  const [resultado, setResultado] = useState<string | null>(null);
  const [erro, setErro] = useState("");

  const comparar = () => {
    try {
      const objA = JSON.parse(jsonA);
      const objB = JSON.parse(jsonB);

      const iguais = JSON.stringify(objA) === JSON.stringify(objB);
      if (iguais) {
        setResultado("✅ Os JSONs são **IGUAIS**.");
      } else {
        const diff = gerarDiff(objA, objB);
        setResultado(diff);
      }
      setErro("");
    } catch {
      setErro("Erro na leitura dos JSONs. Verifique se estão bem formatados.");
      setResultado(null);
    }
  };

  const limpar = () => {
    setJsonA("");
    setJsonB("");
    setResultado(null);
    setErro("");
  };

  const gerarDiff = (a: any, b: any, prefix = ""): string => {
    const keysA = Object.keys(a);
    const keysB = Object.keys(b);
    const allKeys = Array.from(new Set([...keysA, ...keysB]));

    let diff = "";

    allKeys.forEach((key) => {
      const path = prefix ? `${prefix}.${key}` : key;
      if (!(key in b)) {
        diff += `🟥 Removido: ${path}\n`;
      } else if (!(key in a)) {
        diff += `🟩 Adicionado: ${path}\n`;
      } else {
        const valA = a[key];
        const valB = b[key];
        if (
          typeof valA === "object" &&
          typeof valB === "object" &&
          valA !== null &&
          valB !== null
        ) {
          diff += gerarDiff(valA, valB, path);
        } else if (valA !== valB) {
          diff += `🟧 Alterado: ${path} → "${valA}" ➝ "${valB}"\n`;
        }
      }
    });

    return diff || "🟨 Os JSONs são diferentes, mas as estruturas estão vazias ou muito semelhantes.";
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
          Comparador de <span className="text-blue-400">JSON</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Compare dois JSONs, veja diferenças, alterações, inclusões e remoções.
        </p>

        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
          <textarea
            value={jsonA}
            onChange={(e) => setJsonA(e.target.value)}
            placeholder="Cole o JSON A aqui..."
            rows={10}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            value={jsonB}
            onChange={(e) => setJsonB(e.target.value)}
            placeholder="Cole o JSON B aqui..."
            rows={10}
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-8 py-6 text-left">
          {erro ? (
            <p className="text-sm text-red-400">{erro}</p>
          ) : resultado ? (
            <pre className="whitespace-pre-wrap break-words text-sm text-neutral-50">
              {resultado}
            </pre>
          ) : (
            <p className="text-sm text-neutral-400">
              O resultado da comparação aparecerá aqui.
            </p>
          )}
        </div>

        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={comparar}
            disabled={!jsonA || !jsonB}
            className={`flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 ${
              !jsonA || !jsonB ? "cursor-not-allowed opacity-50" : ""
            }`}
          >
            <Search size={18} /> Comparar
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
