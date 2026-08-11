import { z } from 'zod'

const passwordSchema = z
  .string()
  .min(8, 'Mínimo de 8 caracteres')
  .regex(/[A-Z]/, 'Inclua ao menos uma letra maiúscula')
  .regex(/[0-9]/, 'Inclua ao menos um número')

export const loginSchema = z.object({
  email: z.string().email('E-mail inválido'),
  password: z.string().min(1, 'Informe a senha'),
})

export const registerSchema = z
  .object({
    fullName: z.string().min(3, 'Nome completo obrigatório'),
    email: z.string().email('E-mail inválido'),
    phone: z.string().min(10, 'Telefone inválido'),
    role: z.enum(['company', 'driver'], {
      message: 'Selecione o tipo de conta',
    }),
    password: passwordSchema,
    confirmPassword: z.string(),
    acceptTerms: z.literal(true, {
      message: 'Aceite os termos para continuar',
    }),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'As senhas não coincidem',
    path: ['confirmPassword'],
  })

export const forgotPasswordSchema = z.object({
  email: z.string().email('E-mail inválido'),
})

export const companySchema = z.object({
  legalName: z.string().min(3, 'Razão social obrigatória'),
  tradeName: z.string().min(2, 'Nome fantasia obrigatório'),
  document: z.string().min(14, 'CNPJ inválido'),
  phone: z.string().min(10, 'Telefone inválido'),
  city: z.string().min(2, 'Cidade obrigatória'),
  state: z.string().length(2, 'UF inválida'),
})

export const driverSchema = z.object({
  fullName: z.string().min(3, 'Nome obrigatório'),
  document: z.string().min(11, 'CPF inválido'),
  cnh: z.string().min(5, 'CNH inválida'),
  cnhCategory: z.string().min(1, 'Categoria obrigatória'),
  phone: z.string().min(10, 'Telefone inválido'),
  city: z.string().min(2, 'Cidade obrigatória'),
  state: z.string().length(2, 'UF inválida'),
})

export const vehicleSchema = z.object({
  plate: z.string().min(7, 'Placa inválida'),
  brand: z.string().min(2, 'Marca obrigatória'),
  model: z.string().min(1, 'Modelo obrigatório'),
  year: z.coerce.number().min(1990).max(new Date().getFullYear() + 1),
  type: z.string().min(1, 'Tipo obrigatório'),
  capacityKg: z.coerce.number().positive('Capacidade inválida'),
})

export const loadSchema = z.object({
  title: z.string().min(5, 'Título muito curto'),
  description: z.string().min(10, 'Descreva a carga'),
  originCity: z.string().min(2, 'Cidade de origem'),
  originState: z.string().length(2, 'UF origem'),
  destinationCity: z.string().min(2, 'Cidade de destino'),
  destinationState: z.string().length(2, 'UF destino'),
  cargoType: z.string().min(2, 'Tipo de carga'),
  weightKg: z.coerce.number().positive('Peso inválido'),
  price: z.coerce.number().positive('Valor inválido'),
  vehicleType: z.string().min(1, 'Tipo de veículo'),
  pickupDate: z.string().min(1, 'Data de coleta'),
})

export const profileSchema = z.object({
  fullName: z.string().min(3, 'Nome obrigatório'),
  phone: z.string().min(10, 'Telefone inválido'),
  bio: z.string().max(500, 'Máximo 500 caracteres').optional(),
})

export const messageSchema = z.object({
  content: z.string().min(1, 'Mensagem vazia').max(2000, 'Mensagem muito longa'),
})

export type LoginInput = z.infer<typeof loginSchema>
export type RegisterInput = z.infer<typeof registerSchema>
export type ForgotPasswordInput = z.infer<typeof forgotPasswordSchema>
export type CompanyInput = z.infer<typeof companySchema>
export type DriverInput = z.infer<typeof driverSchema>
export type VehicleInput = z.infer<typeof vehicleSchema>
export type LoadInput = z.infer<typeof loadSchema>
export type ProfileInput = z.infer<typeof profileSchema>
export type MessageInput = z.infer<typeof messageSchema>
