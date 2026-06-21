import bcrypt from 'bcryptjs'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function main() {
  const passwordHash = await bcrypt.hash('password123', 10)

  const user = await prisma.user.upsert({
    where: { email: 'demo@devtrack.local' },
    update: {},
    create: {
      email: 'demo@devtrack.local',
      name: 'Demo User',
      passwordHash,
    },
  })

  const website = await prisma.project.create({
    data: {
      name: 'Strona firmowa',
      description: 'Nowa strona marketingowa firmy.',
      ownerId: user.id,
      tasks: {
        create: [
          {
            title: 'Skonfigurowac repozytorium',
            description: 'Dodac .gitignore, README i pierwszy commit.',
            status: 'DONE',
            priority: 'MEDIUM',
          },
          {
            title: 'Zaprojektowac widok listy zadan',
            description: 'Layout listy oraz prosty formularz dodawania.',
            status: 'IN_PROGRESS',
            priority: 'HIGH',
          },
        ],
      },
    },
  })

  await prisma.project.create({
    data: {
      name: 'Aplikacja mobilna',
      description: 'MVP aplikacji do zamawiania jedzenia.',
      ownerId: user.id,
      tasks: {
        create: [
          {
            title: 'Makieta ekranu zamowienia',
            description: 'Figma: ekran wyboru dan i koszyka.',
            priority: 'MEDIUM',
          },
        ],
      },
    },
  })

  console.log(`Seed zakonczony dla demo@devtrack.local, projekt startowy: ${website.name}`)
}

main()
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
