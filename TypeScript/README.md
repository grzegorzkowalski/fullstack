## Zadanie 1

- Stwórz konfigurację projektu przy pomocy komendy `npm init`.
- Zainstaluj `npm install -g typescript`.
- Sprawdź czy typescript się poprawnie zainstalował `tsc -v`.
- Zainstaluj `npm i -g ts-node`.
- Stwórz konfigurację projektu przy pomocy komendy `npx tsc --init`.
  - Zainstaluj `npm install -g nodemon`;
- Zainstaluj `npm install --save-dev nodemon @types/node`;
- Dodaj plik `index.ts`.
- Dodaj do pliku następujący kod:
  ```
  function add(a: number, b: number) : void {
  console.log(a+b);
  }
  
  add(2,3);
  ```
- Skompiluj plik `tsc index.ts`;
- Uruchom `node index.js`;
- uruchom bez kompilacji `ts-node index.ts`;
- Uruchom komendę `nodemon --exec ts-node index.ts`
- Dodaj np. add(2,7) w pliku index.ts;


## Zadanie 2

- Zdefiniuj obiekt `Person` z kluczami `name`, `latName`, `age`, `sex`, `proffession`, `skills`,
- klucze `name`, `latName` - to stringi tylko do odczytu, `age` – liczba, `sex` – tuple, `profession` – string, `skills` – tablica,
- otypuj zgodnie ze schematem,
- dodaj do tablicy `skills` nową umiejętność (uzyj metody Array.push),
- spróbuj zmienić wartości `name` i `lastName`,

## Zadanie 3

- Stwórz funkcję, która przyjmuje tablicę liczb i zwraca ich średnią (użyj obiektu Math i metody round).
- Otypuj parametry funkcji i zwracaną wartość.

## Zadanie 4

Zdefiniuj interface:

1. Imię. 
2. Nazwisko.
3. Wiek.
4. Płeć – do wyboru kobieta | mężczyzna.
5. Zainteresowania kilka: np. programowanie, moda. muzyka.
6. Miasto (opcjonalnie) 
7. Funkcja, która zwróci imię i nazwisko.

Rozszerz interface o adres i telefon.
