import Callout from "./callout.astro";
import Prompt from "./prompt.astro";
import ProseHeading3 from "./prose-heading-3.astro";
import ProseHeading from "./prose-heading.astro";
import QuoteBlock from "./quote-block.astro";
import Step from "./step.astro";
import Steps from "./steps.astro";
import StyledImage from "./styled-image.astro";

/**
 * Bloki treści dostępne w MDX bez importów — wspólne dla postów i projektów.
 * Nagłówki renderują `id` z pipeline (ten sam slug, który zwraca `render().headings`).
 */
export const contentComponents = {
	h2: ProseHeading,
	h3: ProseHeading3,
	Callout,
	Prompt,
	QuoteBlock,
	Steps,
	Step,
	StyledImage,
};
