---
layout: ../../layouts/project.astro
name: "Ecommercowy poligon: testowanie Cursora z analogowym twistem"
description: Platforma ecommerce dla rzemieślników
image: /assets/images/projects/pinktree/main.png
tags: [Po godzinach, Angular, Analog.js, Zoneless, Tailwind, Cursor]
order: 2
---

![Strona główna](/assets/images/projects/pinktree/main.png)

Od jakiegoś czasu myślę nad prototypem portalu ecommerce dla rzemieślników. Jest to jeden z projektów wyciągniętych z mojej “szuflady”. Chodziło mi o stworzenie czegoś więcej niż tylko kolejnego sklepu internetowego – to ma być przestrzeń, gdzie sprzedawcy mogą zaprezentować swoje produkty, pokazać swój warsztat, a także szczegółowo opisać, co ich wyróżnia. Przewiduję też przestrzeń zamkniętą dla twórców by mogli oni wymieniać się doświadczeniami czy nawet prowadzić pchli targ swoich usług i narzędzi. Na razie jest to tylko „strefa dla kupujących” – nie ma backendu, brakuje płatności, a tym bardziej funkcji przeznaczonych specjalnie dla sprzedawców. Dlatego traktuję ten projekt raczej jako poligon doświadczalny niż gotowy produkt. I jak to bywa z takimi „poligonami”, uznałem, że będzie to idealne miejsce do przetestowania Cursora oraz Analog.js.

**Cursor jako asystent kodu – automatyzacja bez utraty kontroli**

Na codzień w pracy używam GitHub Copilota, ale skusiłem się na darmową wersję Cursora, który miał dać mi więcej kontroli i jeszcze więcej wsparcia w pracy nad kodem. Pierwsze zaskoczenie? Composer, który pozwalał mi wprowadzać całe sekwencje zmian w kodzie jednym poleceniem. Przykładowo, dla strony kategorii produktów na moim portalu napisałem po prostu: „Stwórz mi filtry na stronie kategorii, takie jak zazwyczaj są na sklepach internetowych.” Nie podawałem żadnych szczegółów, ale Cursor dał radę, generując strukturę, którą można było szybko dostosować do reszty aplikacji.

Composer przydawał się nie tylko do tworzenia nowych komponentów, ale też przy przeróbkach – kiedy potrzebowałem zmodyfikować interfejs, wystarczyło rzucić luźne polecenie, a narzędzie bez problemu odnajdywało miejsca, gdzie powinny nastąpić zmiany.

Cursor ma swoje ograniczenia – nie potrafił sam znaleźć plików ze zdjęciami, czasami tworzył brednie, nie radził sobie z mniej szablonowymi zagadnieniami, ale na dłuższą metę, i tak oszczędzał masę czasu. **Tu dodam, że całość “pracy nad projektem” zajęła mi dwa tygodnie - z czego po pierwszym tygodniu miałem 90% tego co zrobiłem.** 

![Detal produktu](/assets/images/projects/pinktree/detail.png)

**Dlaczego Analog.js? Pierwsze kroki z frameworkiem**

Jako, że sam jestem sobie sterem i okrętem postanowiłem zabawić sie z nowym frameworkiem (to co frontendowcy lubią najbardziej). Wybór Analog’a był podyktowany jednak nie tylko osobistymi preferencjami a praktycznym podejściem: Analog w znacznie lepszym stopniu niż Angular Universal radzi sobie z zagadnieniami takimi jak SSR i SSG co jest kluczowe w projekcie typu ecommerce. 

Z Analog.js miałem podobne doświadczenia jak z Cursorem – wiele rzeczy działało bez zarzutu, ale wymagało dostosowania do specyfiki projektu. Ponieważ Analog.js korzysta z SSR, musiałem upewnić się, że wszystkie funkcje oparte na API przeglądarki, takie jak localStorage, działają wyłącznie po stronie użytkownika. Było to konieczne, zwłaszcza że projekt docelowo ma wspierać interakcję między kupującymi a sprzedawcami, a więc lokalne przechowywanie danych będzie ważnym elementem.

