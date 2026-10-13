# TODO

## Zachowaj obecną wersję makiet

- [ ] Zrób commit albo kopię projektu.
- [ ] Nie usuwaj statycznych widoków, bo później podmienisz tylko dane demonstracyjne na dane z API.

## Utwórz backend

- [ ] Osobny katalog, np. `server`.
- [ ] Node.js i Express.
- [ ] Plik startowy serwera, np. `server.js`.
- [ ] Konfiguracja portu, CORS i zmiennych środowiskowych.
- [ ] Połączenie backendu z MySQL.

## Zaprojektuj bazę danych

Najważniejsze tabele:

- [ ] `users` — użytkownicy, e-mail, hasło, dane profilu.
- [ ] `exercises` — katalog ćwiczeń.
- [ ] `training_plans` — zapisane plany treningowe.
- [ ] `training_plan_exercises` — ćwiczenia przypisane do planów.
- [ ] `workouts` — wykonane treningi.
- [ ] `workout_exercises` — serie, powtórzenia i ciężar.
- [ ] `goals` — cele użytkowników.
- [ ] Relacje powinny opierać się na `user_id` i kluczach obcych.

## Zaimplementuj rejestrację

- [ ] Walidacja danych.
- [ ] Sprawdzenie, czy e-mail nie istnieje.
- [ ] Hasło przechowywane wyłącznie jako hash, np. przez bcrypt.
- [ ] Utworzenie użytkownika w bazie.
- [ ] Nie przechowuj haseł w zwykłym tekście.

## Zaimplementuj logowanie i wylogowanie

- [ ] Logowanie przez e-mail i hasło.
- [ ] Sesja użytkownika albo token JWT.
- [ ] Dla tego projektu wybrałbym sesję przez bezpieczne ciasteczko.
- [ ] Endpoint sprawdzający aktualnie zalogowanego użytkownika.
- [ ] Endpoint wylogowania.

## Podepnij frontend do autoryzacji

- [ ] Formularz rejestracji wysyła dane do backendu.
- [ ] Formularz logowania wysyła dane do backendu.
- [ ] Niezalogowany użytkownik nie może wejść do dashboardu.
- [ ] Po zalogowaniu pobierasz dane użytkownika i pokazujesz jego profil w sidebarze.
- [ ] Usuń później tymczasowe dane „Marek Kowalski”.

## Dodaj plany treningowe

- [ ] Pobieranie planów zalogowanego użytkownika.
- [ ] Tworzenie planu.
- [ ] Edycja planu.
- [ ] Usuwanie planu.
- [ ] Dodawanie ćwiczeń do planu.
- [ ] Podłącz te funkcje do strony „Moje treningi”.

## Dodaj katalog ćwiczeń

- [ ] Ćwiczenia mogą być początkowo zapisane jako dane publiczne w bazie.
- [ ] Wyszukiwanie po nazwie.
- [ ] Filtrowanie po kategorii.
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
