const wordEl = document.getElementById('word');
const wrongLettersEl = document.getElementById('wrong-letters');
const finalMessage = document.getElementById('final-message');
const playButton = document.getElementById('play-button');
const notification = document.getElementById('notification-container');
const popup = document.getElementById('popup-container');

const figureParts = document.querySelectorAll('.figure-part');

let randomWord = "";

const correctLetters = [''];
const wrongLetters = [];

// function fetchRandomWord() {
//     let fetchedWord;
//     fetch('https://random-word-api.herokuapp.com/word?number=1')
//         .then(res => res.json())
//         .then(data => {
//             fetchedWord = data[0];
//             //console.log(randomWord);66
//             //displayWord(randomWord);
//     });
//     return fetchedWord;
// }

fetchRandomWord();

async function fetchRandomWord() {
    const res = await fetch('https://random-word-api.herokuapp.com/word?number=1');
    const data = await res.json();
    //console.log(data)

    randomWord = data[0];
    displayWord();
}

function displayWord() {
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

    const innerWord = wordEl.innerText.replace(/\n/g,'');   // To remove the new line character
    
    if(innerWord === randomWord) {
        finalMessage.innerText = 'Congratulations! You Won!';
        popup.style.display = 'flex';
    }    
}

// Update the wrong letters 
function updateWrongLettersEl() {
    // display wrong eltters
    wrongLettersEl.innerHTML = `
        ${wrongLetters.length > 0 ? '<p>Wrong</p>' : ''}
        ${wrongLetters.map(letter => `<span>${letter}</span>`)}
    `;

    // display parts
    figureParts.forEach((part, index) => {
        const errors = wrongLetters.length;

        if(index < errors) {
            part.style.display = 'block';
        } else {
            part.style.display = 'none';
        }
    });

    //lost?
    if(wrongLetters.length === figureParts.length) {
        finalMessage.innerText = `Lost! The correct answer was '${randomWord}'`;
        popup.style.display = 'flex';
    }
}

// Show notification 
function showNotification() {
    notification.classList.add('show');
    setTimeout(() => {
        notification.classList.remove('show');
    }, 2000)
}

// Keypad letter press event 
window.addEventListener('keydown', e => {
    //console.log(e); 
    if(e.keyCode >= 65 && e.keyCode <= 90) {
        const letter = e.key;

        if(randomWord.includes(letter)) {
            if(!correctLetters.includes(letter)) {
                correctLetters.push(letter);
                displayWord();
            } else {
                showNotification();
            }
        } else {
            if(!wrongLetters.includes(letter)) {
                wrongLetters.push(letter);

                updateWrongLettersEl();
            } else {
                showNotification();
            }
        }
    }
});

// Play again event (restart)
playButton.addEventListener('click', () => {
    correctLetters.splice(0);
    wrongLetters.splice(0);

    fetchRandomWord();

    updateWrongLettersEl();

    popup.style.display = 'none';
});




