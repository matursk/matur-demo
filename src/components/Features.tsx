import { motion } from 'framer-motion';

const features = [
	{ title: 'Funkcia 1', desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.' },
	{ title: 'Funkcia 2', desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.' },
	{ title: 'Funkcia 3', desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco.' },
	{ title: 'Funkcia 4', desc: 'Duis aute irure dolor in reprehenderit in voluptate velit esse.' },
	{ title: 'Funkcia 5', desc: 'Excepteur sint occaecat cupidatat non proident, sunt in culpa.' },
];

export default function Features() {
	return (
		<div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
			{features.map((f) => (
				<motion.div
					key={f.title}
					className="glass group rounded-xl p-6 shadow-glass outline-none"
					whileHover={{ scale: 1.02 }}
					whileFocus={{ scale: 1.01 }}
					tabIndex={0}
					role="button"
					aria-label={`${f.title}: ${f.desc}`}
				>
					<div className="mb-3 flex items-center justify-between">
						<h3 className="text-lg font-semibold">{f.title}</h3>
						<motion.span
							className="h-2 w-2 rounded-full bg-primary/80"
							animate={{ scale: [1, 1.6, 1] }}
							transition={{ repeat: Infinity, duration: 1.8, ease: 'easeInOut' }}
							aria-hidden="true"
						/>
					</div>
					<p className="text-white/80">{f.desc}</p>
					<motion.div
						className="mt-4 h-24 w-full overflow-hidden rounded-lg bg-white/5"
						initial={false}
						whileHover={{ boxShadow: '0 0 0 1px rgba(151,218,255,0.4), 0 0 24px rgba(72,183,255,0.25)' }}
						aria-hidden="true"
					>
						<motion.div
							className="h-full w-[200%] bg-[radial-gradient(circle_at_center,_rgba(72,183,255,0.35),_transparent_55%)]"
							animate={{ x: ['0%', '-50%'] }}
							transition={{ repeat: Infinity, duration: 2.4, ease: 'linear' }}
						/>
					</motion.div>
				</motion.div>
			))}
		</div>
	);
}