Z perspektywy programisty Analog.js oferuje głównie funkcje zwiazane z routingiem. Wykorzystując je zyskujemy sztywne zasady definiujące strukturę projektu co ułatwia podejmowanie architektonicznych decyzji. Warto dodać, że routing jest zaprojektowany bardzo intuicyjnie. Co ciekawe, chociaż aplikacja powstaje na Angularze, nie potrzebowałem pełnej klasycznej detekcji zmian i mogłem pozbyć się zone.js. To podejście to tzw. zoneless. Dzięki nowemu API sygnałów mogłem kontrolować rendering, oszczędzając zasoby. Finalnie (podobno, bo oczywiście nie zmierzyłem) pliki ważą znacznie mniej, a serwis działa szybciej. Mimo że różnica w prędkości nie jest zauważalna na projekcie który wyświetla tylko kilka zmockowanych produktów, daje ona poczucie większej kontroli nad tym, jak aplikacja reaguje na interakcje użytkowników. Przy bardziej zaawansowanych scenariuszach SignalStore wydaje się być lepszym wyborem niż klasyczne podejście RxJS – jest po prostu prostszy i wygodniejszy.

![Koszyk](/assets/images/projects/pinktree/cart.png)

**Projekt jako poligon doświadczalny**

Chociaż projekt jest na etapie prototypu, widzę w nim potencjał. Mógłby stać się pełnoprawną platformą, gdzie rzemieślnicy będą mogli nie tylko sprzedawać swoje produkty, ale i nawiązywać kontakty z innymi twórcami. Problem w tym, że póki co brak mi motywacji, żeby kontynuować pracę nad nim na pełen etat. Darmowa wersja Cursora się skończyła, a narzędzie rzeczywiście było dużym ułatwieniem – bez niego nie jestem pewien, czy miałbym ochotę na dalsze „ręczne” eksperymenty z kodem.

Prawda jest taka, że projekt wymaga ogromnych nakładów pracy, a bez inwestora trudno będzie doprowadzić go do końca w rozsądnym czasie. Na razie to dla mnie bardziej miejsce do nauki i testowania nowych narzędzi niż faktyczny produkt. Jednak jeśli pojawi się możliwość rozwoju na pełen etat albo znajdzie się ktoś, kto chciałby wesprzeć projekt, jestem otwarty na kontynuację.

![Szczegóły zamówienia](/assets/images/projects/pinktree/order.png)

**Refleksje o pracy z automatyzacją – czy Cursor ma sens?**

Automatyzacja z Cursorem to miecz obosieczny. Z jednej strony, oszczędność czasu jest bezdyskusyjna, ale tempo pracy często sprawia, że przestajemy myśleć o jakości kodu w perspektywie długofalowej. Po wygenerowaniu kodu warto zawsze zerknąć na niego okiem, by upewnić się, że nie ma zbyt wielu zbędnych powtórzeń lub niedociągnięć.

Cursor na pewno spełnia swoją rolę w fazie prototypowej – pomaga szybciej zobaczyć, jak złożone komponenty mogą działać w praktyce, i ułatwia dostosowanie kodu do zmieniających się wymagań. Do pełnoprawnego projektu, który miałby trafić do produkcji, potrzebna byłaby jednak dodatkowa kontrola kodu i optymalizacja. Może jednak ta szybka praca nad kodem pozwoliła mi bardziej świadomie spojrzeć na jego strukturę i to, jakie elementy naprawdę wymagają manualnej edycji.

**Podsumowując:** prototyp jest, ale projekt czeka na dalszy rozwój, czas, a może i inwestora – wtedy uda się może zrealizować pełną wizję. Na razie pozostaje mi eksperymentowanie i szlifowanie nowych narzędzi, takich jak Cursor i Analog.js.

## Linki

- [Strona projektu](https://pinktree.vercel.app/)
- [Cursor](https://www.cursor.com/)
- [Analog.js](https://analogjs.org/)