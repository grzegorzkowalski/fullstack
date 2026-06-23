## Zadanie 1 - Context

##Stoper

Zaimplementuj aplikację stopera. Ma ona wyświetlać dwa przyciski start oraz stop.
Odpowiednio startujące i zatrzymujące licznik po kliknięciu. Przyciski te powinny być na zmianę wyłączone tj.:
jeśli licznik nie jest włączony to przycisk stop jest disabled,
jeśli licznik jest włączony to przycisk start jest disabled.
W znaczniku `<h1>` wyświetl aktualną wartość licznika.


Po wystartowaniu licznik ma zwiększać się co sekundę, a jego wartość powinna być trzymana w stanie aplikacji.
Na dole aplikacji wyrenderuj przycisk zapis. Po kliknięciu na niego powinniśmy dodać do listy wyników aktualną
wartość licznika.

Przykładowy stan aplikacji:

```js
{
  "isCounting": false,
  "value": 0
}
```

Docelowy html aplikacji:
```html
<div>
  <div>
    <div>
      <button>start</button>
      <button disabled>stop</button>
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
</div>
```

## Zadanie 2

###Wykonaj powyższe zadanie z wykorzystaniem Redux Toolkit.

Stwórz aplikacje z wykorzystaniem odpowiedniego template `npx create-react-app my-app --template redux-typescript`.

Template daje dużo predefiniowanych możliwości, które nie będą potrzebne w prostej aplikacji. Możesz template odchudzić
albo zainstalować: `npx create-react-app my-app --template typescript` i `npm install @reduxjs/toolkit react-redux`.
