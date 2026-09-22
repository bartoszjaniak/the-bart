# The Bart — Design System (neo-brutalizm)

Źródło prawdy wizualnej: `the-bart-neo-brutal/index.html`, `article.html`, `styles.css`.
Stack: Astro 7 + Tailwind CSS v4. Tylko tryb jasny ("papierowy").
Zakres: `/`, `/posts`, `/projects`, `/post/[slug]`, `/project/[slug]`.

Zasady wiążące:
- Brak trybu ciemnego, brak `.browser`/`.browserbar`/`.dot`, brak boxu newslettera.
- Obrazy: treściowe (hero, okładki książek, zrzuty projektów, obrazy w treści) w neo-brutalistycznych ramkach; dekoracje → glify tekstowe.
- Zero `!important`, zero inline style, zero `nth-child` do kolorowania (→ jawne warianty).

---

## 1. Tokeny kolorów

Prototyp miał 3 near-duplikaty szarości tła (`#e7e9ec`, `#e8ebf0`, `#eef0f4`) i kilka jednorazowych tekstów. Konsoliduję do jednego `muted` + `ink-soft`/`ink-muted`.

| Token Tailwind v4 (`@theme`) | HEX | Rola / mapowanie z prototypu |
|---|---|---|
| `--color-paper` | `#f5f2e8` | Tło strony (`--paper`) |
| `--color-surface` | `#fffefa` | Karty, headery, sideboksy (`--white`) |
| `--color-ink` | `#111111` | Tekst główny, obwódki, cienie (`--ink`) |
| `--color-ink-soft` | `#252934` | Tekst prozy, akapitów (`#252934`, `#363a43`) |
| `--color-ink-muted` | `#565b65` | Tekst wtórny, podpisy (`--muted-text`, `#454545`, `#46516a`) |
| `--color-yellow` | `#ffd629` | Akcent 1 (`--yellow`) |
| `--color-blue` | `#13a8f4` | Akcent 2 (`--blue`) |
| `--color-pink` | `#ff3f78` | Akcent 3 (`--pink`) |
| `--color-muted` | `#e8ebf0` | Tła chipów/tagów (`#e7e9ec`, `#e8ebf0`, `#eef0f4`) |
| `--color-blue-tint` | `#bde8ff` | Chip blue, wypełnienia informacyjne |
| `--color-pink-tint` | `#ffb0c8` | Chip pink, wypełnienia ostrzegawcze |
| `--color-dark` | `#1a1a1a` | Blok promptu (mono) |
| `--color-on-accent` | `#111111` | Domyślny tekst na yellow/blue |
| `--color-on-dark` | `#fffefa` | Tekst na pink (tylko duży/bold), black, dark |

Reguła tekstu na akcentach (patrz §6): `on-accent` = ink dla yellow i **blue**; `on-dark` (biel) dopuszczalne tylko na pink przy dużym/bold tekście oraz na black.

---

## 2. Typografia

### 2.1 Rekomendacja fontów

**Display (nagłówki): Anton** — dostarczany **natywnym API fontów Astro 7**, bez `@fontsource` i bez `<link>` do Google Fonts.
Uzasadnienie: Impact/"Arial Black" to fonty systemowe — niedostępne spójnie (macOS/Windows/Android różnią się metrykami, brak na Androidzie = fallback do szerokiego sans psującego ciasną interlinię). Anton to najbliższy wolny zamiennik Impactu: skondensowany, gruby, „plakatowy” — dokładnie estetyka neo-brutalizmu, i mieści długie nagłówki przy 98px bez rozjeżdżania. Tylko jedna waga (400) → używamy jej jako „display weight”. Alternatywa, gdy potrzebna szersza/cieplejsza litera i prawdziwy lowercase: **Archivo Black**. Rekomendacja główna: Anton.

