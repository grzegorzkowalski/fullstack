import { NextResponse } from 'next/server'
import { mockProjects } from './mockProjects'

export async function GET() {
  return NextResponse.json(mockProjects)
}
