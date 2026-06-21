import { useState } from 'react'

export function useEntityList<T extends { id: string }>(initial: T[]) {
  const [items, setItems] = useState<T[]>(initial)

  function add(item: T): void {
    setItems((previousItems) => [...previousItems, item])
  }

  function remove(id: string): void {
    setItems((previousItems) => previousItems.filter((item) => item.id !== id))
  }

  function update(id: string, changes: Partial<T>): void {
    setItems((previousItems) =>
      previousItems.map((item) => (item.id === id ? { ...item, ...changes } : item)),
    )
  }

  return { items, add, remove, update, setItems }
}
