import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

export function RgbParaHex() {
  const [r, setR] = useState("");
  const [g, setG] = useState("");
  const [b, setB] = useState("");
  const [copied, setCopied] = useState(false);

  const validar = (v: string) => {
    const n = Number(v);
    return !isNaN(n) && n >= 0 && n <= 255;
  };

  const rgbValido = validar(r) && validar(g) && validar(b);

  const rgbToHex = (r: number, g: number, b: number) =>
    "#" +
    [r, g, b]
      .map((x) => {
        const hex = x.toString(16);
        return hex.length === 1 ? "0" + hex : hex;
      })
      .join("")
      .toUpperCase();

  const hex = rgbValido ? rgbToHex(Number(r), Number(g), Number(b)) : null;

  const copiar = () => {
    if (!hex) return;
    navigator.clipboard.writeText(hex);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const limpar = () => {
    setR("");
    setG("");
    setB("");
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
          Conversor <span className="text-blue-400">RGB → HEX</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Converta códigos RGB em HEX instantaneamente.
        </p>

        <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
          {["R", "G", "B"].map((label, idx) => (
            <input
              key={label}
              type="number"
              placeholder={label}
              min={0}
              max={255}
              value={label === "R" ? r : label === "G" ? g : b}
              onChange={(e) => {
                const val = e.target.value;
                if (label === "R") setR(val);
                if (label === "G") setG(val);
                if (label === "B") setB(val);
              }}
              className="w-20 rounded-2xl border border-neutral-800 bg-neutral-950 px-4 py-3 text-center text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          ))}
        </div>

        {hex ? (
          <div className="flex flex-col items-center gap-4">
            <div
              className="h-24 w-24 rounded-full border border-neutral-700"
              style={{ backgroundColor: hex }}
            />
            <p className="text-lg text-neutral-100">{hex}</p>
          </div>
        ) : r || g || b ? (
          <p className="text-sm text-red-400">
            ❌ Valores inválidos. Use números de 0 a 255.
          </p>
        ) : (
          <p className="text-sm text-neutral-400">
            Preencha os valores de R, G e B acima.
          </p>
        )}

        {/* Botões */}
        <div className="flex flex-col justify-center gap-4 sm:flex-row">
          <button
            onClick={copiar}
            disabled={!hex}
            className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
              hex
                ? "border-blue-600 text-blue-400 hover:bg-neutral-900"
                : "cursor-not-allowed border-neutral-800 text-neutral-600"
            }`}
          >
            {copied ? <Check size={18} /> : <Copy size={18} />}
            {copied ? "Copiado" : "Copiar HEX"}
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
