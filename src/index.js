import './style.css';

import {
	displayScores, addScore, refreshButton
} from './modules/functions.js';

displayScores();
addScore();

refreshButton.addEventListener('click', displayScores);