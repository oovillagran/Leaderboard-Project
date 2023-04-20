const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/l3iXqp5HTK9zVELB2slD';

// get

const getScores = async () => {
  try {
    const response = await fetch(`${api}/scores/`, {
      method: 'GET',
    });
    const responseScore = await response.json();
    return responseScore;
  } catch (error) {
    return error;
  }
};

// post

const postScores = async (score) => {
  try {
    const response = await fetch(`${api}/scores/`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(score),
    });
    const responseScore = await response.json(score);
    return responseScore;
  } catch (error) {
    return error;
  }
};

// add scores

const addScore = () => {
  const addButton = document.getElementById('add-button');
  addButton.addEventListener('click', async (e) => {
    e.preventDefault();
    const name = document.querySelector('#name').value;
    const score = document.querySelector('#score').value;
    if (name === '' || score === '') {
      return null;
    }

    await postScores({ user: name, score });
    const message = [];
    message.push('Saved information');
    if (message.length > 0) {
      const saveMessage = document.getElementById('save');
      saveMessage.innerText = message.join(', ');
      setTimeout(() => {
        saveMessage.remove();
        document.getElementById('add-score').reset();
      }, 3000);
      return null;
    }
  });
};

// display scores

const displayScores = async () => {
  try {
    const display = await getScores();
    const { result } = display;
    const scoresList = document.getElementById('scores-list');
    scoresList.innerHTML = '';
    result.sort((a, b) => b.score - a.score);
    result.forEach((element, index) => {
      const gamerElement = document.createElement('li');
      const idGamer = document.createElement('span');
      const nameGamer = document.createElement('p');
      const scoreGamer = document.createElement('p');
      idGamer.textContent = `${index + 1}`;
      nameGamer.textContent = `${element.user}:`;
      scoreGamer.textContent = `${element.score}`;
      gamerElement.classList.add('flex', 'gamer-name');

      // Create the scores view section
      gamerElement.appendChild(idGamer);
      gamerElement.appendChild(nameGamer);
      gamerElement.appendChild(scoreGamer);
      scoresList.appendChild(gamerElement);
    });
  } catch (error) {
    return error;
  }
  return null;
};

const refreshButton = document.getElementById('refresh-button');
refreshButton.addEventListener('click', displayScores);

export {
  displayScores, addScore, postScores, getScores, refreshButton,
};
