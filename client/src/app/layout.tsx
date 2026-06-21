import type { ReactNode } from 'react'
import { Providers } from './providers'
import './globals.css'

export const metadata = {
  title: 'DevTrack',
  description: 'Mini-system zarzadzania zadaniami projektowymi',
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="pl">
      <body>
        <Providers>
          <div className="app">
            <header className="app-header">
              <h1>DevTrack</h1>
              <p>Mini-system zarzadzania zadaniami projektowymi</p>
            </header>
            <main>{children}</main>
          </div>
        </Providers>
      </body>
    </html>
  )
}
