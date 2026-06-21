import { useCallback, useEffect, useState } from 'react'
import { apiGet } from '../api/client'
import type { ProjectStats } from '../types'

export function useProjectStats(projectId: string | undefined) {
  const [stats, setStats] = useState<ProjectStats | null>(null)
  const [loading, setLoading] = useState(Boolean(projectId))
  const [error, setError] = useState<string | null>(null)
  const [version, setVersion] = useState(0)

  const refetch = useCallback(() => setVersion((current) => current + 1), [])

  useEffect(() => {
    if (!projectId) return
    let isMounted = true

    async function loadStats() {
      setLoading(true)
      setError(null)
      try {
        const data = await apiGet<ProjectStats>(`/projects/${projectId}/stats`)
        if (isMounted) setStats(data)
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : 'Nieznany blad')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadStats()
    return () => {
      isMounted = false
    }
  }, [projectId, version])

  return { stats, loading, error, refetch }
}
