var calc = require('./calculateExpr.js');

function test(expr) {
	// console.log(expr.join(' ')+' = '+ calc(expr));
	calc(expr);
}

test([1,"+",2,"*",3]);
test([1,"+",2,"*",3,"+",5]);