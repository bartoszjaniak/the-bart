---
name: the-bart-blog-writer
description: Turn user-provided sources (transcripts, videos, links, articles, PDFs, Google Docs, notes) into a reader-focused, source-grounded Polish The Bart article through audience analysis, reader-needs brief, editorial writing, independent review and optional publication. Use for new posts, revisions, hero images or publishing in bartoszjaniak/the-bart.
---

# The Bart: źródła → czytelnik → potrzeby → redakcja → recenzja → publikacja

## Mission and defaults

The user should only have to provide source material and their goal. Unless they explicitly request a draft or review, complete the full workflow: **read sources → identify the reader → define reader needs → write original Polish article → independently review and revise → create matching illustration → commit article and binary hero image → validate → merge to `main` → report verified status**. Treat the first four stages as separate editorial passes, not a single free-form generation. Do not claim publication or deployment without verifying the relevant step.

- **Repository:** `bartoszjaniak/the-bart`
- **Production site:** `https://the-bart.com`
- **Article files:** `src/content/post/<slug>.mdx`
- **Hero files:** `public/assets/images/posts/<slug>/hero.jpg` (or PNG/WebP when justified)
- **Canonical article URL:** `https://the-bart.com/post/<slug>`
- **Default language:** Polish; preserve original names and technical terms where helpful.
- **Default category:** `AI` for AI/agentic-engineering transcripts; choose other existing categories only when appropriate.
- **Default publication date:** actual publication date in `YYYY-MM-DD`; use an earlier date only when the user specifies it. Never infer the date of the source video from transcript timestamps.
- **Publishing permission:** when the user asks for this workflow, publication is authorized; create a branch, PR, and merge into `main`. If the user explicitly wants a preview, stop before merge.

## Reference articles: editorial source of truth

Before writing, read the current versions of:

1. `src/content/post/tiny-software-factories.mdx` — the small-factory narrative, direct opening, thematic sections, practical advice, `Callout`, `QuoteBlock`, source credit.
2. `src/content/post/agents-out-of-loop.mdx` — prompt → approve → observe structure, technical comparisons, concrete agent examples, balanced caveats, accessible ending.

Do not assume either reference is unchanged. Read current repository content and follow its established frontmatter, MDX components, spacing, formatting, and voice. Also inspect `src/content.config.ts` or the actual content schema and `scripts/check-content.mjs` when available.

### Editorial voice

- Write a **standalone, original Polish article**, not a line-by-line translation or transcript summary.
- Lead with a recognizable developer problem, tension, or provocative question; explain the main idea quickly.
- Use short, energetic paragraphs, varied rhythm, memorable but restrained metaphors, technical precision, and occasional dry humor. Avoid filler, empty hype, generic AI marketing, repetitive intros, and invented personal experiences.
- Make an argument: problem → framework → mechanisms → specific examples → trade-offs → practical application → strong closing thought.
- Use useful `##` headings, **bold** for key insights, occasional lists/tables only when they improve understanding, and `<Callout title="..." variant="blue">...</Callout>` or `<QuoteBlock>...</QuoteBlock>` as supported by existing MDX.
- Explain English technical terms on first use when needed; keep accurate product/model/tool names from the source.
- Prefer actionable technical details: triggers, sandbox, state, API, model choice, permissions, validation, cost, human approvals.
- Distinguish **what the presenter demonstrated**, **what they claimed**, and **our proposed application**. Do not present speculation, predictions, marketing, or subjective claims as proven facts.
- Preserve important numbers and limitations with context. Do not silently 'fix' unclear transcript passages. If names or terminology are ambiguous due to transcription, verify from a reliable source when allowed, or avoid unsupported specificity.
- Source credit must name the presenter/channel and link to the actual source video if known. Explicitly say the article is an original adaptation, not a verbatim translation. Do not invent a source URL when none is provided.
- Do not include irrelevant production notes, transcript timestamps, or claims that the transcript was cut off. If the source is incomplete, write a coherent conclusion using only supported content, without inventing missing events.

### TL;DR for every new article

Every new article must start with a **distinct, article-specific TL;DR** immediately after YAML frontmatter and before any source-credit callout, opening story, or other body content. Use the existing MDX component:

```mdx
<Callout title="TL;DR" variant="blue">
Two to four concise Polish sentences stating the main conclusion, the mechanism that supports it, and the most actionable implication or important caveat.
</Callout>
```

