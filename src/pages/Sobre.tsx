import { motion } from "framer-motion";

export function Sobre() {
  return (
    <main className="mx-auto max-w-5xl px-4">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="mt-24 space-y-10"
      >
        <h1 className="text-center text-4xl font-extrabold text-neutral-50 md:text-6xl">
          Sobre o <span className="text-blue-400">MChiodi Tools</span>
        </h1>

        <div className="space-y-6 text-base text-neutral-400 md:text-lg">
          <p>
            O <span className="font-semibold text-blue-400">MChiodi Tools</span>{" "}
            nasceu com um objetivo simples:{" "}
            <span className="text-neutral-100">
              tornar a vida dos desenvolvedores mais prática e produtiva.
            </span>
          </p>

          <p>
            Somos uma plataforma que reúne{" "}
            <span className="font-medium text-neutral-100">
              ferramentas essenciais para o dia a dia de quem programa
            </span>
            . Aqui você encontra geradores, validadores, conversores e
            utilitários para resolver tarefas rápidas sem depender de sites
            lentos, cheios de anúncios ou ferramentas complicadas.
          </p>

          <p>
            A proposta é oferecer um ambiente{" "}
            <span className="font-medium text-neutral-100">
              simples, leve, rápido e gratuito.
            </span>{" "}
            Sem burocracia, sem cadastro e sem distrações.
          </p>

          <p>
            Atualmente, o MChiodi Tools conta com{" "}
            <span className="font-semibold text-blue-400">
              mais de 50 ferramentas
            </span>{" "}
            em constante evolução. Seja você iniciante, profissional ou
            entusiasta da programação, aqui você encontra suporte para agilizar
            seu trabalho.
          </p>
        </div>

        <div className="space-y-4 border-t border-neutral-800 pt-8">
          <h2 className="text-2xl font-bold text-neutral-100">
            Nossa missão 🚀
          </h2>
          <p className="text-neutral-400">
            Facilitar o trabalho de desenvolvedores, entregando{" "}
            <span className="font-medium text-neutral-100">
              soluções rápidas, intuitivas e acessíveis
            </span>{" "}
            para tarefas do dia a dia.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-100">
            Nossa visão 🌎
          </h2>
          <p className="text-neutral-400">
            Ser a plataforma referência em ferramentas para desenvolvedores no
            Brasil e no mundo, promovendo{" "}
            <span className="font-medium text-neutral-100">
              agilidade, praticidade e produtividade
            </span>{" "}
            na rotina de quem vive no código.
          </p>
        </div>

        <div className="space-y-4">
          <h2 className="text-2xl font-bold text-neutral-100">
            Nossos valores 💙
          </h2>
          <ul className="list-inside list-disc space-y-2 text-neutral-400">
            <li>
              <span className="text-neutral-100">Simplicidade:</span> tudo deve
              ser fácil e direto.
            </li>
            <li>
              <span className="text-neutral-100">Velocidade:</span> carregamento
              rápido, uso imediato.
            </li>
            <li>
              <span className="text-neutral-100">Gratuito de verdade:</span> sem
              pegadinhas, sem custos.
            </li>
            <li>
              <span className="text-neutral-100">Qualidade:</span> ferramentas
              estáveis, funcionais e seguras.
            </li>
            <li>
              <span className="text-neutral-100">Respeito ao dev:</span> sem
              anúncios invasivos, sem coleta de dados.
            </li>
          </ul>
        </div>

        <div className="space-y-4 border-t border-neutral-800 pt-8">
          <h2 className="text-2xl font-bold text-neutral-100">
            Apoie o projeto ❤️
          </h2>
          <p className="text-neutral-400">
            Se você gosta do MChiodi Tools e quer apoiar esse projeto para que
            ele continue gratuito, independente e sem anúncios, considere enviar
            qualquer valor via <span className="text-blue-400">PIX</span>. Isso
            ajuda a manter os custos de servidor e desenvolvimento.
          </p>
          <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-4 text-center">
            <p className="text-sm text-neutral-400">
              <img
                src="/pixicon.png"
                alt="PIX"
                className="mx-auto mb-2 h-[300px] w-[300px] rounded-2xl object-cover"
              />
            </p>
            <a
              href="https://livepix.gg/mchiodi"
              className="select-all text-lg font-bold text-blue-400"
              target="_blank"
            >
              https://livepix.gg/mchiodi
            </a>
            <p className="mt-2 text-xs text-neutral-500">
              Qualquer valor faz a diferença. Muito obrigado! 💙
            </p>
          </div>
        </div>
      </motion.section>
    </main>
  );
}
