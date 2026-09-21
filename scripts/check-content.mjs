// Kontrola treści: każdy post/projekt musi mieć `image` wskazujący istniejący
// plik w public/ oraz niepuste `imageAlt`. Zero zależności (node:fs / node:path).
// Uruchomienie: node scripts/check-content.mjs  [--self-test]
import { existsSync, readFileSync, readdirSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const CONTENT_DIRS = ["post", "project"];

const stripQuotes = (v) => {
	if (v == null) return "";
	let s = String(v).trim();
	if (
		(s.startsWith('"') && s.endsWith('"')) ||
		(s.startsWith("'") && s.endsWith("'"))
	) {
		s = s.slice(1, -1);
	}
	return s.trim();
};

// Zwraca mapę interesujących nas pól z bloku frontmatteru (albo null, gdy go brak).
function readFrontmatter(text) {
	const clean = text.replace(/^\uFEFF/, "");
	const m = clean.match(/^---\r?\n([\s\S]*?)\r?\n---/);
	if (!m) return null;
	const fm = {};
	for (const line of m[1].split(/\r?\n/)) {
		const hit = line.match(
			/^(image|imageAlt|category|name|title|isDraft):\s*(.*)$/,
		);
		if (hit) fm[hit[1]] = hit[2].trim();
	}
	return fm;
}

function inspect(text) {
	const fm = readFrontmatter(text);
	if (!fm) return { missingFrontmatter: true, image: "", imageAlt: "", id: "" };
	return {
		missingFrontmatter: false,
		image: stripQuotes(fm.image),
		imageAlt: stripQuotes(fm.imageAlt),
		id: stripQuotes(fm.name) || stripQuotes(fm.title),
	};
}

// image = ścieżka webowa (/assets/...); mapujemy ją pod public/.
function imageExistsInPublic(image, root) {
	const segments = image
		.replace(/^[\\/]+/, "")
		.split(/[\\/]+/)
		.filter(Boolean);
	const abs = path.resolve(root, "public", ...segments);
	return existsSync(abs) && statSync(abs).isFile();
}

// Czysta walidacja (predykat istnienia wstrzykiwany → testowalna bez FS).
function validate(rec, exists) {
	const problems = [];
	const image = (rec.image || "").trim();
	const imageAlt = (rec.imageAlt || "").trim();
	if (!image) {
		problems.push("brak pola `image`");
	} else if (!exists(image)) {
		problems.push(`obraz nie istnieje w public/: ${image}`);
	}
	if (!imageAlt) problems.push("brak lub pusty `imageAlt`");
	return problems;
}

function collectContentFiles(root) {
	const out = [];
	for (const dir of CONTENT_DIRS) {
		const base = path.join(root, "src", "content", dir);
		if (existsSync(base)) walk(base, out);
	}
	return out;
}

function walk(dir, out) {
	for (const entry of readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, entry.name);
		if (entry.isDirectory()) walk(p, out);
		else if (/\.(md|mdx)$/i.test(entry.name)) out.push(p);
	}
}

function run(root = ROOT) {
	const files = collectContentFiles(root);
	const violations = [];
	for (const file of files) {
		const { missingFrontmatter, image, imageAlt, id } = inspect(
			readFileSync(file, "utf8"),
		);
		const rel = path.relative(root, file).split(path.sep).join("/");
		if (missingFrontmatter) {
			violations.push({
				file: rel,
				id: id || path.basename(file),
				problems: ["brak bloku frontmatter"],
			});
			continue;
		}
		const problems = validate({ image, imageAlt }, (p) =>
			imageExistsInPublic(p, root),
		);
		if (problems.length) {
			violations.push({ file: rel, id: id || path.basename(file), problems });
		}
	}
	return { files, violations };
}

function report({ files, violations }) {
	if (!violations.length) {
		console.log(`OK — sprawdzono ${files.length} plików, 0 naruszeń.`);
		return 0;
	}
	console.log(`NARUSZENIA — ${violations.length} z ${files.length} plików:\n`);
	for (const v of violations) {
		console.log(`  ${v.file}  [${v.id}]`);
		for (const p of v.problems) console.log(`    - ${p}`);
	}
	console.log(
		"\nPopraw frontmatter (image → istniejący plik w public/, imageAlt niepusty).",
	);
	return 1;
}

function selfTest() {
	const exists = (p) => p === "/assets/ok.png";
	const cases = [
		{
			label: "poprawny wpis",
			fm: { image: "/assets/ok.png", imageAlt: "Opis" },
			want: 0,
		},
		{
			label: "nieistniejący obraz",
			fm: { image: "/assets/missing.png", imageAlt: "Opis" },
			want: 1,
		},
		{
			label: "pusty imageAlt",
			fm: { image: "/assets/ok.png", imageAlt: "   " },
			want: 1,
		},
		{ label: "brak imageAlt", fm: { image: "/assets/ok.png" }, want: 1 },
		{ label: "brak image", fm: { imageAlt: "Opis" }, want: 1 },
	];
	let failed = 0;
	for (const c of cases) {
		const got = validate(c.fm, exists).length;
		const ok = got === c.want;
		if (!ok) failed++;
		console.log(
			`  ${ok ? "PASS" : "FAIL"}  ${c.label} (wykryto ${got}, oczekiwano ${
				c.want
			})`,
		);
	}
	// parsowanie frontmatteru (cudzysłowy, komentarze)
	const parsed = inspect(
		'---\nimage: "/assets/ok.png"\nimageAlt: "Zażółć gęślą jaźń"\nname: Test\n---\nbody',
	);
	const parseOk =
		parsed.image === "/assets/ok.png" &&
		parsed.imageAlt === "Zażółć gęślą jaźń";
	if (!parseOk) failed++;
	console.log(`  ${parseOk ? "PASS" : "FAIL"}  parsowanie frontmatteru`);
	console.log(
		`\nself-test: ${failed ? `NIEPOWODZENIE (${failed} FAIL)` : "OK"}`,
	);
	return failed ? 1 : 0;
}

if (process.argv.includes("--self-test")) {
	process.exitCode = selfTest();
} else {
	const rootArg = process.argv.find((a) => a.startsWith("--root="));
	const root = rootArg ? path.resolve(rootArg.slice("--root=".length)) : ROOT;
	process.exitCode = report(run(root));
}
