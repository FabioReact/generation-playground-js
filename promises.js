// Le JS est asynchrone - Si une fonction retourne une promesse, on attendra pas sa résolution pour passer à la ligne suivante
const prendDuTemps = () => new Promise((resolve, reject) => {
	setTimeout(() => {
		if (Math.random() > 0.5) {
			resolve(["Laurent", "Godefroy", "Prettivy"])
		} else {
			reject("Oopsy, no network")
		}
	}, 3000);
})

function main() {
	console.time('chrono1')
	
	const prenoms = prendDuTemps().then(data => {
			console.log("Apres 3 secondes:", data)
		}).catch((error) => {
			console.log("Houston, we have a problem:", error)
		})
	
	// Ici, je n'ai pas accès à la donnée de ma variable prénom car cette ligne s'éxécute "trop vite"
	console.timeEnd('chrono1')
	console.log("Prenoms:", prenoms)
}

// main()

async function mainAsync() {
	try {
		console.time('chrono1')
	
		const prenoms = await prendDuTemps()

		console.timeEnd('chrono1')
		console.log("Prenoms:", prenoms)
	} catch (error) {
		console.log("Houston, we have a problem:", error)
	}
}

mainAsync()