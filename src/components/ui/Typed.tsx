import { useEffect, useRef } from "react";
import Typed, { type TypedOptions } from "typed.js";

// Options are read once on mount; the Typed instance is torn down on unmount.
// Purely visual: callers must provide the text for screen readers.
const TypedText = (options: TypedOptions) => {
  const el = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!el.current) return;
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.current.textContent = options.strings?.[0] ?? "";
      return;
    }
    const typed = new Typed(el.current, options);
    return () => typed.destroy();
    // eslint-disable-next-line react-hooks/exhaustive-deps -- options are read once on mount
  }, []);

  return <span ref={el} aria-hidden />;
};

export default TypedText;
