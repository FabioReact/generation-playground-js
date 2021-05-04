const types = [
	{
		slot: 1,
		name: 'fire',
		url: 'https://pokeapi.co/api/v2/type/10/',
	},
	{
		slot: 2,
		name: 'flying',
		url: 'https://pokeapi.co/api/v2/type/3/',
	},
]

// Boucle While
let i = 0
while (i < types.length) {
	console.log(types[i].name)
	i++
}

// Boucle For
for (let i = 0; i < types.length; i++) {
	console.log(types[i].name)
}

// Boucle For Of
for (const element of types) {
	console.log(element.name)
}

// Boucle forEach
types.forEach(element => {
	console.log(element.name)
})

// Map, filter, some, every, includes...