**Body: stos systemowy** `Arial, Helvetica, system-ui, sans-serif` — 0 bajtów, 0 requestów, dokładnie jak prototyp. Zostajemy na Arial; syntetyczny bold 800/900 (Arial realnie ma ~700) jest **akceptowany** — bez dociągania Inter.

**Dostawa (natywne API fontów Astro 7):**
- `fonts` w `astro.config.mjs` z providerem (`fontsource` lub `google`) + `<Font cssVariable="--font-anton" preload />` w `src/layouts/main.astro`.
- **Krytyczne dla PL:** subset **`latin-ext` jawnie** (ą ć ę ł ń ó ś ź ż) — inaczej polskie diakrytyki polecą z fallbacku.
- `fallbacks: ['Impact','Arial Black']`; **metryczny fallback generuje API** (usuń ręczne `size-adjust`).
- `font-display: swap` + fallback stack. Uwaga na CLS przy nagłówkach hero — zarezerwować wysokość (`min-height`/`aspect-ratio`) albo polegać na metrycznym fallbacku z API.

### 2.2 Skala

Tokeny jako `--text-*` (Tailwind v4: `--text-{name}` + `--text-{name}--line-height`). Display = Anton 400; body = Arial/token.

| Token | Rozmiar | Waga | Line-height | Letter-spacing | Font | Użycie |
|---|---|---|---|---|---|---|
| `--text-hero` | `clamp(60px, 7vw, 98px)` | 400 | 0.95 | -0.02em | display | Hero h1 |
| `--text-title` | `clamp(45px, 5.4vw, 75px)` | 400 | 0.95 | -0.01em | display | Tytuł artykułu |
| `--text-h2` | `clamp(34px, 4vw, 50px)` | 400 | 1 | 0 | display | Nagłówek sekcji |
| `--text-prose-h2` | `28px` | 400 | 1.05 | 0 | display | H2 w treści artykułu |
| `--text-lead` | `25px` | 800 | 1.35 | 0 | body | Hero lead |
| `--text-card-title` | `20px` | 400 | 1.05 | 0 | display | H3 karty (article/project) |
| `--text-body-lg` | `18px` | 400 | 1.5 | 0 | body | Hero copy, dek artykułu |
| `--text-body` | `16px` | 400 | 1.58 | 0 | body | Proza, akapity |
| `--text-sm` | `13px` | 400 | 1.5 | 0 | body | Opisy kart, sidebar |
| `--text-xs` | `12px` | 400 | 1.4 | 0 | body | Stopka, meta |
| `--text-chip` | `11px` (12px ≤680px) | 900 | 1.2 | 0.04em | body | Chipy, tagi (uppercase) |
| `--text-eyebrow` | `14px` | 900 | 1.3 | 0.12em | body | Eyebrow (uppercase) |

Reguła display: line-height **≥ .95** (nie `.88`) — Anton obcina ogonki Ą/Ę/Ż/Ź i akcenty Ó przy zbyt ciasnej interlinii. Dotyczy `--text-hero` i `--text-title` (do weryfikacji przy pierwszym renderze).

Wagi body 800/900 na Arial są syntetyzowane przez przeglądarkę (Arial realnie ma ~700). **Akceptowane** — decyzja: zostajemy na Arial, bez Inter.

### 2.3 Spacing — normalizacja do siatki 4px

Prototyp mieszał 9/11/13/15/17/18/22px. Ujednolicam do siatki 4px (`--spacing` base 4px w v4 daje utilities `p-1`=4px…).

| Token | Wartość | Prototyp → |
|---|---|---|
| `space-1` | 4px | 3–5 |
| `space-2` | 8px | 7–9 |
| `space-3` | 12px | 10–13 |
| `space-4` | 16px | 14–17 |
| `space-5` | 20px | 18–20 |
| `space-6` | 24px | 22–24 |
| `space-8` | 32px | 28–34 |
| `space-10` | 40px | 42 |
| `space-12` | 48px | – |

