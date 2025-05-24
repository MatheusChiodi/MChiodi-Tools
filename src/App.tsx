import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Layout } from "./components/Layout";
import { ScrollToTop } from "./components/ScrollToTop";
import { Home } from "./pages/Home";
import { Ferramentas } from "./pages/Ferramentas";
import { Sobre } from "./pages/Sobre";
import { TermosEPrivacidade } from "./pages/TermosEPrivacidade";
import { NotFound } from "./pages/NotFound";
import { GeradorCPF } from "./ferramentas/GeradorCPF";
import { GeradorCNPJ } from "./ferramentas/GeradorCNPJ";
import { GeradorUUID } from "./ferramentas/GeradorUUID";
import { GeradorLorem } from "./ferramentas/GeradorLorem";
import { GeradorQRCode } from "./ferramentas/GeradorQRCode";
import { BuscaCEP } from "./ferramentas/BuscaCEP";
import { GeradorSlug } from "./ferramentas/GeradorSlug";
import { GeradorMD5 } from "./ferramentas/GeradorMD5";
import { GeradorSHA256 } from "./ferramentas/GeradorSHA256";
import { Base64Encode } from "./ferramentas/Base64Encode";
import { Base64Decode } from "./ferramentas/Base64Decode";
import { ColorPicker } from "./ferramentas/ColorPicker";
import { GeradorGradiente } from "./ferramentas/GeradorGradiente";
import { FormatadorJSON } from "./ferramentas/FormatadorJSON";
import { JsonYamlConverter } from "./ferramentas/JsonYamlConverter";
import { CsvJsonConverter } from "./ferramentas/CsvJsonConverter";
import { XmlJsonConverter } from "./ferramentas/XmlJsonConverter";
import { UrlEncodeDecode } from "./ferramentas/UrlEncodeDecode";
import { HtmlEntitiesConverter } from "./ferramentas/HtmlEntitiesConverter";
import { CronGenerator } from "./ferramentas/CronGenerator";
import { JwtDecoder } from "./ferramentas/JwtDecoder";
import { TimestampConverter } from "./ferramentas/TimestampConverter";
import { RegexTester } from "./ferramentas/RegexTester";
import { IpLocator } from "./ferramentas/IpLocator";
import { MacGenerator } from "./ferramentas/MacGenerator";
import { PasswordGenerator } from "./ferramentas/PasswordGenerator";
import { CreditCardGenerator } from "./ferramentas/CreditCardGenerator";
import { JsonComparator } from "./ferramentas/JsonComparator";
import { ImageCompressor } from "./ferramentas/ImageCompressor";
import { FaviconGenerator } from "./ferramentas/FaviconGenerator";
import { CssMinifier } from "./ferramentas/CssMinifier";
import { JsMinifier } from "./ferramentas/JsMinifier";
import { HtmlMinifier } from "./ferramentas/HtmlMinifier";
import { MetaTagsGenerator } from "./ferramentas/MetaTagsGenerator";
import { RobotsGenerator } from "./ferramentas/RobotsGenerator";
import { SitemapGenerator } from "./ferramentas/SitemapGenerator";
import { DnsLookup } from "./ferramentas/DnsLookup";
import { EmojiFinder } from "./ferramentas/EmojiFinder";
import { ConversorTexto } from "./ferramentas/ConversorTexto";
import { EditorMarkdown } from "./ferramentas/EditorMarkdown";
import { VisualizadorJSON } from "./ferramentas/VisualizadorJSON";
import { VisualizadorCSV } from "./ferramentas/VisualizadorCSV";
import { HexParaRgb } from "./ferramentas/HexParaRgb";
import { RgbParaHex } from "./ferramentas/RgbParaHex";

