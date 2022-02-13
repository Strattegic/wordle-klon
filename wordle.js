const word = words[Math.floor(Math.random()*words.length)]

const guesses = document.getElementById('guesses')
const rows = guesses.getElementsByClassName('row')
const maxGuesses = rows.length

const currentGuess = []
let currentRow = 0

function initKeyboard() {
    const keyboardChars = [
        ['q', 'w', 'e', 'r', 't', 'z', 'u', 'i', 'o', 'p'],
        ['a', 's', 'd', 'f', 'g', 'h', 'j', 'k', 'l'],
        ['ENTER', 'y', 'x', 'c', 'v', 'b', 'n', 'm', 'LÖSCHEN'],
    ]

    const keyboard = document.getElementById('keyboard')

    let keyboardHtml = ''
    keyboardChars.forEach(charsArray => {
        keyboardHtml += '<div class="row">'
        charsArray.forEach(char => {
            keyboardHtml += `<button onclick="buttonClicked('${char}')">${char.toUpperCase()}</button>`
        })
        keyboardHtml += '</div>'
    })


    keyboard.innerHTML = keyboardHtml
}

initKeyboard()

function buttonClicked(char) {
    if (char === 'LÖSCHEN') {
        currentGuess.pop()
    } else if (char !== 'ENTER' && currentGuess.length < 5) {
        currentGuess.push(char)
    } else if (char === 'ENTER' && currentGuess.length === 5) {
        colorRow()
        if (word === currentGuess.join('').toLowerCase()) {
            gameOver(true)
        } else if (currentRow + 1 >= maxGuesses) {
            gameOver(false)
        } else {
            currentRow++
            currentGuess.splice(0, currentGuess.length)
        }
    }

    updateGame()
}

function updateGame() {
    const divs = rows[currentRow].getElementsByTagName('div')

    for (let i = 0; i < divs.length; i++) {
        divs[i].innerHTML = currentGuess[i] ?? ''
    }
}

function colorRow() {
    const divs = rows[currentRow].getElementsByTagName('div')

    const wordChars = word.split('')
    currentGuess.forEach((char, index) => {
        if (char === wordChars[index]) {
            divs[index].classList.add('correct')
        } else if (word.indexOf(char) > 0) {
            divs[index].classList.add('included')
        } else {
            divs[index].classList.add('incorrect')
        }
    })
}

function gameOver(won) {
    const keyboard = document.getElementById('keyboard')
    const buttons = keyboard.getElementsByTagName('button')
    Array.from(buttons).forEach(button => {
        button.setAttribute('disabled', true)
    })

    const gameOverElement = document.getElementById('gameOver')
    if (won) {
        gameOverElement.innerHTML = `Ultra! Du hast das Wort "${word}" in ${currentRow + 1} Versuchen erraten.`
    } else {
        gameOverElement.innerHTML = `Das war leider nix :(`
    }
}