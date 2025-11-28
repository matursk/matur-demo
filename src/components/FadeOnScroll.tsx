import { motion, useReducedMotion } from 'framer-motion';
import { useMemo } from 'react';

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
	durationMs = 500,
	delayMs = 0,
}: FadeOnScrollProps) {
	const prefersReducedMotion = useReducedMotion();

	const transition = useMemo(
		() => ({
			duration: Math.max(0.12, (prefersReducedMotion ? durationMs * 0.7 : durationMs) / 1000),
			delay: delayMs / 1000,
			ease: [0.22, 0.9, 0.23, 1],
		}),
		[delayMs, durationMs, prefersReducedMotion],
	);

	return (
		<motion.div
			className={className}
			initial={{ opacity: 0, y: prefersReducedMotion ? 0 : appearY }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true, amount: 0.25, margin: '-10% 0px -10% 0px' }}
			transition={transition}
		>
			{children}
		</motion.div>
	);
}


