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

### Pass 4. Independent reviewer: challenge the finished article

**Review only after a complete draft exists and before generating the final hero image or merging.** Prefer a separate reviewer agent/context if available. Otherwise perform a deliberately separate critical pass: re-read the source inventory, reader contract and complete draft **without relying on the writer's self-assessment**. Do not claim a second agent took part when it did not.

Review along six dimensions:

1. **Factual fidelity:** compare consequential statements, numbers, dates, versions, names, quotes, capabilities and causal claims against their actual sources. Check that attribution, uncertainty and scope were not lost. Verify material changeable claims against reliable current evidence when possible. Flag unsupported claims; don't "correct" them by inventing a citation.
2. **Reader value:** does the piece answer the primary question and deliver the reader contract? Are examples concrete and sufficient? Which question remains unanswered?
3. **Editorial quality:** clear argument, logical sequence, appropriate technical depth, readable prose, no AI filler, hype, unnecessary repetitions or padded length. Confirm the conclusion follows the evidence.
4. **Balance and intellectual honesty:** limitations, counterarguments, costs, operational caveats, security/privacy risks where relevant; no demonstration presented as an established result or opinion as fact.
5. **Source integrity:** original source links and credit, accurately characterized citations, no invented authors/URLs/quotes, no plagiarism or overly close paraphrase. Mark unresolved gaps plainly.
6. **Publishing readiness:** title and TL;DR match the content; frontmatter, links, tags, MDX components and image-alt promise are valid. Final binary-image and build checks also happen in the GitHub gate after illustration.

Produce a compact **internal review report** with findings marked:

- `BLOCKER`: fabricated/misleading material fact, missing essential source, broken central argument, unverified consequential claim stated as fact, or invalid publication artifact. **Do not publish.**
- `MAJOR`: failure to deliver a key reader need, substantial imbalance, serious repetition/structure problem or important unsupported detail. **Revise before publication.**
- `MINOR`: wording, punctuation, optional clarification, cosmetic polish. Fix when useful without bloating the article.

For each BLOCKER/MAJOR, name the affected section/claim, explain the evidence or gap, and propose a concrete fix. Return the report to the **editor**, revise the text, then re-review the changed passages **and the article as a whole**. Repeat until no BLOCKER or MAJOR remains. Do not suppress findings just to pass the gate. If an essential claim cannot be verified or safely qualified, remove it; if that destroys the article's central thesis, stop and report the blocker to the user.

The final publication decision is `PASS` only when all material claims are source-grounded or clearly attributed/qualified, the reader contract is met and no BLOCKER/MAJOR remains. This is an editorial judgment, **not a guarantee that all claims are objectively true**. Keep unresolved minor caveats transparent. User-requested **draft only** means still run the content review, but do not merge/publish.

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
4. Generate, optimize, and commit the actual hero image to `public/assets/images/posts/<slug>/hero.jpg` using the binary-safe procedure above.
5. Confirm the separate audience → reader-needs → editor → reviewer passes completed and the review decision is `PASS`. Review the final article for fidelity, proper attribution, Markdown/MDX correctness, valid frontmatter, date, slug, working source links when verifiable, and matching image path. If content changes materially after review, repeat the reviewer pass. Run `npm run check:content` and `npm run build` if the repository can be checked out and dependencies are available. If not, explicitly state that these checks were not run; do not fabricate green checks.
6. Create a PR with a meaningful title and summary. Merge it into `main` when authorized and safe. Confirm merge success and verify the article and image on `main`.
7. Production deployment is a separate step: check its actual status if possible. A successful merge is **not** proof that the site is live.
8. Final response: concise Polish confirmation, article title/date, actual GitHub PR link, production URL, and a clear note if deployment remains unverified. Never invent PR numbers, URLs, deployment success, or screenshots.

## Quality gate before publishing

- [ ] All accessible supplied sources were read; source statements, independent verification and editorial interpretation are distinguishable.
- [ ] A specific primary audience was identified, without invented demographics or universal generic persona.
- [ ] The reader contract defines the main question, expected outcome, essential evidence and scope.
- [ ] The article fulfills that contract, prioritizes reader usefulness, and avoids unnecessary digressions/repetition.
- [ ] A separate critical review checked factual claims against the sources, reader value and editorial integrity; all BLOCKER/MAJOR findings were fixed and re-reviewed.
- [ ] Unverifiable consequential claims were removed or explicitly qualified; no invented quotations, URLs, dates or test results.
- [ ] Polish article is coherent, useful, technically accurate, and original.
- [ ] A concise, original TL;DR Callout starts the article body and reflects the entire article.
- [ ] Headline, summary, tags, date and `stickyNote` fit the content.
- [ ] Existing MDX schema and supported components are respected.
- [ ] Author/source are credited with a verified link where available.
- [ ] New custom comic illustration is generated and saved as an actual file.
- [ ] Binary hero image is committed and fetched back from GitHub.
- [ ] Frontmatter `image` points to the exact committed asset.
- [ ] No unrelated UI changes; no claim of successful tests or deployment without evidence.
- [ ] PR is merged into `main` only when requested/authorized; final status is precise.

## Future usage

When the user provides source material (including a transcript, a video, a link, a PDF, notes or a document) and says something like **„Zrób z tego artykuł na bloga”**, run the full audience → needs → writing → independent review workflow without asking for routine decisions. Ask only for essential missing information, such as an explicitly important but ambiguous publication chronology or wholly inaccessible source. Otherwise choose the audience, angle, headline, slug, hero scene, tags and current publication date automatically. Never publish while a review BLOCKER or MAJOR remains.
