# Warsztat: Stoper z wykorzystaniem Redux Toolkit (TypeScript)

## Cel warsztatu

Zbudujemy aplikację stopera w TypeScript, w której:
- przycisk **start** uruchamia licznik, a **stop** go zatrzymuje,
- przyciski są wzajemnie wykluczające się (disabled na zmianę),
- wartość licznika rośnie co sekundę i jest trzymana w globalnym stanie Redux,
- przycisk **zapisz** dodaje aktualną wartość licznika do listy wyników.

Stan aplikacji (rozszerzony o listę wyników):

```ts
interface CounterState {
  isCounting: boolean;
  value: number;
  results: number[];
}
```

---

## Krok 0: Wymagania wstępne

- Node.js (LTS),
- znajomość podstaw React (komponenty funkcyjne, hooki `useState`, `useEffect`),
- podstawowa znajomość TypeScript (typy, interfejsy),
- podstawowa znajomość koncepcji Redux (store, action, reducer).

---

## Krok 1: Inicjalizacja projektu

```bash
npm create vite@latest stoper-redux-ts -- --template react-ts
cd stoper-redux-ts
npm install
```

---

## Krok 2: Instalacja Redux Toolkit i React-Redux

```bash
npm install @reduxjs/toolkit react-redux
```

Redux Toolkit jest napisany w TypeScript i ma wbudowane typy – nie trzeba instalować dodatkowych pakietów `@types/...`.

---

## Krok 3: Projekt struktury katalogów

```
src/
  app/
    store.ts
    hooks.ts
  features/
    counter/
      counterSlice.ts
      Stoper.tsx
  main.tsx
  App.tsx
```

---

## Krok 4: Tworzymy „slice” licznika

`src/features/counter/counterSlice.ts`:

```ts
import { createSlice } from '@reduxjs/toolkit';

export interface CounterState {
  isCounting: boolean;
  value: number;
  results: number[];
}

const initialState: CounterState = {
  isCounting: false,
  value: 0,
  results: [],
};

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    start(state) {
      state.isCounting = true;
    },
    stop(state) {
      state.isCounting = false;
    },
    tick(state) {
      state.value += 1;
    },
    save(state) {
      state.results.push(state.value);
    },
  },
});

export const { start, stop, tick, save } = counterSlice.actions;
export default counterSlice.reducer;
```

Tu wszystkie akcje są bezparametrowe, więc nie potrzebujemy typu `PayloadAction<T>`. Gdyby np. `save` przyjmowało argument (powiedzmy etykietę wyniku), wyglądałoby to tak:

```ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

save(state, action: PayloadAction<string>) {
  // action.payload: string
},
```

---

## Krok 5: Konfiguracja store

`src/app/store.ts`:

```ts
import { configureStore } from '@reduxjs/toolkit';
import counterReducer from '../features/counter/counterSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
```

`RootState` i `AppDispatch` to typy wyprowadzone automatycznie ze store – to dzięki nim `useSelector` i `useDispatch` będą w pełni otypowane, bez ręcznego dopisywania interfejsów dla każdego slice'a.

---

## Krok 6: Typowane hooki

Zamiast importować „gołe” `useSelector` / `useDispatch` w każdym komponencie (i każdorazowo rzutować typy), tworzymy raz typowane wersje.

`src/app/hooks.ts`:

```ts
import { useDispatch, useSelector } from 'react-redux';
import type { RootState, AppDispatch } from './store';
import type { TypedUseSelectorHook } from 'react-redux';

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
```

To standardowy wzorzec polecany w dokumentacji Redux Toolkit dla projektów TypeScript.

---

## Krok 7: Podłączenie `Provider`

`src/main.tsx`:

```tsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { store } from './app/store';
import App from './App';

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
```

---

## Krok 8: Budujemy komponent `Stoper` – szkielet

`src/features/counter/Stoper.tsx`:

```tsx
export default function Stoper() {
  return (
    <div>
      <div>
        <button>start</button>
        <button>stop</button>
        <h1>0</h1>
      </div>
      <div>
        <button>zapisz</button>
        <ul></ul>
      </div>
    </div>
  );
}
```

---

## Krok 9: Odczyt stanu – `useAppSelector`

