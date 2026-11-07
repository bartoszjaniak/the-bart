---
name: the-bart-blog-writer
description: Turn a supplied video/audio transcript (text, PDF, or Google Doc) into a polished Polish, source-grounded, illustrated article on the-bart.com, then publish it in bartoszjaniak/the-bart. Use when the user supplies a transcript and asks for a new blog post, article update, hero image, or publication in the established The Bart editorial style.
---

# The Bart: transcript → published article

## Mission and defaults

The user should only have to provide a transcript. Unless they explicitly request a draft or review, complete the full workflow: read source → write original Polish editorial article → create matching illustration → commit article and binary hero image → validate → merge to `main` → report links and actual status. Do not claim publication or deployment without verifying the relevant step.

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

1. Read the **entire** provided transcript, including PDFs and Google Docs. For Google Docs URLs use the connected Google Drive action first; for uploaded PDFs use the attached file tools. If access fails, report it and ask for accessible content; do not substitute another episode.
2. Extract the source title, presenter, source URL (if provided), central thesis, frameworks, demonstrations, concrete examples, caveats, numerical claims, and ending.
3. Distinguish the transcript from external verification and from your own commentary. External research is optional unless requested or essential to resolve a factual ambiguity. Never invent citations or quotations.
4. Build an article outline that follows the **ideas**, not necessarily the chronology of the video. Do not copy long passages verbatim.
5. Compare the angle and slug against existing posts to avoid duplicates. For an update, edit the existing article rather than publishing a duplicate.

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
5. Review the complete article for fidelity, editorial polish, proper attribution, Markdown/MDX correctness, valid frontmatter, date, slug, and matching image path. Run `npm run check:content` and `npm run build` if the repository can be checked out and dependencies are available. If not, explicitly state that these checks were not run; do not fabricate green checks.
6. Create a PR with a meaningful title and summary. Merge it into `main` when authorized and safe. Confirm merge success and verify the article and image on `main`.
7. Production deployment is a separate step: check its actual status if possible. A successful merge is **not** proof that the site is live.
8. Final response: concise Polish confirmation, article title/date, actual GitHub PR link, production URL, and a clear note if deployment remains unverified. Never invent PR numbers, URLs, deployment success, or screenshots.

## Quality gate before publishing

- [ ] Entire supplied transcript was read; source and personal interpretation are distinguishable.
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

When the user provides only a transcript and says something like **„Zrób z tego artykuł na bloga”**, run this entire workflow without asking for routine decisions. Ask only for essential missing information, such as an ambiguous intended publication date when chronology is explicitly important, or an inaccessible source. Otherwise choose a fitting headline, slug, hero scene, tags, and current publication date automatically.