- Aim for roughly **45–80 Polish words**, enough to give a reader the actual essence without having to read the whole post.
- Summarize the **entire article**, including its conclusion and limitations, not merely the opening or SEO description.
- Make the summary useful on its own: specific mechanism, result, recommendation, or trade-off. Avoid teasers, generic motivation, marketing claims, and empty phrases like "w artykule dowiesz się".
- Reflect source attribution and uncertainty: distinguish a video's demonstration or vendor claim from an established fact; do not invent numbers or conclusions.
- Preserve existing source-credit callouts immediately after the TL;DR and never delete author/source links.
- For an update to an existing article, read the complete current article and refresh its TL;DR if the substance changed, without creating duplicates.

## Source intake

1. Read the **entirety** of the supplied source material: transcripts, video/audio when accessible, links, articles, notes, PDFs and Google Docs. For Google Docs URLs use the connected Google Drive action first; for uploaded PDFs use the attached file tools. If access fails, explain the missing evidence; do not silently substitute an unrelated source.
2. Record the provenance of each source (author/presenter, title, publication date if known, URL if verified) and extract its central thesis, mechanisms, demonstrations, examples, counterarguments, caveats and numerical claims. Preserve contextual limitations; timestamps in a transcript are not publication dates.
3. Keep **source statements**, **independently verified facts** and **editorial interpretation/recommendations** distinguishable. Verify factual ambiguities and material, changeable claims using reliable sources where available. If verification is impossible, qualify, remove, or explicitly attribute the claim. Never invent citations, quotations or test results.
4. Compare the angle and likely slug against existing posts to avoid duplication. For an update, read the existing article in full, preserve useful substance and update the same post.
5. Only after the source inventory, run the audience, needs and writing stages below. Build the outline around the **reader's questions and the ideas**, not the order of the source. Do not copy long passages verbatim.

## Editorial workflow: four mandatory passes

Run the following passes **in this order** for every new article and substantial article rewrite. Keep a compact internal `reader brief` and `review report`; do not publish these artifacts, and do not expose process narration in the article. A user-specified audience or editorial goal takes precedence over inferred defaults. Do not interrogate the user about routine decisions when a reasonable inference is possible.

### Pass 1. Audience strategist: who is reading?

Before choosing the angle or drafting paragraphs, identify:

- **Primary reader:** one specific, realistic reader profile, including domain knowledge, role/context and level of technical fluency. Choose an actual audience for *this topic*, not the universal persona "everyone interested in technology". A secondary audience is optional.
- **Entry point:** why this reader encounters the topic now and what they probably already know.
- **Friction:** their concrete problem, decision, uncertainty or misconception.
- **Boundary:** what can be assumed without explanation and which terms require a short explanation.

Infer from the submitted material, the user's instructions and relevant existing The Bart posts. Do not presume every article is for senior frontend developers or write invented demographics. Record the audience and rationale in 2–4 internal sentences.

### Pass 2. Reader advocate: what should they get out of it?

Independently of the source's order and the presenter's agenda, determine the **reader's job to be done**:

- Their main question and 2–4 follow-up questions that the article must answer.
- The promised payoff: what the reader should **understand, compare, decide or be able to do** after reading.
- Necessary evidence and examples: mechanisms, concrete scenarios, code or architecture when helpful, constraints, costs, risks and counterarguments.
- A clear **scope boundary**: which tempting side topics to omit to avoid a sprawling encyclopedia or repetition.

Create a short internal **reader contract**: `For [reader], facing [problem], this article will enable [outcome] by explaining [key mechanisms/evidence], while addressing [trade-off].` If sources cannot substantiate a necessary promise, narrow it or flag a research gap; do not pad the article with guessed answers.

Draft an outline where every major section serves a reader question or promised outcome. Prioritize usefulness over coverage of every source detail. For an existing post, first note which reader needs are already met and where the gaps are.

### Pass 3. Editor: write for that reader in The Bart voice

Write the article using **Editorial voice**, **TL;DR**, reference posts, source attribution and frontmatter rules from this skill. The source is raw material, not the table of contents. Deliver a standalone authorial synthesis, not a mechanistic summary.

