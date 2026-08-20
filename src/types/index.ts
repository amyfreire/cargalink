export type UserRole = 'company' | 'driver' | 'admin'

export type LoadStatus = 'draft' | 'open' | 'in_progress' | 'completed' | 'cancelled'

export type ApplicationStatus = 'pending' | 'accepted' | 'rejected' | 'withdrawn'

export type PaymentStatus = 'pending' | 'paid' | 'failed' | 'refunded'

export type SubscriptionStatus = 'active' | 'canceled' | 'past_due' | 'trialing'

export interface BaseEntity {
  id: string
  created_at: string
  updated_at: string
  deleted_at: string | null
}

export interface Profile extends BaseEntity {
  user_id: string
  full_name: string
  email: string
  phone: string | null
  avatar_url: string | null
  role: UserRole
  bio: string | null
  city: string | null
  state: string | null
  is_verified: boolean
}

export interface Company extends BaseEntity {
  owner_id: string
  legal_name: string
  trade_name: string
  document: string
  phone: string
  email: string | null
  city: string
  state: string
  logo_url: string | null
  rating_avg: number
  rating_count: number
}

export interface Driver extends BaseEntity {
  user_id: string
  full_name: string
  document: string
  cnh: string
  cnh_category: string
  phone: string
  city: string
  state: string
  rating_avg: number
  rating_count: number
  is_available: boolean
}

export interface Vehicle extends BaseEntity {
  owner_id: string
  plate: string
  brand: string
  model: string
  year: number
  type: string
  capacity_kg: number
  is_active: boolean
}

export interface Load extends BaseEntity {
  company_id: string
  title: string
  description: string
  origin_city: string
  origin_state: string
  destination_city: string
  destination_state: string
  cargo_type: string
  weight_kg: number
  price: number
  vehicle_type: string
  pickup_date: string
  delivery_date: string | null
  status: LoadStatus
  applications_count?: number
  company?: Pick<Company, 'trade_name' | 'rating_avg' | 'logo_url'>
}

export interface Application extends BaseEntity {
  load_id: string
  driver_id: string
  vehicle_id: string | null
  message: string | null
  proposed_price: number | null
  status: ApplicationStatus
}

export interface Contract extends BaseEntity {
  load_id: string
  company_id: string
  driver_id: string
  agreed_price: number
  status: 'active' | 'completed' | 'disputed' | 'cancelled'
  signed_at: string | null
}

export interface Message extends BaseEntity {
  conversation_id: string
  sender_id: string
  content: string
  read_at: string | null
}

export interface Conversation {
  id: string
  participant_ids: string[]
  load_id: string | null
  last_message: string | null
  last_message_at: string | null
  unread_count: number
  participant_name: string
  participant_avatar: string | null
}

export interface Notification extends BaseEntity {
  user_id: string
  title: string
  body: string
  type: 'info' | 'success' | 'warning' | 'error'
  link: string | null
  read_at: string | null
}

export interface Payment extends BaseEntity {
  contract_id: string
  amount: number
  status: PaymentStatus
  method: string | null
  paid_at: string | null
}

export interface Review extends BaseEntity {
  contract_id: string
  reviewer_id: string
  reviewee_id: string
  rating: number
  comment: string | null
}

export interface Plan extends BaseEntity {
  name: string
  description: string
  price_monthly: number
  features: string[]
  is_active: boolean
}

export interface Subscription extends BaseEntity {
  user_id: string
  plan_id: string
  status: SubscriptionStatus
  current_period_end: string
}

export interface DashboardKpis {
  activeLoads: number
  openApplications: number
  completedTrips: number
  monthlyRevenue: number
  averageRating: number
  unreadMessages: number
}

export interface ChartPoint {
  label: string
  value: number
}

export interface MapMarker {
  id: string
  lat: number
  lng: number
  label: string
  type: 'origin' | 'destination' | 'driver'
}

export interface ApplicationWithDriver extends Application {
  driver: Pick<Driver, 'full_name' | 'city' | 'state' | 'rating_avg' | 'rating_count'>
}

export type TrackingStatus =
  | 'accepted'
  | 'pickup_scheduled'
  | 'collected'
  | 'in_transit'
  | 'delivered'

export interface TrackingEvent extends BaseEntity {
  load_id: string
  status: TrackingStatus
  description: string
  location: string | null
}
