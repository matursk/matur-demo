import { motion, useAnimationControls, useInView } from 'framer-motion';
import { useEffect, useRef } from 'react';

type FadeOnScrollProps = {
	children: React.ReactNode;
	className?: string;
	appearY?: number;
	durationMs?: number;
	delayMs?: number;
};

export default function FadeOnScroll({
	children,
	className,
	appearY = 18,
	durationMs = 0.5 * 1000,
	delayMs = 0,
}: FadeOnScrollProps) {
	const ref = useRef<HTMLDivElement | null>(null);
	// Trigger slightly earlier: shrink viewport by 5% on top/bottom
	const inView = useInView(ref, { margin: '-5% 0px -5% 0px', amount: 0.2 });
	const ctrls = useAnimationControls();

	useEffect(() => {
		if (inView) {
			ctrls.start({
				opacity: 1,
				y: 0,
				transition: { duration: durationMs / 1000, delay: delayMs / 1000, ease: [0.22, 0.9, 0.23, 1] },
			});
		} else {
			ctrls.start({
				opacity: 0,
				y: appearY,
				transition: { duration: durationMs / 1000, ease: [0.22, 0.9, 0.23, 1] },
			});
		}
	}, [inView, ctrls, appearY, durationMs, delayMs]);

	return (
		<motion.div ref={ref} className={className} initial={{ opacity: 0, y: appearY }} animate={ctrls}>
			{children}
		</motion.div>
	);
}


