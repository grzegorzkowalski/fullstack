import { useEffect, useState } from 'react'
import { apiGet } from '../api/client'
import type { Project } from '../types'

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadProjects() {
      setLoading(true)
      setError(null)
      try {
        const data = await apiGet<Project[]>('/projects')
        if (isMounted) setProjects(data)
      } catch (err) {
        if (isMounted) setError(err instanceof Error ? err.message : 'Nieznany blad')
      } finally {
        if (isMounted) setLoading(false)
      }
    }

    loadProjects()
    return () => {
      isMounted = false
    }
  }, [])

  return { projects, loading, error }
}
