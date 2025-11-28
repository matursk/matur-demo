import { motion, useAnimationControls, useScroll, useTransform } from 'framer-motion';
import { useEffect } from 'react';
import { useScrollUnlock } from '../hooks/useScrollUnlock';
import Typewriter from './Typewriter';

export default function HeroStage() {
	const { state, prefersReducedMotion } = useScrollUnlock();
	const textCtrls = useAnimationControls();
	const { scrollY } = useScroll();
	// Title fades/scales slightly as user starts scrolling
	const titleOpacity = useTransform(scrollY, [0, 120, 270], [1, 0.65, 0]);
	const titleScale = useTransform(scrollY, [0, 270], [1, 0.96]);

	useEffect(() => {
		if (state === 'heroVisible') {
			textCtrls.start({ opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 0.9, 0.23, 1] } });
		} else if (state === 'phoneLocked') {
			textCtrls.start({ opacity: 0, y: -40, transition: { duration: 0.6, ease: [0.22, 0.9, 0.23, 1] } });
		} else {
			// phoneUnlocked — keep hero text hidden
			textCtrls.start({ opacity: 0, transition: { duration: 0.45 } });
		}
	}, [state, prefersReducedMotion, textCtrls]);

	return (
		<div className="relative flex min-h-screen flex-col">
			<div className="sticky top-16 z-10 mx-auto flex min-h-[calc(100vh-64px)] w-full items-center justify-center px-6">
				<div className="relative grid w-full max-w-6xl aspect-[16/9]">
					<motion.div
						className="absolute left-[10%] top-[35%] w-[90%] md:w-[80%] flex flex-col items-center text-center"
						initial={{ opacity: 0, y: 20 }}
						animate={textCtrls}
					>
						<motion.h1
							className="mb-3 text-6xl md:text-7xl font-extrabold tracking-tight text-white whitespace-nowrap"
							style={{
								opacity: state === 'heroVisible' ? titleOpacity : undefined,
								scale: state === 'heroVisible' ? titleScale : undefined,
							}}
						>
							<Typewriter
								className="inline-block"
								brandClassName="text-primary"
								phrases={[
									'Z*matur*ujem na jednotku.',
									'*Matur*ita jednoducho.',
									'*Matur*ita, formalita.',
									'Z*matur*ujem bez stresu.',
									'*Matur*ita s prehľadom.',
								]}
							/>
						</motion.h1>
						<motion.p
							className="text-lg text-white/80"
							style={{
								opacity: state === 'heroVisible' ? titleOpacity : undefined,
								scale: state === 'heroVisible' ? titleScale : undefined,
							}}
						>
							Najefektívnejšia príprava na maturitu pre vašu školu.
						</motion.p>
						<motion.div
							className="mt-6"
							style={{
								opacity: state === 'heroVisible' ? titleOpacity : undefined,
								scale: state === 'heroVisible' ? titleScale : undefined,
							}}
						>
							<a
								className="rounded-md bg-primary px-5 py-3 font-semibold text-black shadow-glow hover:brightness-110 focus-visible:brightness-110"
								href="#howitworks"
								aria-label="Zisťiť viac"
								onClick={(e) => {
									e.preventDefault();
									const target = document.getElementById('howitworks');
									if (!target) return;
									// Account for fixed navbar height (compact: 48px, expanded: 64px)
									const nav = document.querySelector('header[aria-label="Navigácia"]') as HTMLElement | null;
									const offset = (nav?.getBoundingClientRect().height ?? 64) + 8; // small extra spacing
									const top = target.getBoundingClientRect().top + window.scrollY - offset;
									window.scrollTo({ top, behavior: 'smooth' });
								}}
							>
								Zisťiť viac
							</a>
						</motion.div>
					</motion.div>
				</div>
			</div>
			{/* Spacer to allow scroll sequence */}
			<div className="h-[10vh]" aria-hidden="true" />
		</div>
	);
}



