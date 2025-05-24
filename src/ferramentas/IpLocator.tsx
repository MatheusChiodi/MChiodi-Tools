import { motion } from "framer-motion";
import { useState } from "react";
import { ArrowLeft, RefreshCcw, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// Corrige ícones do Leaflet no React
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

export function IpLocator() {
  const [ip, setIp] = useState("");
  const [resultado, setResultado] = useState<any>(null);
  const [erro, setErro] = useState("");
  const [loading, setLoading] = useState(false);

  const buscar = async () => {
    setLoading(true);
    setErro("");
    setResultado(null);
    try {
      const url =
        ip.trim() === ""
          ? "https://ipwho.is/"
          : `https://ipwho.is/${ip.trim()}`;

      const res = await fetch(url);
      const data = await res.json();

      if (!data.success) {
        throw new Error(data.message || "IP inválido.");
      }

      setResultado(data);
    } catch {
      setErro("Não foi possível localizar o IP. Verifique se está correto.");
    } finally {
      setLoading(false);
    }
  };

  const limpar = () => {
    setIp("");
    setResultado(null);
    setErro("");
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
          Localizador de <span className="text-blue-400">IP</span>
        </h1>
        <p className="text-base text-neutral-400 md:text-lg">
          Descubra informações detalhadas sobre qualquer endereço IP com mapa
          interativo.
        </p>

        <div className="flex flex-col gap-6">
          {/* Input */}
          <input
            type="text"
            value={ip}
            onChange={(e) => setIp(e.target.value)}
            placeholder="Digite um IP (ou deixe vazio para seu IP atual)"
            className="w-full rounded-xl border border-neutral-700 bg-neutral-900 px-4 py-3 text-sm text-neutral-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          {/* Resultado */}
          <div className="rounded-3xl border border-neutral-800 bg-neutral-950 px-8 py-6">
            {loading ? (
              <p className="text-sm text-neutral-400">Buscando...</p>
            ) : erro ? (
              <p className="text-sm text-red-400">{erro}</p>
            ) : resultado ? (
              <div className="space-y-2 text-left text-sm text-neutral-50">
                <p>
                  <strong>IP:</strong> {resultado.ip}
                </p>
                <p>
                  <strong>Continente:</strong> {resultado.continent}
                </p>
                <p>
                  <strong>País:</strong> {resultado.country}
                </p>
                <p>
                  <strong>Região:</strong> {resultado.region}
                </p>
                <p>
                  <strong>Cidade:</strong> {resultado.city}
                </p>
                <p>
                  <strong>Latitude:</strong> {resultado.latitude}
                </p>
                <p>
                  <strong>Longitude:</strong> {resultado.longitude}
                </p>
                <p>
                  <strong>ASN:</strong> {resultado.asn}
                </p>
                <p>
                  <strong>Organização:</strong> {resultado.org}
                </p>

                {/* Mapa */}
                <div className="mt-6 h-[400px] w-full overflow-hidden rounded-xl border border-neutral-800 relative z-10">
                  <MapContainer
                    center={[resultado.latitude, resultado.longitude]}
                    zoom={10}
                    scrollWheelZoom={true}
                    className="h-full w-full"
                  >
                    <TileLayer
                      attribution='&copy; <a href="https://carto.com/">CartoDB</a>'
                      url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
                    />
                    <Marker
                      position={[resultado.latitude, resultado.longitude]}
                    >
                      <Popup>
                        {resultado.ip} - {resultado.city}, {resultado.country}
                      </Popup>
                    </Marker>
                  </MapContainer>
                </div>
              </div>
            ) : (
              <p className="text-sm text-neutral-400">
                As informações aparecerão aqui.
              </p>
            )}
          </div>

          {/* Botões */}
          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            <button
              onClick={buscar}
              disabled={loading}
              className={`flex items-center gap-2 rounded-full bg-blue-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-blue-700 ${
                loading ? "cursor-not-allowed opacity-50" : ""
              }`}
            >
              <Search size={18} /> {loading ? "Buscando..." : "Buscar"}
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
