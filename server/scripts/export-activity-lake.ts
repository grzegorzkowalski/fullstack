import { mkdir, writeFile } from 'node:fs/promises'
import path from 'node:path'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const logs = await prisma.activityLog.findMany({
    include: { task: { select: { id: true, projectId: true, title: true } } },
    orderBy: { createdAt: 'asc' },
  })
  const outDir = path.resolve('data-lake')
  await mkdir(outDir, { recursive: true })
  const filePath = path.join(outDir, `activity-${new Date().toISOString().slice(0, 10)}.json`)
  await writeFile(filePath, JSON.stringify(logs, null, 2), 'utf-8')
  console.log(`Wyeksportowano ${logs.length} zdarzen do ${filePath}`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
