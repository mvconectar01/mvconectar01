export interface SolutionItem {
  id: string;
  title: string;
  tagline: string;
  description: string;
  iconName: string;
  features: string[];
  highlight?: boolean;
}

export interface SegmentItem {
  id: string;
  title: string;
  emoji: string;
  shortDesc: string;
  useCase: string;
  benefits: string[];
  exampleAction: string;
}

export const OFFICIAL_LINKS = {
  whatsapp: 'https://wa.link/nvmp81',
  instagram: 'https://www.instagram.com/mvconectar?stkn=MTc4bXVpbzBjeTFoYg%3D%3D&utm_source=qr',
  logoUrl: 'https://i.postimg.cc/fWgNwy27/Whats-App-Image-2026-10-07-at-19-22-22.jpg',
  brandName: 'MV Conectar',
  slogan: 'Conecte sua empresa ao digital.',
  subSlogan: 'Centralize sua presença online, transforme clientes presenciais em seguidores digitais e acelere suas vendas com tecnologia inteligente.',
  footerQuote: 'Conectando empresas, pessoas e oportunidades.'
};

export const SOLUTIONS: SolutionItem[] = [
  {
    id: 'biosite',
    title: 'BioSite Profissional',
    tagline: 'Sua vitrine digital em um único link',
    description: 'Página ultra-rápida, moderna e 100% responsiva para colocar na bio do Instagram ou acessar via QR Code/NFC, reunindo todos os seus canais de atendimento e produtos.',
    iconName: 'Layout',
    features: ['Carregamento instantâneo', 'Sem custos de hospedagem pesada', 'Design exclusivo da sua marca', 'Botões de alta conversão'],
    highlight: true,
  },
  {
    id: 'nfc',
    title: 'NFC por Aproximação',
    tagline: 'Encostou, conectou',
    description: 'Tecnologia por aproximação que abre seu BioSite ou página de avaliação no celular do cliente em menos de 1 segundo, sem precisar de aplicativo.',
    iconName: 'Radio',
    features: ['Compatível com iOS e Android', 'Não precisa de pilhas ou bateria', 'Durabilidade vitalícia', 'Acabamento acrílico premium'],
    highlight: true,
  },
  {
    id: 'qrcode',
    title: 'QR Code Dinâmico',
    tagline: 'Escaneamento rápido e elegante',
    description: 'QR Code de alta precisão gravado em suporte físico ou display para mesas, balcões e frotas, com leitura garantida por qualquer smartphone.',
    iconName: 'QrCode',
    features: ['Leitura mesmo com pouca luz', 'Design integrado à sua marca', 'Link editável a qualquer hora', 'Sem limite de acessos'],
  },
  {
    id: 'google',
    title: 'Google & Avaliações 5★',
    tagline: 'Multiplique avaliações no Google Maps',
    description: 'Facilite em 10x para seu cliente avaliar seu negócio no Google. Empresas com mais avaliações 5 estrelas conquistam as primeiras posições nas buscas locais.',
    iconName: 'Star',
    features: ['Abre direto na tela de 5 estrelas', 'Aumento de 300% em reviews', 'Posicionamento nº1 na sua cidade', 'Credibilidade imediata'],
    highlight: true,
  },
  {
    id: 'presenca',
    title: 'Presença Digital',
    tagline: 'Identidade de alto padrão online',
    description: 'Estruturação profissional dos pontos de contato da sua empresa para transmitir autoridade, confiança e modernidade a quem procura seus serviços.',
    iconName: 'Globe',
    features: ['Padronização visual moderna', 'Comunicação coerente', 'Destaque frente à concorrência', 'Percepção de valor elevado'],
  },
  {
    id: 'instagram',
    title: 'Instagram & Redes',
    tagline: 'Otimização de tráfego social',
    description: 'Transforme seguidores curiosos em clientes pagantes com pontos de contato estratégicos no perfil oficial da sua empresa.',
    iconName: 'Instagram',
    features: ['Link na bio otimizado', 'Encaminhamento rápido', 'Facilidade para novos contatos', 'Sem atrito de navegação'],
  },
  {
    id: 'whatsapp',
    title: 'WhatsApp Integrado',
    tagline: 'Conversas imediatas com mensagem pronta',
    description: 'Direcione o cliente direto para o seu WhatsApp com mensagem pré-configurada, acelerando o tempo de resposta e fechamento de vendas.',
    iconName: 'MessageSquare',
    features: ['Mensagens personalizadas', 'Roteamento para atendentes', 'Sem necessidade de salvar contato', 'Aumento na taxa de resposta'],
  },
  {
    id: 'divulgacao',
    title: 'Divulgação Estratégica',
    tagline: 'Sua marca em evidência',
    description: 'Pontos de contato físicos estrategicamente posicionados no seu ponto de venda para divulgar promoções, cardápio e lançamentos.',
    iconName: 'Share2',
    features: ['Visibilidade no ponto de venda', 'Interação espontânea', 'Divulgação sem custo recorrente', 'Fácil reposicionamento'],
  },
  {
    id: 'captacao',
    title: 'Captação de Clientes',
    tagline: 'Do físico para a sua base de contatos',
    description: 'Converta clientes presenciais em contatos no WhatsApp e seguidores fiéis para campanhas de remarketing e fidelização contínua.',
    iconName: 'Users',
    features: ['Retenção de clientes', 'Crescimento de base própria', 'Fidelização contínua', 'Zero dependência de panfletos'],
  },
  {
    id: 'automacao',
    title: 'Automação de Atendimento',
    tagline: 'Agilidade sem filas ou espera',
    description: 'Permita que o cliente consulte cardápios, horários, localização e formas de pagamento sozinho, liberando sua equipe.',
    iconName: 'Cpu',
    features: ['Autoatendimento descomplicado', 'Menos sobrecarga no balcão', 'Informações sempre atualizadas', 'Experiência fluida'],
  },
  {
    id: 'solucoes_empresas',
    title: 'Soluções Digitais sob Medida',
    tagline: 'Consultoria e implantação completa',
    description: 'Desenvolvimento e customização completa da identidade digital da sua empresa com suporte dedicado da equipe MV Conectar.',
    iconName: 'Sparkles',
    features: ['Atendimento consultivo', 'Suporte pós-implantação', 'Configuração técnica inclusa', 'Pronto para usar'],
  },
];

