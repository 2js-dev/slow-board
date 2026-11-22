import type { HealthResponse } from '@/types/health'

export async function fetchHealth(): Promise<HealthResponse> {
  const response = await fetch('/api/health')
  if (!response.ok) {
    throw new Error(`서버 응답 오류: HTTP ${response.status}`)
  }
  return (await response.json()) as HealthResponse
}
