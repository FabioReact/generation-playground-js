// Fonction classique
function addition(a, b) {
	return a + b
}

// Fonction anonyme: fonction qui n'a pas de nom
(function () {
	console.log("Je suis anonyme")
})

const addition2 = function(a, b) {
	return a + b
}

const addition3 = (a, b) => {
	return a + b
}

console.log(addition(2, 3))
console.log(addition2(2, 3))
console.log(addition3(2, 3))