---
layout: ../../layouts/project.astro
name: Narzędzia do zarządzania katalogiem produktów
description: Centralnego Katalogu Produktów wykorzystywany m.in. przez porównywarkę skapiec.pl
image: /assets/images/projects/tools.jpeg
tags: [Angular, Nest.js, AWS, RASP]
---

![Logo projektu feedów](/assets/images/projects/tools.jpeg)

## Opis projektu

Ten projekt obejmował stworzenie zaawansowanego systemu do zarządzania importem feedów produktowych z różnych sklepów internetowych. Celem było stworzenie spójnego agregatu danych produktowych dla naszych serwisów oraz narzędzi umożliwiających kontrolę nad nim. Nowy system miał zastąpić leciwy jednak wciąż działający wówczas system.

### Technologie

- Frontend: Angular, Material, HTML, CSS
- Backend: Nest.js
- Infrastruktura: AWS

### Mój wkład

Moja rola w tym projekcie była kluczowa i obejmowała:

1. Udział w projektowaniu architektury całego systemu
2. Implementację dużej części frontendu aplikacji
3. Tworzenie serwisów backendowych do przetwarzania feedów
4. Zaprojektowanie i stworzenie modułów pozwalających zautomatyzować niektóre powtarzalne zadania

### Wyzwania i rozwiązania

Głównym wyzwaniem było przetwarzanie milionów ofert z różnych źródeł w czasie rzeczywistym, wykluczenie błędów a także płynne przejście na nowy system. Rozwiązaliśmy to poprzez:

- Wdrażanie poszczególnych części systemu z zachowaniem częściowej kompatybilności z poprzednim systemem
- Dokładną analizę poprzedniej wersji systemu i przepisania jego najważniejszych części
- Implementację systemu paczkowania oraz kolejkowania ofert
- Wdrożenie zaawansowanego systemu monitoringu i alertów
- Zaprojektowanie i stworzenie interfejsu użytkownika umożliwiającego wygodną pracę na dużych zbiorach danych

### Rezultaty
Umarł król, niech żyje król. Nowy system całkowicie zastąpił stary. Nowa wersja okazała się znacznie stabilniejsza, tańsza w utrzymaniu i przede wszystkim o wiele bardziej rozwojowa. Pracownicy korzystający z narzędzi backoffice mogli skupić się na poprawie jakości katalogu a ilość zgłaszanych błędów spadła.