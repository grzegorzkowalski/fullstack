# GITWorkshop

## Git na lokalnym komputerze

### Pierwsze kroki

1. Zainstaluj środowisko do pracy z git.
2. Sprawdź czy git działa poprawnie za pomocą komendy `git -v lub git --version` w zależności od wersji git.
3. Stwórz projekt o nazwie TestProject i zainicjalizuj w nim nowe repozytorium git.
4. Sprawdź status folderu. Upewnij się, że jesteś w dobrym folderze.
5. Skonfiguruj swojego gita. Dodaj nazwę użytkownika i email.
6. Sprawdź czy konfiguracja została zapisana poprawnie.

### Operacje na plikach: add i commit 

1. Dodaj plik Hello.txt. W pliku przywitaj się z kursem.
2. Dodaj zmiany do staging area. 
3. Dodaj commit. Sformatuj swój commit message w VIM.
4. Dodaj kolejny plik tekstowy o dowolnej nazwie. Dodaj mu dowolną treść.
5. Dodaj zmiany do staging area. 
6. Dodaj commit z parametrem -m.
7. Sprawdź historię za pomocą narzędzia gitk.

### Ignorowanie plików

1. Dodaj do repozytorium plik .gitignore.
2. Wykorzystaj poznane narzędzie, żeby stworzyć dobry .gitignore [https://www.toptal.com/developers/gitignore](https://www.toptal.com/developers/gitignore).
3. Dodaj do pliku .gitignore wpis, żeby ignorował wszystkie pliki o rozszerzeniu txt.
4. Dodaj nowy plik ignorowany.txt.
5. Spóbuj dodać ignorowany.txt do stagingu.
6. Sprawdź czy to się udało.
7. Jeśli nie sprawdź jaka komenda powoduje, że plik jest ignorowany.

### Operacje na branchach

1. Wyświetl listę gałęzi 
2. Stwórz nową gałąź `develop`.
3. Przełącz się na nią.
4. Dodaj do gałęzi plik index.html z podstawową treścia:
```
<!doctype html>
<html>
     <head>
          <meta charset="UTF-8" />
          <title>Tytuł strony...</title>
     </head>
     <body>
	 <h1>Tu w przyszłości zbudujemy serwis podróżniczy</h1>
     </body>
</html>
```
5. Otwórz plik w przeglądarce. I sprawdź czy wyświetla się nagłówek i tytuł strony.
6. Dodaj plik do stagingu.
7. Dodaj commit. 
8. Wyświetl listę gałęzi.
9. Sprawdź historię za pomocą narzędzia gitk.
10. Przełacz się na gałąź `main`.
11. Sprawdź czy plik index.html nadal jest dostępny w przestrzeni roboczej.
12. Wróć na gałąź develop. 
13. Dodaj nowy branch `addStyles` (nie przechodź na nią).    
13. Utwórz nową gałąź `sellTrip` i przejdź na nią.
14. Dodaj zdjęcie wybranej atrakcji turystycznej.
15. Zrób commit.
16. Dodaj opis atrakcji turystycznej. 
17. Zrób commit.
18. Dodaj button "Kup teraz".
19. Zrób commit.
20. Sprawdź historię za pomocą narzędzia gitk.
21. Przejdź na branch `addStyles`.
22. Zmień kolor tekstu na różowy.
23. Zrób commit.
24. Sprawdź efekt w przeglądarce.
25. Sprawdź historię za pomocą narzędzia gitk.
26. Przetestuj działanie komendy cherry-pick skopiuj za jej pomocą commit z innej gałęzi. 
Id commitu sprawdź za pomocą komendy gitk.
27. Wróć na gałąź `addStyle`.
28. Usuń gałąź `addStyle`. 
29. Jeśli się nie udało przełącz się na inną gałąź (przetestuj komendę `git checkout -` lub `git switch -`) i ponów próbę.
30. Scal zmiany z gałęzi `sellTrip` do gałęzi `develop`.
31. Sprawdź historię za pomocą narzędzia gitk.

### Poruszanie się po historii

1. Sprawdź historię gałezi `sellTrip` za pomocą komendy `git log`.
2. Powtórz działanie z wykorzystaniem wersji skróconej `git log --oneline`.
3. Wypisz 3 ostatnie commity.
4. Wypisz wszystkie commity z ostatnich 15 minut.
5. Za pomocą komendy `git show` wypisz informacje o dwóch wybranych commitach.
6. Wykorzystaj komendę `git diff`, żeby sprawdzić jakie zmiany zaszły między 
bieżącym commitem a dwoma commitami temu w pliku index.html
7. Powtórz ostatnie zadanie z wykorzystaniem komendy `git difftool`.
8. Jeżeli uruchomił Ci się Vimdiff możesz wyjść z niego tak samo jak z VIM.
9. Zainstaluj wygodniejsze narzędzie do porównywania zmian.
10. Skonfiguruj gita, żeby korzystało z nowego narzędzia.

### Nadpisywanie historii

1. Przełącz się na gałąź `develop`.
2. Utwórz i przełącz się na nową gałąź `price`.
3. Dodaj do swojego projektu cenę wycieczki.
4. Zrób commit.
5. Okazało się, że to błędna cena i trzeba pilnie wycofać tą zmianę.
6. Wykorzystaj komendę `git revert`, żeby cofnać zmianę.
7. Sprawdź historię za pomocą narzędzia gitk lub komendy `git log`.
8. Dodaj ponownie cenę wyrażoną w złotówkach.
9. Zób commit.
10. Okazało się, że cena się zgadza ale powinna by wyrażona w dolarach.
11. Wykorzystaj parametr --amend. Żeby poprawić tą zmianę i dodać do commita,
dodaj informacje o tym co uległo zmianie w commit message.
12. Sprawdź historię za pomocą narzędzia gitk lub komendy `git log`.
13. Za pomocą komendy `rebase` dołącz commity z gąłęzi `price` do gałęzi `develop`.

### Git przechowywanie danych.

1. Sprawdź zawartość plików config i HEAD. 
2. Sprawdź zawartość folderu refs.
3. Sprawdź wagę folderu .git.

## Git, a praca zespołowa w sieci

### Pobranie projektu
1. Załóż konto w serwisie GitLab jeśli jeszcze takiego nie posiadasz.
2. Skonfiguruj klucz SSH ED25519 do pracy z GitLab [Instrukcja](https://docs.gitlab.com/ee/user/ssh.html).

### Git pull i git push
1. Stwórz na Gitlab nowy projekt.
2. Pobierz go na dysk. 
3. Dodaj do projektu pliki utworzone w ramach rozdziału `Operacje na branchach`.
4. Wypchnij zmiany na serwer.
5. Dodaj członków swojego zespołu do projektu.
6. Poproś ich o wprowadzenie i wypchnięcie na serwer dowolnych zmian w Twoim projekcie.
7. Pobierz te zmiany.
8. Sprawdź za pomocą poznanych komend, co się zmieniło w projekcie.

### Konflikty
1. Skonfiguruj do użycia wybrany mergetool.
2. Stwórz w swoim projekcie plik o nazwie `imiona.txt`. 
   (Możecie przećwiczyć to na jednym projekcie lub na projektach wszystkich członków zespołu).
3. W pierwszej linii wpisz swoje imię. 
4. Wykonaj komendy git add ., git commit, git push.
5. Kolejne osoby muszą dodać swoje imię również w linii pierwszej a następnie zapisać zmiany 
   i wypchnąć na serwer zewnętrzny.
6. Powinny się zacząć tworzyć konflikty. 
7. Rozwiązujcie je za pomocą wybranej metody (ręcznie lub narzędzia graficznego).
8. Doprowadźcie do sytuacji gdy konflikty zostaną rozwiązane u wszystkich członków zespołu. 

### Tagowanie 
1. Wykorzystaj wcześniej stworzony projekt i dodaj tag lekki o nazwie `light` i ciężki o nazwie `heavy` 
   do dwóch wybranych commitów.
2. Wyświetl zawartość commitów korzystając z wyszukania po tagach.

### Blame
1. Wykorzystaj komendę git blame, żeby sprawdzić kto dodawał zmiany do pliku index.html na wczęsniej utworzonym repozytorium.

### Stash 
1. Stwórz robocze zmiany. 
2. Dodaj je do stagingu za pomocą komendy git add.
3. Zrób stash.
4. Wyświetl listę zmian w schowku.
5. Przywróć zmiany ze schowka.

### Aliasy

1. Stwórz aliasy do komend, które najczęściej używasz typu branch, commit, checkout.
2. Przetestuj ich działanie.




















