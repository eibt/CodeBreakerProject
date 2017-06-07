let answer = document.getElementById('answer');
let attempt = 0;

function guess() {
    if (!validateInput(input.value)) {
      return false;
    } else {
      attempt = attempt + 1;
    }
    let input = document.getElementById('user-guess');
    if (answer.value === '' && attempt === 0) setHiddenFields();
    let isMatch = getResults(input.value);
    if (isMatch) {
      setMessage('You Win! :)');
      showAnswer(true);
      showReplay();
    } else if (!isMatch && attempt >= 10) {
      setMessage('You Lose! :(');
      showAnswer(false);
      showReplay();
    } else {
      setMessage('Incorrect, try again.');
    }
}

function setHiddenFields() {
  randomAnswer = Math.floor(Math.random() * 1000).toString();

  while (randomAnswer.length < 4) {
    randomAnswer = '0' + randomAnswer;
  }
  answer.value = randomAnswer;
  attempt = 0;
}

function setMessage(message) {
  document.getElementById('message').innerHTML = message;
}

function validateInput(input) {
  if (input.length === 4) {
    return true;
  }
  setMessage('Guesses must be exactly 4 characters long.');
  return false;
}

function getResults(input) {
  let results = document.getElementById('results');
  let row = '<div class="row"><span class="col-md-6">' + input + '</span>';

  let nCorrect = 0;
  for (let i = 0; i < 4; i++) {
    if (input[i] === answer.value[i]) {
      row += '<span class="glyphicon glyphicon-ok"></span>';
      nCorrect++;
    } else if (answer.value.search(input[i]) > -1) {
      row += '<span class="glyphicon glyphicon-transfer"></span>';
    } else {
      row += '<span class="glyphicon glyphicon-remove"></span>';
    }
  }
  
  row += '<div class="col-md-6">';
  results.innerHTML += row;

  if (nCorrect === answer.value.length) return true;
  return false; 
}

function showAnswer(success) {
  let codeLabel = document.getElementById('code');
  codeLabel.innerHTML = answer.value;

  if (success) {
    codeLabel.className += ' success';
  } else {
    codeLabel.className += ' failure';
  }
}

function showReplay() {
  document.getElementById('guessing-div').style.display = 'none';
  document.getElementById('replay-div').style.display = 'block';
}
