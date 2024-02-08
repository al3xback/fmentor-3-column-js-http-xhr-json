import { sendHttpRequest } from './util.js';

const cardsEl = document.querySelector('.cards');
const cardTemplate = document.getElementById('card-template');

const URL =
	'https://gist.githubusercontent.com/al3xback/1818bcbc392fcf68d6837ac6a18692a7/raw/bb1d782ac93a4ce921536bba248431eddf462378/3-column-data.json';

const renderCardsContent = (data) => {
	const carsData = JSON.parse(data);

	for (const car in carsData) {
		carsData[car].name = car;
		const { name, image, description } = carsData[car];

		const cardTemplateNode = document.importNode(cardTemplate.content, true);
		const cardEl = cardTemplateNode.querySelector('.card');
		cardEl.classList.add('card--' + name);

		const cardImageEl = cardEl.querySelector('.card__img');
		cardImageEl.src = './images/icons/' + image;

		const cardTitleEl = cardEl.querySelector('.card__title');
		cardTitleEl.textContent = name;

		const cardDescEl = cardEl.querySelector('.card__desc');
		cardDescEl.textContent = description;

		cardsEl.appendChild(cardEl);
	}
};

sendHttpRequest('GET', URL, renderCardsContent);
