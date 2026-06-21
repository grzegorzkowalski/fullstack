import { act, renderHook } from '@testing-library/react'
import { useEntityList } from '../useEntityList'

describe('useEntityList', () => {
  it('dodaje, aktualizuje i usuwa encje', () => {
    const { result } = renderHook(() => useEntityList([{ id: '1', name: 'Start' }]))

    act(() => result.current.add({ id: '2', name: 'Drugi' }))
    expect(result.current.items).toHaveLength(2)

    act(() => result.current.update('2', { name: 'Zmieniony' }))
    expect(result.current.items[1].name).toBe('Zmieniony')

    act(() => result.current.remove('1'))
    expect(result.current.items).toEqual([{ id: '2', name: 'Zmieniony' }])
  })
})
