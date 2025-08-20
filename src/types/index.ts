export interface User {
  id: number
  username: string
  email: string
  user_type: 'ADMIN' | 'MANAGER' | 'CENTRAL_STAFF' | 'DEPT_STAFF' | 'SUPPLIER'
  department?: string | null
}

export interface LoginCredentials {
  username: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}

export interface StockItem {
  id: number
  name: string
  quantity: number
  location: string
  last_updated: string
  eth_contract_id: string
}

export interface StockRequest {
  id: number
  item: StockItem
  quantity: number
  requester: string
  status: 'PENDING' | 'APPROVED' | 'REJECTED' | 'FULFILLED' | 'CANCELLED'
  department: string
  urgent: boolean
  tx_hash?: string
  created_at: string
}

export interface CreateStockRequest {
  item_id: number
  quantity: number
  urgent: boolean
}

export interface UpdateStockRequest {
  status: 'APPROVED' | 'REJECTED' | 'CANCELLED'
}

export interface StockMovement {
  id: number
  item: number
  from_location?: string
  to_location: string
  quantity: number
  moved_by: string
  timestamp: string
  tx_hash?: string
}

export interface CreateStockMovement {
  item: number
  to_location: string
  quantity: number
}

export interface DamageReport {
  id: number
  item: number
  quantity: number
  description: string
  reported_by: string
  reported_at: string
  tx_hash?: string
}

export interface CreateDamageReport {
  item: number
  quantity: number
  description: string
}

export interface SupplierDeliveryItem {
  item: number
  quantity: number
}

export interface SupplierDelivery {
  id: number
  supplier: string
  items: SupplierDeliveryItem[]
  status: 'PENDING' | 'VERIFIED' | 'REJECTED'
  created_at: string
  verified_at?: string
  tx_hash?: string
}

export interface CreateSupplierDelivery {
  items: SupplierDeliveryItem[]
}

export interface BlockchainLog {
  tx_hash: string
  action: 'REQUEST' | 'MOVEMENT' | 'DAMAGE' | 'DELIVERY' | 'VERIFICATION'
  item_id: number
  quantity: number
  user: string
  timestamp: string
  block_number: number
}

export interface TransactionVerification {
  valid: boolean
  tx_hash: string
  block_number: number
  confirmations: number
}

export interface DashboardStats {
  total_items: number
  total_quantity: number
  pending_requests: number
  approved_requests: number
  rejected_requests: number
  recent_movements: number
  damage_reports: number
}

export interface PaginatedResponse<T> {
  count: number
  next: string | null
  previous: string | null
  results: T[]
}

export interface ApiError {
  error: string
  code: string
  details?: Record<string, string[]>
}

export interface PaginationParams {
  page?: number
  page_size?: number
  search?: string
  ordering?: string
}

export interface StockRequestFilters {
  status?: string
  requester?: string
  urgent?: boolean
}

export interface BlockchainLogFilters {
  action?: string
  user?: string
}

export interface BlockchainTransaction {
  id: number
  tx_hash: string
  operation_type: 'MOVEMENT' | 'REQUEST' | 'DAMAGE' | 'DELIVERY' | 'APPROVAL'
  status: 'pending' | 'confirmed' | 'failed'
  confirmations: number
  created_at: string
  user: string
  details: Record<string, any>
  block_number?: number
  gas_used?: number
}

export interface BlockchainConfig {
  enabled: boolean
  contractAddress: string
  network: string
  explorerUrl: string
}

export interface WalletState {
  isConnected: boolean
  account: string | null
  chainId: number | null
  balance: string | null
}