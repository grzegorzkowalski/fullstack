import { NextResponse } from 'next/server'
import { mockProjects } from '../mockProjects'

export async function GET(_request: Request, { params }: { params: { id: string } }) {
  const project = mockProjects.find((item) => item.id === params.id)

  if (!project) {
    return NextResponse.json({ message: 'Projekt nie istnieje' }, { status: 404 })
  }

  return NextResponse.json(project)
}
