# TODO

## Zachowaj obecną wersję makiet

- [x] Zrób commit albo kopię projektu.
- [x] Nie usuwaj statycznych widoków, bo później podmienisz tylko dane demonstracyjne na dane z API.

## Utwórz backend

- [x] Osobny katalog, np. `server`.
- [x] Node.js i Express.
- [x] Plik startowy serwera, np. `server.js`.
- [x] Konfiguracja portu, CORS i zmiennych środowiskowych.
- [x] Połączenie backendu z MySQL.

## Zaprojektuj bazę danych

Najważniejsze tabele:

- [x] `users` — użytkownicy, e-mail, hasło, dane profilu.
- [x] `exercises` — katalog ćwiczeń.
- [x] `training_plans` — zapisane plany treningowe.
- [x] `training_plan_exercises` — ćwiczenia przypisane do planów.
- [x] `workouts` — wykonane treningi.
- [x] `workout_exercises` — serie, powtórzenia i ciężar.
- [x] `goals` — cele użytkowników.
- [x] Relacje powinny opierać się na `user_id` i kluczach obcych.

## Zaimplementuj rejestrację

- [x] Walidacja danych.
- [x] Sprawdzenie, czy e-mail nie istnieje.
- [x] Hasło przechowywane wyłącznie jako hash, np. przez bcrypt.
- [x] Utworzenie użytkownika w bazie.
- [x] Nie przechowuj haseł w zwykłym tekście.

## Zaimplementuj logowanie i wylogowanie

- [x] Logowanie przez e-mail i hasło.
- [x] Sesja użytkownika albo token JWT.
- [x] Dla tego projektu wybrałbym sesję przez bezpieczne ciasteczko.
- [x] Endpoint sprawdzający aktualnie zalogowanego użytkownika.
- [x] Endpoint wylogowania.

## Podepnij frontend do autoryzacji

- [x] Formularz rejestracji wysyła dane do backendu.
- [x] Formularz logowania wysyła dane do backendu.
- [x] Niezalogowany użytkownik nie może wejść do dashboardu.
- [x] Po zalogowaniu pobierasz dane użytkownika i pokazujesz jego profil w sidebarze.
- [x] Usuń później tymczasowe dane „Marek Kowalski”.

## Dodaj plany treningowe

- [x] Pobieranie planów zalogowanego użytkownika.
- [ ] Tworzenie planu.
- [ ] Edycja planu.
- [ ] Usuwanie planu.
- [ ] Dodawanie ćwiczeń do planu.
- [x] Podłącz te funkcje do strony „Moje treningi”.

## Dodaj katalog ćwiczeń

- [x] Ćwiczenia mogą być początkowo zapisane jako dane publiczne w bazie.
- [x] Wyszukiwanie po nazwie.
- [x] Filtrowanie po kategorii.
- [ ] Dodawanie ćwiczenia do wybranego planu.
- [ ] Później możesz dodać własne ćwiczenia użytkownika.

## Dodaj wykonywanie treningu

- [ ] Rozpoczęcie treningu.
- [ ] Zapisywanie serii, powtórzeń i ciężaru.
- [ ] Czas trwania.
- [ ] Notatki.
- [ ] Oznaczenie treningu jako ukończonego.

## Podepnij historię i kalendarz

- [ ] Kalendarz pobiera wykonane i zaplanowane treningi z API.
- [ ] Historia pokazuje poprzednie treningi użytkownika.
- [ ] Daty powinny być zapisywane w bazie, a nie wpisane ręcznie w JSX.

## Podepnij statystyki

Statystyki będą wyliczane na podstawie danych z bazy:

- [ ] Liczba treningów.
- [ ] Łączny czas.
- [ ] Spalone kalorie.
- [ ] Najdłuższa seria.
- [ ] Najczęściej wybierana kategoria.
- [ ] Postęp względem celu.

## Dokończ profil

- [ ] Edycja imienia, wieku i poziomu.
- [ ] Zmiana hasła.
- [ ] Cele treningowe.
- [ ] Preferencje treningowe.
- [ ] Wylogowanie.

## Dodaj zabezpieczenia

- [ ] Walidacja danych po stronie frontendu i backendu.
- [ ] Ochrona endpointów przed dostępem bez logowania.
- [ ] Sprawdzanie, czy użytkownik ma prawo edytować dany plan.
- [ ] Ograniczenie liczby żądań logowania.
- [ ] Sekrety wyłącznie w `.env`.
- [ ] Nie wysyłaj haseł ani sekretów do frontendu.

## Testuj etapami

Po każdym większym module sprawdzaj:

- [ ] Rejestrację.
- [ ] Logowanie.
- [ ] Wylogowanie.
- [ ] Odświeżenie strony po zalogowaniu.
- [ ] Dostęp do danych innego użytkownika.
- [ ] Tworzenie i usuwanie planu.
- [ ] Zapis ukończonego treningu.
