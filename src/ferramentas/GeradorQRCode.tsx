import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowLeft, Download, QrCode } from "lucide-react";
import { Link } from "react-router-dom";
import QRCode from "qrcode";

export function GeradorQRCode() {
  const [texto, setTexto] = useState("");
  const [qrCodeUrl, setQrCodeUrl] = useState("");
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // Sempre que o texto mudar, gerar o QR no canvas
  useEffect(() => {
    if (!texto) {
      setQrCodeUrl("");
      return;
    }
    QRCode.toCanvas(
      canvasRef.current,
      texto,
      { width: 256, margin: 2 },
      (err) => {
        if (err) console.error(err);
      },
    );

    QRCode.toDataURL(texto, { margin: 2 })
      .then((url) => setQrCodeUrl(url))
      .catch((err) => console.error(err));
  }, [texto]);

  const baixarQRCode = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement("a");
    link.href = qrCodeUrl;
    link.download = "qrcode.png";
    link.click();
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
          Gerador de <span className="text-blue-400">QR Code</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Gere QR Codes a partir de textos, links ou qualquer informação.
          Simples, rápido e gratuito.
        </p>

        <div className="flex flex-col gap-6">
          {/* QR Code */}
          <div className="flex justify-center">
            {texto ? (
              <canvas ref={canvasRef} className="rounded-lg bg-white p-2" />
            ) : (
              <div className="flex h-64 w-64 items-center justify-center rounded-lg border border-neutral-800 bg-neutral-950">
                <QrCode className="h-12 w-12 text-neutral-700" />
              </div>
            )}
          </div>

          {/* Input */}
          <input
            type="text"
            value={texto}
            onChange={(e) => setTexto(e.target.value)}
            placeholder="Digite o texto ou link..."
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Botões */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={baixarQRCode}
              disabled={!qrCodeUrl}
              className={`flex items-center gap-2 rounded-full border px-6 py-3 text-sm font-medium ${
                qrCodeUrl
                  ? "border-blue-600 text-blue-400 hover:bg-neutral-900"
                  : "cursor-not-allowed border-neutral-800 text-neutral-600"
              }`}
            >
              <Download size={18} /> Baixar QR Code
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