Gaps komponentów: cards3 `space-5` (18→20), projekty `space-3`, hero `space-10`.

---

## 3. Kształt, cień, layout

| Token | Wartość | Uwagi |
|---|---|---|
| `--border-w` | `3px` | Obwódka główna (`--border`) |
| `--border-w-thin` | `2px` | Header, values, mini-avatar, square-btn, inputy |
| `--color-border` | `ink` | Wszystkie obwódki = ink |
| `--shadow-brutal` | `7px 7px 0 var(--color-ink)` | Domyślny card/box |
| `--shadow-brutal-sm` | `4px 4px 0 var(--color-ink)` | Button, sidebox, callout, quote, avatar |
| `--shadow-brutal-lg` | `10px 10px 0 var(--color-ink)` | Avatar-card hero |
| `--shadow-edge-yellow` | `0 7px 0 var(--color-yellow)` | Article-card (wariant) |
| `--shadow-edge-blue` | `0 7px 0 var(--color-blue)` | Article-card (wariant) |
| `--shadow-edge-pink` | `0 7px 0 var(--color-pink)` | Article-card (wariant) |
| `--radius-brutal` | `7px` | Karty, boxy, inputy |
| `--radius-brutal-sm` | `2px` | Button, chip, tag (prototyp: button 2px) |
| `--radius-full` | `9999px` | Avatar placeholder |
| `--container-max` | `1240px` | `--max` |
| `--container-gutter` | `44px` desktop / `28px` ≤680px | `.container` |
| `--breakpoint-tablet` | `980px` | mobile-first / `min-width` |
| `--breakpoint-mobile` | `680px` | mobile-first / `min-width` |
| `--focus-ring` | `3px solid var(--color-ink)` + offset 2px + biały gap | patrz §6 |

Uwaga spójności: prototyp dawał przyciskom `border-radius:2px`, a kartom `7px` — zachowuję to jako celowy kontrast (`radius-brutal-sm` vs `radius-brutal`).

**Breakpointy (tokeny):** `--breakpoint-tablet: 980px` i `--breakpoint-mobile: 680px`; mobil-first z `min-width` (prototypowe `max-width` zsynchronizowane z v4).

---

## 4. Inwentarz komponentów

Legenda stanów: **D** default, **H** hover, **F** focus-visible, **A** active, **X** disabled (dodać tam, gdzie interaktywny).

### 4.1 Atomowe / primitives

| Komponent | Warianty | Rola | Stany |
|---|---|---|---|
| **Button** `.btn` | `default`(surface) / `blue` / `yellow` / `pink` / `black` / `compact` | CTA, akcje | D/H(press: translate 2,2 + cień 2px)/A/F. `compact`: padding 9×13, font 13 |
| **Chip** `.chip` | `yellow` / `blue`(tint) / `pink`(tint) / `default`(muted) | Meta: data, kategoria | D; jako link → H/F |
| **Tag** `.tag` | muted, `radius-brutal-sm` | Tag technologii | D |
| **Marker** `.marker` | yellow | Podkreślenie w nagłówku (`inset 0 -.17em`) | – |
| **Eyebrow** `.eyebrow` | – | Nadtytuł uppercase | – |
| **Rule** `.rule` | ink 3px | Linia w section-head | – |
| **Card-icon** `.card-icon` | yellow / blue / pink | Kwadrat 45px z glifem | – |
| **Mini-avatar** `.mini-avatar` | blue | Avatar autora 58px | – |
| **Square-btn** `.square-btn` | surface | Share 36×36, aria-label wymagane | D/H/F |
| **Image-frame** `.image-frame` (`ui/image-frame.astro`) | – | Ramka na zdjęcia treściowe: border 3px + `radius-brutal` + `shadow-brutal-sm`, **stałe `aspect-ratio`**: projekty 16/9 | – |
| **Brand-mark** `.brand-mark` (`layout/brand.astro`) | – | Znak graficzny `logo-the-bart.png` obok wordmarku „THE BART" (nagłówek i stopka), wysokość 32px (28px ≤680) | – |
| **Glyph** (`ui/glyph.astro`) | – | Glif **monochromatyczny**, `aria-hidden`, fallback dla nieznanej kategorii (`▧`); patrz twarda reguła glifów (§6) | – |

