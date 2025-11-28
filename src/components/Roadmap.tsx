import { useRef } from 'react';
import { motion } from 'framer-motion';

const items = [
	{ date: '11/2024', title: 'Alpha', status: 'Done' },
	{ date: '01/2025', title: 'Beta', status: 'In Progress' },
	{ date: '03/2025', title: 'Progress štatistiky', status: 'Planned' },
	{ date: '05/2025', title: 'Mock tests+', status: 'Planned' },
	{ date: '08/2025', title: 'Verzia 1.0', status: 'Planned' },
];

export default function Roadmap() {
	const ref = useRef<HTMLDivElement | null>(null);

	const onKey = (e: React.KeyboardEvent) => {
		if (!ref.current) return;
		if (e.key === 'ArrowRight') ref.current.scrollBy({ left: 220, behavior: 'smooth' });
		if (e.key === 'ArrowLeft') ref.current.scrollBy({ left: -220, behavior: 'smooth' });
	};

	return (
		<div className="mx-auto max-w-6xl">
			<div className="mb-3 flex items-center justify-between">
				<h3 className="text-xl font-semibold">Roadmap</h3>
				<div className="flex gap-2">
					<button
						type="button"
						className="glass rounded-md px-3 py-2 text-sm hover:bg-white/10"
						onClick={() => ref.current?.scrollBy({ left: -220, behavior: 'smooth' })}
						aria-label="Posunúť doľava"
					>
						←
					</button>
					<button
						type="button"
						className="glass rounded-md px-3 py-2 text-sm hover:bg-white/10"
						onClick={() => ref.current?.scrollBy({ left: 220, behavior: 'smooth' })}
						aria-label="Posunúť doprava"
					>
						→
					</button>
				</div>
			</div>
			<div
				ref={ref}
				className="no-scrollbar glass relative flex gap-3 overflow-x-auto rounded-xl p-4 shadow-glass outline-none"
				role="listbox"
				aria-label="Roadmap horizontálny slider"
				tabIndex={0}
				onKeyDown={onKey}
			>
				{items.map((it, idx) => (
					<motion.div
						key={`${it.date}-${idx}`}
						role="option"
						aria-label={`${it.date} ${it.title} ${it.status}`}
						tabIndex={-1}
						className="min-w-[200px] rounded-lg border border-white/10 bg-white/5 p-4"
						whileHover={{ y: -2 }}
					>
						<div className="mb-2 text-xs text-white/70">{it.date}</div>
						<div className="mb-2 text-base font-semibold">{it.title}</div>
						<span
							className={`rounded-full px-2 py-1 text-xs ${
								it.status === 'Done'
									? 'bg-emerald-500/20 text-emerald-300'
									: it.status === 'In Progress'
									? 'bg-amber-500/20 text-amber-300'
									: 'bg-sky-500/20 text-sky-300'
							}`}
						>
							{it.status}
						</span>
					</motion.div>
				))}
			</div>
		</div>
	);
}