export const SEGMENTS: SegmentItem[] = [
  {
    id: 'hamburguerias',
    title: 'Hamburguerias',
    emoji: '🍔',
    shortDesc: 'Cardápio digital no balcão e avaliações 5 estrelas',
    useCase: 'Placa NFC/QR Code na mesa ou balcão para acessar cardápio de combos e pedir avaliação no Google enquanto saboreia o lanche.',
    benefits: ['Fim dos cardápios de papel engordurados', 'Multiplicação de notas 5 estrelas no Google', 'Pedidos rápidos no WhatsApp'],
    exampleAction: 'Ver cardápio & Avaliar',
  },
  {
    id: 'pizzarias',
    title: 'Pizzarias',
    emoji: '🍕',
    shortDesc: 'Pedidos rápidos, cardápio de sabores e fidelização',
    useCase: 'O cliente encosta o celular na caixa de pizza ou na mesa e faz novo pedido direto no WhatsApp em 1 clique.',
    benefits: ['Recompra acelerada aos finais de semana', 'Cardápio de promoções sempre atualizado', 'Link direto com a cozinha'],
    exampleAction: 'Fazer Pedido & Promoções',
  },
  {
    id: 'barbearias',
    title: 'Barbearias',
    emoji: '💈',
    shortDesc: 'Agendamento no WhatsApp e fotos de cortes no Instagram',
    useCase: 'Placa elegante na bancada do barbeiro para o cliente seguir o perfil, ver modelos de corte e agendar a próxima sessão.',
    benefits: ['Agenda sempre cheia', 'Crescimento do Instagram com fotos reais', 'Avaliações no Google direto na cadeira'],
    exampleAction: 'Agendar Horário & Instagram',
  },
  {
    id: 'petshops',
    title: 'Pet Shops',
    emoji: '🐶',
    shortDesc: 'Banho e tosa, veterinário e catálogo de rações',
    useCase: 'Acesso rápido para agendar transporte do pet, ver catálogo de produtos e enviar foto da receita para a farmácia pet.',
    benefits: ['Agilidade no agendamento de banho e tosa', 'Fidelidade dos tutores', 'Atendimento rápido em emergências'],
    exampleAction: 'Agendar Banho & Tosa',
  },
  {
    id: 'saloes',
    title: 'Salões de Beleza',
    emoji: '💇',
    shortDesc: 'Portfólio de cabelos, unhas e agendamento VIP',
    useCase: 'Placa acrílica premium no espelho e na recepção para as clientes compartilharem o resultado nas redes e agendarem retoques.',
    benefits: ['Apresentação sofisticada', 'Indicação espontânea no Instagram', 'Depoimentos 5 estrelas no Google'],
    exampleAction: 'Ver Transformações & Agenda',
  },
  {
    id: 'clinicas',
    title: 'Clínicas & Consultórios',
    emoji: '🏥',
    shortDesc: 'Localização, especialidades e confirmação de consultas',
    useCase: 'BioSite com mapa interativo, lista de convênios atendidos, horário de médicos e botão de contato com a recepção.',
    benefits: ['Credibilidade e aspecto moderno', 'Pacientes encontram endereço sem erro', 'Avaliações espontâneas pós-consulta'],
    exampleAction: 'Especialidades & Localização',
  },
  {
    id: 'lojas',
    title: 'Lojas & Varejo',
    emoji: '🏪',
    shortDesc: 'Vitrine digital, novidades da semana e chave Pix',
    useCase: 'Placa no caixa para o cliente seguir as novidades, pagar via Pix e avaliar o atendimento antes de sair da loja.',
    benefits: ['Clientes voltam mais vezes', 'Crescimento da base de seguidores locais', 'Agilidade no pagamento'],
    exampleAction: 'Ver Coleção & Pix',
  },
  {
    id: 'restaurantes',
    title: 'Restaurantes',
    emoji: '🍽️',
    shortDesc: 'Menu completo, carta de vinhos e reservas de mesa',
    useCase: 'Display de mesa moderno com NFC e QR Code para consulta rápida de pratos do dia, sobremesas e avaliação final.',
    benefits: ['Atendimento mais ágil para os garçons', 'Avaliações no Google explodindo', 'Reserva de mesas descomplicada'],
    exampleAction: 'Menu Digital & Reservas',
  },
  {
    id: 'motoristas',
    title: 'Motoristas & Transporte',
    emoji: '🚗',
    shortDesc: 'Chave Pix no encosto, contato para corridas e review',
    useCase: 'Placa compacta no encosto do banco para passageiros pagarem via Pix com rapidez, salvarem o WhatsApp para corridas particulares e avaliarem.',
    benefits: ['Sem troca de troco ou maquininha travada', 'Conquista de clientes fixos', 'Avaliação rápida'],
    exampleAction: 'Pagar no Pix & Contato',
  },
  {
    id: 'empresas',
    title: 'Empresas & Profissionais',
    emoji: '🏢',
    shortDesc: 'Cartão de visitas interativo que nunca acaba',
    useCase: 'Substitua caixas de cartões de papel por um único cartão ou placa NFC. Em qualquer reunião, encoste o cartão no celular do cliente e todos os seus dados se abrem.',
    benefits: ['Impacto imediato em reuniões de negócios', 'Informações sempre atualizadas', 'Sustentável e inovador'],
    exampleAction: 'Conectar & Salvar Contato',
  },
];

