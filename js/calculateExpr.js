module.exports = function(expr) {
	let i = 0;
	console.log(expr);
	while(i < expr.length) {
		if (expr[i] === "*") {
			const [left,_,right] = expr.splice(i-1, 3);
			if (typeof left === "undefined" || typeof right === "undefined") {
				i++;
				continue;
			}
			const res = left*right;
			expr.splice(i-1,0,res);
			i--;
			console.log(expr, i);
		}
		if (expr[i] === "/") {
			const [left,_,right] = expr.splice(i-1, 3);
			if (typeof left === "undefined" || typeof right === "undefined") {
				i++;
				continue;
			}
			const res = left/right;
			expr.splice(i-1,0,res);
			i--;
			console.log(expr, i);
		}
		i++;
	}
	i = 0;
	while(i < expr.length) {
		// console.log(i);
		if (expr[i] === "+") {
			const [left,_,right] = expr.splice(i-1, 3);
			if (typeof left === "undefined" || typeof right === "undefined") {
				i++;
				continue;
			}
			const res = left+right;
			expr.splice(i-1,0,res);
			i--;
			console.log(expr, i);
		}
		if (expr[i] === "-") {
			const [left,_,right] = expr.splice(i-1, 3);
			if (typeof left === "undefined" || typeof right === "undefined") {
				i++;
				continue;
			}
			const res = left-right;
			expr.splice(i-1,0,res);
			i--;
			console.log(expr, i);
		}
		i++;
	}
	return expr[0];
}