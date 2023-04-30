const pageBg = document.querySelector('.page-bg') as HTMLElement
const buttonsContainer = document.querySelector('.page__buttons') as HTMLElement
const soundsContainer = document.querySelector('.sounds-container') as HTMLElement
const soundRange = document.querySelector('.range__input') as HTMLInputElement

interface pageContentInterface {
	id: number
	image: string
	title: string
	icon: string
	sound: string
}

const pageContent: pageContentInterface[] = [
	{
		id: 0,
		title: 'summer',
		image: 'summer-bg.jpg',
		icon: 'sun.svg',
		sound: 'summer.mp3',
	},
	{
		id: 1,
		title: 'rainy',
		image: 'rainy-bg.jpg',
		icon: 'cloud-rain.svg',
		sound: 'rain.mp3',
	},
	{
		id: 2,
		title: 'winter',
		image: 'winter-bg.jpg',
		icon: 'cloud-snow.svg',
		sound: 'winter.mp3',
	},
]

const buttonToHtml = (obj: { id: number; image: string; title: string; icon: string }): string => `
	<div id="${obj.id}" class="page__button page-button">
		<img class="page-button__img" src="./assets/${obj.image}" alt="./assets/${obj.title}" />
		<i class="page-button__icon" style="background-image: url('./assets/icons/${obj.icon}')"></i>
	</div>
`
function renderButtons(): void {
	buttonsContainer.innerHTML = pageContent.map(buttonToHtml).join('')
}
renderButtons()

const soundToHtml = (obj: { id: number; sound: string }): string => `
	<audio id="${obj.id}" class="page-sound" loop>
		<source src="./assets/sounds/${obj.sound}" type="audio/mpeg" />
	</audio>
`

function renderSounds(): void {
	soundsContainer.innerHTML = pageContent.map(soundToHtml).join('')
}
renderSounds()

function changeBg(id: number): void {
	pageBg.style.backgroundImage = `url(./assets/${pageContent[id].image})`
}

function addIconPause(id: number): void {
	Array.from(document.querySelectorAll('.page-button')).forEach(btn => {
		if (+btn.id === id) {
			btn.classList.toggle('btn-play')
		} else {
			btn.classList.remove('btn-play')
		}
	})
}

function changeSound(id: number): void {
	const sounds = document.querySelectorAll('.page-sound')
	Array.from(sounds).forEach(audio => {
		let sound = audio as HTMLAudioElement
		sound.classList.remove('pause')
		if (+sound.id === id && sound.closest('.play')) {
			sound.pause()
			sound.classList.add('pause')
			sound.classList.remove('play')
		} else if (+sound.id === id && sound.closest('.pause')) {
			sound.play()
			sound.classList.remove('pause')
		} else if (+sound.id === id) {
			sound.classList.add('play')
			sound.play()
		} else {
			sound.pause()
			sound.classList.remove('play')
		}
	})
}

buttonsContainer.addEventListener('click', (e: MouseEvent) => {
	let el = e.target as Element
	if (el.classList.contains('page-button')) {
		let id = +el.id
		changeBg(id)
		changeSound(id)
		addIconPause(id)
	}
})

function setVolume(): void {
	const sounds = document.querySelectorAll('.page-sound')
	Array.from(sounds).forEach(audio => {
		let sound = audio as HTMLAudioElement
		sound.volume = soundRange.value == '' ? 0 : +soundRange.value / 100
	})
}

soundRange.addEventListener('change', setVolume)
soundRange.addEventListener('input', setVolume)
