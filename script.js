// document.getElementById
// document.getElementsByClassName
// document.getElementsByTagName

// querySelector nous retourne le premier element qui match au sélecteur donné
// document.querySelector("button")

// querySelectorAll nous retourne tout les elements qui matchent au sélecteur donné
// document.querySelectorAll("button")

const form = document.getElementsByTagName('form')[0]
const body = document.querySelector("body")
const input = document.getElementById("search")

const typeColors = {
	normal: "#A8A878",
	fire: "#F08030",
	water: "#6890F0",
	grass: "#78C850",
	electric: "#F8D030",
	ice: "#98D8D8",
	fight: "#C03028",
	poison: "#A040A0",
	ground: "#E0C068",
	flying: "#A890F0",
	psychic: "#F85888",
	bug: "#A8B820",
	rock: "#B8A038",
	ghost: "#705898",
	dragon: "#7038F8",
	dark: "#705848",
	steel: "#B8B8D0",
}

form.addEventListener('submit', async (event) => {
	// Empeche le comportement par défaut de l'evenement - à savoir (ici) le rafraichissement de la page lors de la soumission du formulaire
	event.preventDefault()
	const searchedPokemon = input.value.toLowerCase()
	const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`)
	const data = await reponse.json()
	console.log(data)
	createCard(data)
	createStats(data.stats)
})

const createCard = (data) => {
	const pokemonCard = document.getElementById("pokemon-card")
	if (pokemonCard !== null) {
		pokemonCard.remove()
	}
	const article = document.createElement('article')
	article.id = "pokemon-card"
	article.className = "max-w-xs rounded overflow-hidden shadow-lg my-2"

	const img = document.createElement('img')
	img.classList.add('w-full')
	img.setAttribute('src', data.sprites.other['official-artwork'].front_default)
	img.setAttribute('alt', data.name)

	const mainContent = document.createElement('div')
	mainContent.className = 'px-6 py-4'

	const h3 = document.createElement('h3')
	h3.setAttribute('class', 'font-bold text-xl mb-2')
	const title = document.createTextNode(data.name)
	h3.appendChild(title)
	mainContent.appendChild(h3)

	const footer = document.createElement('footer')
	footer.className = 'px-6 py-4'

	// Bloc responsable pour la création des types
	for (const element of data.types) {
		const span = document.createElement('span')
		span.className = 'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-darker mr-2'
		span.style.backgroundColor = typeColors[element.type.name]
		const textFooter = document.createTextNode(element.type.name)
		span.appendChild(textFooter)
		footer.appendChild(span)
	}

	article.appendChild(img)
	article.appendChild(mainContent)
	article.appendChild(footer)
	body.appendChild(article)
}

const createStats = (stats) => {
	// Creation de la section
	const section = document.createElement('section')
	section.className = "bg-gray-300 p-4 rounded inline-block"

	// Création du titre 'Stats'
	const h4 = document.createElement('h4')
	const title = document.createTextNode('Stats')
	h4.append(title)

	// Création du conteneur des différentes barres de stats
	const barsContainer = document.createElement('div')
	barsContainer.className = 'flex gap-1'

	// Création de chaque barre statistique
	stats.forEach(element => {
		const singleStat = document.createElement('div')
		singleStat.className = 'single-stat'
		let blueBars = Math.round(element.base_stat / 10)
		let whiteBars = 15 - blueBars
		while (whiteBars > 0) {
			// Création d'une barre blanche
			const whiteBar = document.createElement('div')
			whiteBar.className = 'echelon w-10 h-1 mb-1 bg-white'
			singleStat.append(whiteBar)
			whiteBars = whiteBars - 1
		}
		while (blueBars > 0) {
			const blueBar = document.createElement('div')
			blueBar.className = 'echelon w-10 h-1 mb-1 bg-blue-500'
			singleStat.append(blueBar)
			blueBars--
		} 
		barsContainer.append(singleStat)

		// Creation du nom de la stat
		const spanStat = document.createElement('span')
		spanStat.className = 'text-xs inline-block w-10 text-center'
		const spanText = document.createTextNode(element.stat.name)
		spanStat.append(spanText)
		singleStat.append(spanStat)
	})

	// Ajout des elements à la section
	section.append(h4)
	section.append(barsContainer)

	// Ajout de la section au body
	body.append(section)
}


// <section class="bg-gray-300 p-4 rounded inline-block">
// 	<h4>Stats</h4>
// 	<div class="flex gap-1">
// 		<div class="single-stat">
// 			<div class="echelon w-10 h-1 mb-1 bg-white"></div>
// 			<div class="echelon w-10 h-1 mb-1 bg-white"></div>
// 			<div class="echelon w-10 h-1 mb-1 bg-white"></div>
// 			<div class="echelon w-10 h-1 mb-1 bg-white"></div>
// 			<div class="echelon w-10 h-1 mb-1 bg-white"></div>
// 			<div class="echelon w-10 h-1 mb-1 bg-white"></div>
// 			<div class="echelon w-10 h-1 mb-1 bg-white"></div>
// 			<div class="echelon w-10 h-1 mb-1 bg-white"></div>
// 			<div class="echelon w-10 h-1 mb-1 bg-white"></div>
// 			<div class="echelon w-10 h-1 mb-1 bg-white"></div>
// 			<div class="echelon w-10 h-1 mb-1 bg-blue-500"></div>
// 			<div class="echelon w-10 h-1 mb-1 bg-blue-500"></div>
// 			<div class="echelon w-10 h-1 mb-1 bg-blue-500"></div>
// 			<div class="echelon w-10 h-1 mb-1 bg-blue-500"></div>
// 			<div class="echelon w-10 h-1 mb-1 bg-blue-500"></div>
// 			<span class="text-xs inline-block w-10 text-center">HP</span>
// 		</div>
// 	</div>
// </section>