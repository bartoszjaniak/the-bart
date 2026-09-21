# The Bart — Redesign neo-brutalistyczny

> Status: **Runda recenzji 1 naniesiona — gotowe do akceptacji użytkownika**
> Autor: Elrond (lider) · Rada: gandalf, galadriela, aragorn, samwise, legolas
> Źródło prawdy wizualnej: `the-bart-neo-brutal/index.html`, `the-bart-neo-brutal/article.html`, `the-bart-neo-brutal/styles.css`
> Dokument projektowy UI (szczegóły tokenów): `docs/ui/design-system.md`

---

## 1. Cel i uzasadnienie

Przebudowa warstwy prezentacji serwisu **The Bart** (portfolio + blog) na styl **neo-brutalistyczny** zgodny z prototypem w `the-bart-neo-brutal/`: papierowe tło, grube czarne obwódki, twarde cienie z przesunięciem, akcenty żółty/niebieski/różowy, plakatowa typografia display.

Efekt: spójny, rozpoznawalny wygląd wszystkich widoków (strona główna, listy, artykuł, projekt, o mnie), przy zachowaniu treści, dostępności i istniejącej infrastruktury Astro.

**Poza zakresem:** zmiany backendu/hostingu poza włączeniem prerenderu, wielojęzyczność, nowe funkcje produktowe (wyszukiwanie, filtry tagów, newsletter).

---

## 2. Opis problemu (kontekst)

