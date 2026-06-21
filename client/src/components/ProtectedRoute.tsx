'use client'

import { useEffect, type ReactNode } from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '../context/UserContext'

function ProtectedRoute({ children }: { children: ReactNode }) {
  const { user } = useUser()
  const router = useRouter()

  useEffect(() => {
    if (!user) router.replace('/login')
  }, [router, user])

  if (!user) return <p className="hint">Przekierowanie do logowania...</p>

  return children
}

export default ProtectedRoute
