// Interakcje klienta (vanilla, bez bibliotek). Bundlowane przez Astro jako module
// (defer) — DOM jest gotowy, więc bez pułapek `DOMContentLoaded`.
//
// Kontrakt:
//   #menu-toggle [aria-expanded] / #site-header [data-menu-open] — menu mobilne
//   [data-copy-link]  → kopiuje `location.href`
//   [data-copy-prompt] → kopiuje `.prompt-body` najbliższego `.prompt`
//   [data-copy-feedback] [aria-live] → feedback tekstowy

const header = document.querySelector("[data-header]");
const toggle = document.querySelector("[data-menu-toggle]");

function setMenu(open) {
	if (!header || !toggle) return;
	if (open) header.setAttribute("data-menu-open", "true");
	else header.removeAttribute("data-menu-open");
	toggle.setAttribute("aria-expanded", String(open));
}

if (header && toggle) {
	toggle.addEventListener("click", () => {
		setMenu(toggle.getAttribute("aria-expanded") !== "true");
	});

	document.addEventListener("keydown", (event) => {
		if (event.key === "Escape" && header.hasAttribute("data-menu-open")) {
			setMenu(false);
			toggle.focus();
		}
	});

	// Klik poza headerem zamyka panel.
	document.addEventListener("click", (event) => {
		if (!header.hasAttribute("data-menu-open")) return;
		if (event.target instanceof Node && header.contains(event.target)) return;
		setMenu(false);
	});
}

async function copyText(text) {
	try {
		if (navigator.clipboard?.writeText) {
			await navigator.clipboard.writeText(text);
			return true;
		}
	} catch {
		// przechodzimy do fallbacku
	}

	// Fallback dla HTTP / braku Clipboard API (jedna droga, nie ukrywanie).
	const area = document.createElement("textarea");
	area.className = "sr-only";
	area.value = text;
	area.setAttribute("readonly", "");
	document.body.appendChild(area);
	area.select();
	let ok = false;
	try {
		ok = document.execCommand("copy");
	} catch {
		ok = false;
	}
	area.remove();
	return ok;
}

function setFeedback(scope, ok) {
	const el = scope ? scope.querySelector("[data-copy-feedback]") : null;
	if (el) el.textContent = ok ? "Skopiowano" : "Nie udało się skopiować";
}

document.addEventListener("click", async (event) => {
	const target = event.target;
	if (!(target instanceof Element)) return;

	const linkButton = target.closest("[data-copy-link]");
	if (linkButton) {
		setFeedback(
			linkButton.closest(".share") ?? linkButton.parentElement,
			await copyText(location.href),
		);
		return;
	}

	const promptButton = target.closest("[data-copy-prompt]");
	if (promptButton) {
		const prompt = promptButton.closest(".prompt");
		const body = prompt ? prompt.querySelector(".prompt-body") : null;
		const ok = await copyText(body ? (body.textContent ?? "").trim() : "");
		setFeedback(prompt, ok);
	}
});
