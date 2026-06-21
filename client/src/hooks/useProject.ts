import { useEffect, useState } from 'react'
import { apiGet } from '../api/client'
import type { Project } from '../types'

export function useProject(id: string | undefined) {
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(Boolean(id))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    let isMounted = true

    async function loadProject() {
      setLoading(true)
      setError(null)
      try {
        const data = await apiGet<Project>(`/projects/${id}`)
        if (isMounted) setProject(data)
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : 'Nieznany blad')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadProject()
    return () => {
      isMounted = false
    }
  }, [id])

  return { project, loading, error }
}
