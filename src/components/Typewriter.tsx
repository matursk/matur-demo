import { useEffect, useMemo, useRef, useState } from 'react';

type TypewriterProps = {
	phrases: string[];
	className?: string;
	brandClassName?: string;
	typeSpeedMs?: number;
	deleteSpeedMs?: number;
	pauseMs?: number;
};

type BrandedChar = {
	char: string;
	isBrand: boolean;
};

function tokenizeBrandedCharacters(input: string): BrandedChar[] {
	const chars: BrandedChar[] = [];
	let inBrand = false;
	for (let i = 0; i < input.length; i++) {
		const c = input[i];
		if (c === '*') {
			inBrand = !inBrand;
			continue;
		}
		chars.push({ char: c, isBrand: inBrand });
	}
	return chars;
}

export default function Typewriter({
	phrases,
	className,
	brandClassName = 'text-primary',
	typeSpeedMs = 70,
	deleteSpeedMs = 45,
	pauseMs = 1200,
}: TypewriterProps) {
	const sequences = useMemo(() => phrases.map(tokenizeBrandedCharacters), [phrases]);
	const [phraseIndex, setPhraseIndex] = useState(0);
	const [visibleCount, setVisibleCount] = useState(0);
	const [isDeleting, setIsDeleting] = useState(false);
	const timeoutRef = useRef<number | null>(null);

	useEffect(() => {
		const chars = sequences[phraseIndex] ?? [];
		if (!chars.length) return;

		let delay = isDeleting ? deleteSpeedMs : typeSpeedMs;

		// Finished typing
		if (!isDeleting && visibleCount >= chars.length) {
			delay = pauseMs;
			timeoutRef.current = window.setTimeout(() => setIsDeleting(true), delay);
			return () => {
				if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
			};
		}

		// Finished deleting
		if (isDeleting && visibleCount === 0) {
			delay = 250;
			timeoutRef.current = window.setTimeout(() => {
				setIsDeleting(false);
				setPhraseIndex((i) => (i + 1) % sequences.length);
			}, delay);
			return () => {
				if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
			};
		}

		timeoutRef.current = window.setTimeout(() => {
			setVisibleCount((n) => (isDeleting ? Math.max(0, n - 1) : Math.min(chars.length, n + 1)));
		}, delay);

		return () => {
			if (timeoutRef.current) window.clearTimeout(timeoutRef.current);
		};
	}, [sequences, phraseIndex, visibleCount, isDeleting, typeSpeedMs, deleteSpeedMs, pauseMs]);

	const currentChars = sequences[phraseIndex] ?? [];
	const visibleChars = currentChars.slice(0, visibleCount);

	return (
		<div className={className} aria-live="polite">
			<span>
				{visibleChars.map((c, idx) => (
					<span key={idx} className={c.isBrand ? brandClassName : undefined}>
						{c.char}
					</span>
				))}
			</span>
			<span className="ml-1 inline-block h-[1em] w-[2px] align-[-0.15em] bg-white/80 animate-caret" aria-hidden="true" />
		</div>
	);
}


