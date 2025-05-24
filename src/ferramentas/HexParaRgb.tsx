import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

export function HexParaRgb() {
  const [hex, setHex] = useState("");
  const [copied, setCopied] = useState(false);

  const hexToRgb = (hex: string) => {
    const cleanHex = hex.replace("#", "").trim();
    if (!/^([0-9A-Fa-f]{6})$/.test(cleanHex)) return null;
    const r = parseInt(cleanHex.substring(0, 2), 16);
    const g = parseInt(cleanHex.substring(2, 4), 16);
    const b = parseInt(cleanHex.substring(4, 6), 16);
    return `rgb(${r}, ${g}, ${b})`;
  };

  const rgb = hexToRgb(hex);

  const copiar = () => {
    if (!rgb) return;
    navigator.clipboard.writeText(rgb);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const limpar = () => {
    setHex("");
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
          Conversor <span className="text-blue-400">HEX → RGB</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Converta códigos HEX em RGB instantaneamente.
        </p>

        <div className="flex justify-center">
          <input
            type="text"
            value={hex}
            onChange={(e) => setHex(e.target.value)}
            placeholder="Ex.: #00FF00"
            maxLength={7}
            className="w-full max-w-xs rounded-2xl border border-neutral-800 bg-neutral-950 px-5 py-4 text-center text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {rgb ? (
          <div className="flex flex-col items-center gap-4">
            <div
              className="h-24 w-24 rounded-full border border-neutral-700"
              style={{ backgroundColor: rgb }}
            />
            <p className="text-lg text-neutral-100">{rgb}</p>
          </div>
        ) : hex.trim() !== "" ? (
          <p className="text-sm text-red-400">❌ HEX inválido</p>
        ) : (
          <p className="text-sm text-neutral-400">
            Digite um código HEX válido acima.
          </p>
        )}

        {/* Botões */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={copiar}
            disabled={!rgb}
            className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
              rgb
                ? "border-blue-600 text-blue-400 hover:bg-neutral-900"
                : "cursor-not-allowed border-neutral-800 text-neutral-600"
            }`}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copiado" : "Copiar RGB"}
          </button>

          <button
            onClick={limpar}
            className="flex items-center gap-2 rounded-full border border-neutral-700 px-6 py-3 text-sm font-medium text-neutral-300 transition hover:bg-neutral-900"
          >
            <RefreshCcw size={18} /> Limpar
          </button>
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