export const HOW_IT_WORKS_STEPS = [
  {
    number: '01',
    title: 'Escolha sua solução',
    description: 'Defina se você precisa do BioSite online, da placa física de NFC e QR Code, ou do combo completo de conexão digital.',
  },
  {
    number: '02',
    title: 'Personalizamos para sua empresa',
    description: 'Nossa equipe adapta tudo com as cores, logotipo, links de WhatsApp, Instagram, Google Meu Negócio e chave Pix da sua marca.',
  },
  {
    number: '03',
    title: 'Você recebe sua solução',
    description: 'Ativação imediata do seu BioSite na internet e envio da sua placa física premium com acabamento profissional pronta para uso.',
  },
  {
    number: '04',
    title: 'Comece a conectar seus clientes',
    description: 'Coloque a placa no balcão ou nas mesas, adicione o link na sua bio e veja seus clientes interagirem e avaliarem em 1 toque.',
  },
];

export const WHY_MV_ITEMS = [
  {
    title: 'Mais presença digital',
    description: 'Sua marca com apresentação de alto nível nos principais canais da internet.',
  },
  {
    title: 'Mais facilidade para seus clientes',
    description: 'Sem digitar links longos ou procurar na busca: basta aproximar ou escanear.',
  },
  {
    title: 'Mais profissionalismo',
    description: 'Transmita confiança imediata com um padrão visual tecnológico e moderno.',
  },
  {
    title: 'Mais oportunidades',
    description: 'Transforme visitantes casuais em contatos salvos no WhatsApp e seguidores.',
  },
  {
    title: 'Mais conexão',
    description: 'Crie uma ponte direta e humanizada entre o seu ponto de venda e o digital.',
  },
  {
    title: 'Mais resultados',
    description: 'Aumento real em avaliações 5 estrelas no Google e fechamento de pedidos.',
  },
];
