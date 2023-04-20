const api = 'https://us-central1-js-capstone-backend.cloudfunctions.net/api/games/l3iXqp5HTK9zVELB2slD';

// get

const getScores = async () => {
  try {
    const response = await fetch (`${api}/scores/`, {
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
    const response = await fetch (`${api}/scores/`, {
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
}

// add scores

const addScore = () => {
  const addButton = document.getElementById('add-button');
  addButton.addEventListener('click', async (event) => {
    event.preventDefault();
    const name = document.querySelector('#name').value;
    const score = document.querySelector('#score').value;
    if (name === '' || score === '') {
      return null;
    }
    await postScores({ user:name, score});
    const message = document.createElement('div');
    message.textContent = 'Saved information';
    document.body.appendChild(message);
    setTimeout(() => {
      message.remove();
    }, 3000);
    return null;
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
      gamerElement.classList.add('flex', 'gamer-name')
  
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

const  refreshButton = document.getElementById('refresh-button');
refreshButton.addEventListener('click', displayScores);

export { 
  displayScores, addScore, postScores, getScores, refreshButton,
};

/*const loadGamersAndScores = async (name, score) => {
  const scores = await fetch(`${api}/scores`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      user: name,
      score,
    }),
  });

  const result = await scores.json();
  return result;
}


const getScores = async () => {
  const scores = await fetch (`${api}/scores`);
  const result = await scores.json();
  return result;
}


const addForm = document.getElementById('add-score')
addForm.addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.querySelector('#name').value;
  const score = document.querySelector('#score').value;
  await loadGamersAndScores(name, score);
  //addScore(name, score);
  name = '';
  score = '';
});

const addScore = (score) => {
  const gamerElement = document.createElement('li');
  const idGamer = document.createElement('span');
  const nameGamer = document.createElement('p');
  const scoreGamer = document.createElement('p');
  //idGamer.textContent = `${index + 1}`;
  nameGamer.textContent = `${score.user}:`;
  scoreGamer.textContent = `${score.score}`;
  gamerElement.classList.add('flex', 'gamer-name')

  // Create the scores view section

  //gamerElement.appendChild(idGamer);
  gamerElement.appendChild(nameGamer);
  gamerElement.appendChild(scoreGamer);
}

const displayScores = (scores) => {
  const scoresList = document.getElementById('scores-list');
  scoresList.innerHTML = '';
  scores.forEach((score) => {
    const gamerElement = addScore(score);
    scoresList.appendChild(gamerElement);
  });
};

/*let scores = [];

const addScore = (name, score) => {
  if (name !== ''&& score !== '') {
    const newGamer = { name, score};
    // add the score
    scores.push(newGamer);
    // save on local storage
    localStorage.setItem('stockedScores', JSON.stringify(scores));
    // reset form values
    document.getElementById('add-score').reset();
    //displayScores();
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
        window.location.reload();
      }, 3000);
    }
  }
};
*/

/*
const displayScores = (scores) => {
  const scoresList = document.getElementById('scores-list');
  scoresList.innerHTML = '';
  scores.forEach((element, index) => {
    // Create a gamer and score element
    const gamerElement = document.createElement('li');
    const idGamer = document.createElement('span');
    const nameGamer = document.createElement('p');
    const scoreGamer = document.createElement('p');
    idGamer.textContent = `${index + 1}`;
    nameGamer.textContent = `${element.user}:`;
    scoreGamer.textContent = `${element.score}`;
    gamerElement.classList.add('flex', 'gamer-name')

    // Create the scores view section

    gamerElement.appendChild(idGamer);
    gamerElement.appendChild(nameGamer);
    gamerElement.appendChild(scoreGamer);
    scoresList.appendChild(gamerElement);
  });
};
*/

// const  refreshButton = document.getElementById('refresh-button');
// refreshButton.addEventListener('click', async () => {
//   //event.preventDefault();
//   const result = await getScores();
//   const scores = result.result.sort((a, b) => b.score - a.score);
//   displayScores(scores);
// });


/*
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
      idGamer.textContent = `${index + 1}`;
      nameGamer.textContent = `${element.name}:`;
      scoreGamer.textContent = `${element.score}`;
      gamerElement.classList.add('flex', 'gamer-name')

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
      //displayScores();
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
          window.location.reload();
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

  const  refreshButton = document.getElementById('refresh-button');
  refreshButton.addEventListener('click', (event) => {
    event.preventDefault();
    displayScores();
  });
};

export default loadGamersAndScores;
*/