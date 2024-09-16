---
layout: ../../layouts/project.astro
name: Narzędzia do zarządzania importem feedów produktowych
description: Ten projekt obejmował stworzenie zaawansowanego systemu do zarządzania importem feedów produktowych z różnych sklepów internetowych.
image: https://media.licdn.com/dms/image/v2/D4E0BAQGpE6AEbDhWew/company-logo_200_200/company-logo_200_200/0/1722265421235/ringier_axel_springer_tech_logo?e=1734566400&v=beta&t=cGINHspCQx7IHiMPn7n9G3cKa3RteP0PedtMnURdGM4
---

![Logo projektu feedów](/assets/images/projects/feed-management.png)

## Opis projektu

Ten projekt obejmował stworzenie zaawansowanego systemu do zarządzania importem feedów produktowych z różnych sklepów internetowych. Celem było stworzenie spójnego agregatu danych produktowych dla naszych serwisów.

### Technologie

- Frontend: Angular
- Backend: Nest.js
- Infrastruktura: AWS

### Mój wkład

Moja rola w tym projekcie była kluczowa i obejmowała:

1. Projektowanie architektury całego systemu
2. Implementację większości frontendu aplikacji backoffice
3. Tworzenie serwisów backendowych do przetwarzania feedów
4. Integrację z usługami AWS do przetwarzania dużych ilości danych

### Wyzwania i rozwiązania

Głównym wyzwaniem było przetwarzanie milionów ofert z różnych źródeł w czasie rzeczywistym. Rozwiązaliśmy to poprzez:

- Implementację systemu kolejkowania zadań
- Wykorzystanie usług AWS Lambda do równoległego przetwarzania danych
- Stworzenie elastycznego systemu mapowania danych z różnych formatów feedów
- Wdrożenie zaawansowanego systemu monitoringu i alertów

### Rezultaty

System znacząco usprawnił proces importu i agregacji danych produktowych, redukując czas przetwarzania o 70% i zwiększając dokładność danych o 95%. To z kolei pozwoliło na szybsze aktualizacje ofert w naszych serwisach i lepsze doświadczenie użytkowników końcowych.
