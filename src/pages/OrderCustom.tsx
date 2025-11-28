import { FormEvent, useState } from 'react';
import FadeOnScroll from '../components/FadeOnScroll';
import QuantityInput from '../components/QuantityInput';

const MAX_COMMIT_YEARS = 5;

export default function OrderCustom() {
	const [submittedMsg, setSubmittedMsg] = useState<string | null>(null);
	const [commitYears, setCommitYears] = useState<number>(1);
	const [paymentMode, setPaymentMode] = useState<'annual' | 'upfront'>('annual');
	const [studentEstimate, setStudentEstimate] = useState<number>(0);
	const [teacherEstimate, setTeacherEstimate] = useState<number>(0);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmittedMsg('Ďakujeme, žiadosť o custom riešenie je odoslaná (mock). Ozveme sa čoskoro.');
	};

	return (
		<main className="relative z-10 py-16 md:py-24 px-6 md:px-10 lg:px-16">
			<section aria-labelledby="custom-order">
				<h1 id="custom-order" className="sr-only">
					Žiadosť — Custom riešenie
				</h1>
				<FadeOnScroll>
					<div className="mx-auto max-w-4xl">
						<header className="mb-8 text-center">
							<p className="text-sm uppercase tracking-wider text-white/60">Custom riešenie</p>
							<h2 className="mt-2 text-2xl font-semibold">Zber požiadaviek</h2>
							<p className="mt-2 text-white/70">
								Všetko pripravíme presne podľa vašich cieľov. Čím detailnejší brief, tým presnejšia ponuka a rýchlejší začiatok.
							</p>
						</header>

						<div className="glass rounded-2xl p-6 shadow-glass">
							{submittedMsg ? (
								<p className="text-emerald-300">{submittedMsg}</p>
							) : (
								<form onSubmit={onSubmit} className="grid gap-8">
									<section aria-labelledby="school-info-custom">
										<h3 id="school-info-custom" className="mb-3 text-lg font-semibold">
											Údaje o škole
										</h3>
										<div className="grid gap-4 md:grid-cols-2">
											<label className="text-sm md:col-span-2">
												<span className="mb-1 block text-white/90">Názov školy</span>
												<input
													name="school_name"
													required
													className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
													placeholder="Gymnázium M. R. Štefánika"
												/>
											</label>
											<label className="text-sm md:col-span-2">
												<span className="mb-1 block text-white/90">Ulica a číslo</span>
												<input
													name="school_street"
													required
													className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
													placeholder="Hlavná 123"
												/>
											</label>
											<label className="text-sm">
												<span className="mb-1 block text-white/90">Mesto</span>
												<input
													name="school_city"
													required
													className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
													placeholder="Bratislava"
												/>
											</label>
											<label className="text-sm">
												<span className="mb-1 block text-white/90">PSČ</span>
												<input
													name="school_zip"
													required
													className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
													placeholder="811 01"
												/>
											</label>
											<label className="text-sm md:col-span-2">
												<span className="mb-1 block text-white/90">Krajina</span>
												<input
													name="school_country"
													defaultValue="Slovensko"
													required
													className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
												/>
											</label>
										</div>
									</section>

									<section aria-labelledby="custom-licenses">
										<h3 id="custom-licenses" className="mb-3 text-lg font-semibold">
											Odhad počtu licencií (nezáväzné)
										</h3>
										<div className="grid gap-4 md:grid-cols-2">
											<QuantityInput
												name="student_estimate"
												label="Odhad študentských licencií"
												value={studentEstimate}
												onChange={setStudentEstimate}
												min={0}
											/>
											<QuantityInput
												name="teacher_estimate"
												label="Odhad učiteľských licencií"
												value={teacherEstimate}
												onChange={setTeacherEstimate}
												min={0}
												hint="Slúži len na plánovanie, počty upravíme podľa potreby."
											/>
										</div>
										<p className="mt-2 text-xs text-white/70">
											Hodnoty sú orientačné a nezakladajú záväzok. Môžete ich kedykoľvek upraviť počas rokovaní.
										</p>
									</section>

									<section aria-labelledby="custom-brief">
										<h3 id="custom-brief" className="mb-3 text-lg font-semibold">
											Čo očakávate od riešenia
										</h3>
										<div className="grid gap-4">
											<label className="text-sm">
												<span className="mb-1 block text-white/90">Hlavný cieľ projektu</span>
												<textarea
													name="goal"
													rows={3}
													required
													className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
													placeholder="Popíšte, čo má riešenie priniesť študentom alebo škole."
												/>
											</label>
											<label className="text-sm">
												<span className="mb-1 block text-white/90">Obsah / funkcionalita</span>
												<textarea
													name="content"
													rows={4}
													required
													className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
													placeholder="Aké lekcie, formáty, integrácie alebo vizuál očakávate?"
												/>
											</label>
											<label className="text-sm">
												<span className="mb-1 block text-white/90">Technické alebo organizačné požiadavky</span>
												<textarea
													name="technical"
													rows={3}
													className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
													placeholder="Napr. LMS, autentifikácia, správa študentov, dostupnosť..."
												/>
											</label>
											<label className="text-sm">
												<span className="mb-1 block text-white/90">Preferovaný termín dodania</span>
												<input
													name="timeline"
													type="text"
													className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
													placeholder="Napr. Q1 / september 2025..."
												/>
											</label>
										</div>
									</section>

									<section aria-labelledby="custom-contact">
										<h3 id="custom-contact" className="mb-3 text-lg font-semibold">
											Kontaktná osoba
										</h3>
										<div className="grid gap-4 md:grid-cols-2">
											<label className="text-sm">
												<span className="mb-1 block text-white/90">Meno a priezvisko</span>
												<input
													name="contact_name"
													required
													className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
													placeholder="Ján Novák"
												/>
											</label>
											<label className="text-sm">
												<span className="mb-1 block text-white/90">Email</span>
												<input
													name="contact_email"
													type="email"
													required
													className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
													placeholder="jan.novak@skola.sk"
												/>
											</label>
											<label className="text-sm md:col-span-2">
												<span className="mb-1 block text-white/90">Telefón</span>
												<input
													name="contact_phone"
													type="tel"
													className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
													placeholder="+421 900 123 456"
												/>
											</label>
										</div>
									</section>

									<section aria-labelledby="custom-term">
										<h3 id="custom-term" className="mb-3 text-lg font-semibold">
											Viazanosť a platba
										</h3>
										<div className="grid gap-4 md:grid-cols-2">
											<QuantityInput
												name="commit_years"
												label="Počet rokov viazanosti"
												value={commitYears}
												onChange={setCommitYears}
												min={1}
												max={MAX_COMMIT_YEARS}
											/>
											<div>
												<p className="mb-2 text-sm text-white/90">Spôsob platby</p>
												<div className="flex flex-col gap-2 text-sm">
													<label className="flex items-center gap-2">
														<input
															type="radio"
															name="payment_mode"
															value="annual"
															checked={paymentMode === 'annual'}
															onChange={() => setPaymentMode('annual')}
														/>
														<span>Ročne</span>
													</label>
													<label className="flex items-center gap-2">
														<input
															type="radio"
															name="payment_mode"
															value="upfront"
															checked={paymentMode === 'upfront'}
															onChange={() => setPaymentMode('upfront')}
														/>
														<span>Naraz za celé obdobie</span>
													</label>
												</div>
											</div>
										</div>
										<p className="mt-2 text-xs text-white/70">
											1–2 roky bez dodatočnej zľavy, 2–4 roky −5 %, 5 rokov −7 % (aplikujeme v kalkulácii ponuky). Maximálna viazanosť je{' '}
											{MAX_COMMIT_YEARS} rokov.
										</p>
									</section>

									<section aria-labelledby="custom-summary">
										<h3 id="custom-summary" className="mb-3 text-lg font-semibold">
											Odhad ceny
										</h3>
										<div className="glass rounded-xl p-5 shadow-glass text-white/80">
											<p>
												≈ Cena sa stanoví individuálne podľa rozsahu zadania. Po spracovaní briefu vám pošleme návrh riešenia a harmonogram.
												Viazanosť {commitYears} {commitYears === 1 ? 'rok' : 'roky'}, preferovaná platba{' '}
												{paymentMode === 'annual' ? 'ročne' : 'naraz'}. Dodatočné zľavy za viazanosť započítame v ponuke.
											</p>
										</div>
									</section>

									<div className="pt-2">
										<button
											type="submit"
											className="rounded-md bg-primary px-5 py-3 font-semibold text-black shadow-glow hover:brightness-110 focus-visible:brightness-110"
										>
											Odoslať žiadosť
										</button>
									</div>
								</form>
							)}
						</div>
					</div>
				</FadeOnScroll>
			</section>
		</main>
	);
}


