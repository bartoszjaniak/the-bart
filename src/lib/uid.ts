/**
 * Unikalny identyfikator w obrębie jednego renderu (licznik modułu — nie resetuje się
 * per instancja komponentu, w odróżnieniu od zmiennej w frontmatterze).
 *
 * Potrzebne dla `anchor-name` w CSS: nazwa musi być unikalna w dokumencie, bo przy
 * duplikacie wszystkie zakotwiczone elementy wiążą się z ostatnim z nich
 * (np. dwa badge'e „AI SLOB" na jednej stronie).
 */
let seq = 0;

export const nextId = (prefix: string): string => `${prefix}-${++seq}`;