### 4.2 Złożone / composite

| Komponent | Warianty | Rola | Stany / uwagi |
|---|---|---|---|
| **Article-card** | edge: yellow / blue / pink | Karta artykułu (link) | D/H(lift lub cień)/F; h3 margin-right 44px na card-icon |
| **Project-card** | icon: yellow / blue / pink | Karta projektu | Bez cienia krawędziowego, min-height 132px; zawiera tags; `h3` ma `margin-top: 12px` (nad nim jest obraz) |
| **Authorbar** | – | Autor + share | Grid auto 1fr auto; ≤680 share w osobnym wierszu |
| **Callout** | `yellow` / `blue` | Ramka z listą | h3 display, `ul` w środku |
| **Prompt** | – | Blok promptu | dark bg, mono, head z „Kopiuj” (button/aria) |
| **Quote-block** | pink | Cytat | Duży bold (tekst `on-dark` — tylko ≥18.66px bold, patrz §6) |
| **Steps** | num: yellow / blue / pink | Kroki 1–4 | Strzałki `→` między (desktop), `↓` mobile |
| **Sidebox** | container | Boks sidebara | – (newsletter usunięty) |
| **TOC** | – | Spis treści | Numerowane linki; pierwszy/aktywny = yellow bg |
| **Topic-tags** | muted | Chmura tematów | 11px, weight 800 |
| **Section-head** | – | h2 + rule + akcja | ≤680 rule ukryty, grid 1fr auto |
| **Avatar-card** | photo / placeholder | Hero tożsamość | Rotacja -1.3°, blue bg, shadow-lg; placeholder `radius-full` |
| **Note-card** | pink | Karteczka sticky | Rotacja 2°, 22px display bold |
| **Scribble** | – | Odręczny bazgroł | Rotacja -6° + linia ::after. **NIE Comic Sans** → body 900 (opcjonalnie `@fontsource/caveat` jeśli chcemy prawdziwy handwriting) |
| **Article-visual** | icon / image | Wizual hero artykułu | blue frame; wariant `image` = `Image-frame` |
| **Brand-logo** | – | Logo | Display 30px + yellow podkreślenie ::after |
| **Header/Nav** | – | Nawigacja sticky | active = yellow bg + border + shadow 3px |
| **Footer** | – | Stopka | 3-kol → ≤680 1-kol |
| **Skip-link** (`layout/skip-link.astro`) | – | „Przejdź do treści" → `#main`; widoczny na focus | F |

---

## 5. Siatki i responsywność

| Layout | Desktop | ≤980px | ≤680px |
|---|---|---|---|
| Container | `min(100% - 44px, 1240px)` | — | `100% - 28px`, brak marginesu strony |
| Header-inner | `auto 1fr auto`, h 72px | `1fr auto`, nav ukryte | h 65px, btn compact 11px |
| Hero-grid | `1.2fr .95fr`, gap 40 | 1 kolumna, identity max 650px | 1 kolumna, avatar h 260px |
| Cards3 / Projects | 3 kol, gap 20/12 | 2 kol | 1 kol |
| Section-head | `auto 1fr auto` | — | `1fr auto`, rule ukryty, h2 zawija |
| Article-hero | `1.6fr .7fr` (min 270px) | 1 kol | visual min-h 210px |
| Authorbar | `auto 1fr auto` | — | `auto 1fr`, share pełny wiersz |
| Article-layout | `1fr 300px` | 1 kol; sidebar `repeat(3,1fr)` static | sidebar 1 kol |
| Sidebar sticky | `top: 94px` (pod headerem) | static | static |
| Steps | 4 kol, `→` | — | 1 kol, `↓` |
| Callouts | 2 kol | — | 1 kol |
| Footer-inner | `1fr auto 1fr` | `1fr 1fr`, copy pełny wiersz | 1 kol, center |