- Begin with the reader's real tension and a concrete thesis. Explain the mechanism before adding examples, trade-offs, decisions and practical implications.
- Match the depth to the selected reader: advanced readers deserve technical specifics; a broader reader deserves clear terminology without dilution.
- Answer the questions in the reader contract. Every section must contribute new information; cut repetitions, generic background and digressions.
- Ground strong claims in sources, label opinion as opinion, preserve dissent and limitations, and distinguish demonstration from production-proven results.
- Write a specific, accurately scoped headline, description and TL;DR that reflect the *finished* piece, not a broader promise than the article can fulfill.
- Keep attribution/linkage to original sources even when the narrative angle differs. Do not insert the private audience brief or editorial process into the published text.
- Consider a concise explanatory SVG only when it clarifies a workflow, architecture or relationship better than prose; follow the optional-diagram rules below.

### Pass 4. Editorial reviewer: structure, repetition and concision

**Run after the complete draft and before publication.** Prefer a separate editorial reviewer agent/context when available; otherwise do a distinct critical reread. The reviewer has a **deliberately narrow scope**: check that the finished text follows the content and structural requirements of this skill, then remove repetitions and unnecessary bulk. **Do not turn this stage into a second research, fact-checking, technical-security or source-audit process.** Source accuracy and attribution are handled during source intake/writing; MDX/assets/build checks remain part of the publishing workflow.

Check only:

1. **Required article structure and voice:** frontmatter fields, title/description, a meaningful 45–80-word TL;DR as the first body element, source credit when available, clear opening, purposeful headings, logical progression, practical examples or trade-offs where the topic calls for them, and a concrete ending. Check the editorial style rules above, not an artificially fixed section template.
2. **Repeated ideas:** find places where different sections, paragraphs, examples, conclusions or the TL;DR repeat the *same point without adding substance*. Retain the strongest explanation and remove or merge the rest. TL;DR may intentionally summarize the main point; that is not an error.
3. **Excess length and filler:** identify generic introductions, empty framing, marketing rhetoric, obvious explanations, digressions, redundant qualifications, decorative metaphors and paragraphs whose removal would not reduce reader understanding. Cut or tighten them.
4. **Readability after cuts:** preserve a natural Polish voice, varied sentence rhythm, important context, clarity, useful examples and smooth transitions. **Do not shorten mechanically** toward a target word count, turn the prose into telegraphic bullets, or sacrifice substance just for brevity.

For each meaningful issue, point to the precise heading/paragraph and recommend **delete, combine, move or shorten**, with a concrete alternative where helpful. Send these notes back to the editor, revise, and reread the **whole article** to catch broken transitions and newly created repetitions. Repeat as needed, but stop once the writing is clear and economical; do not manufacture editorial objections.

**Editorial PASS:** required structure and style are respected, significant repetitions are gone and every remaining paragraph earns its place. If substantial structural problems or padding remain, revise before publishing. No elaborate severity system, generic score or public review report is needed. The private reviewer notes are not part of the article. A draft-only request still gets this editorial pass, but is not published.

## Frontmatter template

```yaml
---
title: "Distinctive Polish headline with a clear promise"
description: "Specific, concise description of what readers will learn."
image: /assets/images/posts/<slug>/hero.jpg
imageAlt: "Literal Polish description of the actual generated illustration"
createdAt: YYYY-MM-DD
category: AI
tags: ['Agentic engineering', 'Programowanie', 'Automatyzacja', 'Agenci AI']
stickyNote: "Short, memorable phrase"
---
```

Use only frontmatter keys supported by the current schema. Use relevant existing tags, not a fixed tag list for unrelated topics. Ensure the title, description, image alt, and content are consistent. The source attribution belongs near the beginning, e.g.:

```mdx
<Callout title="Skąd ten pomysł?" variant="blue">
Tekst jest moim autorskim opracowaniem filmu **[Tytuł](https://source-url)** z kanału **Autor**. Nie jest dosłownym tłumaczeniem.
</Callout>
```

Use this only with a verified source URL and attribution. A source link may also appear at the end.

## Optional explanatory SVG diagrams inside the article

During **outline and editorial writing**, proactively assess whether one or more **small, original SVG diagrams** would teach a mechanism faster or more clearly than another paragraph. This is a writing/visual-explanation decision, **not the editorial reviewer's responsibility**. Diagrams are optional, not a quota: skip them when prose, a table or a code example works better.

