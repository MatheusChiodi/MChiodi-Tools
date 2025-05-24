import { motion } from "framer-motion";

export function TermosEPrivacidade() {
  return (
    <motion.section
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7 }}
      className="mx-auto max-w-4xl space-y-8 text-neutral-200"
    >
      <h1 className="text-4xl font-extrabold text-neutral-50">
        Termos de Uso e Política de Privacidade
      </h1>

      <p className="text-sm opacity-70">Última atualização: Maio de 2025</p>

      <div className="space-y-6 text-sm leading-relaxed md:text-base">
        <div>
          <h2 className="text-xl font-semibold text-neutral-100">
            1. Aceitação dos Termos
          </h2>
          <p className="text-neutral-400">
            Ao acessar e utilizar o site{" "}
            <span className="text-blue-400">MChiodi Tools</span>, você concorda
            com os presentes Termos de Uso e Política de Privacidade. Caso não
            concorde com algum dos termos, por favor, não utilize nossos
            serviços.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-neutral-100">
            2. Descrição do Serviço
          </h2>
          <p className="text-neutral-400">
            O MChiodi Tools oferece ferramentas gratuitas para desenvolvedores,
            como geradores, validadores, calculadoras e utilitários técnicos. As
            ferramentas são destinadas exclusivamente para uso educacional,
            testes e desenvolvimento.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-neutral-100">
            3. Dados Pessoais
          </h2>
          <p className="text-neutral-400">
            Não coletamos, armazenamos ou processamos dados pessoais sensíveis.
            Todo dado gerado através das ferramentas é fictício ou utilizado
            localmente no seu dispositivo. Nenhuma informação é enviada ou
            armazenada em nossos servidores.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-neutral-100">
            4. Limitações de Uso
          </h2>
          <p className="text-neutral-400">
            É proibido utilizar qualquer ferramenta do MChiodi Tools para
            atividades ilegais, fraudulentas ou que violem leis locais,
            nacionais ou internacionais. O MChiodi Tools não se responsabiliza
            pelo uso indevido de qualquer informação ou dado gerado na
            plataforma.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-neutral-100">
            5. Responsabilidade
          </h2>
          <p className="text-neutral-400">
            O MChiodi Tools não garante que os serviços estarão sempre
            disponíveis, livres de erros ou interrupções. Não nos
            responsabilizamos por perdas, danos ou prejuízos decorrentes do uso
            ou impossibilidade de uso do site.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-neutral-100">
            6. Alterações nos Termos
          </h2>
          <p className="text-neutral-400">
            Estes termos podem ser atualizados periodicamente sem aviso prévio.
            Recomendamos que revise esta página regularmente para se manter
            informado sobre eventuais alterações.
          </p>
        </div>

        <div>
          <h2 className="text-xl font-semibold text-neutral-100">7. Contato</h2>
          <p className="text-neutral-400">
            Se você tiver dúvidas sobre estes Termos ou sobre a Política de
            Privacidade, entre em contato através de nossas redes sociais ou
            email disponível no rodapé do site.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
