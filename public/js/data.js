'use strict';
/*
 * Conteúdo editável da loja GadgetX Africa.
 *
 * Para atualizar o site basta, na maioria dos casos, mudar este ficheiro:
 *   - contact   → links de WhatsApp e Instagram usados em toda a página
 *   - families  → cartões do catálogo de iPhone (um por geração)
 *   - iphones   → modelos e capacidades mostrados no detalhe do produto
 *   - shop      → cartões das secções AirPods, Acessórios e Mais Apple
 *   - policies  → textos de Entregas, Devoluções, Privacidade e Termos
 *   - countries → países disponíveis no formulário de entrega
 *
 * As imagens ficam em public/assets/. Os caminhos abaixo são relativos a public/.
 */
const STORE = {
  contact: {
    whatsapp: 'https://wa.me/message/4E732CRQ5TRSF1',
    instagram: 'https://www.instagram.com/gadgetxafrica/'
  },

  // Número máximo de unidades por variante no carrinho.
  maxQtyPerItem: 5,

  // Um cartão por geração no catálogo. `lead` é o modelo aberto ao clicar no cartão.
  families: [
    {
      gen: '18',
      title: 'iPhone 18 Pro',
      label: 'EM DESTAQUE',
      sub: 'Pro e Pro Max.',
      image: 'assets/iphone18/pro-duo.webp',
      lead: '18pro',
      featured: true
    },
    {
      gen: 'fold',
      title: 'iPhone Fold',
      label: 'NOVO · DOBRÁVEL',
      sub: 'Descobre o iPhone dobrável.',
      image: 'assets/iphone18/cores/fold-branco.png',
      lead: 'fold'
    },
    {
      gen: '17',
      title: 'iPhone 17',
      label: 'FAMÍLIA IPHONE 17',
      sub: 'Descobre os modelos da família 17.',
      image: 'assets/iphone17.png',
      lead: '17'
    },
    {
      gen: '16',
      title: 'iPhone 16',
      label: 'FAMÍLIA IPHONE 16',
      sub: 'Descobre os modelos da família 16.',
      image: 'assets/iphone16.jpg',
      lead: '16'
    }
  ],

  // Cores com fotografia própria. `hex` é só a amostra circular; `image` é a foto mostrada ao escolher.
  // Para acrescentar uma cor: juntar uma linha aqui e a foto em public/assets/.
  colors: {
    iphone18pro: [
      { name: 'Borgonha', hex: '#6b2f3c', image: 'assets/iphone18/pro-duo.webp' },
      { name: 'Preto', hex: '#2b2b2e', image: 'assets/iphone18/cores/18pro-preto.png' },
      { name: 'Glacier', hex: '#b9c8da', image: 'assets/iphone18/cores/18pro-azul.png' },
      { name: 'Prateado', hex: '#e4e4e2', image: 'assets/iphone18/cores/18pro-prateado.png' }
    ],
    iphoneFold: [
      { name: 'Branco', hex: '#eeeeea', image: 'assets/iphone18/cores/fold-branco.png' },
      { name: 'Azul-noite', hex: '#2c3446', image: 'assets/iphone18/cores/fold-azul-noite.png' }
    ]
  },

  // `id` é guardado no carrinho do navegador: não mudar ids de modelos existentes.
  // `colors` aponta para uma lista em STORE.colors (opcional).
  iphones: [
    { id: '18pro', name: 'iPhone 18 Pro', gen: '18', sub: 'A nova geração Pro.', sizes: ['256 GB', '512 GB', '1 TB'], colors: 'iphone18pro' },
    { id: '18max', name: 'iPhone 18 Pro Max', gen: '18', sub: 'A nova geração, em Pro Max.', sizes: ['256 GB', '512 GB', '1 TB'], colors: 'iphone18pro' },
    // Capacidades do Fold ainda por confirmar pela GadgetX: substituir quando houver dados reais.
    { id: 'fold', name: 'iPhone Fold', gen: 'fold', sub: 'O iPhone que se dobra.', sizes: ['Capacidade a confirmar'], colors: 'iphoneFold' },
    { id: '17', name: 'iPhone 17', gen: '17', sub: 'O teu dia, no teu iPhone.', sizes: ['256 GB', '512 GB'] },
    { id: '17pro', name: 'iPhone 17 Pro', gen: '17', sub: 'Explora a família Pro.', sizes: ['256 GB', '512 GB', '1 TB'] },
    { id: '17max', name: 'iPhone 17 Pro Max', gen: '17', sub: 'Mais espaço para o teu dia.', sizes: ['256 GB', '512 GB', '1 TB'] },
    { id: '16', name: 'iPhone 16', gen: '16', sub: 'Uma escolha à tua medida.', sizes: ['128 GB', '256 GB', '512 GB'] },
    { id: '16plus', name: 'iPhone 16 Plus', gen: '16', sub: 'Descobre a versão Plus.', sizes: ['128 GB', '256 GB', '512 GB'] },
    { id: '16pro', name: 'iPhone 16 Pro', gen: '16', sub: 'A experiência Pro.', sizes: ['128 GB', '256 GB', '512 GB', '1 TB'] },
    { id: '16max', name: 'iPhone 16 Pro Max', gen: '16', sub: 'A família 16, em Pro Max.', sizes: ['256 GB', '512 GB', '1 TB'] }
  ],

  // Cada chave corresponde a um <div class="shop-grid" data-shop="..."> em index.html.
  shop: {
    audio: [
      { eyebrow: 'AIRPODS', name: 'AirPods Pro', image: 'assets/airpods-pro.jpeg' },
      { eyebrow: 'AIRPODS', name: 'AirPods', image: 'assets/airpods.jpeg' },
      { eyebrow: 'AUDIO', name: 'AirPods Max', image: 'assets/airpods-max.jpeg' }
    ],
    acessorios: [
      { eyebrow: 'PROTEÇÃO', name: 'Capa para iPhone', image: 'assets/case.jpeg' },
      { eyebrow: 'CARREGAMENTO', name: 'Carregador MagSafe', image: 'assets/magsafe.jpeg' },
      { eyebrow: 'ACESSÓRIOS', name: 'Bracelete Apple Watch', image: 'assets/watch-band.jpeg' }
    ],
    universo: [
      { eyebrow: 'NO TEU PULSO', name: 'Apple Watch', image: 'assets/watch.png' },
      { eyebrow: 'NA TUA CASA', name: 'HomePod mini', image: 'assets/homepod.jpeg' },
      { eyebrow: 'ENTRETENIMENTO', name: 'Apple TV', image: 'assets/appletv.png' }
    ]
  },

  // O `body` é HTML: escrever apenas conteúdo de confiança.
  policies: {
    entregas: {
      title: 'Entregas e expedição.',
      body: `
        <p>Os iPhones serão expedidos a partir da África do Sul. A GadgetX pretende servir clientes em toda a África, com entrega na morada indicada na encomenda.</p>
        <h3>Antes de confirmar a compra</h3>
        <p>O checkout deverá apresentar a disponibilidade para o destino, o custo do transporte, o prazo estimado e a responsabilidade por impostos ou encargos de importação. Estes dados ainda estão em preparação.</p>
        <h3>Acompanhamento</h3>
        <p>A confirmação e o acompanhamento da encomenda serão disponibilizados após a implementação do sistema de vendas e da transportadora.</p>
        <p class="notice">Rascunho para revisão da GadgetX. Esta versão não confirma cobertura de entrega, prazos, portes nem encomendas.</p>`
    },
    devolucoes: {
      title: 'Devoluções e garantia.',
      body: `
        <p>Esta página apresenta a estrutura proposta para a política de devoluções. As condições comerciais finais ainda precisam de ser definidas pela GadgetX.</p>
        <h3>Solicitar apoio</h3>
        <p>Para comunicar um problema, o cliente deverá identificar a encomenda, descrever o motivo do contacto e, quando relevante, fornecer fotografias do produto ou da embalagem. A equipa indicará os próximos passos e a morada de devolução.</p>
        <h3>Preparar o equipamento</h3>
        <p>Antes de devolver um iPhone, faz uma cópia de segurança, remove os dados pessoais e segue as instruções recebidas para remover a associação à conta e o bloqueio de ativação. Não envies palavras-passe à loja.</p>
        <h3>Condições por completar</h3>
        <ul>
          <li>Prazo e condições para devolução por mudança de decisão.</li>
          <li>Procedimento para produtos defeituosos, danificados ou incorretos.</li>
          <li>Responsabilidade pelo transporte e prazos de reembolso.</li>
          <li>Duração, entidade responsável e cobertura territorial da garantia.</li>
        </ul>
        <p>Os direitos obrigatórios do consumidor aplicáveis à compra devem ser respeitados. As regras finais dependem da entidade vendedora e do destino.</p>
        <p class="notice">Rascunho, sem vigência comercial. Requer os dados da empresa e revisão jurídica para os mercados atendidos antes da abertura das vendas.</p>`
    },
    privacidade: {
      title: 'Privacidade.',
      body: `
        <h3>Nesta demonstração</h3>
        <p>Os dados introduzidos no formulário de entrega são utilizados apenas nesta página para mostrar a revisão. Não são enviados a um servidor nem guardados pelo formulário. Ao recarregar a página, esses dados são apagados.</p>
        <p>O carrinho guarda no navegador apenas o modelo, a capacidade e a quantidade, para manter a seleção entre visitas. Podes removê-los esvaziando o carrinho ou apagando os dados do site.</p>
        <h3>Na loja definitiva</h3>
        <p>O tratamento de nome, contacto e morada servirá para processar encomendas, pagamentos e entregas. Antes de ativar essa recolha, esta política deverá identificar a empresa responsável, os prestadores envolvidos, os prazos de conservação e o contacto para exercer direitos sobre os dados.</p>
        <p>Os links de WhatsApp e Instagram abrem serviços externos, sujeitos às respetivas políticas.</p>
        <p class="notice">A política definitiva será completada antes da abertura das vendas.</p>`
    },
    termos: {
      title: 'Termos de compra.',
      body: `
        <p>Esta versão permite explorar o catálogo e experimentar o percurso de compra. Não celebra contratos, reserva produtos, aceita encomendas ou cobra pagamentos.</p>
        <h3>Informação dos produtos</h3>
        <p>Os modelos apresentados compõem o catálogo proposto. Preços, condições dos equipamentos, variantes e disponibilidade serão confirmados pela GadgetX antes do lançamento.</p>
        <h3>Confirmação e pagamento</h3>
        <p>A loja definitiva deverá permitir rever e corrigir a encomenda e apresentar o total, a moeda, os portes e eventuais encargos antes do pagamento. O processamento será configurado com o prestador selecionado pela GadgetX.</p>
        <h3>Identificação da empresa</h3>
        <p>Nome legal, número de registo, endereço comercial, contacto de apoio e país de estabelecimento: por preencher pela GadgetX.</p>
        <p class="notice">Rascunho para revisão. A disponibilização dos produtos e as vendas serão ativadas após a conclusão das condições comerciais e operacionais.</p>`
    }
  },

  countries: [
    'África do Sul', 'Angola', 'Argélia', 'Benim', 'Botsuana', 'Burquina Faso', 'Burundi', 'Cabo Verde',
    'Camarões', 'Chade', 'Comores', 'Congo', 'Costa do Marfim', 'Djibuti', 'Egito', 'Eritreia', 'Essuatíni',
    'Etiópia', 'Gabão', 'Gâmbia', 'Gana', 'Guiné', 'Guiné-Bissau', 'Guiné Equatorial', 'Lesoto', 'Libéria',
    'Líbia', 'Madagáscar', 'Maláui', 'Mali', 'Marrocos', 'Maurícia', 'Mauritânia', 'Moçambique', 'Namíbia',
    'Níger', 'Nigéria', 'Quénia', 'República Centro-Africana', 'República Democrática do Congo', 'Ruanda',
    'São Tomé e Príncipe', 'Senegal', 'Seicheles', 'Serra Leoa', 'Somália', 'Sudão', 'Sudão do Sul',
    'Tanzânia', 'Togo', 'Tunísia', 'Uganda', 'Zâmbia', 'Zimbábue'
  ]
};
