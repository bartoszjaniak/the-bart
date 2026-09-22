# Badge artykułu (AI SLOB)

## 1. Cel i uzasadnienie

Artykuły mają dostać jeden opcjonalny, wyróżniający się wizualnie **badge** — widoczny zarówno na karcie artykułu (lista, home, „Powiązane"), jak i na samej stronie artykułu. Badge może nieść krótki **komentarz** pokazywany po najechaniu. Pierwsze użycie: oznaczenie dwóch najnowszych artykułów jako „AI SLOB".

## 2. Opis problemu

Obecnie nie ma sposobu na oznaczenie artykułu wyróżnikiem innym niż kategoria/tagi. Kategoria opisuje temat, tagi — technologię; brakuje miejsca na redakcyjny komentarz typu „ten tekst powstał w okolicznościach X".

## 3. Przyjęte rozwiązania

- **Jedno pole frontmatter `badge`** — obiekt `{ label, comment? }`. Maksymalnie jeden badge na artykuł wymusza sam kształt schematu (jeden obiekt, nie tablica).
- **Jeden komponent `ui/badge.astro`** — używany w obu miejscach (karta + strona artykułu). Jedno źródło wyglądu i zachowania.
- **Tooltip własny (neo-brutal)**, pokazywany na `:hover` i `:focus-visible` — spójny z design systemem, dostępny z klawiatury.
- Badge pojawia się **w rzędzie meta obok chipów** (data / kategoria / czas czytania) — tak samo na karcie, jak i na stronie artykułu.

## 4. Rozważane strategie implementacji (bez kodu)

| Strategia | Ocena |
|---|---|
| Dwa pola frontmatter (`badge`, `badgeComment`) | Odrzucone — pozwala na „osierocony" komentarz bez badge'a; obiekt jest spójniejszy. |
| Tablica badge'ów | Odrzucone — wymaganie mówi „maksymalnie jeden"; YAGNI. |
| Natywny `title` | Odrzucone przez użytkownika — wygląd zależny od przeglądarki, brak spójności z resztą. |
| Osobne warianty koloru badge'a | Odrzucone — YAGNI, jeden wariant (pink) wystarcza. |

## 5. Wzorce architektoniczne

- **Komponent prezentacyjny** (badge.astro) — bez logiki biznesowej, przyjmuje `label` i `comment`.
- **Jeden wariant wizualny** sterowany klasą, zgodnie z regułą design systemu „jawne warianty, bez `nth-child`".
- Treść danych oddzielona od prezentacji: frontmatter → prop → komponent.

## 6. Architektura

```
content.config.ts (schema: badge?)
   │
   ├── post.astro  ──────────────► ui/badge.astro   (rząd card-meta)
   │
   ├── article-card.astro ◄──── prop badge
   │        ▲
   │        ├── pages/posts.astro
   │        ├── components/home/writings.astro
   │        └── components/content/related-posts.astro
```

Zmiana jest w pełni statyczna (Astro SSG), bez JS runtime.

## 7. API / Interfejs

**Frontmatter postu:**
```yaml
badge:
  label: AI SLOB
  comment: "powstał w czasach kiedy pisanie z AI masła maślanego było trendem"
```

**Schemat Zod:**
```ts
badge: z
  .object({ label: z.string(), comment: z.string().optional() })
  .optional()
```

**Komponent `ui/badge.astro`:**
| Prop | Typ | Domyślnie | Opis |
|---|---|---|---|
| `label` | `string` | — | Tekst badge'a. |
| `comment` | `string \| undefined` | `undefined` | Treść tooltipa; brak → badge bez tooltipa. |
| `interactive` | `boolean` | `true` | Czy badge ma być focusowalny (`tabindex`) i mieć `aria-describedby`. `false` w kartach — badge siedzi wewnątrz `<a>`, zagnieżdżony focusable jest błędem. |

**Prop w `article-card.astro`:** `badge?: { label: string; comment?: string }`.

## 8. Przepływy danych

1. Frontmatter MDX → `getCollection("post")` → `post.data.badge`.
2. `post.astro` / karty przekazują `post.data.badge` do `<Badge />`.
3. Brak `badge` → nic nie renderujemy (bez pustego kontenera).
4. `comment` obecny → tooltip w DOM, pokazywany na hover/focus; brak → sam badge.

## 9. Wymagania niefunkcjonalne

- **Wizualnie:** obwódka `3px ink`, `radius-brutal-sm`, cień `shadow-brutal-sm`, font display (Anton), uppercase — jak reszta primitywów. Tło `pink` + tekst `ink` (reguła kontrastu §6 design systemu: na pink tylko ink albo duży bold).
- **Dostępność:** tooltip powiązany `aria-describedby` + `role="tooltip"`; badge bez komentarza nie jest focusowalny; brak zagnieżdżonego focusowalnego elementu w linku karty. `id` tooltipa nadawany **tylko dla triggera focusowalnego** — w kartach (gdzie nie ma `aria-describedby`) `id` nie powstaje, więc dwa identyczne badge'e w jednej liście nie tworzą duplikatu `id`.
- **Responsywność:** badge zawija się w rzędzie meta (`flex-wrap`); tooltip ma `max-width` i nie rozpycha layoutu.
- **Zero JS**, zero nowych zależności.

## 10. Strategia testowania i przypadki testowe

Weryfikacja przez build (`astro check` — walidacja schematu i typów) oraz przegląd renderu:

| # | Przypadek | Oczekiwany wynik |
|---|---|---|
| T1 | Artykuł z `badge` bez `comment` | Badge widoczny, brak tooltipa, brak `tabindex`. |
| T2 | Artykuł z `badge` i `comment` | Badge widoczny; hover/focus pokazuje tooltip; `aria-describedby` wskazuje tooltip. |
| T3 | Artykuł bez `badge` | Brak badge'a, brak pustego elementu. |
| T4 | Karta artykułu z badge | Badge w rzędzie meta karty; badge NIE jest focusowalny (jest w `<a>`). |
| T5 | Dwa najnowsze artykuły | `copilot-editor` i `harmony` mają badge „AI SLOB" z komentarzem. |
| T6 | `astro check` | Schemat odrzuca `badge` bez `label`; błędny kształt = błąd builda. |

## 11. Decyzje użytkownika (odpowiedzi na pytania Elronda)

| Pytanie | Decyzja |
|---|---|
| Jak pokazać komentarz po najechaniu? | **Własny tooltip w stylu neo-brutal** (spójny z resztą, działa też na focus). Odrzucono natywny `title`. |
| Gdzie umieścić duży badge na stronie artykułu? | **W rzędzie meta, obok chipów** (data / kategoria / czas czytania). |

Dodatkowo od użytkownika:
- Badge widoczny **na liście i na artykule**.
- **Maksymalnie jeden badge** na artykuł.
- Pierwszy badge: dwa ostatnie artykuły = `AI SLOB`, komentarz: „powstał w czasach kiedy pisanie z AI masła maślanego było trendem".

## 12. Otwarte pytania i decyzje

- Czy badge ma trafiać też do projektów? — **Nie**, zadanie dotyczy artykułów (YAGNI); schemat projektów bez zmian.
- Czy potrzebne warianty kolorystyczne badge'a? — **Nie**, jeden wariant pink; dodać, gdy pojawi się realna potrzeba.
- Pisownia komentarza zostaje **dosłownie** jak w zadaniu (bez korekty copy).

## Runda recenzji: 1

Zakres: tylko Gates (`@frodo`, `@sauron`, `@daeron`) + podgląd `@bilbo`. Konsultacja Rady (architektura/UX/UI) nie była prowadzona — zmiana jest zbyt mała, by uzasadniała pełny panel; nie pominięto żadnego ryzyka architektonicznego (zmiana czysto prezentacyjna, bez JS i nowych zależności).

**Uwagi przyjęte i wprowadzone:**
1. `@frodo` — duplikat `id` tooltipa, gdy dwa identyczne badge'e są w jednej liście (`/posts`, `/`). Poprawka: `id` nadawany tylko dla triggera focusowalnego (`badge.astro`).
2. `@frodo` — kolejność importów w `post.astro` niezgodna z `organizeImports` Biome. Poprawka: `Badge` przed `Button`.

**Uwagi odrzucone:**
1. `@frodo` — „tooltip może być odczytany dwukrotnie przez czytnik ekranu". Odrzucone: `visibility: hidden` usuwa tooltip z drzewa dostępności, dopóki nie jest widoczny; zachowanie jest zgodne ze spec i standardowym wzorcem tooltipa.

**Zgłoszone użytkownikowi, nie zmienione (decyzja §12 — tekst dosłowny):**
1. `@daeron` — brak przecinka: „w czasach kiedy" → „w czasach, kiedy".
2. `@daeron` — `AI SLOB` może być odczytane jako literówka od „AI SLOP"; przy zamierzonej autoironii działa zgodnie z intencją.

**Status Gates:**
- `@frodo` — 2 uwagi, obie wprowadzone. Poza tym bez uwag. Uwaga „repo-wide CRLF vs LF" dotyczy stanu zastanego (pliki nietknięte też ją zgłaszają), nie tego brancha.
- `@sauron` — implementacja pokrywa specyfikację; brak niezgodności. Braki testowe: T1 (brak fixture z `badge` bez `comment`) oraz warstwa wizualna hover/focus — projekt nie ma frameworka testów jednostkowych, więc pokrycie przez build/render i `astro check` (0 errors).
- `@daeron` — brak zmian w copy; jedno zgłoszenie interpunkcyjne do decyzji użytkownika.

