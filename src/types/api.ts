export type ApiResponse<T> = {
  success: boolean
  data: T | null
  error: string | null
}

export type PaginatedResponse<T> = ApiResponse<T[]> & {
  meta: {
    total: number
    page: number
    limit: number
    hasMore: boolean
  }
}

export function ok<T>(data: T): ApiResponse<T> {
  return { success: true, data, error: null }
}

export function fail(error: string): ApiResponse<null> {
  return { success: false, data: null, error }
}