Rekomendacja: dla **Article-card / Project-card** docelowo użyć **container queries** (`container-type: inline-size`) — te same komponenty trafiają do siatki 3-kol i do sidebarowego wąskiego kontekstu; reagują na szerokość kontenera, nie viewportu. **Container queries są odroczone** (§13.4 specyfikacji) → w wąskim kontekście sidebara ≤980px stosujemy **jawne reguły**: mniejszy `--text-card-title` (np. 17px) i inny `margin-right` ikony (np. 36px vs 44px), żeby sidebar się nie przepełniał.
Sticky (header `top:0`, sidebar `top:94px`) — zostawić, ale dodać fallback przy `prefers-reduced-motion` dla `scroll-behavior:smooth`.

---

## 6. Dostępność wizualna — wymagania (obowiązkowe)

**Kontrast (policzone):**
- Biel `#fffefa` na pink `#ff3f78` ≈ **3.4:1** → spełnia AA **tylko dla dużego/bold tekstu** (≥18.66px bold / 24px). Quote-block i note-card (22px bold, display) przechodzą; **zakaz** białego tekstu poniżej tych rozmiarów na pink.
- Biel na blue `#13a8f4` ≈ **2.4:1** → **nie spełnia AA nawet dla dużego tekstu**. Wniosek: na blue ZAWSZE tekst `ink`. (Prototyp w `.btn.blue` i `.callout.blue` dziedziczy ink — utrzymać.)
- Ink na yellow/paper/surface/muted — OK (>7:1).
- `blue-tint #bde8ff` / `pink-tint #ffb0c8` z ink — OK.
- **Wymaganie:** żadnego białego tekstu body na pink/blue; pink jako tło tylko z ink albo dużym boldem.

**Chipy 11–12px:** **Wymaganie:** min. **11px** dla chipów z treścią użytkową (nie tylko dekoracyjną), `font-weight:900`, `letter-spacing:0.04em`, uppercase; `12px` na ≤680px. Chipy to wyłącznie metadane, nigdy treść kluczowa.

**Focus (`:focus-visible`, SC 1.4.11)** — **mapa powierzchnia → kolor pierścienia** (twarde cienie + brak outline w prototypie = ryzyko). Globalny pierścień: `box-shadow: 0 0 0 2px <gap>, 0 0 0 5px <kolor pierścienia>`, gdzie:
- na `paper` / `surface` / `muted` → pierścień **ink**;
- na `ink` / `black` / `dark` → pierścień **yellow** lub **pink**;
- na `blue` → pierścień **ink** (yellow na blue ≈ 1.8:1 — nie spełnia SC 1.4.11).

Nigdy `outline:none` bez zamiennika.

**Inne:**
- **Glify (twarda reguła):** glify emoji renderują się **kolorowo** — wymagana tekstowa prezentacja (`\uFE0E` / `font-variant-emoji: text`); `🛒` zastąpione przez `▦`. Glify są **dekoracyjne** (`aria-hidden="true"`), **nigdy nośnikiem znaczenia** — znaczenie niesie chip/etykieta, nie glif.
- Obrazy: wymagany `alt` (treściowe), `width/height` + `aspect-ratio` przeciw CLS (patrz §2.1 fonty).
- Kolor nigdy jako jedyny nośnik znaczenia (warianty kart różnią się kolorem, ale glif nie jest nośnikiem znaczenia).
- `prefers-reduced-motion`: wyłączyć `scroll-behavior:smooth` i transformacje press, gdy user tego wymaga.

---

## 7. Mapowanie na Tailwind v4 i czego NIE przenosić

