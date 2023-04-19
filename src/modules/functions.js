const loadGamersAndScores = () => {
  let scores = [];

  // load scores from local storage
  const loadScores = () => {
    if (localStorage.getItem('stockedScores')) {
      scores = JSON.parse(localStorage.getItem('stockedScores'));
    }
  };

  // display the scores

  const displayScores = () => {
    const scoresList = document.getElementById('scores-list');
    scoresList.innerHTML = '';
    scores.forEach((element, index) => {
      // Create a gamer and score element
      const gamerElement = document.createElement('li');
      const idGamer = document.createElement('span');
      const nameGamer = document.createElement('p');
      const scoreGamer = document.createElement('p');
      idGamer.textContent = `${index}`;
      nameGamer.textContent = `${element.name}`;
      scoreGamer.textContent = `${element.score};`

      // Create the scores view section

      gamerElement.appendChild(idGamer);
      gamerElement.appendChild(nameGamer);
      gamerElement.appendChild(scoreGamer);
      scoresList.appendChild(gamerElement);
    });
  };

  // add a new name and score
  const addScore = (name, score) => {
    if (name !== ''&& score !== '') {
      const newGamer = { name, score};
      // add the score
      scores.push(newGamer);
      // save on local storage
      localStorage.setItem('stockedScores', JSON.stringify(scores));
      // reset form values
      document.getElementById('add-score').reset();
      displayScores();
    } else {
      const messages = [];
      if (name === '' && score === '') {
        messages.push('Please enter the name and score.');
      } else if (name === '' && score !== '') {
        messages.push('Please enter the name');
      } else if (name !== '' && score === '') {
        messages.push('Please enter the score');
      }

      if (messages.length > 0) {
        const errorMessage = document.getElementById('error');
        errorMessage.innerText = messages.join(', ');
        setTimeout(() => {
          errorMessage.remove();
        }, 3000);
      }
    }
  };

  // load scores from local storage on page load
  window.addEventListener('load', () => {
    loadScores();
    displayScores();
  });

  const  addButton = document.getElementById('add-button');
  addButton.addEventListener('click', (event) => {
    event.preventDefault();
    const name = document.querySelector('#name').value;
    const score = document.querySelector('#score').value;
    addScore(name, score);
  });
};

export default loadGamersAndScores;