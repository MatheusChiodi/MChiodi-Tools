import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw, Upload } from "lucide-react";
import { Link } from "react-router-dom";

export function VisualizadorCSV() {
  const [input, setInput] = useState("");
  const [copied, setCopied] = useState(false);
  const [error, setError] = useState("");

  const parseCSV = (csv: string) => {
    const linhas = csv.trim().split("\n");
    const rows = linhas.map((linha) =>
      linha.split(",").map((col) => col.trim()),
    );
    const colunas = rows[0];
    const dados = rows.slice(1);
    return { colunas, dados };
  };

  let tabela;
  try {
    tabela = parseCSV(input);
    if (error) setError("");
  } catch (e) {
    tabela = null;
    if (input.trim() !== "") setError("CSV inválido.");
  }

  const copiar = () => {
    navigator.clipboard.writeText(input);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const limpar = () => {
    setInput("");
    setCopied(false);
    setError("");
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      setInput(event.target?.result as string);
    };
    reader.readAsText(file);
  };

  return (
    <main className="mx-auto max-w-7xl px-4">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="mt-24 space-y-10"
      >
        <h1 className="text-center text-4xl font-extrabold text-neutral-50 md:text-6xl">
          Visualizador de <span className="text-blue-400">CSV</span>
        </h1>
        <p className="text-center text-base text-neutral-400 md:text-lg">
          Cole seu CSV ou faça upload do arquivo e visualize em formato de
          tabela.
        </p>

        <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
          <input
            type="file"
            accept=".csv"
            onChange={handleUpload}
            className="text-sm text-neutral-400 file:mr-4 file:rounded-md file:border-0 file:bg-blue-600 file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white hover:file:bg-blue-700"
          />
        </div>

        <textarea
          rows={8}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Cole seu CSV aqui... Ex.: nome,idade\nJoão,25\nMaria,30"
          className="w-full rounded-3xl border border-neutral-800 bg-neutral-950 px-6 py-4 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        {error && (
          <div className="rounded-xl border border-red-500 bg-red-500/20 px-4 py-2 text-sm text-red-400">
            ❌ {error}
          </div>
        )}

        {tabela && (
          <div className="overflow-x-auto rounded-3xl border border-neutral-800 bg-neutral-950 px-6 py-6">
            <table className="w-full table-auto text-left text-sm text-neutral-100">
              <thead>
                <tr>
                  {tabela.colunas.map((col, idx) => (
                    <th
                      key={idx}
                      className="border-b border-neutral-700 px-4 py-2 font-semibold text-blue-400"
                    >
                      {col}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {tabela.dados.map((linha, idx) => (
                  <tr key={idx} className="transition hover:bg-neutral-900">
                    {linha.map((cell, i) => (
                      <td
                        key={i}
                        className="border-b border-neutral-800 px-4 py-2"
                      >
                        {cell}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Botões */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={copiar}
            disabled={!input}
            className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
              input
                ? "border-blue-600 text-blue-400 hover:bg-neutral-900"
                : "cursor-not-allowed border-neutral-800 text-neutral-600"
            }`}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copiado" : "Copiar CSV"}
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
