import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

export function MacGenerator() {
  const [mac, setMac] = useState("");
  const [copied, setCopied] = useState(false);
  const [separator, setSeparator] = useState(":");

  const gerarMac = () => {
    const hexPairs = Array.from({ length: 6 }, () =>
      Math.floor(Math.random() * 256)
        .toString(16)
        .padStart(2, "0")
        .toUpperCase()
    );
    const macAddress = hexPairs.join(separator);
    setMac(macAddress);
  };

  const copiar = () => {
    navigator.clipboard.writeText(mac);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const limpar = () => {
    setMac("");
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
          Gerador de <span className="text-blue-400">MAC Address</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Gere endereços MAC aleatórios para testes e desenvolvimento.
        </p>

        <div className="flex flex-col gap-6">
          {/* Resultado */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-8 py-6">
            <p className="text-2xl font-bold text-neutral-50 md:text-3xl overflow-hidden">
              {mac || "Seu MAC Address aparecerá aqui"}
            </p>
          </div>

          {/* Opções */}
          <div className="flex items-center justify-center gap-4">
            <label className="text-sm text-neutral-400">
              Separador:
            </label>
            <select
              value={separator}
              onChange={(e) => setSeparator(e.target.value)}
              className="rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value=":">Dois Pontos ( : )</option>
              <option value="-">Hífen ( - )</option>
              <option value="">Sem Separador</option>
            </select>
          </div>

          {/* Botões */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={gerarMac}
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Gerar MAC
            </button>

            <button
              onClick={copiar}
              disabled={!mac}
              className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
                mac
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
