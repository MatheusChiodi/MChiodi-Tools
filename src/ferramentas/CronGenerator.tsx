import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, Check, Copy, RefreshCcw } from "lucide-react";
import { Link } from "react-router-dom";

export function CronGenerator() {
  const [minute, setMinute] = useState("*");
  const [hour, setHour] = useState("*");
  const [dayOfMonth, setDayOfMonth] = useState("*");
  const [month, setMonth] = useState("*");
  const [dayOfWeek, setDayOfWeek] = useState("*");
  const [copied, setCopied] = useState(false);

  const cron = `${minute} ${hour} ${dayOfMonth} ${month} ${dayOfWeek}`;

  const descricao = gerarDescricao(cron);

  const copiar = () => {
    navigator.clipboard.writeText(cron);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const limpar = () => {
    setMinute("*");
    setHour("*");
    setDayOfMonth("*");
    setMonth("*");
    setDayOfWeek("*");
    setCopied(false);
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
          Gerador de <span className="text-blue-400">CRON</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Monte facilmente expressões CRON e copie o código pronto.
        </p>

        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          <Input label="Minuto" value={minute} setValue={setMinute} />
          <Input label="Hora" value={hour} setValue={setHour} />
          <Input
            label="Dia do Mês"
            value={dayOfMonth}
            setValue={setDayOfMonth}
          />
          <Input label="Mês" value={month} setValue={setMonth} />
          <Input
            label="Dia da Semana"
            value={dayOfWeek}
            setValue={setDayOfWeek}
          />
        </div>

        <div className="space-y-4 rounded-3xl border border-neutral-800 bg-neutral-950 px-8 py-6">
          <p className="text-xl font-bold text-neutral-50">{cron}</p>
          <p className="text-sm text-neutral-400">{descricao}</p>
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
            {copied ? "Copiado" : "Copiar CRON"}
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
      </motion.section>
    </main>
  );
}

function Input({
  label,
  value,
  setValue,
}: {
  label: string;
  value: string;
  setValue: (v: string) => void;
}) {
  return (
    <div className="flex flex-col gap-1">
      <label className="text-sm text-neutral-400">{label}</label>
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-2 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
        placeholder="*"
      />
    </div>
  );
}

// Gerador de descrição simplificada
function gerarDescricao(cron: string) {
  const [min, hr, dom, mon, dow] = cron.split(" ");
  const minutos = min === "*" ? "todos os minutos" : `no minuto ${min}`;
  const horas = hr === "*" ? "todas as horas" : `às ${hr} horas`;
  const diasMes = dom === "*" ? "todos os dias do mês" : `no dia ${dom}`;
  const meses = mon === "*" ? "todos os meses" : `no mês ${mon}`;
  const diasSemana =
    dow === "*" ? "todos os dias da semana" : `no dia da semana ${dow}`;

  return `${minutos}, ${horas}, ${diasMes}, ${meses}, ${diasSemana}.`;
}