Tokeny w `@theme` → automatyczne utility (`bg-paper`, `text-ink`, `border-ink`, `shadow-brutal`, `rounded-brutal` itd.):

```css
@theme {
  /* colors */   --color-paper:#f5f2e8; --color-surface:#fffefa; --color-ink:#111;
                 --color-ink-soft:#252934; --color-ink-muted:#565b65;
                 --color-yellow:#ffd629; --color-blue:#13a8f4; --color-pink:#ff3f78;
                 --color-muted:#e8ebf0; --color-blue-tint:#bde8ff; --color-pink-tint:#ffb0c8;
                 --color-dark:#1a1a1a;
  /* fonts */    --font-display: var(--font-anton), Impact, "Arial Black", sans-serif; /* cssVariable z API fontów Astro */
                 --font-body: Arial, Helvetica, system-ui, sans-serif;
  /* text */     --text-hero: clamp(60px,7vw,98px); --text-hero--line-height:.95;
                 --text-title: clamp(45px,5.4vw,75px); --text-title--line-height:.95;
                 --text-chip: 11px; /* 12px ≤680px */
                 /* …reszta wg §2.2 */
  /* shape */    --radius-brutal:7px; --radius-brutal-sm:2px;
                 --shadow-brutal:7px 7px 0 var(--color-ink);
                 --shadow-brutal-sm:4px 4px 0 var(--color-ink);
                 --shadow-brutal-lg:10px 10px 0 var(--color-ink);
                 --breakpoint-tablet:980px; --breakpoint-mobile:680px;
                 --spacing:4px; /* siatka 4px */
}
```

Warstwa semantyczna: style komponentów (`@layer components` / `@utility`) jako klasy `.btn`, `.chip`, `.card`, `.callout` z wariantami — ale **budowane jako komponenty Astro** (button.astro, chip.astro…), nie jako waniliowy CSS 1:1. Klasy niosą wygląd, Astro niesie strukturę/warianty.

**Czego NIE przenosić z prototypu:**
- `.browser`, `.browserbar`, `.dot`, `body{background:#dedede}` — usunięte wg decyzji.
- `!important` (m.in. w starym `main.css`) i inline `style="font-size:13px"` (`article.html`).
- `nth-child(2)/nth-child(3n+1)` do kolorowania kart/ikon → **jawne warianty**: prop `variant` z helpera `variantForIndex(i) = ['yellow','blue','pink'][i % 3]`; **jeden `variant` steruje jednocześnie** tłem ikony i kolorem cienia krawędzi. Bez `nth-child`.
- `Comic Sans MS` → body 900 lub Caveat.
- Duplikaty szarości (`#e7e9ec`/`#e8ebf0`/`#eef0f4`) → jeden `muted`.
- `Spectral` (obecnie ładowany, choć literalnie nieużywany) i toggle dark mode (`main.css`, `dark:` klasy) → usunąć.
- Fonty przez `<link href="fonts.googleapis.com">` i `@fontsource/anton` → **natywne API fontów Astro 7** (`fonts` w `astro.config.mjs` + `<Font cssVariable="--font-anton" preload />`), subset `latin-ext`, `fallbacks: ['Impact','Arial Black']`.
- Poziomy scroll treści → `Prompt` zawija (`white-space: pre-wrap` + `overflow-wrap: anywhere`); `Steps` = `repeat(auto-fit, minmax(200px,1fr))` (obsługa 3–6 kroków, bez sztywnego 4).

---

## Uwagi otwarte
- **Syntetyczny bold Arial — zamknięte:** zostajemy na Arial (body systemowy), syntetyczny bold 800/900 zaakceptowany, **bez** Inter.
- **Book-card i rząd wartości — usunięte** na życzenie użytkownika (spec §16). Komponenty `book-card`, `books`, `values` oraz ich style i tokeny nie występują już w systemie.
