const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const finalMessage = document.getElementById('final-message');
const playButton = document.getElementById('play-button');
const notification = document.getElementById('notification-container');
const popup = document.getElementById('popup-container');

const figureParts = document.querySelectorAll('.figure-part');

const correctLetters = ['a'];
const wrongLetters = [];

fetchRandomWord();

function fetchRandomWord() {
    fetch('https://random-word-api.herokuapp.com/word?number=1')
        .then(res => res.json())
        .then(data => {
            const randomWord = data[0];
            //console.log(randomWord);
            displayWord(randomWord);
    });
}

function displayWord(randomWord) {
    console.log(randomWord)
    wordEl.innerHTML = `
        ${randomWord
            .split('')
            .map(letter => `
                <span class="letter">
                    ${correctLetters.includes(letter) ? letter : ''}
                </span>
            `)
            .join('')
        }
    `;
}