```tsx
import { useAppSelector } from '../../app/hooks';

export default function Stoper() {
  const { isCounting, value, results } = useAppSelector((state) => state.counter);

  return (
    <div>
      <div>
        <button disabled={isCounting}>start</button>
        <button disabled={!isCounting}>stop</button>
        <h1>{value}</h1>
      </div>
      <div>
        <button>zapisz</button>
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

TypeScript automatycznie wie, że `state.counter` to `CounterState`, więc `isCounting`, `value` i `results` mają poprawne typy (`boolean`, `number`, `number[]`) bez żadnej dodatkowej adnotacji.

---

## Krok 10: Wysyłanie akcji – `useAppDispatch`

```tsx
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { start, stop, save } from './counterSlice';

export default function Stoper() {
  const dispatch = useAppDispatch();
  const { isCounting, value, results } = useAppSelector((state) => state.counter);

  return (
    <div>
      <div>
        <button disabled={isCounting} onClick={() => dispatch(start())}>
          start
        </button>
        <button disabled={!isCounting} onClick={() => dispatch(stop())}>
          stop
        </button>
        <h1>{value}</h1>
      </div>
      <div>
        <button onClick={() => dispatch(save())}>zapisz</button>
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

---

## Krok 11: Inkrementacja co sekundę – `useEffect` + `setInterval`

```tsx
import { useEffect } from 'react';
import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { start, stop, tick, save } from './counterSlice';

export default function Stoper() {
  const dispatch = useAppDispatch();
  const { isCounting, value, results } = useAppSelector((state) => state.counter);

  useEffect(() => {
    if (!isCounting) return;

    const intervalId: ReturnType<typeof setInterval> = setInterval(() => {
      dispatch(tick());
    }, 1000);

    return () => clearInterval(intervalId);
  }, [isCounting, dispatch]);

  return (
    <div>
      <div>
        <button disabled={isCounting} onClick={() => dispatch(start())}>
          start
        </button>
        <button disabled={!isCounting} onClick={() => dispatch(stop())}>
          stop
        </button>
        <h1>{value}</h1>
      </div>
      <div>
        <button onClick={() => dispatch(save())}>zapisz</button>
        <ul>
          {results.map((result, index) => (
            <li key={index}>{result}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}
```

### Dlaczego `ReturnType<typeof setInterval>`

W projekcie z konfiguracją `lib: ["DOM"]` (typowy Vite + React) `setInterval` zwraca `number`. Jeśli jednak do projektu wkradną się typy z `@types/node` (np. przez jakąś zależność), `setInterval` mogłoby zwracać `NodeJS.Timeout`. Użycie `ReturnType<typeof setInterval>` zamiast wprost `number` zabezpiecza nas przed błędem typów w obu środowiskach.

---

## Krok 12: Komponent `App`

`src/App.tsx`:

```tsx
import Stoper from './features/counter/Stoper';

export default function App() {
  return <Stoper />;
}
```

---

## Krok 13: Weryfikacja z docelowym markupem

Po wystartowaniu i zliczeniu do 4 oraz zapisaniu wyników 1, 2, 3, wyrenderowany HTML powinien wyglądać tak jak w specyfikacji zadania:

```html
<div>
  <div>
    <button disabled>start</button>
    <button>stop</button>
    <h1>4</h1>
  </div>
  <div>
    <button>zapisz</button>
    <ul>
      <li>1</li>
      <li>2</li>
      <li>3</li>
    </ul>
  </div>
</div>
```

---

## Krok 14 (opcjonalny): Reset licznika po zapisie

```ts
save(state) {
  state.results.push(state.value);
  state.value = 0;
},
```

## Zadania dodatkowe dla uczestników

1. Dodaj przycisk **reset**, który zatrzymuje licznik i zeruje `value` (uważaj, by też wyczyścić interwał).
2. Dodaj możliwość usuwania pojedynczego wyniku z listy – napisz reducer `removeResult(state, action: PayloadAction<number>)`, gdzie `payload` to indeks do usunięcia.
3. Wyświetl czas w formacie `mm:ss` zamiast surowej liczby sekund (logika formatowania w komponencie jako funkcja `formatTime(value: number): string`, stan zostaje liczbą).
4. Zapisz `results` w `localStorage` przy każdej zmianie (np. przez middleware lub `useEffect` nasłuchujący na `results`), z typowanym helperem do serializacji/deserializacji.
