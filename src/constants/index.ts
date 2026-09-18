export const APP_NAME = 'CargaLink'
export const APP_TAGLINE = 'O frete certo, sem enrolação'
export const APP_DESCRIPTION =
  'Publique a carga, encontre quem leva e feche o frete. Feito para quem vive de estrada e de prazo.'

export const ROUTES = {
  home: '/',
  login: '/login',
  register: '/cadastro',
  forgotPassword: '/esqueci-senha',
  dashboard: '/app',
  profile: '/app/perfil',
  company: '/app/empresa',
  drivers: '/app/motoristas',
  vehicles: '/app/veiculos',
  loads: '/app/cargas',
  loadNew: '/app/cargas/nova',
  loadDetail: '/app/cargas/:id',
  map: '/app/mapa',
  messages: '/app/mensagens',
  finance: '/app/financeiro',
  notifications: '/app/notificacoes',
  reviews: '/app/avaliacoes',
  settings: '/app/configuracoes',
  admin: '/app/administracao',
} as const

export const VEHICLE_TYPES = [
  'Truck',
  'Carreta',
  'Bitrem',
  'Rodotrem',
  'VUC',
  'Toco',
  '3/4',
  'Van',
] as const

export const CARGO_TYPES = [
  'Granel',
  'Container',
  'Frigorificado',
  'Carga seca',
  'Perigosa',
  'Veículos',
  'Mudança',
  'Outros',
] as const

export const BRAZILIAN_STATES = [
  'AC', 'AL', 'AP', 'AM', 'BA', 'CE', 'DF', 'ES', 'GO', 'MA',
  'MT', 'MS', 'MG', 'PA', 'PB', 'PR', 'PE', 'PI', 'RJ', 'RN',
  'RS', 'RO', 'RR', 'SC', 'SP', 'SE', 'TO',
] as const

export const BRAZILIAN_STATE_OPTIONS = [
  { value: 'AC', label: 'Acre' },
  { value: 'AL', label: 'Alagoas' },
  { value: 'AP', label: 'Amapá' },
  { value: 'AM', label: 'Amazonas' },
  { value: 'BA', label: 'Bahia' },
  { value: 'CE', label: 'Ceará' },
  { value: 'DF', label: 'Distrito Federal' },
  { value: 'ES', label: 'Espírito Santo' },
  { value: 'GO', label: 'Goiás' },
  { value: 'MA', label: 'Maranhão' },
  { value: 'MT', label: 'Mato Grosso' },
  { value: 'MS', label: 'Mato Grosso do Sul' },
  { value: 'MG', label: 'Minas Gerais' },
  { value: 'PA', label: 'Pará' },
  { value: 'PB', label: 'Paraíba' },
  { value: 'PR', label: 'Paraná' },
  { value: 'PE', label: 'Pernambuco' },
  { value: 'PI', label: 'Piauí' },
  { value: 'RJ', label: 'Rio de Janeiro' },
  { value: 'RN', label: 'Rio Grande do Norte' },
  { value: 'RS', label: 'Rio Grande do Sul' },
  { value: 'RO', label: 'Rondônia' },
  { value: 'RR', label: 'Roraima' },
  { value: 'SC', label: 'Santa Catarina' },
  { value: 'SP', label: 'São Paulo' },
  { value: 'SE', label: 'Sergipe' },
  { value: 'TO', label: 'Tocantins' },
] as const

export const CNH_CATEGORIES = ['B', 'C', 'D', 'E'] as const

export const LOAD_STATUS = {
  draft: 'Rascunho',
  open: 'Aberta',
  in_progress: 'Em andamento',
  completed: 'Concluída',
  cancelled: 'Cancelada',
} as const

export const TRACKING_STATUS = {
  accepted: 'Motorista aceito',
  pickup_scheduled: 'Coleta agendada',
  collected: 'Coletado',
  in_transit: 'Em trânsito',
  delivered: 'Entregue',
} as const

export const PAGE_SIZE = 12
