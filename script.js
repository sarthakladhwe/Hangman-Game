const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const finalMessage = document.getElementById('final-message');
const playButton = document.getElementById('play-button');
const notification = document.getElementById('notification-container');
const popup = document.getElementById('popup-container');

const figureParts = document.querySelectorAll('.figure-part');

let randomWord;

const correctLetters = ['a'];
const wrongLetters = [];

fetch('https://random-word-api.herokuapp.com/word?number=1')
.then(res => res.json())
.then(data => {
    randomWord = data[0];
    //console.log(randomWord);
});

function displayWord() {
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

displayWord();




