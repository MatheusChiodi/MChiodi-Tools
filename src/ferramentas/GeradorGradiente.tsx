import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

export function GeradorGradiente() {
  const [cor1, setCor1] = useState("#00aaff");
  const [cor2, setCor2] = useState("#ff00aa");
  const [direcao, setDirecao] = useState("to right");
  const [copied, setCopied] = useState(false);

  const gradienteCSS = `background: linear-gradient(${direcao}, ${cor1}, ${cor2});`;

  const copiar = () => {
    navigator.clipboard.writeText(gradienteCSS);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const limpar = () => {
    setCor1("#00aaff");
    setCor2("#ff00aa");
    setDirecao("to right");
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
          Gerador de <span className="text-blue-400">Gradiente</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Crie gradientes bonitos e copie o código CSS pronto.
        </p>

        <div className="flex flex-col gap-6">
          {/* Preview */}
          <div
            className="mx-auto h-32 w-full rounded-2xl border border-neutral-800"
            style={{
              background: `linear-gradient(${direcao}, ${cor1}, ${cor2})`,
            }}
          />

          {/* Seletor de Cores */}
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
            <div className="flex items-center gap-2">
              <label className="text-sm text-neutral-400">Cor 1:</label>
              <input
                type="color"
                value={cor1}
                onChange={(e) => setCor1(e.target.value)}
                className="h-10 w-16 cursor-pointer rounded-xl border border-neutral-700 bg-neutral-900 p-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="text-sm text-neutral-400">Cor 2:</label>
              <input
                type="color"
                value={cor2}
                onChange={(e) => setCor2(e.target.value)}
                className="h-10 w-16 cursor-pointer rounded-xl border border-neutral-700 bg-neutral-900 p-1"
              />
            </div>
          </div>

          {/* Direção */}
          <div className="flex flex-wrap justify-center gap-3">
            {[
              "to right",
              "to left",
              "to bottom",
              "to top",
              "45deg",
              "135deg",
              "225deg",
              "315deg",
            ].map((dir) => (
              <button
                key={dir}
                onClick={() => setDirecao(dir)}
                className={`rounded-full border px-4 py-2 text-sm transition ${
                  direcao === dir
                    ? "border-blue-600 text-blue-400"
                    : "border-neutral-700 text-neutral-300 hover:bg-neutral-900"
                }`}
              >
                {dir}
              </button>
            ))}
          </div>

          {/* Código */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-8 py-6">
            <p className="whitespace-pre-wrap break-words text-center text-sm text-neutral-50">
              {gradienteCSS}
            </p>
          </div>

          {/* Botões */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={copiar}
              className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
                copied
                  ? "border-blue-600 text-blue-400 hover:bg-neutral-900"
                  : "border-neutral-700 text-neutral-300 hover:bg-neutral-900"
              }`}
            >
              {copied ? <Check size={18} /> : <Copy size={18} />}
              {copied ? "Copiado" : "Copiar CSS"}
            </button>

            <button
              onClick={limpar}
              className="flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-300 transition hover:bg-neutral-900"
            >
              <RefreshCcw size={18} /> Resetar
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
