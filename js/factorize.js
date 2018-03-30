function getPrimes(maxValue) {
	let res = [];
	let table = [];
	for (let i = 2; i <=maxValue; i++) {
		table[i]=true;
	}
	table[0] = false;
	table[1] = false;
	for (let i = 2; i <= maxValue; i++) {
		if (!table[i]) continue;
		res.push(i);
		for (let k = 2; k*i <= maxValue; k++)
			table[k*i] = false;
	}
	return res;
}
function isPrime(n) {
	if (n <= 1) return false;
	if (n == 2 || n == 3) return true;
	if (n % 2 == 0 || n % 3 == 0) return false;
	const sqrt = Math.sqrt(n);
	for (let k = 5;k <= sqrt; k+=6) {
		if (n % k == 0 || n % (k+2) == 0)
			return false;
	}
	return true;
}
function factorize(n) {
	if (n < 0) throw new Exception("Cannot factorize negative number");
	if (n <= 1) return [{divisor: n, power: 1}];
	let primes = getPrimes((Math.sqrt(n)+1) | 0);
	let divisors = new Map();

	primes.forEach(p=>{
		while (n % p ==0) {
			divisors.set(p, divisors.has(p) ? divisors.get(p)+1 : 1);
			n /= p;
		}
	})
	if (n > 1) {
		divisors.set(n, 1);
	}
	let resDivisors = [];
	divisors.forEach((k,v)=>{
		resDivisors.push({divisor: v, power: k});
	})
	return resDivisors;
}
function factorizeString(n) {
	if (Math.abs(n - Math.floor(n)) > 1e-8) return factorizeString(Math.floor(n));
	if (n < 0) return "-("+factorizeString(-n)+")";
	if (n == 0) return "0";
	if (n == 1) return "1";
	let resDivisors = factorize(n);
	if (resDivisors.length == 1) {
		let {divisor: v,power: k} = resDivisors[0];
		return k == 1 ? `${v}` : `${v}^${k}`;
	}
	return resDivisors.map(({divisor: v,power: k})=>{
		return k == 1 ? `${v}` : `(${v}^${k})`;
	}).join("*");
}
module.exports = {
	factorizeString: factorizeString,
	factorize: factorize,
	isPrime: isPrime,
	getPrimes: getPrimes,
}