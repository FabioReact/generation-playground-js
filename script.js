// document.getElementById
// document.getElementsByClassName
// document.getElementsByTagName

// querySelector nous retourne le premier element qui match au sélecteur donné
// document.querySelector("button")

// querySelectorAll nous retourne tout les elements qui matchent au sélecteur donné
// document.querySelectorAll("button")

const forms = document.getElementsByTagName('form')
const body = document.querySelector('body')
const main = document.querySelector('main')

const typeColors = {
	normal: '#A8A878',
	fire: '#F08030',
	water: '#6890F0',
	grass: '#78C850',
	electric: '#F8D030',
	ice: '#98D8D8',
	fight: '#C03028',
	poison: '#A040A0',
	ground: '#E0C068',
	flying: '#A890F0',
	psychic: '#F85888',
	bug: '#A8B820',
	rock: '#B8A038',
	ghost: '#705898',
	dragon: '#7038F8',
	dark: '#705848',
	steel: '#B8B8D0',
}

for (const form of forms) {
	form.addEventListener('submit', async event => {
		// Empeche le comportement par défaut de l'evenement - à savoir (ici) le rafraichissement de la page lors de la soumission du formulaire
		try {
			event.preventDefault()
			removeCard()
			// Ici, supprimer le message d'erreur précédent
			const errorElement = document.getElementById("error")
			errorElement?.remove()
			const input = document.getElementById(`search-${form.dataset.form}`)
			const searchedPokemon = input.value.toLowerCase()
			const reponse = await fetch(`https://pokeapi.co/api/v2/pokemon/${searchedPokemon}`)
			console.log(reponse)
			if (reponse.status === 404) {
				throw new Error("Désolé cher dresseur, ce pokémon n'existe pas à notre connaissance...")
			} else {
				const data = await reponse.json()
				const card = createCard(data)
				const stats = createStats(data.stats)
				const section = document.querySelector(`[data-section="${form.dataset.form}"]`)
				section.append(card)
				section.append(stats)
			}
		} catch (error) {
			const pError = document.createElement('p')
			pError.id = "error"
			pError.className = "bg-red-500 text-white self-center px-4 rounded"
			const errorText = document.createTextNode(error.message)
			pError.appendChild(errorText)
			main.appendChild(pError)
		}
		// #region Chain
		// const evolutionChainReponse = await fetch(data.species.url)
		// const evolutionChainData = await evolutionChainReponse.json()
		// const evolutionReponse = await fetch(evolutionChainData.evolution_chain.url)
		// const evolutionData = await evolutionReponse.json()
		// let next = evolutionData.chain
		// while (next !== null) {
		// 	console.log(next.species.name)
		// 	if (next.evolves_to.length > 0) {
		// 		next = next.evolves_to[0]
		// 	} else {
		// 		next = null
		// 	}
		// }
		// #endregion
	})
}


const removeCard = () => {
	const pokemonCard = document.getElementById('pokemon-card')
	if (pokemonCard !== null) {
		pokemonCard.remove()
	}
	document.getElementById("poke-stats")?.remove()
}

const createCard = data => {
	const article = document.createElement('article')
	article.id = 'pokemon-card'
	article.className = 'max-w-xs rounded overflow-hidden shadow-lg my-2'

	const img = document.createElement('img')
	img.classList.add('w-full')
	img.setAttribute('src', data.sprites.other['official-artwork'].front_default)
	img.setAttribute('alt', data.name)

	const mainContent = document.createElement('div')
	mainContent.className = 'px-6 py-4'

	// Pokemon Name
	const h3 = document.createElement('h3')
	h3.setAttribute('class', 'font-bold text-xl mb-2 capitalize text-center')
	const title = document.createTextNode(data.name)
	h3.appendChild(title)
	mainContent.appendChild(h3)

	// Description
	const weightP = document.createElement('p')
	const heightP = document.createElement('p')
	weightP.className = "text-sm my-2"
	heightP.className = "text-sm my-2"
	const weightText = document.createTextNode(`Weight: ${data.weight / 10}kg`)
	const heightText = document.createTextNode(`Height: ${data.height * 10}cm`)
	weightP.append(weightText)
	heightP.append(heightText)
	mainContent.appendChild(weightP)
	mainContent.appendChild(heightP)



	const footer = document.createElement('footer')
	footer.className = 'px-6 py-4'

	// Bloc responsable pour la création des types
	for (const element of data.types) {
		const span = document.createElement('span')
		span.className =
			'inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-darker mr-2'
		span.style.backgroundColor = typeColors[element.type.name]
		const textFooter = document.createTextNode(element.type.name)
		span.appendChild(textFooter)
		footer.appendChild(span)
	}

	article.appendChild(img)
	article.appendChild(mainContent)
	article.appendChild(footer)
	return article
}

const createStats = stats => {
	// Creation de la section
	const section = document.createElement('section')
	section.id = "poke-stats"
	section.className = 'bg-gray-300 p-4 rounded self-start w-80'

	// Création du titre 'Stats'
	const h4 = document.createElement('h4')
	const title = document.createTextNode('Stats')
	h4.append(title)

	// Création du conteneur des différentes barres de stats
	const barsContainer = document.createElement('div')
	barsContainer.className = 'flex justify-between'

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
		spanStat.className = 'text-xs self-start w-10 text-center block'
		const spanText = document.createTextNode(element.stat.name)
		spanStat.append(spanText)
		singleStat.append(spanStat)
	})

	// Ajout des elements à la section
	section.append(h4)
	section.append(barsContainer)

	return section
}