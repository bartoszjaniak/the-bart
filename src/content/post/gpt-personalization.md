---
title: Personalizacja czata GPT 🦾
description: Jak spersonalizować ChatGPT i zamienić sztywnego bota w swojego genialnego asystenta-programistę.
image: /assets/images/posts/gpt-personalization/skippy.png
imageAlt: Gadająca puszka (pozdro dla kumatych)
createdAt: 2024-10-09
---

# Wirtualny asystent

Korzystanie z czata GPT to największe ułatwienie w pracy programisty od czasów stworzenia języków wysokiego poziomu, które pozwoliły tworzyć kod ludziom spoza bańki komputerowych nerdów. Wykorzystanie generatywnej sztucznej inteligencji [gen-AI] idzie jeszcze krok dalej w ułatwieniu programowania. Mamy pod ręką asystenta który pamięta za nas wszystkie niuanse implementacyjne a nam pozostaje skupić się na szerszym kontekście działania naszych aplikacji, na architekturze i UX. Korzystanie z ułatwiaczy nie zwalnia z konieczności poszerzania wiedzy, trzeba mieć na uwadze że sztuczna inteligencja jest “sztuczna” i nie rozumuje w sensie dosłownym. Potrafi zgadywać i to zgadywanie opanowała do perfekcji. Czasem nawet zgaduje zbyt dobrze i zaczyna zmyślać (lub ja fachowo się to nazywa - halucynacji 😵‍💫).


> W tym artykule będę opisywał działanie Chat GPT od firmy OpenAi, osobiście korzystam również z modeli firmy Anthropic, jednak z tego co wiem nie udostępnia ona możliwości personalizacji.

# Co możemy personalizować

Generalnie można sprowadzić to zagadnienie do dwóch rzeczy: informacji jakie czat powinien o nas wiedzieć aby ułatwić nam współpracę (bo nie zapominajmy że to nasz asystent) i formę odpowiedzi jakiej oczekujemy.

**Informacje o nas** pozwalają na lepsze tworzenie analogii. Znając na przykład nasz główny język programowania, personalizacja pozwala generować analogie jeżeli chcemy nauczyć się innego języka.

**Forma odpowiedzi** - tu temat jest ciekawszy bo nie tylko możemy wskazać, że oczekujemy zwięzłych odpowiedzi bez lania wody ale też, że nie akceptujemy halucynacji. 

## Ziomeczek - nie współpracownik

Jako, że przyjdzie mi coraz więcej współpracować z wirtualnym asystentem to postanowiłem spersonalizować także jego styl wypowiedzi. Chciałem uczynić nasze rozmowy bardziej naturalnymi, bez oficjalnego tonu. Co jak zobaczycie na przykładach niżej chyba mi się udało i brzmi troche jak upalony surfer 🏄. O ile łatwiej pracuje nam się z kumplem niż z mało znanym człowiekiem z innego działu. Jest to oczywiście kwestia indywidualna i jak ktoś chce to może sobie skonfigurować styl taki jaki się podoba - nawet styl mistrza Yody.

# Dwie drogi do osiągnięcia celu

Dla wielu zjadaczy chleba GPT jest synonimem bytu wszechwiedzącego. To nie prawda. Owszem, wiedzę o świecie ma ogromną, ale do bycia bytem jeszcze trochę mu brakuje. Każdy kto korzysta z gen-ai wie, że domyślny styl wypowiedzi jest dość sztywny i oficjalny. Odpowiada jak asystent, który przyszedł pierwszy dzień do pracy i jeszcze nie wie na co może sobie pozwolić. Ma też problem z poziomem pewności siebie, który jest u niego maksymalnie wysoki.  Można jednak nadać pewien charakter swojemu prywatnemu asystentowi. 

## Personalizacja poprzez predefiniowane ustawienia

Chat GPT umożliwia zdefiniowanie dwóch rzeczy w sekcji ustawień: Informacji o sobie, które narzędzie może wykorzystać to generowania bardziej personalnych wypowiedzi oraz oczekiwanej charakterystyki odpowiedzi. 

Można to zrobić w: **Ustawienia > Personalizacja > Dostosuj czatbota ChatGPT**

![Konfiguracja w ustawieniach](/assets/images/posts/gpt-personalization/settings.png)

## Personalizacja bardziej bezpośrednia w czacie

Sam czat GPT posiada pamięć wykorzystywaną na potrzeby przyszłych konwersacji. O ile nie wyłączymy (a moim zdaniem nie warto) odpowiedniej opcji w ustawieniach to czat będzie zapisywał wszelkie informacje o nas i o oczekiwanej formie odpowiedzi. 

![Domyślnie czat zgaduje błednie nasze intencje](/assets/images/posts/gpt-personalization/guesting.png)

Co mi się nie podoba na powyższej konwersacji? Nie określiłem w jakiej technologii oczekuję komponent komentarzy. Może to być React, Angular, Vue albo cokolwiek innego. To jest właśnie jeden z problemów z którymi borykamy się korzystając z narzędzi **gen-AI - lubią zgadywać**.

![Można zaktualizować pamięć poprzez czat](/assets/images/posts/gpt-personalization/memory-update.png)

Spokojnie 😎 Da się temu zaradzić. Jak widać moja komenda została zapisana do pamięci i w przyszłych konwersacjach jest uwzględniona co widać niżej.

![Czat dopytuje o technologię](/assets/images/posts/gpt-personalization/better-version.png)

W ustawieniach w zakładce **“Zarządzanie pamięcią”** można podejrzeć i ewentualnie skasować zapisane informacje.

![Zarządzanie zaisanymi informacjami w ustawieniach](/assets/images/posts/gpt-personalization/memory-management.png)

# Okazjonalny brak współpracy

Muszę zaznaczyć, że mechanizmy personalizacji nie zawsze chcą współpracować. Czasami zdarza się, że nasze ustawienia nie są stosowane - zarówno z konfiguracji zaaplikowanej w ustawieniach jak i bezpośrednio na czacie (mimo że jest potwierdzenie że “zaktualizowano pamięć”). Pomaga dopracowanie instrukcji albo bardziej konkretne ustawienie. Można spróbować na przykład opisać cechy stylu wypowiedzi danej postaci (o które można zapytać czata) niż wskazanie “mów jak…”.

# Szybkie podsumowanie

**Znaczenie i ograniczenia czata GPT**

- Czat GPT to ogromne ułatwienie w pracy programisty, pozwalające skupić się na szerszym kontekście aplikacji
- Sztuczna inteligencja jest "sztuczna" i nie rozumuje dosłownie, czasem może czynić błędne założenia i ma skłonność do halucynacji

**Personalizacja czata GPT**

- Można personalizować informacje o użytkowniku oraz formę odpowiedzi czata
- Personalizacja umożliwia bardziej naturalne i mniej oficjalne rozmowy z asystentem

**Metody personalizacji**

- Predefiniowane ustawienia w sekcji ustawień Chat GPT
- Bezpośrednia personalizacja poprzez konwersację z czatem, która jest zapisywana w pamięci
- Możliwość zarządzania zapisanymi informacjami w ustawieniach "Zarządzanie pamięcią"

**Wyzwania i rozwiązania**

- Problem z nadmiernym zgadywaniem naszych zamiarów przez AI można rozwiązać poprzez precyzyjne instrukcje

Personalizacja ChatGPT otwiera nowe możliwości w efektywnym wykorzystaniu sztucznej inteligencji w pracy programisty, ale wymaga świadomego i odpowiedzialnego podejścia.

![Co dalej, mistrzu kodu?](/assets/images/posts/gpt-personalization/code-master.png)