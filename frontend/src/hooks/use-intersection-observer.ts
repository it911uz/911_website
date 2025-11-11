import { useCallback, useRef, useState } from "react";

interface IntersectionObserverOptions {
    threshold?: number | number[];
    root?: Element | Document | null;
    rootMargin?: string;
}

export function useIntersectionObserver(
    options: IntersectionObserverOptions = {},
) {
    const { threshold = 1, root = null, rootMargin = "0px" } = options;
    const [entry, setEntry] = useState<IntersectionObserverEntry | null>(null);

    const previousObserver = useRef<IntersectionObserver | null>(null);

    const customRef = useCallback(
        (node: Element | null) => {
            if (previousObserver.current) {
                previousObserver.current.disconnect();
                previousObserver.current = null;
            }

            if (node?.nodeType === Node.ELEMENT_NODE) {
                const observer = new IntersectionObserver(
                    ([entry]) => {
                        if (entry) {
                            setEntry(entry);
                        }
                    },
                    { threshold, root, rootMargin },
                );

                observer.observe(node);
                previousObserver.current = observer;
            }
        },
        [threshold, root, rootMargin],
    );

    return [customRef, entry] as const;
}