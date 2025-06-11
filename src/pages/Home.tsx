import { motion } from "framer-motion";

export function Home() {
  return (
    <main className="mx-auto max-w-5xl px-4">
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.8 }}
        className="mt-24 space-y-8 text-center"
      >
        <h1 className="text-4xl font-extrabold leading-tight text-neutral-50 md:text-6xl">
          Todas as ferramentas que um <span className="text-blue-00">dev</span>{" "}
          precisa. <br className="hidden md:block" /> Simples, rápido e
          gratuito
        </h1>

        <div className="space-y-5 text-base text-neutral-400 md:text-lg">
          <p>
            O <span className="font-semibold text-blue-400">MChiodi Tools</span>{" "}
            é uma plataforma criada para desenvolvedores que buscam praticidade
            no dia a dia.
          </p>
          <p>
            Aqui você encontra uma coleção de ferramentas essenciais para quem
            programa:{" "}
            <span className="text-neutral-100">
              geradores, validadores, conversores, utilitários de texto,
              codificadores, decodificadores, ferramentas de SEO, redes, JSON,
              imagens e muito mais.
            </span>
          </p>
          <p>
            A proposta é simples:{" "}
            <span className="font-medium text-neutral-100">
              resolver problemas comuns de desenvolvimento em segundos,
            </span>{" "}
            sem precisar baixar programas, sem fazer cadastro e sem depender de
            sites cheios de anúncios.
          </p>
          <p>
            O MChiodi Tools foi feito para ser{" "}
            <span className="font-medium text-neutral-100">
              rápido, leve e direto.
            </span>{" "}
            Abra, use e continue seu trabalho sem perder tempo.
          </p>
          <p>
            São mais de{" "}
            <span className="font-semibold text-blue-400">50 ferramentas</span>{" "}
            em constante atualização, pensadas para quem vive no código e não
            tem tempo a perder.
          </p>
        </div>
      </motion.section>
    </main>
  );
}
