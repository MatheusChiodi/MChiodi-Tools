import { motion } from "framer-motion";

export function Loader() {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      animate={{ opacity: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-neutral-950"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1.2 }}
        transition={{ yoyo: Infinity, duration: 0.6, ease: "easeInOut" }}
        className="text-3xl font-extrabold"
      >
        <span className="text-blue-400">MChiodi</span> Tools
      </motion.div>
    </motion.div>
  );
}
