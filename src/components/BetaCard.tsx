import { FormEvent, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export default function BetaCard() {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState<string | null>(null);

	const submit = async (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const fd = new FormData(e.currentTarget);
		const data = Object.fromEntries(fd.entries());
		try {
			const res = await fetch('/api/beta', {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify(data),
			});
			if (!res.ok) throw new Error('Request failed');
			setMessage('Ďakujeme! Ozveme sa čoskoro.');
		} catch {
			setMessage('Žiadosť odoslaná (mock). Ďakujeme!');
		}
	};

	return (
		<div className="mx-auto max-w-3xl">
			<div className="glass rounded-2xl p-8 text-center shadow-glass">
				<h3 className="mb-3 text-2xl font-semibold">
					Získaj beta prístup — buď medzi prvými
				</h3>
				<p className="mb-6 text-white/80">
					Pomôž nám vyladiť skúsenosť pre všetkých maturantov.
				</p>
				<button
					type="button"
					onClick={() => setOpen(true)}
					className="rounded-md bg-primary px-5 py-3 font-semibold text-black shadow-glow hover:brightness-110 focus-visible:brightness-110"
					aria-haspopup="dialog"
					aria-expanded={open}
					aria-controls="beta-modal"
				>
					Získať beta prístup
				</button>
			</div>

			<AnimatePresence>
				{open && (
					<motion.div
						className="fixed inset-0 z-40 grid place-items-center bg-black/60 p-4"
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						aria-modal="true"
						role="dialog"
						id="beta-modal"
						aria-label="Beta prihláška"
					>
						<motion.div
							className="glass w-full max-w-md rounded-xl p-6"
							initial={{ y: 20, opacity: 0 }}
							animate={{ y: 0, opacity: 1 }}
							exit={{ y: 10, opacity: 0 }}
						>
							<div className="mb-4 flex items-center justify-between">
								<h4 className="text-lg font-semibold">Beta prihláška</h4>
								<button
                                    type="button"
									onClick={() => setOpen(false)}
									className="rounded-md px-2 py-1 text-white/80 hover:bg-white/10 focus-visible:bg-white/10"
									aria-label="Zavrieť"
								>
									✕
								</button>
							</div>
							{message ? (
								<p className="text-emerald-300">{message}</p>
							) : (
								<form onSubmit={submit} className="grid gap-4">
									<label className="text-sm">
										<span className="mb-1 block text-white/90">Email</span>
										<input
											className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
											name="email"
											type="email"
											required
											placeholder="ty@example.com"
										/>
									</label>
									<label className="text-sm">
										<span className="mb-1 block text-white/90">Meno</span>
										<input
											className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
											name="meno"
											type="text"
											required
											placeholder="Tvoje meno"
										/>
									</label>
									<label className="text-sm">
										<span className="mb-1 block text-white/90">Škola</span>
										<input
											className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
											name="skola"
											type="text"
											placeholder="Názov školy"
										/>
									</label>
									<button
										type="submit"
										className="mt-2 rounded-md bg-primary px-4 py-2 font-semibold text-black shadow-glow hover:brightness-110 focus-visible:brightness-110"
									>
										Odoslať
									</button>
								</form>
							)}
						</motion.div>
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}





