import { motion } from "framer-motion";
import { useState } from "react";
import { Copy, Check, ArrowLeft } from "lucide-react";
import { Link } from "react-router-dom";

export function GeradorCNPJ() {
  const [cnpj, setCnpj] = useState("");
  const [copied, setCopied] = useState(false);
  const [comMascara, setComMascara] = useState(true);

  // Função para gerar CNPJ válido
  const gerarCNPJ = (mascarar: boolean) => {
    const n = Array.from({ length: 8 }, () => Math.floor(Math.random() * 10));
    const b = [n[0], n[1], n[2], n[3], n[4], n[5], n[6], n[7], 0, 0, 0, 1];

    const calc = (x: number[]) => {
      const pesos =
        x.length === 12
          ? [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
          : [6, 5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2];
      const soma = x.reduce((acc, val, i) => acc + val * pesos[i], 0);
      const resto = soma % 11;
      return resto < 2 ? 0 : 11 - resto;
    };

    const d1 = calc(b);
    const d2 = calc([...b, d1]);

    const cnpjSemMascara = `${b.join("")}${d1}${d2}`;

    if (!mascarar) return cnpjSemMascara;

    return cnpjSemMascara.replace(
      /(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/,
      "$1.$2.$3/$4-$5",
    );
  };

  const copiar = () => {
    navigator.clipboard.writeText(cnpj);
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
          Gerador de <span className="text-blue-400">CNPJ</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Gere CNPJs válidos para testes de sistemas. Simples, rápido e
          gratuito.
        </p>

        <div className="flex flex-col gap-6">
          {/* CNPJ */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-8 py-6">
            <p className="text-2xl font-bold text-neutral-50 md:text-3xl">
              {cnpj || "Seu CNPJ vai aparecer aqui"}
            </p>
          </div>

          {/* Botões */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={() => setCnpj(gerarCNPJ(comMascara))}
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Gerar CNPJ
            </button>

            <button
              onClick={copiar}
              disabled={!cnpj}
              className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
                cnpj
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

          {/* Checkbox */}
          <div className="flex items-center justify-center gap-2">
            <input
              type="checkbox"
              id="mascara"
              checked={comMascara}
              onChange={() => setComMascara(!comMascara)}
              className="h-4 w-4 rounded border-neutral-700 bg-neutral-900"
            />
            <label htmlFor="mascara" className="text-sm text-neutral-400">
              Gerar com máscara
            </label>
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
