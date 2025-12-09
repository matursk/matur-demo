import { motion } from 'framer-motion';

const steps = [
	{
		title: 'Diagnostika školy a cieľov',
		desc: 'Krátky onboarding s vedením aj predmetovými komisiami. Zmapujeme maturitné okruhy, výsledky a priority jednotlivých odborov.',
		Icon: RocketIcon,
	},
	{
		title: 'Obsah naviazaný na maturitu',
		desc: 'Z nášho jadra lekcií vyberieme relevantné témy a doplníme ukážkové príklady, videá či úplne nové lekcie podľa sylabu školy.',
		Icon: TargetIcon,
	},
	{
		title: 'Digitálna skúsenosť pre študentov',
		desc: 'Študenti získajú licencie do aplikácie s 10/20/30-minútovými blokmi, adaptívnym opakovaním, pripomienkami a okamžitou spätnou väzbou.',
		Icon: ChartIcon,
	},
	{
		title: 'Reporty a podpora pre učiteľov',
		desc: 'Učitelia vidia pokrok a odporúčania tém, k dispozícii majú support tím a rýchle kanály na spätnú väzbu aj nové požiadavky.',
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





