import { sendHttpRequest } from './util.js';

const URL =
	'https://gist.githubusercontent.com/al3xback/1818bcbc392fcf68d6837ac6a18692a7/raw/4fa57c98f6027cd3365a0bde3e111366cef62de1/3-column-data.json';

const cardsWrapperEl = document.querySelector('.cards-wrapper');
const cardsEl = document.querySelector('.cards');
const cardTemplate = document.getElementById('card-template');
const loadingEl = document.querySelector('.loading');

const removeLoading = () => {
	loadingEl.parentElement.removeChild(loadingEl);
};

const handleError = (msg) => {
	removeLoading();

	const errorEl = document.createElement('p');
	errorEl.className = 'error';
	errorEl.textContent = msg;

	cardsWrapperEl.prepend(errorEl);
};

const renderCardsContent = (data) => {
	const carsData = JSON.parse(data);

	removeLoading();

	for (const car in carsData) {
		carsData[car].name = car;
		const { name, image, description } = carsData[car];

		const cardTemplateNode = document.importNode(
			cardTemplate.content,
			true
		);
		const cardEl = cardTemplateNode.querySelector('.card');
		cardEl.classList.add('card--' + name);

		const cardTitleEl = cardEl.querySelector('.card__title');
		cardTitleEl.textContent = name;

		const cardDescEl = cardEl.querySelector('.card__desc');
		cardDescEl.textContent = description;

		const cardImageEl = cardEl.querySelector('.card__img');
		cardImageEl.src = './images/icons/' + image;

		cardsEl.appendChild(cardTemplateNode);
	}
};

sendHttpRequest('GET', URL, renderCardsContent, handleError);
