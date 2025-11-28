import { ChangeEvent } from 'react';
type QuantityInputProps = {
	name: string;
	label: string;
	value: number;
	onChange: (v: number) => void;
	min: number;
	hint?: string;
	max?: number;
};

export default function QuantityInput({ name, label, value, onChange, min, hint, max }: QuantityInputProps) {
	const clamp = (val: number) => {
		if (Number.isNaN(val)) return min;
		let next = Math.max(min, val);
		if (typeof max === 'number') {
			next = Math.min(max, next);
		}
		return next;
	};

	const dec = () => onChange(clamp(value - 1));
	const inc = () => onChange(clamp(value + 1));
	const onFieldChange = (e: ChangeEvent<HTMLInputElement>) => {
		const num = Math.floor(Number(e.target.value));
		onChange(clamp(num));
	};

	return (
		<label className="text-sm">
			<span className="mb-1 block text-white/90">{label}</span>
			<div className="relative">
				<button
					type="button"
					onClick={dec}
					aria-label={`${label}: znížiť o 1`}
					className="absolute left-0.5 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-md bg-white/10 text-white hover:bg-white/15 focus-visible:bg-white/15"
				>
					−
				</button>
				<input
					name={name}
					type="number"
					min={min}
					max={max}
					value={value}
					onChange={onFieldChange}
					className="w-full rounded-md border border-white/15 bg-white/5 px-12 py-2 text-center outline-none focus-visible:ring-2 focus-visible:ring-primary"
				/>
				<button
					type="button"
					onClick={inc}
					aria-label={`${label}: zvýšiť o 1`}
					className="absolute right-0.5 top-1/2 -translate-y-1/2 grid h-8 w-8 place-items-center rounded-md bg-white/10 text-white hover:bg-white/15 focus-visible:bg-white/15"
				>
					+
				</button>
			</div>
			{hint ? <p className="mt-1 text-xs text-white/60">{hint}</p> : null}
		</label>
	);
}


