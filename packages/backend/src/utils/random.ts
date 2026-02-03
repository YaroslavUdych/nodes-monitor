// Generate a random integer between min and max (inclusive)
export function randomInt(min: number, max: number): number {
	return Math.floor(Math.random() * (max - min + 1)) + min
}

// Generate a random float between min and max with specified decimals
export function randomFloat(min: number, max: number, decimals = 1): number {
	const v = Math.random() * (max - min) + min
	const p = Math.pow(10, decimals)
	return Math.round(v * p) / p
}

// Pick a random element from an array
export function pickOne<T>(arr: readonly T[]): T {
	return arr[Math.floor(Math.random() * arr.length)]
}
