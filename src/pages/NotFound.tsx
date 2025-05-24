import { motion } from "framer-motion";
import { Link } from "react-router-dom";

export function NotFound() {
  return (
    <main className="mx-auto flex h-screen max-w-4xl flex-col items-center justify-center px-4 text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="space-y-8"
      >
        <h1 className="text-7xl font-extrabold text-blue-400">404</h1>
        <h2 className="text-3xl font-bold text-neutral-50 md:text-4xl">
          Página não encontrada
        </h2>
        <p className="text-base text-neutral-400 md:text-lg">
          Opa... Parece que você se perdeu no código. <br />
          Essa página não existe ou foi movida.
        </p>
        <Link
          to="/"
          className="inline-block rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700"
        >
          Voltar para Home
        </Link>
      </motion.div>
    </main>
  );
}
