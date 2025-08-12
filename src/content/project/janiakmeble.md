---
layout: ../../layouts/project.astro
name: janiakmeble.pl
description: Strona firmowa producenta mebli tapicerowanych
image: /assets/images/projects/janiakmeble.png
projectUrl: https://janiakmeble.pl/
tags: [Astro, DatoCMS, Dostępność (WCAG), UI]
---

![Strona Janikmeble](/assets/images/projects/janiakmeble.png)

# janiakmeble.pl - strona producenta mebli tapicerowanych

Chciałbym się pochwalić swoją ostatnią realizacją – **zrobioną w niecałe 5 dni** 🔥.  
Był to projekt pół-prywatny – na moim osobistym poligonie – **stronie moich rodziców**.  
Poprzednia wersja była już leciwa i oparta na Angularze 6. Zamiast reanimować, postanowiłem postawić **coś zupełnie nowego**. Wykorzystałem framework Astro.js.

---

## Dlaczego Astro? 🌌

- ✅ Static Site Generation [SSG]  
    > Każda podstrona jest generowana na etapie budowy aplikacji i dostępna w ekstremalnie szybkim czasie. Użytkownik w większości otrzymuje już gotowy kod HTML, który nie musi być już generowany po stronie przeglądarki co bardzo pozytywnie wpływa na SEO i performence. Dzięki wykorzystaniu webhooków każda zmiana danych skutkuje przegenerowaniem wszystkich storn (nie ma ich dużo więc taki mechanizm w tym przypadku jest wystarczający). Kolejną zaletą takiego podejścia jest ograniczenie potrzeby posiadania serwera generującego strony (jak w przypadku SSR).
- ✅ Większość treści w czystym HTML  
    > Większość nowoczsnych narzędzi wykorzystywanych do wyrwarzania oprogramowania działa w ten sposób, że przeglądarka użytkownika pobiera kod javascript i z jego pomocą składa cały kod HTML wyświetlany na stronie. Takie podejście ma wadę - silnikie SEO tego nie lubią. Znacznie lepszym podejściem jest wygenerowanie wcześniej kodu HTML na serwerze i pobranie go już w formie gotowej do wyświetlenia. Wprowadza to pewne ograniczenia związane z elementami interaktywnymi - w tym przypadku lista ulubionych produktów. Na szczęśćie Astro umożlia odpowiednie dorzucenie elementów javascript pozwalających na robienie takich sztuczek.
- ✅ Optymalizacja obrazów
    > Astro oferuje możliwość optymalizacji obrazów, co jest bardzo ważne dla **Core Web Vitals**. Każdy obrazek w projekcie jest generowany na etapie kompilacji w odpowidnich rozmiarach dla różnych urządzeń. Dzięki takiemu podejściu nie musimy już ręcznie tworzyć różnych wersji obrazu pod każdą rozdzielczość. Dla użytkownika ma to kluczowe znaczenie ponieważ pobiera taką wersję obrazu która pasuje do jego urządzenia - jest to najmniejsza możliwa wersja dzięki czemu pobieranie jest szybkie nawet w sieciach o ograniczonym transferze.
- ✅ Vite w pakiecie  
    > Obecnie najbardziej polecany builder dający świetne metody optymalizacji gotowej aplikacji. Zminifikowany javascript i css, treeshaking, usunięte komentarze i inne tego typu optymalizacje - wszystko w pakiecie.
- ✅ Framework świeży i szybki 🔥  
    > Nie ma co udawać - Astro jest teraz na topie jeśli chodzi o tworzenie customowych stron WWW. Warto sprawdzić czy będzie pasował do Twojego projektu!

Połączyłem Astro z **Tailwind CSS** 🧑‍🎨 – duet idealny, który pozwolił stworzyć spójny i nowoczesny UI.  

---

## CMS i optymalizacja 🖼️

Bebeszki strony stoją na **DatoCMS**, z którego pobierane są wszystkie treści i modele mebli.  
Zarówno Astro, jak i DatoCMS oferują ogromne możliwości optymalizacji obrazków – coś, co na froncie jest kluczowe dla **Core Web Vitals**.  

- Obrazy są serwowane z CDN co umożliwia pobranie ich w wersjach dopasowanych do slotów.  
- Pobierane są tylko te rozmiary, które faktycznie są potrzebne.  
- Każdy obraz ma tło będące rozmytą wersją zdjęcia (~1 KB) – użytkownik widzi podgląd zanim obraz się załaduje, co poprawia UX i CLS. 

---

## Wygląd i branding 🎨

UI to moja wariacja na temat inspiracji z Pinteresta – zaprojektowany **od podstaw**.  
Zaprojektowałem również logo – proste, z przesłaniem, estetyczne. Symbolika pustego pokoju czekającego na wypełnienie nowymi meblami jest tutaj dobrze przedstawiona. Jest też mały smaczek - po najechaniu na logo zmienia się jego luminescencja dzięki czemu osiągnąłem efekt jakby żarówki zaczynały mocniej świecić. 

---

---

## Dostępność (a11y) 🤕

Wszystkie strony zostały sprawdzone i dostosowane do obsługi bez myszy - dla osób z ograniczoną mobilnością. Każdą akcję którą może zrobic użytkownik z pomocą myszki da się wykonać bez jej użycia. Strona mam poprawną strukturę semantyczną znaczników HTML, dzięki czemu użytkownicy korzystający z czytników ekranowych bez problemu poradzą sobie z nawigacją. Dodane zostały także skróty do poszczególnych sekcji strony, dzięki czemu korzystając z czytnika można się bezpośrednio dostać do tego co nas interesuje. Każdy statyczny obrazek jest opisany. Obrazy w galeriach produktów są przystosowane do wyświetlania opisu (jednak niestety nie wszystkie obrazy posiadają jeszcze taki opis). 

Najważniejsze elementy dostosowane do wymogów WCAG:
- **Opisy obrazków** – dostępność opisu obrazka
- **Skróty do sekcji** – dostępność skrótu do sekcji strony
- **Każdy klikalny element da się sfocusować i w razie potrzeby posiada opis** -  dostępność elementów interaktywnych
- **Galeria obrazów jest w pełni funkcjonalna bez użycia myszki** - dostępność galerii obrazków
- **Menu działa zgodnie z zasadami WCAG** - dostępność menu
- **Informacja o przeniesieniu na inną stronę** - w przypadku przejścia np. na mapę dojazdu informacja o tym jest wyświetlana w treści a także informują o tym atrybuty aria.

---

## Priorytety projektu

Podczas pracy skupiałem się na:
- ✅ **Spójności**
- ✅ **Funkcjonalności**
- ✅ **Optymalizacji**
- ✅ **Prostota**
- ✅ **Dostępności (a11y)**

---

## Link do strony 🌐
👉 [janiakmeble.pl](https://janiakmeble.pl)

---

**Stack:** Astro, Tailwind CSS, DatoCMS  
**Zakres prac:** UI/UX, optymalizacja, CMS, branding, wdrożenie

---