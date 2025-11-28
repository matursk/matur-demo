import { FormEvent, useMemo, useState } from 'react';
import FadeOnScroll from '../components/FadeOnScroll';
import QuantityInput from '../components/QuantityInput';

type InvoiceTarget = 'school' | 'person';

const UNIT_PRICE_EUR = 15;
const MAX_COMMIT_YEARS = 5;
const UPFRONT_EXTRA_DISCOUNT = 0.02;

export default function OrderBase() {
	const [submittedMsg, setSubmittedMsg] = useState<string | null>(null);
	const [invoiceTarget, setInvoiceTarget] = useState<InvoiceTarget>('school');
	const [useSchoolForInvoice, setUseSchoolForInvoice] = useState(true);
	const [studentCount, setStudentCount] = useState<number>(30);
	const [teacherCount, setTeacherCount] = useState<number>(1);
	const [commitYears, setCommitYears] = useState<number>(1);
	const [paymentMode, setPaymentMode] = useState<'annual' | 'upfront'>('annual');

	// Simple computed hint text
	const teacherHint = useMemo(
		() => '1 učiteľská licencia je zdarma',
		[]
	);

	const paidLicenses = useMemo(() => {
		const paidTeachers = Math.max(teacherCount - 1, 0);
		return Math.max(1, studentCount) + paidTeachers;
	}, [studentCount, teacherCount]);

	const discountPct = useMemo(() => {
		if (paidLicenses >= 90) return 0.2;
		if (paidLicenses >= 70) return 0.15;
		if (paidLicenses >= 50) return 0.1;
		if (paidLicenses >= 30) return 0.05;
		return 0;
	}, [paidLicenses]);

	const subtotal = useMemo(() => paidLicenses * UNIT_PRICE_EUR, [paidLicenses]);
	const discountAmount = useMemo(() => subtotal * discountPct, [subtotal, discountPct]);
	const afterQtyDiscount = useMemo(() => subtotal - discountAmount, [subtotal, discountAmount]);

	const termDiscountPct = useMemo(() => {
		if (commitYears >= 5) return 0.07;
		if (commitYears >= 2) return 0.05;
		return 0;
	}, [commitYears]);
	const termDiscountAmount = useMemo(() => afterQtyDiscount * termDiscountPct, [afterQtyDiscount, termDiscountPct]);
	const perYearTotal = useMemo(() => afterQtyDiscount - termDiscountAmount, [afterQtyDiscount, termDiscountAmount]);
	const upfrontDiscountAmount = useMemo(
		() => (paymentMode === 'upfront' ? perYearTotal * commitYears * UPFRONT_EXTRA_DISCOUNT : 0),
		[perYearTotal, commitYears, paymentMode]
	);
	const totalDue = useMemo(() => {
		if (paymentMode === 'upfront') {
			return perYearTotal * commitYears - upfrontDiscountAmount;
		}
		return perYearTotal;
	}, [perYearTotal, commitYears, paymentMode, upfrontDiscountAmount]);

	const formatEur = (n: number) =>
		new Intl.NumberFormat('sk-SK', { style: 'currency', currency: 'EUR', maximumFractionDigits: 2 }).format(n);

	const onSubmit = (e: FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		// In this basic version, just acknowledge success
		setSubmittedMsg('Ďakujeme, vaša objednávka bola odoslaná (mock). Ozveme sa e‑mailom.');
	};

	return (
		<main className="relative z-10 py-16 md:py-24 px-6 md:px-10 lg:px-16">
			<section aria-labelledby="base-order">
				<h1 id="base-order" className="sr-only">
					Objednávka — Základné licencie
				</h1>
				<FadeOnScroll>
					<div className="mx-auto max-w-4xl">
						<header className="mb-8 text-center">
							<p className="text-sm uppercase tracking-wider text-white/60">Základné licencie</p>
							<h2 className="mt-2 text-2xl font-semibold">Objednávka</h2>
						</header>

						<div className="glass rounded-2xl p-6 shadow-glass">
							{submittedMsg ? (
								<p className="text-emerald-300">{submittedMsg}</p>
							) : (
								<form onSubmit={onSubmit} className="grid gap-8">
									{/* Škola */}
									<section aria-labelledby="school-info">
										<h3 id="school-info" className="mb-3 text-lg font-semibold">
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

									{/* Počty licencií */}
									<section aria-labelledby="quantities">
										<h3 id="quantities" className="mb-3 text-lg font-semibold">
											Počty licencií
										</h3>
										<div className="grid gap-4 md:grid-cols-2">
											<QuantityInput
												name="student_licenses"
												label="Počet licencií (študenti)"
												value={studentCount}
												onChange={setStudentCount}
												min={1}
											/>
											<QuantityInput
												name="teacher_licenses"
												label="Počet učiteľských licencií"
												value={teacherCount}
												onChange={setTeacherCount}
												min={1}
												hint={teacherHint}
											/>
										</div>
									</section>

									{/* Objednávateľ */}
									<section aria-labelledby="ordering-person">
										<h3 id="ordering-person" className="mb-3 text-lg font-semibold">
											Objednávateľ
										</h3>
										<div className="grid gap-4 md:grid-cols-2">
											<label className="text-sm">
												<span className="mb-1 block text-white/90">Meno a priezvisko</span>
												<input
													name="buyer_name"
													required
													className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
													placeholder="Ján Novák"
												/>
											</label>
											<label className="text-sm">
												<span className="mb-1 block text-white/90">Email</span>
												<input
													name="buyer_email"
													type="email"
													required
													className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
													placeholder="jan.novak@skola.sk"
												/>
											</label>
											<label className="text-sm md:col-span-2">
												<span className="mb-1 block text-white/90">Telefón</span>
												<input
													name="buyer_phone"
													type="tel"
													className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
													placeholder="+421 900 123 456"
												/>
											</label>
										</div>
									</section>

									{/* Fakturácia */}
									<section aria-labelledby="billing">
										<h3 id="billing" className="mb-3 text-lg font-semibold">
											Fakturácia
										</h3>

										<div className="mb-4 flex flex-wrap items-center gap-3">
											<label className="flex items-center gap-2 text-sm">
												<input
													type="radio"
													name="invoice_target"
													value="school"
													checked={invoiceTarget === 'school'}
													onChange={() => setInvoiceTarget('school')}
												/>
												<span>Fakturovať škole</span>
											</label>
											<label className="flex items-center gap-2 text-sm">
												<input
													type="radio"
													name="invoice_target"
													value="person"
													checked={invoiceTarget === 'person'}
													onChange={() => setInvoiceTarget('person')}
												/>
												<span>Fakturovať objednávateľovi</span>
											</label>
										</div>

										{invoiceTarget === 'school' ? (
											<div className="grid gap-4">
												<label className="flex items-center gap-2 text-sm">
													<input
														type="checkbox"
														checked={useSchoolForInvoice}
														onChange={(e) => setUseSchoolForInvoice(e.target.checked)}
													/>
													<span>Použiť údaje školy pre fakturáciu</span>
												</label>
												{!useSchoolForInvoice && (
													<div className="grid gap-4 md:grid-cols-2">
														<label className="text-sm md:col-span-2">
															<span className="mb-1 block text-white/90">Názov organizácie</span>
															<input
																name="inv_org_name"
																required
																className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
																placeholder="Názov školy/organizácie"
															/>
														</label>
														<label className="text-sm">
															<span className="mb-1 block text-white/90">IČO</span>
															<input
																name="inv_ico"
																className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
																placeholder="12345678"
															/>
														</label>
														<label className="text-sm">
															<span className="mb-1 block text-white/90">DIČ / IČ DPH</span>
															<input
																name="inv_dic"
																className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
																placeholder="1234567890"
															/>
														</label>
														<label className="text-sm md:col-span-2">
															<span className="mb-1 block text-white/90">Fakturačná adresa</span>
															<input
																name="inv_address"
																required
																className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
																placeholder="Ulica 1"
															/>
														</label>
														<label className="text-sm">
															<span className="mb-1 block text-white/90">Mesto</span>
															<input
																name="inv_city"
																required
																className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
																placeholder="Mesto"
															/>
														</label>
														<label className="text-sm">
															<span className="mb-1 block text-white/90">PSČ</span>
															<input
																name="inv_zip"
																required
																className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
																placeholder="000 00"
															/>
														</label>
													</div>
												)}
											</div>
										) : (
											<div className="grid gap-4 md:grid-cols-2">
												<label className="text-sm md:col-span-2">
													<span className="mb-1 block text-white/90">Meno a priezvisko (fakturačné)</span>
													<input
														name="inv_person_name"
														required
														className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
														placeholder="Ján Novák"
													/>
												</label>
												<label className="text-sm md:col-span-2">
													<span className="mb-1 block text-white/90">Adresa</span>
													<input
														name="inv_person_address"
														required
														className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
														placeholder="Ulica a číslo"
													/>
												</label>
												<label className="text-sm">
													<span className="mb-1 block text-white/90">Mesto</span>
													<input
														name="inv_person_city"
														required
														className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
														placeholder="Mesto"
													/>
												</label>
												<label className="text-sm">
													<span className="mb-1 block text-white/90">PSČ</span>
													<input
														name="inv_person_zip"
														required
														className="w-full rounded-md border border-white/15 bg-white/5 px-3 py-2 outline-none focus-visible:ring-2 focus-visible:ring-primary"
														placeholder="000 00"
													/>
												</label>
											</div>
										)}
									</section>

									<section aria-labelledby="term-payment">
										<h3 id="term-payment" className="mb-3 text-lg font-semibold">
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
											1–2 roky bez dodatočnej zľavy, 2–4 roky −5 %, 5 rokov −7 % na licencie. Maximálna viazanosť je {MAX_COMMIT_YEARS} rokov.
										</p>
									</section>

									{/* Súhrn ceny */}
									<section aria-labelledby="summary">
										<h3 id="summary" className="mb-3 text-lg font-semibold">
											Súhrn ceny
										</h3>
										<div className="glass rounded-xl p-5 shadow-glass">
											<div className="flex flex-col gap-2 text-white/85">
												<div className="flex items-center justify-between">
													<span>Spoplatnené licencie</span>
													<strong>{paidLicenses}</strong>
												</div>
												<div className="flex items-center justify-between text-white/70">
													<span>Základ</span>
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
														<span>Dodatočná zľava za viazanosť</span>
														<span>− {formatEur(termDiscountAmount)}</span>
													</div>
												) : null}
												{paymentMode === 'upfront' && upfrontDiscountAmount > 0 ? (
													<div className="flex items-center justify-between text-emerald-300">
														<span>Zľava za platbu naraz (2%)</span>
														<span>− {formatEur(upfrontDiscountAmount)}</span>
													</div>
												) : null}
												<div className="mt-2 flex items-center justify-between text-lg">
													<span className="font-semibold">
														{paymentMode === 'upfront' ? 'Spolu za celé obdobie' : 'Spolu ročne'}
													</span>
													<span className="font-bold text-primary">
														{formatEur(paymentMode === 'upfront' ? totalDue : perYearTotal)}
													</span>
												</div>
												{teacherCount >= 1 ? (
													<p className="mt-1 text-xs text-white/60">Započítaná 1 učiteľská licencia zdarma.</p>
												) : null}
												<p className="text-xs text-white/60">
													Viazanosť {commitYears} {commitYears === 1 ? 'rok' : 'roky'}.{' '}
													{paymentMode === 'annual'
														? `Orient. spolu za celé obdobie: ${formatEur(perYearTotal * commitYears)}`
														: 'Platba naraz jednou faktúrou vrátane extra 2 % zľavy.'}
												</p>
											</div>
										</div>
									</section>

									<div className="pt-2">
										<button
											type="submit"
											className="rounded-md bg-primary px-5 py-3 font-semibold text-black shadow-glow hover:brightness-110 focus-visible:brightness-110"
										>
											Odoslať objednávku
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