export default function App() {
  return (
    <BrowserRouter>
      <Layout>
        <ScrollToTop />
        <Routes>
          <Route path="*" element={<NotFound />} />
          <Route path="/" element={<Home />} />
          <Route path="/sobre" element={<Sobre />} />
          <Route path="/termos" element={<TermosEPrivacidade />} />
          <Route path="/ferramentas" element={<Ferramentas />} />
          <Route path="/ferramentas/cpf" element={<GeradorCPF />} />
          <Route path="/ferramentas/cnpj" element={<GeradorCNPJ />} />
          <Route path="/ferramentas/uuid" element={<GeradorUUID />} />
          <Route path="/ferramentas/lorem" element={<GeradorLorem />} />
          <Route path="/ferramentas/qr-code" element={<GeradorQRCode />} />
          <Route path="/ferramentas/cep" element={<BuscaCEP />} />
          <Route path="/ferramentas/slug" element={<GeradorSlug />} />
          <Route path="/ferramentas/hash-md5" element={<GeradorMD5 />} />
          <Route path="/ferramentas/hash-sha256" element={<GeradorSHA256 />} />
          <Route path="/ferramentas/base64-encode" element={<Base64Encode />} />
          <Route path="/ferramentas/base64-decode" element={<Base64Decode />} />
          <Route path="/ferramentas/color-picker" element={<ColorPicker />} />
          <Route path="/ferramentas/gradient" element={<GeradorGradiente />} />
          <Route
            path="/ferramentas/json-formatter"
            element={<FormatadorJSON />}
          />
          <Route
            path="/ferramentas/json-yaml"
            element={<JsonYamlConverter />}
          />
          <Route path="/ferramentas/csv-json" element={<CsvJsonConverter />} />
          <Route path="/ferramentas/xml-json" element={<XmlJsonConverter />} />
          <Route path="/ferramentas/url-encode" element={<UrlEncodeDecode />} />
          <Route
            path="/ferramentas/html-entities"
            element={<HtmlEntitiesConverter />}
          />
          <Route path="/ferramentas/cron" element={<CronGenerator />} />
          <Route path="/ferramentas/jwt-decode" element={<JwtDecoder />} />
          <Route
            path="/ferramentas/timestamp"
            element={<TimestampConverter />}
          />
          <Route path="/ferramentas/regex-tester" element={<RegexTester />} />
          <Route path="/ferramentas/ip-info" element={<IpLocator />} />
          <Route path="/ferramentas/mac-generator" element={<MacGenerator />} />
          <Route
            path="/ferramentas/password-generator"
            element={<PasswordGenerator />}
          />
          <Route
            path="/ferramentas/credit-card"
            element={<CreditCardGenerator />}
          />
          <Route path="/ferramentas/json-diff" element={<JsonComparator />} />
          <Route
            path="/ferramentas/image-compressor"
            element={<ImageCompressor />}
          />
          <Route
            path="/ferramentas/favicon-generator"
            element={<FaviconGenerator />}
          />
          <Route path="/ferramentas/css-minifier" element={<CssMinifier />} />
          <Route path="/ferramentas/js-minifier" element={<JsMinifier />} />
          <Route path="/ferramentas/html-minifier" element={<HtmlMinifier />} />
          <Route
            path="/ferramentas/meta-tag-generator"
            element={<MetaTagsGenerator />}
          />
          <Route path="/ferramentas/robots-txt" element={<RobotsGenerator />} />
          <Route
            path="/ferramentas/sitemap-generator"
            element={<SitemapGenerator />}
          />
          <Route path="/ferramentas/dns-lookup" element={<DnsLookup />} />
          <Route path="/ferramentas/emoji-finder" element={<EmojiFinder />} />
          <Route path="/ferramentas/text-case" element={<ConversorTexto />} />
          <Route
            path="/ferramentas/markdown-editor"
            element={<EditorMarkdown />}
          />
          <Route
            path="/ferramentas/json-viewer"
            element={<VisualizadorJSON />}
          />
          <Route path="/ferramentas/csv-viewer" element={<VisualizadorCSV />} />
          <Route path="/ferramentas/hex-to-rgb" element={<HexParaRgb />} />
          <Route path="/ferramentas/rgb-to-hex" element={<RgbParaHex />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}
