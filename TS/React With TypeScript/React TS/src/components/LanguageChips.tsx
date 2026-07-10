import { clsx } from "clsx";
import type { JSX } from "react/jsx-runtime";
import type { LANG } from "../languages.ts";
type LangChipType = { languages: LANG[]; wrongGuessCount: number };

export default function LanguageChips({
  languages,
  wrongGuessCount,
}: LangChipType): JSX.Element {
  // Here the Return type and Variable type is JSX.Element (Array and simple element) bcz returning every time a DOM JSX
  const languageElements: JSX.Element[] = languages.map((lang: LANG, index: number): JSX.Element => {
      const isLanguageLost: boolean = index < wrongGuessCount;
      const styles: Omit<LANG, "name"> = {
        backgroundColor: lang.backgroundColor,
        color: lang.color,
      };
      const className: string = clsx("chip", isLanguageLost && "lost");
      return (
        <span className={className} style={styles} key={lang.name}>
          {lang.name}
        </span>
      );
    },
  );

  return <section className="language-chips">{languageElements}</section>;
}
