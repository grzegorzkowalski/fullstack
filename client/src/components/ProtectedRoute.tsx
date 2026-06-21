'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../context/UserContext'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user, loading } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) router.replace('/login')
  }, [loading, router, user])

  if (loading) return <p className="hint">Odtwarzanie sesji...</p>
  if (!user) return <p className="hint">Przekierowanie do logowania...</p>

  return children
}

export default ProtectedRoute
