import { useEffect, useMemo, useState } from 'react';

type UnlockState = 'heroVisible' | 'phoneLocked' | 'phoneUnlocked';

export function useScrollUnlock() {
	const prefersReducedMotion = useMemo(
		() => window.matchMedia('(prefers-reduced-motion: reduce)').matches,
		[],
	);
	const [state, setState] = useState<UnlockState>('heroVisible');

	useEffect(() => {
		const update = () => {
			const y = window.scrollY;
			const vh = window.innerHeight;

			// thresholds tuned for smoothness
			if (y < vh * 0.5) {
				setState('heroVisible');
			} else if (y < vh * 1.2) {
				setState('phoneLocked');
			} else {
				setState('phoneUnlocked');
			}
		};
		update();
		window.addEventListener('scroll', update, { passive: true });
		window.addEventListener('resize', update);
		return () => {
			window.removeEventListener('scroll', update);
			window.removeEventListener('resize', update);
		};
	}, []);

	return { state, prefersReducedMotion };
}

export type { UnlockState };








