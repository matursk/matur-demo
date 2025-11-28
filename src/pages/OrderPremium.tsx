import { FormEvent, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import FadeOnScroll from '../components/FadeOnScroll';
import QuantityInput from '../components/QuantityInput';

const UNIT_PRICE_EUR = 20;
const LESSON_FEE_EUR = 5;
const MAX_COMMIT_YEARS = 5;
const UPFRONT_EXTRA_DISCOUNT = 0.02;

export default function OrderPremium() {
	const [submittedMsg, setSubmittedMsg] = useState<string | null>(null);
	const [studentCount, setStudentCount] = useState<number>(30);
	const [teacherCount, setTeacherCount] = useState<number>(1);
	const [lessonCount, setLessonCount] = useState<number>(5);
	const [commitYears, setCommitYears] = useState<number>(1);
	const [paymentMode, setPaymentMode] = useState<'annual' | 'upfront'>('annual');

	const paidLicenses = useMemo(() => {
		const paidTeachers = Math.max(teacherCount - 1, 0);
		return Math.max(1, studentCount) + paidTeachers;
	}, [studentCount, teacherCount]);

	const discountPct = useMemo(() => {
		if (paidLicenses >= 90) return 0.15;
		if (paidLicenses >= 70) return 0.1;
		if (paidLicenses >= 50) return 0.05;
		return 0;
	}, [paidLicenses]);

	const teacherHint = useMemo(
		() => 'Prvá učiteľská licencia je zdarma – počty sú nezáväzné a upravíme ich podľa potreby.',
		[]
	);

	const subtotal = useMemo(() => paidLicenses * UNIT_PRICE_EUR, [paidLicenses]);
	const discountAmount = useMemo(() => subtotal * discountPct, [subtotal, discountPct]);
	const totalLicenses = useMemo(() => subtotal - discountAmount, [subtotal, discountAmount]);

	const termDiscountPct = useMemo(() => {
		if (commitYears >= 5) return 0.07;
		if (commitYears >= 2) return 0.05;
		return 0;
	}, [commitYears]);
	const termDiscountAmount = useMemo(() => totalLicenses * termDiscountPct, [totalLicenses, termDiscountPct]);
	const licensesAfterTerm = useMemo(
		() => totalLicenses - termDiscountAmount,
		[totalLicenses, termDiscountAmount]
	);
	const lessonFeeOneTime = useMemo(() => lessonCount * LESSON_FEE_EUR, [lessonCount]);
	const perYearTotal = useMemo(() => licensesAfterTerm, [licensesAfterTerm]);
	const upfrontDiscountAmount = useMemo(
		() => (paymentMode === 'upfront' ? perYearTotal * commitYears * UPFRONT_EXTRA_DISCOUNT : 0),
		[perYearTotal, paymentMode, commitYears]
	);
	const totalApprox = useMemo(() => {
		const base = paymentMode === 'upfront' ? perYearTotal * commitYears - upfrontDiscountAmount : perYearTotal;
		return base + lessonFeeOneTime;
	}, [perYearTotal, paymentMode, commitYears, upfrontDiscountAmount, lessonFeeOneTime]);
	const lessonFeeTotal = lessonFeeOneTime;

	const formatEur = (n: number) =>
		new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(n);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		setSubmittedMsg('Ďakujeme, žiadosť o prémiový balík je odoslaná (mock). Budeme vás kontaktovať.');
	};

	return (
		<main className="relative z-10 py-16 md:py-24 px-6 md:px-10 lg:px-16">
			<section aria-labelledby="premium-order">
				<h1 id="premium-order" className="sr-only">
					Žiadosť — Prémiové licencie
				</h1>
				<FadeOnScroll>
					<div className="mx-auto max-w-4xl">
						<header className="mb-8 text-center">
							<p className="text-sm uppercase tracking-wider text-white/60">Prémiové licencie</p>
							<h2 className="mt-2 text-2xl font-semibold">Žiadosť o vypracovanie ponuky</h2>
							<p className="mt-2 text-white/70">
								Premiový obsah pripravujeme priamo pre vašu školu. Vyplňte parametre, aby sme vedeli naplánovať produkciu.
							</p>
						</header>

						<div className="glass rounded-2xl p-6 shadow-glass">
							{submittedMsg ? (
								<p className="text-emerald-300">{submittedMsg}</p>
							) : (
								<form onSubmit={onSubmit} className="grid gap-8">
									<section aria-labelledby="school-info-premium">
										<h3 id="school-info-premium" className="mb-3 text-lg font-semibold">
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

									<section aria-labelledby="quantities-premium">
										<h3 id="quantities-premium" className="mb-3 text-lg font-semibold">
											Počty licencií
										</h3>
										<div className="grid gap-4 md:grid-cols-2">
											<QuantityInput
												name="student_licenses"
												label="Počet licencií (študenti)"
												value={studentCount}
												onChange={setStudentCount}
												min={0}
											/>
											<QuantityInput
												name="teacher_licenses"
												label="Počet učiteľských licencií"
												value={teacherCount}
												onChange={setTeacherCount}
												min={0}
												hint={teacherHint}
											/>
										</div>
										<p className="mt-2 text-xs text-white/70">
											Hodnoty sú nezáväzný odhad – finálne počty si spolu potvrdíme pred podpisom.
										</p>
									</section>

									<section aria-labelledby="content-brief">
										<h3 id="content-brief" className="mb-3 text-lg font-semibold">
											Požiadavky na obsah
										</h3>
										<div className="grid gap-4">
											<QuantityInput
												name="lesson_count"
												label="Počet pridaných lekcií"
												value={lessonCount}
												onChange={setLessonCount}
												min={0}
												hint="Napr. 5 lekcií = 25€ jednorazovo navyše."
											/>
											<label className="text-sm">
												<span className="mb-1 block text-white/90">Predmety / oblasti</span>
												<textarea
													name="subjects"
													required
													rows={3}
													className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
													placeholder="Napr. slovenský jazyk, matematika, informatika…"
												/>
											</label>
											<label className="text-sm">
												<span className="mb-1 block text-white/90">Špecifické požiadavky</span>
												<textarea
													name="requirements"
													rows={3}
													className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
													placeholder="Aké ciele, formáty alebo materiály očakávate?"
												/>
											</label>
											<label className="text-sm">
												<span className="mb-1 block text-white/90">Preferovaný termín dodania</span>
												<input
													name="deadline"
													type="text"
													className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
													placeholder="Napr. do 30 dní od schválenia podkladov"
												/>
											</label>
										</div>
									</section>

									<section aria-labelledby="contact-premium">
										<h3 id="contact-premium" className="mb-3 text-lg font-semibold">
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

									<section aria-labelledby="premium-term">
										<h3 id="premium-term" className="mb-3 text-lg font-semibold">
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
											1–2 roky bez dodatočnej zľavy, 2–4 roky −5 %, 5 rokov −7 % na licencie (poplatok za lekcie sa platí len raz). Maximálna
											viazanosť je {MAX_COMMIT_YEARS} rokov.
										</p>
									</section>

									<section aria-labelledby="summary-premium">
										<h3 id="summary-premium" className="mb-3 text-lg font-semibold">
											Odhad ceny
										</h3>
										<div className="glass rounded-xl p-5 shadow-glass">
											<div className="mb-5 grid gap-4 md:grid-cols-2">
												<div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
													<p className="text-xs uppercase tracking-wide text-white/60">Poplatok za lekcie (jednorazovo)*</p>
													<p className="mt-2 text-3xl font-semibold text-primary">{formatEur(lessonFeeTotal)}</p>
												</div>
												<div className="rounded-xl border border-white/10 bg-white/5 p-5 text-center">
													<p className="text-xs uppercase tracking-wide text-white/60">Počet pridaných lekcií</p>
													<p className="mt-2 text-3xl font-semibold text-primary">{lessonCount}</p>
												</div>
											</div>
											<div className="flex flex-col gap-2 text-white/85">
												<div className="flex items-center justify-between">
													<span>Spoplatnené licencie</span>
													<strong>{paidLicenses}</strong>
												</div>
												<div className="flex items-center justify-between text-white/70">
													<span>Licencie spolu</span>
													<span>
														{paidLicenses} × {formatEur(UNIT_PRICE_EUR)} = <strong>{formatEur(subtotal)}</strong>
													</span>
												</div>
												{discountPct > 0 ? (
													<div className="flex items-center justify-between text-emerald-300">
														<span>Zľava ({Math.round(discountPct * 100)}%)</span>
														<span>− {formatEur(discountAmount)}</span>
													</div>
												) : null}
												{termDiscountPct > 0 ? (
													<div className="flex items-center justify-between text-emerald-300">
														<span>Dodatočná zľava viazanosť</span>
														<span>− {formatEur(termDiscountAmount)}</span>
													</div>
												) : null}
												<div className="flex items-center justify-between text-white/70">
													<span>Poplatok za lekcie*</span>
													<span>{formatEur(lessonFeeTotal)}</span>
												</div>
												{paymentMode === 'upfront' && upfrontDiscountAmount > 0 ? (
													<div className="flex items-center justify-between text-emerald-300">
														<span>Zľava za platbu naraz (2%)</span>
														<span>− {formatEur(upfrontDiscountAmount)}</span>
													</div>
												) : null}
												<div className="mt-2 flex items-center justify-between text-xl">
													<span className="font-semibold">
														{paymentMode === 'upfront' ? 'Odhad za celé obdobie' : 'Odhad ročne'}
													</span>
													<span className="font-bold text-primary">≈ {formatEur(totalApprox)}</span>
												</div>
												<p className="text-xs text-white/60">
													Viazanosť {commitYears} {commitYears === 1 ? 'rok' : 'roky'} •{' '}
													{paymentMode === 'annual'
														? `Orient. spolu: ${formatEur(perYearTotal * commitYears + lessonFeeTotal)}`
														: `Orient. spolu: ${formatEur(perYearTotal * commitYears - upfrontDiscountAmount + lessonFeeTotal)} (vrátane extra 2 % zľavy)`}{' '}
													Konečná suma bude potvrdená v záväznej ponuke. Zľavy sa vzťahujú iba na licencie, poplatok za lekcie sa účtuje jednorazovo.
												</p>
												<p className="text-xs text-white/60">
													* Poplatok za lekcie je jednorazový a neaplikujú sa naň zľavy. Do finálnej ceny sa môžu pripočítať aj iné poplatky. Kompletný
													prehľad nájdete na{' '}
													<Link className="underline hover:text-white focus-visible:text-white" to="/cennik">
														cenník
													</Link>
													.
												</p>
											</div>
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


