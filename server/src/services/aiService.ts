import Anthropic from '@anthropic-ai/sdk'

const apiKey = process.env.ANTHROPIC_API_KEY
const client = apiKey ? new Anthropic({ apiKey }) : null
const MODEL = 'claude-haiku-4-5-20251001'

export class AiNotConfiguredError extends Error {
  constructor() {
    super('Integracja z AI nie jest skonfigurowana. Ustaw ANTHROPIC_API_KEY w server/.env')
  }
}

function requireClient(): Anthropic {
  if (!client) throw new AiNotConfiguredError()
  return client
}

export async function summarizeText(text: string): Promise<string> {
  if (!text.trim()) return 'Brak opisu do podsumowania.'

  const response = await requireClient().messages.create({
    model: MODEL,
    max_tokens: 200,
    system:
      'Jestes asystentem w systemie do zarzadzania zadaniami. Podsumuj opis zadania w maksymalnie 2 krotkich zdaniach, po polsku, bez wstepow.',
    messages: [{ role: 'user', content: text }],
  })
  const textBlock = response.content.find((block) => block.type === 'text')
  return textBlock?.type === 'text'
    ? textBlock.text.trim()
    : 'Nie udalo sie wygenerowac podsumowania.'
}

export async function answerProjectQuestion(
  question: string,
  context: { projectName: string; tasks: { title: string; status: string; priority: string }[] },
): Promise<string> {
  const tasksDescription = context.tasks
    .map((task) => `- "${task.title}" - status: ${task.status}, priorytet: ${task.priority}`)
    .join('\n')

  const response = await requireClient().messages.create({
    model: MODEL,
    max_tokens: 300,
    system:
      'Jestes asystentem projektowym. Odpowiadaj wylacznie na podstawie podanych danych o projekcie i jego zadaniach. Jesli odpowiedzi nie da sie ustalic z tych danych, powiedz to wprost. Odpowiadaj krotko, po polsku.',
    messages: [
      {
        role: 'user',
        content: `Projekt: ${context.projectName}\n\nZadania:\n${tasksDescription}\n\nPytanie: ${question}`,
      },
    ],
  })
  const textBlock = response.content.find((block) => block.type === 'text')
  return textBlock?.type === 'text'
    ? textBlock.text.trim()
    : 'Nie udalo sie wygenerowac odpowiedzi.'
}
