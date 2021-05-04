// Une High Order Function est une fonction qui prendra en paramètre une référence à autre function

const addition = (a, b) => {
	return a + b;
}

const multiplication = (a, b) => {
	return a * b;
}

// addition(5, 2);

// addition sans les parentheses est la référence à la fonction

const printResult = (a, b, fn) => {
	const result = fn(a, b)
	console.log(result)
}

printResult(5, 5, addition) // Affichera 10
printResult(5, 5, multiplication) // Affichera 25