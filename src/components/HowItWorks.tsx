import { motion } from 'framer-motion';

const steps = [
	{
		title: 'Krok 1',
		desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
		Icon: RocketIcon,
	},
	{
		title: 'Krok 2',
		desc: 'Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
		Icon: TargetIcon,
	},
	{
		title: 'Krok 3',
		desc: 'Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.',
		Icon: ChartIcon,
	},
	{
		title: 'Krok 4',
		desc: 'Duis aute irure dolor in reprehenderit in voluptate velit.',
		Icon: BadgeIcon,
	},
];

export default function HowItWorks() {
	return (
		<div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
			{steps.map(({ title, desc, Icon }) => (
				<motion.article
					key={title}
					className="glass group rounded-xl p-5 shadow-glass transition-colors"
					initial={{ opacity: 0, y: 12 }}
					whileInView={{ opacity: 1, y: 0 }}
					viewport={{ once: true, margin: '-10% 0px -10% 0px' }}
				>
					<div className="mb-4 flex items-center gap-3">
						<div className="grid h-10 w-10 place-items-center rounded-lg bg-white/10 text-primary group-hover:shadow-glow transition-shadow">
							<Icon />
						</div>
						<h3 className="text-lg font-semibold">{title}</h3>
					</div>
					<p className="text-white/80">{desc}</p>
				</motion.article>
			))}
		</div>
	);
}

function RocketIcon() {
	return (
		<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" focusable="false" className="text-primary">
			<path fill="currentColor" d="M13 3c4 0 8 4 8 8l-6 6c-4 0-8-4-8-8l6-6Zm-9 18l3-1l1-3l-3 1l-1 3Z" />
		</svg>
	);
}
function TargetIcon() {
	return (
		<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="text-primary">
			<path fill="currentColor" d="M12 2a10 10 0 1 0 10 10h-2a8 8 0 1 1-8-8V2Zm0 4a6 6 0 1 0 6 6h-2a4 4 0 1 1-4-4V6Z" />
		</svg>
	);
}
function ChartIcon() {
	return (
		<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="text-primary">
			<path fill="currentColor" d="M3 3h2v18H3V3Zm16 10h2v8h-2v-8ZM8 9h2v12H8V9Zm8-6h2v18h-2V3Z" />
		</svg>
	);
}
function BadgeIcon() {
	return (
		<svg width="22" height="22" viewBox="0 0 24 24" aria-hidden="true" className="text-primary">
			<path fill="currentColor" d="M12 2l2.39 4.85L20 8l-4 3.9L17 18l-5-2.6L7 18l1-6.1L4 8l5.61-1.15L12 2Z" />
		</svg>
	);
}