Good candidates: a multi-step workflow, agent/system architecture, data flow, dependencies, state transitions, or a comparison involving relationships that are hard to convey linearly. For a simple list, an isolated statistic or purely decorative scene, **do not add a diagram**. A diagram should communicate a specific point, be introduced in prose, and not duplicate whole paragraphs of surrounding explanation.

When adding one:

1. **Design the content first**: define nodes, connections, labels and a clear take-away grounded in the article's actual mechanics. Do not invent processes or technical facts just to make a diagram attractive.
2. **Create an actual standalone, valid UTF-8 `.svg` file**, e.g. `public/assets/images/posts/<slug>/workflow.svg`, using standard SVG shapes, paths and text. Commit it as a text file with the article. Do not treat a rendered preview, mermaid code fence, generated chat image or remote URL as a committed SVG asset.
3. **Embed it in MDX** using a normal image element pointing to the public URL, near the relevant section. Example:

   ```mdx
   <figure>
     <img src="/assets/images/posts/<slug>/workflow.svg" alt="Schemat: zdarzenie uruchamia agenta, agent wykonuje walidację, a wynik trafia do zatwierdzenia." loading="lazy" className="w-full h-auto" />
     <figcaption>Przepływ od zdarzenia do zatwierdzenia wyniku.</figcaption>
   </figure>
   ```

4. **Make it legible and accessible**: meaningful Polish labels, readable typography on mobile, uncluttered layout, strong contrast, explicit `viewBox`, visible arrow direction, `alt` explaining the core relationship, and caption only when helpful. Keep the diagram usable in light and dark modes (e.g. a self-contained, high-contrast background).
5. **Keep SVG safe and portable**: no scripts, event handlers, `foreignObject`, externally fetched fonts/images, embedded HTML, or unnecessary filters/animation. Use original shapes/icons and do not copy third-party diagrams without permission.
6. **Validate before publication**: ensure the file exists in the committed tree, the MDX path matches it, the SVG parses correctly, and it renders sensibly in desktop/mobile preview when available. Verify the surrounding text still makes sense if the image cannot load. A broken diagram blocks publication; a diagram that adds no value should be removed.

SVG diagrams **supplement** the article and are distinct from the required hero illustration. Do not replace the hero-image workflow with an explanatory SVG.

## Hero illustration: art direction and actual file transfer

**Required:** create a new illustration for each article using the image generation tool. Never use an image-search result as a substitute for the generated artwork and never insert a merely illustrative search result into the final response as though it were the committed hero.

### Visual language

Use the existing article covers as visual references for consistency. Default prompt brief:

> Editorial hero illustration for a Polish independent software-engineering blog, 3:2 landscape. Energetic vintage comic-book / screen-printed graphic novel style; bold black ink outlines, visible halftone grain, slightly imperfect print texture, warm amber/orange/coral balanced with teal/blue and muted green, expressive lighting, dense but legible composition. Show the article's central technical idea as a clear visual metaphor with recognizable objects, developer workstations, robots, interfaces, machines or workflows when relevant. Friendly, witty, confident, high-quality illustration, not generic corporate AI stock art. No text, letters, numbers, watermarks, brand logos, captions or UI typography. Keep a strong central composition and safe crop margins.

Tailor the **scene** to the specific article. The two published references feature a relaxed programmer and robot-powered code factory, but do not blindly reuse the same scene every time. Avoid making a recognizable real person unless the user explicitly requests it.

### Commit the REAL generated image

This step is non-negotiable. Generating an image in the chat **does not** upload it to GitHub.

