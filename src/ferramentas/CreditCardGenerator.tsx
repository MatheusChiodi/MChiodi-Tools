import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

export function CreditCardGenerator() {
  const [card, setCard] = useState("");
  const [copied, setCopied] = useState(false);
  const [bandeira, setBandeira] = useState("visa");

  const gerarCartao = () => {
    const prefixos: Record<string, string[]> = {
      visa: ["4"],
      mastercard: ["51", "52", "53", "54", "55"],
      amex: ["34", "37"],
      discover: ["6011", "65"],
    };

    const comprimento = bandeira === "amex" ? 15 : 16;
    const prefix =
      prefixos[bandeira][Math.floor(Math.random() * prefixos[bandeira].length)];

    const restante = comprimento - prefix.length - 1;

    let numeroParcial = prefix;
    for (let i = 0; i < restante; i++) {
      numeroParcial += Math.floor(Math.random() * 10);
    }

    const digito = gerarDigitoLuhn(numeroParcial);
    const numeroFinal = numeroParcial + digito;

    const validade = gerarValidade();
    const cvv =
      bandeira === "amex"
        ? Math.floor(1000 + Math.random() * 9000)
        : Math.floor(100 + Math.random() * 900);

    const resultado = `${formatar(numeroFinal)} | ${validade} | CVV: ${cvv}`;
    setCard(resultado);
  };

  const gerarValidade = () => {
    const mes = String(Math.floor(1 + Math.random() * 12)).padStart(2, "0");
    const ano = new Date().getFullYear() + Math.floor(1 + Math.random() * 5);
    return `${mes}/${String(ano).slice(-2)}`;
  };

  const gerarDigitoLuhn = (numero: string) => {
    const arr = numero.split("").reverse().map(Number);
    const soma = arr.reduce((acc, val, idx) => {
      if (idx % 2 === 0) {
        const dobro = val * 2;
        return acc + (dobro > 9 ? dobro - 9 : dobro);
      }
      return acc + val;
    }, 0);
    return (10 - (soma % 10)) % 10;
  };

  const formatar = (numero: string) => {
    return numero.match(/.{1,4}/g)?.join(" ") || numero;
  };

  const copiar = () => {
    navigator.clipboard.writeText(card);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const limpar = () => {
    setCard("");
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
          Gerador de <span className="text-blue-400">Cartão</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Gere cartões de crédito fictícios para testes e desenvolvimento.
        </p>

        <div className="flex flex-col gap-6">
          {/* Resultado */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-8 py-6">
            <p className="text-xl font-bold text-neutral-50 md:text-2xl">
              {card || "Seu cartão aparecerá aqui"}
            </p>
          </div>

          {/* Bandeira */}
          <div className="flex items-center justify-center gap-4">
            <label className="text-sm text-neutral-400">Bandeira:</label>
            <select
              value={bandeira}
              onChange={(e) => setBandeira(e.target.value)}
              className="rounded-xl border border-neutral-700 bg-neutral-900 px-3 py-2 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="visa">Visa</option>
              <option value="mastercard">Mastercard</option>
              <option value="amex">Amex</option>
              <option value="discover">Discover</option>
            </select>
          </div>

          {/* Botões */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={gerarCartao}
              className="rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
            >
              Gerar Cartão
            </button>

            <button
              onClick={copiar}
              disabled={!card}
              className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
                card
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
