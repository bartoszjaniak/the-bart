// Interakcje klienta (vanilla, bez bibliotek). Bundlowane przez Astro jako module
// (defer) — DOM jest gotowy, więc bez pułapek `DOMContentLoaded`.
//
// Kontrakt:
//   #menu-toggle [aria-expanded] / #site-header [data-menu-open] — menu mobilne
//   [data-copy-link]  → kopiuje `location.href`
//   [data-copy-prompt] → kopiuje `.prompt-body` najbliższego `.prompt`
//   [data-copy-feedback] [aria-live] → feedback tekstowy

const themeMedia = window.matchMedia("(prefers-color-scheme: dark)");
const themeToggle = document.querySelector("[data-theme-toggle]");
const themeKey = "the-bart-theme";
const themeNames = { system: "systemowy", light: "jasny", dark: "ciemny" };
const nextTheme = { system: "light", light: "dark", dark: "system" };

function applyTheme(preference) {
  const effective = preference === "system"
    ? (themeMedia.matches ? "dark" : "light")
    : preference;
  document.documentElement.dataset.theme = effective;
  document.documentElement.dataset.themePreference = preference;

  if (themeToggle) {
    const next = nextTheme[preference];
    themeToggle.setAttribute(
      "aria-label",
      `Motyw ${themeNames[preference]}. Kliknij, aby przełączyć na ${themeNames[next]}.`,
    );
    themeToggle.setAttribute("title", `Motyw ${themeNames[preference]}`);
  }
}

let themePreference = document.documentElement.dataset.themePreference || "system";
applyTheme(themePreference);

themeToggle?.addEventListener("click", () => {
  themePreference = nextTheme[themePreference];
  applyTheme(themePreference);
  try {
    if (themePreference === "system") localStorage.removeItem(themeKey);
    else localStorage.setItem(themeKey, themePreference);
  } catch {
    // Bez dostępu do storage przełącznik nadal działa.
  }
});

themeMedia.addEventListener("change", () => {
  if (themePreference === "system") applyTheme("system");
});

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