1. Find the exact generated file in the working container or in the conversation files; if necessary materialize it. Do not guess a filename.
2. Convert to optimized RGB JPEG (`hero.jpg`) with Pillow or equivalent if the original is PNG; preserve reasonable visual quality and dimensions. PNG is fine when transparency is required. Check that the file exists, is readable, and has the expected dimensions.
3. GitHub's `create_file` / `update_file` actions are for **UTF-8 text**, not raw binary. To upload a JPEG, base64-encode the **bytes** and call GitHub `create_blob` with `encoding: "base64"`. Use `create_tree` with a `100644` blob entry, `create_commit` with the correct parent SHA, then `update_ref` for the working branch. Alternatively use another binary-safe GitHub upload action if one is available.
4. If the generated image is only available in the container and the GitHub connector runs in a separate environment, transfer the base64 safely via a conversation file (e.g. a line-wrapped .txt read through Files) or another supported file bridge. Validate base64 length and header (`/9j/` for JPEG) before uploading. Never attempt to treat the base64 as a literal UTF-8 JPEG.
5. Update `image` in frontmatter to the **actual committed path**. Fetch the image from the branch to confirm its Git blob exists, is binary and matches the expected SHA. Confirm the MDX points to that same file.
6. Do not modify the article-list thumbnail component or unrelated layout to solve a post's hero-image problem. Keep the change focused.
7. If binary upload fails, **do not merge an article referencing a missing hero** and do not claim success. Explain the exact blocker.

## GitHub publication workflow

1. Inspect current `main`, existing post slugs, schema, and examples.
2. Create a focused branch such as `post/<slug>` from current `main`.
3. Add `src/content/post/<slug>.mdx` via GitHub `create_file` (or update the existing post via `fetch_file` + `update_file` using its current blob SHA).
4. Generate, optimize, and commit the actual hero image to `public/assets/images/posts/<slug>/hero.jpg` using the binary-safe procedure above. If the article uses explanatory SVG diagrams, create and commit their real UTF-8 SVG files to the matching post directory and ensure every MDX reference resolves.
5. Confirm the audience → reader-needs → editor → **editorial reviewer** passes completed and the concise editorial review is `PASS`. Separately perform the normal publication checks: source fidelity and attribution, Markdown/MDX correctness, valid frontmatter, date, slug, source links when verifiable, hero path, and any referenced SVG assets. If prose changes materially after review, repeat the editorial pass. Run `npm run check:content` and `npm run build` if the repository can be checked out and dependencies are available. If not, explicitly state that these checks were not run; do not fabricate green checks.
6. Create a PR with a meaningful title and summary. Merge it into `main` when authorized and safe. Confirm merge success and verify the article and image on `main`.
7. Production deployment is a separate step: check its actual status if possible. A successful merge is **not** proof that the site is live.
8. Final response: concise Polish confirmation, article title/date, actual GitHub PR link, production URL, and a clear note if deployment remains unverified. Never invent PR numbers, URLs, deployment success, or screenshots.

## Quality gate before publishing

- [ ] All accessible supplied sources were read; source statements, independent verification and editorial interpretation are distinguishable.
- [ ] A specific primary audience was identified, without invented demographics or universal generic persona.
- [ ] The reader contract defines the main question, expected outcome, essential evidence and scope.
- [ ] The article fulfills that contract, prioritizes reader usefulness, and avoids unnecessary digressions/repetition.
- [ ] An editorial reviewer checked skill-required article structure/style, duplicate ideas, filler and opportunities to shorten without losing clarity; meaningful issues were revised and re-read.
- [ ] Unverifiable consequential claims were removed or explicitly qualified; no invented quotations, URLs, dates or test results.
- [ ] Polish article is coherent, useful, technically accurate, and original.
- [ ] A concise, original TL;DR Callout starts the article body and reflects the entire article.
- [ ] Headline, summary, tags, date and `stickyNote` fit the content.
- [ ] Existing MDX schema and supported components are respected.
- [ ] Author/source are credited with a verified link where available.
- [ ] New custom comic illustration is generated and saved as an actual file.
- [ ] Binary hero image is committed and fetched back from GitHub.
- [ ] Frontmatter `image` points to the exact committed asset.
- [ ] Optional explanatory SVGs were added only where useful, and any included SVG exists in the repository, renders clearly, has meaningful alt text and matches its MDX path.
- [ ] No unrelated UI changes; no claim of successful tests or deployment without evidence.
- [ ] PR is merged into `main` only when requested/authorized; final status is precise.

## Future usage

When the user provides source material (including a transcript, a video, a link, a PDF, notes or a document) and says something like **„Zrób z tego artykuł na bloga”**, run the full audience → needs → writing → independent review workflow without asking for routine decisions. Ask only for essential missing information, such as an explicitly important but ambiguous publication chronology or wholly inaccessible source. Otherwise choose the audience, angle, headline, slug, hero scene, tags and current publication date automatically. Do not publish with unresolved substantial editorial issues or failing publication validation.