- Obecny wygląd („miękki minimalizm": zaokrąglenia, dashed borders, Spectral serif, tryb ciemny, dekoracyjna siatka `square-lines`) nie odpowiada dostarczonemu prototypowi neo-brutal.
- Prototyp obejmuje tylko 2 widoki (home, artykuł) i jest statycznym HTML/CSS. Pozostałe widoki (`/projects`, `/about`, `/project/[slug]`, `/posts`) trzeba zaprojektować przez adaptację stylu.
- Kilka elementów prototypu wymaga danych, których modele treści nie mają (kategoria, czas czytania, glif karty, dek, sticky-note, TOC).
- Istnieją realne defekty, które redesign ujawni lub pogłębi (§13.5).

**Stack:** Astro 7.3.3 (`output: "server"`, adapter `@astrojs/vercel` z ISR), Tailwind CSS v4 (`@tailwindcss/vite`), TypeScript, Biome 1.7.3, content collections (`post`, `project`) z Markdowna. Zero testów. Node 22.12.0.

---

## 3. Przyjęte rozwiązania

| Obszar | Rozwiązanie |
|---|---|
| Motyw | **Tylko jasny** (papierowy). Całkowite usunięcie trybu ciemnego i przełącznika Dzień/Noc. `color-scheme: light`. |
| Obrazy | **Hybryda** — obrazy treściowe zostają (w neo-brutalistycznych ramkach o stałym `aspect-ratio`), elementy dekoracyjne → glify. Renderowane zwykłym `<img>` ze ścieżek `public/` (bez `astro:assets` na treści — patrz §7.5). |
| Shell | **Bez ramki „przeglądarki"** (`.browser`/`.browserbar`/`.dot`). Kontener `min(100% − 44px, 1240px)`. |
| Newsletter | **Usunięty** (brak backendu). Sidebar artykułu = TOC + tagi tematyczne (renderowane tylko, gdy są dane). |
| Modele treści | **Rozszerzone + backfill** wszystkich 6 postów i 9 projektów (§7.3). |
| Bloki treści | **MDX** (`@astrojs/mdx@8` w `integrations`) + komponenty Astro z propsami/wariantami (§7.4). |
| Style | **Tailwind v4 + warstwa semantycznych klas/tokenów** z prototypu (`@theme` + `@layer components`) — §8. |
| Typografia | Webfont display **Anton** (natywne API fontów Astro 7). Body = stos systemowy (Arial). |
| Renderowanie | **Prerender tras treści**; trasy `[slug]` wymagają **`getStaticPaths()`** (§6.1). |
| JS | Minimum: menu mobilne + „kopiuj link"/„kopiuj prompt". Bez hacka sticky header, bez dark mode. |

---

## 4. Rozważane strategie implementacji (bez kodu)

1. **Bloki treści** — rozważano:
   (a) `.md` + mapowanie komponentów przez `<Content components={...} />` — **niewykonalne w Astro 7**: prop `components` jest przekazywany wyłącznie dla `.mdx` (potwierdzone w `node_modules/astro/dist/content/runtime.js:486`, `if (id.endsWith("mdx"))`);
   (b) dyrektywy natywnego procesora Sätteri (`:::callout{type=yellow}`) + własny plugin mdast/hast — zero zależności, ale ~30–50 linii kodu do utrzymania;
   (c) **MDX** — wybrane. Kompatybilność zweryfikowana: `@astrojs/mdx@8.0.1` deklaruje peer `astro ^7.2.6`; peer `@astrojs/markdown-satteri@^0.4.0` spełniony przez zainstalowane `0.4.1`.
2. **Style** — port waniliowego `styles.css` 1:1 vs Tailwind v4 + tokeny. Wybrano Tailwind v4 z tokenami w `@theme` + `@layer components`.
3. **Fonty** — Google Fonts `<link>` (odrzucone: prywatność, brak preloadu, FOUT), `@fontsource/anton` import, natywne `fonts` API Astro 7. Wybrano natywne API (preload, metryczny fallback, `cssVariable`). Fallback: `fontProviders.local()`, jeśli build offline ma działać bez sieci.
4. **Nawigacja** — one-page z anchorami vs routy. Wybrano: nav mapuje na routy (jednoznaczny stan aktywny, działa bez JS); anchory pozostają w nav („Kontakt") i w CTA wewnątrz treści.
5. **Testy** — Vitest/Playwright vs brak. Wybrano: brak frameworka; bramka = `astro check` + `astro build` + malutki skrypt kontroli treści + ręczny checklist (§11).
6. **Obrazy** — migracja do `astro:assets` + `src/assets` vs pozostanie przy ścieżkach `public/`. Wybrano drugie (mniejszy zakres; hack `-small.jpeg` i tak znika — §7.5).

---

## 5. Wzorce architektoniczne

- **Separacja treść / prezentacja** (koncepcyjnie Ports & Adapters): schemat Zod + `src/content/**` = walidowana domena; `pages`/`layouts`/`components` = adapter prezentacji. Komponenty nie czytają Markdowna „same z siebie" — dostają dane z `getCollection`/`render`.
- **Value Object na granicy**: walidacja frontmatteru w Zod; **do schematu trafia tylko treść, której nie da się wyliczyć**. Wartości wyliczalne (czas czytania, glif, TOC, powiązane) i prezentacyjne (wariant koloru) **nie są utrwalane w danych**.
- **Brak wzorców rozproszonych** (CQRS, Event Sourcing, Saga) — nieadekwatne do statycznego systemu treściowego.

---

## 6. Architektura

### 6.1 Trasy i renderowanie

| Route | Render | Zawartość |
|---|---|---|
| `/` | prerender | one-page: hero → `#artykuly` (3 najnowsze) → footer |
| `/posts` | prerender | pełna lista artykułów (bez draftów) |
| `/projects` | prerender | pełna siatka projektów |
| `/about` | prerender | bio + timeline kariery + `#kontakt` |
| `/post/[slug]` | prerender | artykuł: breadcrumb, hero (chip daty/kategorii/czasu czytania, dek, sticky-note), authorbar + share, prose, TOC, tagi, powiązane |
| `/project/[slug]` | prerender | projekt: nazwa, tagi, obraz, prose, CTA `projectUrl` (jeśli jest), powrót |
| `/404` | prerender | komunikat + powrót na `/` (**plik do dodania** — dziś brak) |

**Konsekwencje techniczne (krytyczne):**
- Wszystkie trasy dostają `export const prerender = true`.
- Trasy dynamiczne **muszą** dostać `getStaticPaths()` enumerujące wpisy z `getCollection` i przekazujące wpis przez `props`; obecne `getEntry(...)` (tryb SSR) znika.
- `getStaticPaths()` **filtruje `!data.isDraft`** → generowanych jest **5 postów** (bez `fit-office`). Bezpośredni URL draftu → **404**.
- Po tym `output: "server"` zostaje (nie zmieniamy setupu adaptera), ale ISR (`isr: true`) i `imageService: true` stają się nieużywane. Opcjonalne sprzątanie poza zakresem; świadomie akceptujemy.

**Hero (strona główna)** — skład: eyebrow („Cześć,"), `h1` z żółtym markerem („jestem **Bartosz**."), lead, akapit opisowy, **2 przyciski CTA** (pierwotny: „Zobacz projekty →" → `/projects`; drugorzędny: „Najnowsze artykuły" → `#artykuly`) + **trzeciorzędny link** „◉ GitHub →" (zewnętrzny → §10). Obok `identity`: `avatar-card` z prawdziwym zdjęciem, `note-card` (cytat), `scribble` (`aria-hidden`, ukryty ≤680px).

**Zakres strony głównej:** wyłącznie artykuły (sekcja „Najnowsze artykuły" + CTA do `/posts`). Projekty dostępne tylko na `/projects`, biblioteka i rząd wartości — usunięte (§16).

**Brand:** znak graficzny (`src/assets/images/logo-the-bart.png`) + wordmark „THE BART" z żółtym podkreśleniem; **bez podtytułu**, w nagłówku i w stopce (§16).

### 6.2 Nawigacja

`src/collections/menu.json` → pozycje mapowane na routy:

| Label | URL | Aktywny gdy |
|---|---|---|
| Start | `/` | `pathname === "/"` |
| Artykuły | `/posts` | `pathname` w `/posts` lub `/post/*` |
| Projekty | `/projects` | `pathname` w `/projects` lub `/project/*` |
| O mnie | `/about` | `pathname === "/about"` |
| Kontakt | `/about#kontakt` | **nigdy** (hash nie trafia do `Astro.url.pathname`) |

- Stan aktywny liczony **serwerowo**, `aria-current="page"`. **Wykluczenie kolizji:** pozycje z hashem nie uczestniczą w detekcji (inaczej `/about` i `/about#kontakt` dają dwa aktywne wpisy).
- Dla `/post/*` i `/project/*` ustawiamy `aria-current="true"` (orientacja, nie „page") na właściwym rodzicu.
- Footer **nie** ma już `id="kontakt"` (dziś duplikat z sekcją na `/about`) — jeden cel kontaktu.

### 6.3 Struktura komponentów (docelowa)

```
src/components/
  layout/   header.astro, footer.astro, brand.astro, skip-link.astro
  ui/       button.astro, chip.astro, tag.astro, section-head.astro,
            glyph.astro, image-frame.astro
  cards/    article-card.astro, project-card.astro
  content/  author-bar.astro, toc.astro, sidebox.astro, related-posts.astro,
            topic-tags.astro
  blocks/   callout.astro, prompt.astro, quote-block.astro, steps.astro,
            step.astro, prose-heading.astro, styled-image.astro
  home/     hero.astro, writings.astro
  about/    experience.astro
src/lib/    reading-time.ts, glyphs.ts, variants.ts, related.ts, images.ts
scripts/    check-content.mjs
```

Redukcje/usunięcia: `square.astro`, `square-line.astro`, `square-lines.astro` (dekoracja tła niezgodna z motywem), `logo.astro` (zastąpione tekstowym `brand.astro`; obraz logo zostaje jako favicon), `home/separator.astro` + `page-heading.astro` (scalone w `ui/section-head.astro`). `posts-loop.astro` rozbite na `cards/article-card.astro` + pętlę w miejscu użycia.

---

## 7. API / Interfejs — model treści

### 7.1 Schematy (`src/content.config.ts`)

```ts
const postCollection = defineCollection({
  loader: glob({ base: "./src/content/post", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),            // dek artykułu
    createdAt: z.date(),
    isDraft: z.boolean().default(false),
    category: z.string(),               // NOWE, wymagane — jeden chip kategorii
    tags: z.array(z.string()).default([]),
    image: z.string(),                  // ZMIANA: wymagane (wszystkie 6 postów ma obraz)
    imageAlt: z.string(),               // NOWE, wymagane (a11y; spójne z wymaganym image)
    stickyNote: z.string().optional(),  // NOWE — tekst karteczki w hero artykułu
  }),
});

const projectCollection = defineCollection({
  loader: glob({ base: "./src/content/project", pattern: "**/*.{md,mdx}" }),
  schema: z.object({
    name: z.string(),
    description: z.string(),
    image: z.string(),
    imageAlt: z.string(),               // NOWE, wymagane
    icon: z.string().optional(),        // NOWE — glif karty (fallback: domyślny glif)
    projectUrl: z.string().optional(),
    tags: z.array(z.string()).default([]),
    order: z.number().default(100),
  }),
});
```

`image` wymagane w poście → znika problem „`imageAlt` wymagane, ale `image` opcjonalne" i znika potrzebny fallback OG.

### 7.2 Pola i reguły wyliczane (NIE w schemacie)

| Potrzeba designu | Sposób | Moduł |
|---|---|---|
| Czas czytania („8 min czytania") | `readingTime(body)` = słowa ÷ 200 wpm, `max(1, …)`. Uwaga: liczy surowe znaczniki MDX (przybliżenie — akceptowane). | `src/lib/reading-time.ts` |
| Glif karty artykułu | mapa `category → glif` z **jawnym fallbackiem** dla nieznanej kategorii (`▧`) | `src/lib/glyphs.ts` |
| Glif karty projektu | `icon` z danych; **fallback**: wspólny glif domyślny | `src/lib/glyphs.ts` |
| Wariant koloru (tło ikony + krawędź cienia) | `variantForIndex(i) = ['yellow','blue','pink'][i % 3]` — **jedno źródło**: jeden `variant` steruje jednocześnie kolorem tła ikony i koloru cienia karty. | `src/lib/variants.ts` |
| Spis treści (TOC) | `render(entry).headings`; filtr `depth === 2`; numeracja `01…` | — |
| Powiązane artykuły | **tylko** ta sama `category`, potem najnowsze; wykluczyć bieżący; limit 3; sekcja znika, gdy 0 wyników | `src/lib/related.ts` |
| OG image / URL | `new URL(image, Astro.site)` → absolutny URL (schemat gwarantuje istnienie `image`) | `src/lib/images.ts` |
| Sortowanie | posty: `createdAt` malejąco; projekty: `order` rosnąco, **tie-break po `name`** (`localeCompare`) | — |

Odrzucone jako zbędne: `featured`, `updatedAt`, `heroVisual`, `readingTime`/`glyph` w danych, powiązane projekty.

### 7.3 Backfill (6 postów + 9 projektów)

**Posty** — `category` (nowe), `imageAlt` (nowe), `stickyNote` (opcjonalne). Dodatkowo **migracja nagłówków `#` → `##`** (a11y: jeden `<h1>`/stronę; dziś `clean-iphone.md` ma 3× H1, `gpt-personalization.md` 5× H1 — poza tym TOC z H2 byłby dla nich pusty).

| Plik | `category` | `imageAlt` | `stickyNote` | Migracja H1 |
|---|---|---|---|---|
| `copilot-editor.md` | AI | „Ilustracja artykułu o AI jako redaktorze" | `AI jako redaktor` | — |
| `gpt-personalization.md` | AI | „Gadająca puszka (pozdro dla kumatych)" (już jest) | `Mój asystent` | 5× `#` → `##` |
| `clean-iphone.md` | TECH | „Ekran iPhone'a w trakcie porządkowania" | `Cyfrowy minimalizm` | 3× `#` → `##` |
| `harmony.md` | LIFESTYLE | „Ilustracja artykułu o życiu w harmonii" | `Życie w harmonii` | — |
| `stool.md` | LIFESTYLE | „Stołek biurowy zamiast krzesła" | `Stołek zamiast krzesła` | — |
| `fit-office.md` (draft) | LIFESTYLE | „Trening w domu w trakcie pracy zdalnej" | — | — |

**Projekty** — `imageAlt` (brakuje w `pinktree`, `Skapiec`) i `icon`:

| Plik | `imageAlt` (nowe) | `icon` |
|---|---|---|
| `ad-tech.md` | „Szaleństwo współczesnego Internetu" (już jest) | `▥` |
| `this-page.md` | „Fragment strony na której teraz jesteś" (już jest) | `▣` |
| `pinktree.md` | „Strona główna sklepu z rękodziełem" | `▦` |
| `Chapter-one.md` | „Obrazek aplikacji Chapter One" (już jest) | `▤` |
| `Feed Management.md` | „Logo projektu feedów" (już jest) | `⚙︎` |
| `Moneteasy.md` | „Logo Moneteasy" (już jest) | `◉` |
| `Onetads.md` | „Logo OnetAds" (już jest) | `◀` |
| `Skapiec.md` | „Logo porównywarki Skąpiec.pl" | `◇` |
| `janiakmeble.md` | „Podgląd fragmentu strony" (już jest) | `▰` |

**Uwaga o glifach (twarda reguła):** glify muszą być **monochromatyczne** — glify emoji (`⚙`, `🛒`) renderują się kolorowo. Używamy tekstowej prezentacji (`\uFE0E` / `font-variant-emoji: text`); `🛒` zastąpione przez `▦`. Glify są **dekoracyjne** (`aria-hidden`) — znaczenie niesie chip/etykieta, nigdy sam glif.

Duplikat `order: 1` (`ad-tech`, `this-page`) → rozwiązany tie-breakiem po `name` (§7.2).

### 7.4 Bloki treści — komponenty MDX

Integracja: `@astrojs/mdx` dodane do `integrations` w `astro.config.mjs`. Komponenty w `src/components/blocks/`, mapowane dla treści przez `components` na `<Content>` (autor **nie** importuje ich w treści). Gdyby TS zgłaszał nieznane nazwy w `.mdx`, fallback = jawne importy w plikach treści (bez zmian semantyki).

| Komponent | Semantyka (a11y) | Props |
|---|---|---|
| `<Callout variant="yellow\|blue" title="…">` | `<aside role="note">` + `h3` | `variant`, `title`, slot |
| `<Prompt label="Prompt">` | `<figure>` / blok z `aria-label`; przycisk „Kopiuj" z `aria-label` + feedback `aria-live` | `label`, slot |
| `<QuoteBlock>` | `<blockquote>` (+ ewent. `cite`) | slot |
| `<Steps>` / `<Step title="…">` | `<ol>` / `<li>` (numery wynikają z listy, nie z CSS) | `title`, slot |
| `<StyledImage src alt />` | `<img>` w `image-frame` (stałe `aspect-ratio`) | `src`, `alt` |
| `ProseHeading` (mapowany na `h2`/`h3`) | `id` **skonsumowany z pipeline** (`headings[].slug`), nie regenerowany; `scroll-margin-top`; dostępna nazwa linku | — |

- Bloki dostają `not-prose` na granicy, żeby `@tailwindcss/typography` nie nadpisywał ich typografii.
- Kontrakt `id`: nagłówki w treści renderują `id` pochodzący z MDX/markdown pipeline (ten sam, który zwraca `render().headings`), więc TOC zawsze trafia w istniejący element.
- Surowy HTML w `.mdx` jest dozwolony, ale **preferowane są bloki**; inline `style` i `class` w treści są niedozwolone (zakaz z §8).
- **Migracja `clean-iphone.md`:** `<aside>` → `<Callout>`, 4× `<img style="…">` → `<StyledImage>` (usunięcie inline `style`). Pozostałe pliki → `.mdx` bez zmian treści.

### 7.5 Obrazy

- Wszystkie obrazy treściowe pozostają w `public/assets/images/**` i są renderowane zwykłym `<img>` wewnątrz `ui/image-frame.astro` (obwódka 3px + `shadow-brutal-sm` + **stałe `aspect-ratio`**: projekty 16/9, okładki 3/4, hero/portret wg oryginału).
- Brak potrzeby ręcznego `width`/`height` (wynika z `aspect-ratio` ramki) → problem CLS rozwiązany na poziomie komponentu, a nie danych.
- Znika hack `image.replace(".png","-small.jpeg")` (`src/components/project.astro:10`) — pliki `*-small.jpeg` przestają być potrzebne.
- `astro:assets` `Image` przestaje być używany dla treści (obrazy w `public/` i tak nie były optymalizowane po ścieżce stringiem). `adapter.imageService: true` staje się nieużywane — opcjonalne sprzątanie.

---

## 8. Design tokens i komponenty (skrót)

Pełny dokument: `docs/ui/design-system.md` (wymaga synchronizacji po decyzji o foncie — patrz §12).

```
--color-paper:#f5f2e8   --color-surface:#fffefa  --color-ink:#111111
--color-yellow:#ffd629  --color-blue:#13a8f4    --color-pink:#ff3f78
--color-muted:#e8ebf0   --color-dark:#1a1a1a
--color-ink-soft:#252934  --color-ink-muted:#565b65
--color-blue-tint:#bde8ff --color-pink-tint:#ffb0c8
--color-on-accent:#111111 --color-on-dark:#fffefa
--font-display: var(--font-anton), Impact, "Arial Black", sans-serif   /* cssVariable z API fontów Astro */
--font-body: Arial, Helvetica, system-ui, sans-serif
--shadow-brutal: 7px 7px 0 var(--color-ink)   --shadow-brutal-sm: 4px 4px 0 var(--color-ink)
--shadow-brutal-lg: 10px 10px 0 var(--color-ink)
--shadow-edge-yellow/blue/pink: 0 7px 0 <kolor>
--radius-brutal: 7px    --radius-brutal-sm: 2px
--breakpoint-tablet: 980px   --breakpoint-mobile: 680px
--container-max: 1240px      --spacing: 4px (siatka)
```

- `--text-chip` = **11px** (12px ≤680) — spójnie z wymaganiem a11y chipów.
- Nagłówki display: line-height **≥ .95** (nie `.88`) — Anton obcina ogonki Ą/Ę/Ż/Ź i akcenty Ó przy zbyt ciasnej interlinii. Do weryfikacji przy pierwszym renderze.
- **Focus ring (mapa powierzchnia → kolor pierścienia, SC 1.4.11):** na `paper`/`surface`/`muted` → pierścień **ink**; na `ink`/`black`/`dark` → pierścień **yellow** lub **pink**; na `blue` → pierścień **ink** (yellow na blue ≈ 1.8:1 — niedopuszczalne). Nigdy `outline:none` bez zamiennika.
- **Kontrast:** tekst na `yellow` i `blue` = **ink**; biały tekst tylko na `pink` przy tekście dużym/bold (≥18.66px) oraz na `black`/`dark`. Biel na blue (2.4:1) niedopuszczalna.
- **Glify:** monochromatyczne, `aria-hidden`; warianty kart różnią się kolorem, ale **nie** glif jako nośnik znaczenia.
- **Zakazy przenoszenia z prototypu:** `.browser*`, `!important`, inline `style`, kolorowanie `nth-child`, `Comic Sans`, duplikaty szarości, toggle dark mode.
- `overflow-wrap: anywhere` dla długich nieprzerywalnych ciągów; `Steps` na `repeat(auto-fit, minmax(200px, 1fr))` (obstuga 3–6 kroków); `Prompt` zawija (`white-space: pre-wrap` + `overflow-wrap: anywhere`) zamiast poziomego scrolla.
- ≤680px: `note-card`/`avatar-card` — zdjęta rotacja lub zbity cień; `body { overflow-x: clip }`.

---

## 9. Przepływy danych

```
frontmatter (.md/.mdx) --Zod--> getCollection('post'|'project')
                                        |
                getStaticPaths() [prerender]  filter !isDraft
                                        |
                     +------------------+-------------------+
                     |                                      |
              render(entry)                           entry.data
              ├─ Content (MDX + components)           ├─ derived: readingTime, glyph, variant
              ├─ headings --> <Toc>                   └─ related(category) -> limit 3
              └─ <Content components={blocks}>
                          |
                     page/layout --> komponenty --> HTML (prerender) --> Vercel
```

Interakcje klienta (JS): menu mobilne (toggle `aria-expanded`), „Kopiuj link" (`navigator.clipboard` + fallback `execCommand`, feedback `aria-live="polite"`), „Kopiuj prompt" (delegacja zdarzeń na `.prompt`). Sticky header = czysty CSS `position: sticky`.

---

## 10. Wymagania niefunkcjonalne

**Dostępność (WCAG 2.2 AA, must-have):**
- `<html lang="pl">` (dziś błędnie `en`).
- Skip link „Przejdź do treści" → `#main`; `#main` ma `tabindex="-1"`, żeby focus faktycznie się przenosił.
- Landmarki: `header`, `nav[aria-label]`, `main#main`, `footer`, `aside` (sidebar artykułu).
- Dokładnie jeden `<h1>` na stronę (wymusza migrację H1 w treści — §7.3), brak przeskoków poziomów.
- `:focus-visible` wg mapy z §8; **Focus Not Obscured** (SC 2.4.11) — sticky header nie może zasłaniać focusowanego elementu (poza TOC).
- **Touch targets ≥ 24×24 CSS px** (rekomendowane 44×44) — przyciski ikonowe (kopiuj/share/toggle menu), klikalne chipy i tagi, linki w stopce.
- Kontrast wg reguły z §8; chipy ≥11px i wyłącznie jako metadane.
- `aria-label` dla przycisków ikonowych; glify dekoracyjne `aria-hidden="true"`.
- Linki zewnętrzne (GitHub, LinkedIn, projectUrl, lubimyczytac): `target="_blank" rel="noopener noreferrer"` + wizualny wskaźnik ↗ + `sr-only` „(otwiera w nowej karcie)".
- Menu mobilne: `<button aria-expanded aria-controls>`, zamykanie `Escape`, powrót focusu do toggle.
- TOC: desktop = sidebar `nav[aria-label="Spis treści"]` + `<ol>`; mobile = zwijany `<details>/<summary>` nad treścią. `scroll-margin-top` ~90px; docelowy nagłówek ma `tabindex="-1"`.
- Blockquote/Steps/Callout z semantyką wg §7.4.
- `prefers-reduced-motion`: wyłączone `scroll-behavior:smooth`, transformacje i rotacje.
- `color-scheme: light`.

**Wydajność / SEO:**
- Obrazy: ramka z `aspect-ratio` + `object-fit` przeciw CLS; `alt` wymagany schematem.
- Font display: `preload` (przez `<Font>`), `font-display: swap`, metryczny fallback (API Astro), subset **`latin-ext`** jawnie (inaczej ą ć ę ł ń ó ś ź ż polecą z fallbacku).
- OG/Twitter: **absolutne** URL-e (`new URL(image, Astro.site)`), `og:url` bez query stringa.
- Prerender tras treści.

**Jakość kodu:** Biome (`npm run check`), `astro check` bez błędów, brak `console.log` w produkcji.

---

## 11. Strategia testowania i przypadki testowe

**Decyzja:** bez frameworka testowego (Vitest/Playwright). Bramka jakości:

1. `npm run build` = `astro check && astro build` z prerenderem — build realnie renderuje **5 postów** (bez draftu) + 9 projektów + 5 stron statycznych + `/404`.
2. `npm run check:content` — malutki skrypt `scripts/check-content.mjs` (Node, zero zależności): dla każdego `.md`/`.mdx` sprawdza, że `image` wskazuje istniejący plik w `public/` i że `imageAlt` jest niepusty. `ponytail: skrypt, nie framework; Zod i prerender nie walidują ścieżek obrazów`.
3. Ręczny checklist wizualny na szerokościach **360 / 680 / 980 / 1280 / 1920**.
4. Playwright dopiero, gdy regresje wizualne zaczną się powtarzać (wtedy 1 smoke: 7 tras × 3 viewporty, brak błędów konsoli, obrazy 200).

**Automatycznie weryfikowalne kryteria akceptacji:**
- [ ] Build bez błędów i ostrzeżeń (brak `console.log`).
- [ ] Prerender generuje 5 postów (draft wykluczony) i 9 projektów.
- [ ] `check:content` przechodzi (istniejące obrazy, niepuste `imageAlt`).
- [ ] Draft (`fit-office`) nieobecny na `/posts`, `/`, i pod `/post/fit-office` (404).
- [ ] TOC generuje się z H2 i linkuje do istniejących `id`; posty z migracją H1 mają niepuste TOC.
- [ ] `readingTime` > 0 dla każdego posta.
- [ ] Bloki (`Callout`, `Prompt`, `QuoteBlock`, `Steps`) renderują się w poście, który ich używa (wszystkie cztery używane w `copilot-editor.mdx`, żeby nie pozostawały nieprzetestowane).
- [ ] Na `/about` dokładnie jeden element nav z `aria-current`; na `/post/*` `aria-current="true"` na „Artykuły".

**Przypadki brzegowe (oczekiwane zachowanie):**

| # | Scenariusz | Oczekiwanie |
|---|---|---|
| A1 | Post bez `tags` (4 z 6) | brak pustego kontenera tagów; brak „undefined" |
| A2 | Post bez `image` | **niemożliwe** (schemat wymaga) — kontrakt egzekwowany przez Zod |
| A3 | `isDraft: true` (`fit-office`) | nieobecny na listach i pod bezpośrednim URL → **404** |
| A4 | Post z 0 nagłówków H2 | TOC ukryty (brak pustego panelu) |
| A5 | Duplikat / znaki PL w tytułach H2 | unikalne, poprawne `id`; TOC trafia w nagłówek |
| A6 | Post bardzo krótki | `readingTime` = 1 |
| A7 | Kategoria spoza mapy glifów | glif domyślny (`▧`), brak `undefined` |
| A8 | Post z H1 w treści (przed migracją) | po migracji brak podwójnego `h1`; jeden `h1` na stronę |
| B1 | Projekt bez `projectUrl` | brak pustego CTA na stronie szczegółów |
| B2 | Projekt z `projectUrl` | link zewnętrzny z `target=_blank` + `rel=noopener noreferrer` + ↗ + `sr-only` |
| B3 | Projekt `.webp` / brak pliku `-small` | brak cichego 404; hack `-small` usunięty |
| B4 | Projekt bez `icon` | glif domyślny |
| B5 | Dwa projekty z tym samym `order` | deterministyczna kolejność (tie-break po `name`) |
| C1 | OG image / `og:url` | absolutne URL-e, `og:url` bez query stringa |
| C2 | Brak `default-image.jpg` | referencja usunięta; OG zawsze z istniejącego `image` |
| D1 | Pozostały listener `darkToggle` | **brak** — cały blok kodu dark mode usunięty (nie guardowany), brak `TypeError` |
| D2 | „Kopiuj link" na HTTP / bez `navigator.clipboard` | fallback `execCommand` (jedna droga, nie „fallback lub ukrycie") + feedback |
| D3 | „Kopiuj prompt" | kopiuje treść promptu |
| E1 | Powiązane przy <3 postach w kategorii / wykluczenie bieżącego | sekcja niepusta i bez „self"; przy 0 wynikach sekcja ukryta |
| F1 | Długie tytuły/opisy (karty 3-kol, `.section-head h2`) | brak przepełnienia / poziomego scrolla; `overflow-wrap: anywhere` |
| F2 | Rotacje (`note-card`/`avatar-card`) na 360px | brak wyjścia poza viewport (rotacja zdjęta ≤680) |
| F3 | `.steps` przy 3 i 6 krokach | `auto-fit minmax(200px,1fr)` — brak sztywnego 4 |
| F4 | Prompt z długimi liniami | zawijanie (`pre-wrap`), bez poziomego scrolla |
| F5 | Zapamiętane `localStorage.dark_mode=true` | brak efektu ubocznego (martwy skrypt usunięty) |
| G1 | Trasa `/404` | istnieje i renderuje się |

**Checklista manualna (człowiek):** kontrast wszystkich par tła (żółty/niebieski/różowy/czarny), widoczność focusu na każdym tle + Focus Not Obscured, pełna ścieżka klawiaturą (skip link → nav → menu mobilne → TOC → kopiuj), **Escape** zamyka menu + powrót focusu, **dokładnie jeden `<h1>`**, brak poziomego scrolla na 5 szerokościach, sticky header nie zasłania anchorów, test czytnikiem ekranu (NVDA/VoiceOver), zoom/reflow 200% i 400%, `prefers-reduced-motion`, touch targets, druk artykułu. Progi: Lighthouse a11y ≥ 95, zero błędów konsoli, LCP < 2.5 s.

---

## 12. Decyzje użytkownika

Ustalenia z sesji specyfikacyjnej (wiążące):

1. **Tryb ciemny** — usunąć całkowicie; zostaje tylko jasny, papierowy motyw.
2. **Obrazy** — hybryda: zdjęcia treściowe zostają (obramowane neo-brutalistycznie), elementy dekoracyjne → glify.
3. **Ramka „przeglądarki"** z kropkami — usunąć.
4. **Box newslettera „Bądź na bieżąco"** — usunąć (brak backendu).
5. **Modele treści** — rozszerzyć i uzupełnić wszystkie istniejące wpisy (6 postów, 9 projektów).
6. **Bloki treści** (callout, prompt, cytat, kroki) — pełne wsparcie, autorowane jako **komponenty z propsami (MDX)**.
7. **Style** — Tailwind v4 + warstwa semantycznych klas/design tokenów (nie przenosimy waniliowego CSS 1:1).
8. **Typografia** — dodać webfont display dla nagłówków.
9. **Renderowanie** — włączyć prerender tras treści.

**Decyzje podjęte przez lidera (rozstrzygnięcia sporów Rady):**
- `.md` + `components` (Gandalf) — **odrzucone**; Legolas wykazał w źródle Astro 7, że prop `components` działa tylko dla `.mdx` → **MDX**.
- Font: Anton (Galadriela) dostarczony **natywnym API fontów Astro 7** (Legolas) — `--font-display` musi odwołać się do generowanej `var(--font-anton)`. `docs/ui/design-system.md` wymaga synchronizacji.
- Body bez dodatkowego webfontu — akceptujemy syntetyczny bold Arial (bez Inter).
- `imageAlt` i `category` — **wymagane**; `image` w poście również **wymagane** (spójność + OG).
- `icon` w projekcie — **opcjonalny** z fallbackiem (bez backfillu niemożliwego do pominięcia); glif posta **wyliczany z kategorii**.
- Warianty kolorów — **jawne** z jednego źródła (`variantForIndex`), sterują **jednocześnie** tłem ikony i cieniem krawędzi.
- Bezwzględnie usuwamy blok dark mode (nie guardujemy) — inaczej `TypeError` zabija pozostały JS.
- Weryfikacja faktów: **fałszywy alarm** Legolasa o „mojibake" — pliki `.md` są poprawnym UTF-8 (potwierdzone hexami). Nieprawdziwe też „brakujące assety `photo2.png`/`photo-pixelized.png`" — istnieją w `public/assets/images/`.

---

## 13. Otwarte pytania i decyzje

1. **Book-card i rząd wartości** — usunięte na życzenie użytkownika (§16); pytanie nieaktualne.
2. **Kategorie postów** (§7.3) i **glify** (§7.3) — propozycje lidera; do korekty przez autora treści.
3. **Font Anton** — wybór potwierdzony; do wizualnej weryfikacji: obcinanie polskich diakrytyków przy ciasnej interlinii (line-height ≥ .95, §8).
4. **Container queries** dla kart (rekomendacja Galadrieli) — odroczone; w pierwszej iteracji media queries `980/680`, ale trzeba jawnie zdefiniować reguły dla wąskiego kontekstu sidebara (mniejszy tytuł karty, inny `margin-right` ikony).
5. **`@tailwindcss/typography`** — zostaje z punktowymi overrides + `not-prose` na blokach. Jeśli konfliktów będzie dużo, wyciąć plugin i utrzymać własny `.prose`.
6. **Sprzątanie po prerenderze** — `isr`/`imageService` w adapterze stają się nieużywane; opcjonalne usunięcie poza zakresem.

---

## 14. Runda recenzji 1 — naniesione poprawki

**Przyjęte (krytyczne):**

| Źródło | Uwaga | Naniesione |
|---|---|---|
| samwise | `prerender` na `[slug]` wymaga `getStaticPaths()` | §6.1 — jawnie wymagane; `getEntry` znika |
| samwise | sprzeczność draftu (5 vs 6 postów) | §6.1/§7.3/§11 — draft filtrowany, URL → 404; rozstrzygnięte (dawne pytanie 3) |
| samwise | podwójny `<h1>` w treści (2 pliki) | §7.3 — migracja `#`→`##` + przypadki A8, checklista |
| aragorn | kolizja `aria-current` (`/about` + `/about#kontakt`) | §6.2 — hash-linki nieaktywne + `aria-current="true"` dla `/post/*` |
| galadriela | `--font-display` musi wskazywać `var(--font-anton)` | §8 |
| galadriela | focus ring yellow na blue (1.8:1) | §8 — mapa powierzchnia→kolor pierścienia |
| galadriela | chip 10px vs wymóg ≥11px | §8 — 11px (12px ≤680) |
| gandalf | `image` opcjonalne + `imageAlt` wymagane | §7.1 — `image` wymagane w poście |
| gandalf | brak fallbacku glifu dla kategorii | §7.2/§7.3 — glif domyślny `▧`; `🛒`→`▦` (emoji) |
| gandalf | strategia obrazów / martwy `imageService` | §7.5 — `<img>` + stałe `aspect-ratio`, bez `astro:assets` na treści |
| gandalf | `components` MDX a `astro check` | §7.4 — provider + udokumentowany fallback (jawne importy) |
| gandalf | brak `@astrojs/mdx` w `integrations` | §7.4 — jawny krok |
| gandalf | `typography` vs bloki MDX | §7.4/§13.5 — `not-prose` |
| gandalf | niespójność tokenu radius | §8 — `--radius-brutal`/`--radius-brutal-sm` |
| gandalf | nieokreślone źródło OG / tie-break / books | §7.2, §6.1 |
| aragorn | brak touch targets | §10 + checklista |
| aragorn | hero nierozstrzygnięte | §6.1 — skład hero |
| aragorn | TOC mobile `<details>` poza treścią specu | §10 |
| aragorn | `related(category/tags)` niespójne | §7.2/§9 — tylko `category` |
| aragorn | `tabindex="-1"` na `#main` i nagłówkach | §10 |
| aragorn | semantyka bloków | §7.4 |
| galadriela | `Steps` sztywne 4 / E4 scroll w prompt | §8 — `auto-fit`, `pre-wrap` |
| galadriela | E2 rotacje na 360px | §8 |
| samwise | `check:content` zamiast ręcznej kontroli obrazów | §11.2 |
| samwise | brakujące `imageAlt` dla pinktree/Skapiec | §7.3 |
| samwise | A2/D2 niejednoznaczne | §11 — doprecyzowane |

**Odrzucone / odroczone:**

- **Mikro-test `node:test` na logikę pochodną** — odroczony; `check:content` + prerender pokrywają krytyczne ryzyka. Dodać, gdy `readingTime`/`related` zaczną się zmieniać.
- **Migracja do `astro:assets` + `src/assets`** — odrzucona w tej iteracji (większy zakres; stały `aspect-ratio` rozwiązuje CLS).
- **Container queries** — odroczone (§13.4).
- **Zmiana `output: "server"` na `"static"`** — odrzucona (per-route `prerender` wystarcza, mniejszy diff).

---

## 15. Runda recenzji 2 — bramki implementacji (Frodo + Sauron)

Po zakończeniu jednostek A–E uruchomiono bramki. Werdykty: Frodo — „nadaje się do commita po naniesieniu uwag Wysokich, bez większej przeróbki"; Sauron — „zgodne ze specyfikacją, z zastrzeżeniami nieblokującymi". Wszystkie uwagi wg poniższej tabeli zostały naniesione.

**Niezgodności ze specyfikacją (Sauron):**

| # | Wymaganie | Poprawka |
|---|---|---|
| S1 | §10 — docelowy nagłówek TOC bez `tabindex="-1"` | dodane w `prose-heading.astro` |
| S2 | §8 — brak `body { overflow-x: clip }` ≤680 | dodane |
| S3 | §8/§11-F2 — `note-card` zachowywał rotację ≤680 | rotacja zdjęta ≤680 |
| S4 | §6.1 — GitHub miał być linkiem trzeciorzędnym | zamienione na link trzeciorzędny |
| S7 | §7.4 — mapowany tylko `h2` | dodane mapowanie `h3` |
| S8 | §7.4 — `project/[slug]` renderował `<Content />` bez `components` | bloki działają też w projektach |
| S10 | §7.5 — martwe `*-small.*` | usunięte |
| S12 | §8 — martwy token `--animate-wave` | usunięty |

**Jakość kodu (Frodo):**

| # | Uwaga | Poprawka |
|---|---|---|
| F1 | `biome check` nie przechodzi (format/organizeImports/`useOptionalChain`) | `npm run check` uruchomiony, czysto |
| F2 | `components.css` 1391 linii | rozbite na `primitives.css` / `layout.css` / `article.css` |
| F3 | brak `interface Props` w kilku komponentach (implicit `any`) | dodane interfejsy |
| F4 | martwe tokeny (`--container-gutter`, `--radius-full`, breakpointy bez użycia) | użyte lub usunięte |
| F5 | duplikacja `line-height` między tokenami a komponentami | jedno źródło prawdy (`var(--text-*--line-height)`) |
| F6 | duplikacja formatowania daty | `src/lib/format.ts` |
| F7 | duplikacja filtra/sortu postów w ≥3 miejscach | `src/lib/posts.ts` |
| F9/F10 | martwy CSS (`.callouts`, `.image-frame > picture > img`) | usunięte |
| F11 | ręcznie odtworzony `SectionHead` w `related-posts` | użyty komponent |
| F12 | relatywna ścieżka faviconu (`../assets/…`) | absolutna `/assets/images/the-bart.svg` |

**Świadomie zaakceptowane / poza zakresem:**

- **F8 — katalog `the-bart-neo-brutal/`** w rootcie: to artefakt dostarczony przez użytkownika i udokumentowane źródło prawdy wizualnej; **nie usuwamy** (decyzja do potwierdzenia w bramce użytkownika).
- **F17 — nieużywane zależności pre-existing** (`@astrojs/netlify`, `dayjs`, `vite-plugin-image-optimizer`) — poza zakresem redesignu.
- **S13 — `mailto:undefined`** przy braku `PUBLIC_EMAIL` — pre-existing; dodano guard.
- **S9 — 15× `[WARN] use astro:head-inject`** dla `.mdx` — artefakt Astro 7 + `@astrojs/mdx@8` (rolldown), nie pochodzi z kodu projektu; udokumentowane jako znane ograniczenie.
- **S6 — numeracja kroków przez CSS counter** przy zachowanej semantyce `<ol>` — akceptowalna interpretacja §7.4.
- **S5/S11 — nieścisłości dokumentów** (lokalizacja `values.astro` w `§6.3`, `--focus-ring` w design-system) — zsynchronizowane w dokumentach.

**Domyknięcie luki testowej bloków:** `Prompt`, `QuoteBlock` i `Steps` nie były używane w żadnej treści → dodane do `copilot-editor.mdx` zgodnie z prototypem (ten post jest pierwowzorem `article.html`), tak aby wszystkie cztery bloki były faktycznie renderowane w prerenderze. Treść redakcyjnie do korekty przez autora.

---

## 16. Runda 3 — uwagi użytkownika (po implementacji)

| # | Uwaga użytkownika | Poprawka |
|---|---|---|
| U1 | Nagłówek karty projektu zbyt blisko/dotyka zdjęcia | Przyczyna: `h3` dziedziczył `margin-top: 0` ze wspólnej reguły z kartą artykułu (gdzie nad `h3` jest jeszcze `card-meta`). Dodana reguła `.project-card h3 { margin-top: 12px }` — naprawa w jednym miejscu, obejmuje home i `/projects`. |
| U2 | Usunąć sekcję „Moja biblioteka" | Usunięte: `home/books.astro`, `cards/book-card.astro`, sekcja `.books`/`.book-card` z CSS, okładki `public/assets/images/books/**`. |
| U3 | Przy brandzie nie ma być napisu „portfolio / blog / frontend engineer" (nagłówek i stopka) | Usunięty podtytuł brandu (`brand-sub`) w obu miejscach; reguła CSS usunięta. |
| U4 | Przywrócić stare logo obok „THE BART" w nagłówku i stopce | `brand.astro` renderuje znak graficzny (`logo-the-bart.png`) + wordmark; stopka używa tego samego komponentu `Brand`. |
| U5 | Usunąć rząd 5 wartości (Autentyczność, Prostota, Skupienie na użytkowniku, Pomysłowość, Minimalizm) | Usunięte: `home/values.astro`, sekcja `.values`/`.value`/`.value-icon` z CSS, martwe tokeny `--text-value*`. |
| U6 | Na stronie głównej tylko artykuły; projekty wyłącznie w osobnej zakładce | Usunięte `<Projects />` z `index.astro`, usunięty `home/projects.astro`; CTA hero „Zobacz projekty →" prowadzi do `/projects` (wcześniej `#projekty`); siatka `.projects` zostaje (używana na `/projects`). |

Skutki dla dokumentu: strona główna to hero + najnowsze artykuły + stopka; usunięte komponenty nie mają już odpowiedników w design-system (zaktualizowane). Wszystkie bramki po zmianach: `astro check` (0/0/1 hint), `npm run build` (19 tras, draft wykluczony), `npm run check:content` (15 plików, 0 naruszeń), `npm run check` (Biome czysto).
