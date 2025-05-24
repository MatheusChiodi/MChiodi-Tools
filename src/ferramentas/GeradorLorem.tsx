import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, Check, ArrowLeft, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

const loremBase = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. 
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. 
Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. 
Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
`;

export function GeradorLorem() {
  const [quantidade, setQuantidade] = useState(3);
  const [texto, setTexto] = useState("");
  const [copied, setCopied] = useState(false);

  const gerarLorem = () => {
    const resultado = Array.from({ length: quantidade }, () =>
      loremBase.trim(),
    ).join("\n\n");
    setTexto(resultado);
  };

  const copiar = () => {
    navigator.clipboard.writeText(texto);
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
          Gerador de <span className="text-blue-400">Lorem Ipsum</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Gere textos Lorem Ipsum para utilizar como placeholder em seus
          layouts, protótipos ou sistemas. Simples, rápido e gratuito.
        </p>

        <div className="flex flex-col gap-6">
          {/* Texto */}
          <div className="max-h-[400px] overflow-auto rounded-3xl border border-neutral-800 bg-neutral-950 px-8 py-6">
            <p className="whitespace-pre-wrap text-left text-sm text-neutral-300">
              {texto || "Seu texto Lorem Ipsum vai aparecer aqui"}
            </p>
          </div>

          {/* Quantidade */}
          <div className="flex items-center justify-center gap-2">
            <label htmlFor="quantidade" className="text-sm text-neutral-400">
              Quantidade de parágrafos:
            </label>
            <input
              type="number"
              id="quantidade"
              min={1}
              max={10}
              value={quantidade}
              onChange={(e) => setQuantidade(Number(e.target.value))}
              className="w-16 rounded-lg border border-neutral-700 bg-neutral-900 px-2 py-1 text-center text-neutral-100"
            />
          </div>

          {/* Botões */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={gerarLorem}
              className="flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              <RefreshCcw size={18} /> Gerar Lorem Ipsum
            </button>

            <button
              onClick={copiar}
              disabled={!texto}
              className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
                texto
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
