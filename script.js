// script.js

// Global variables to control the speed of the signals and the pause between letters and words.
const timeLongMs = 500;
const timeShortMs = 100;
const timePauseAfterLetterMs = 1000;
const timePauseAfterSignalMs = 500;

/**
 * The morse code alphabet.
 */
const morseCode = {
    'A': '.-', 'B': '-...', 'C': '-.-.', 'D': '-..', 'E': '.',
    'F': '..-.', 'G': '--.', 'H': '....', 'I': '..', 'J': '.---',
    'K': '-.-', 'L': '.-..', 'M': '--', 'N': '-.', 'O': '---',
    'P': '.--.', 'Q': '--.-', 'R': '.-.', 'S': '...', 'T': '-',
    'U': '..-', 'V': '...-', 'W': '.--', 'X': '-..-', 'Y': '-.--',
    'Z': '--..',
    '1': '.----', '2': '..---', '3': '...--', '4': '....-', '5': '.....',
    '6': '-....', '7': '--...', '8': '---..', '9': '----.', '0': '-----'
};

const encryptionKey = {
    'A': 'Z', 'B': 'Y', 'C': 'X', 'D': 'W', 'E': 'V',
    'F': 'U', 'G': 'T', 'H': 'S', 'I': 'R', 'J': 'Q',
    'K': 'P', 'L': 'O', 'M': 'N', 'N': 'M', 'O': 'L',
    'P': 'K', 'Q': 'J', 'R': 'I', 'S': 'H', 'T': 'G',
    'U': 'F', 'V': 'E', 'W': 'D', 'X': 'C', 'Y': 'B',
    'Z': 'A',
    '1': '0', '2': '9', '3': '8', '4': '7', '5': '6',
    '6': '5', '7': '4', '8': '3', '9': '2', '0': '1'
};

const decryptionKey = {
    'Z': 'A', 'Y': 'B', 'X': 'C', 'W': 'D', 'V': 'E',
    'U': 'F', 'T': 'G', 'S': 'H', 'R': 'I', 'Q': 'J',
    'P': 'K', 'O': 'L', 'N': 'M', 'M': 'N', 'L': 'O',
    'K': 'P', 'J': 'Q', 'I': 'R', 'H': 'S', 'G': 'T',
    'F': 'U', 'E': 'V', 'D': 'W', 'C': 'X', 'B': 'Y',
    'A': 'Z',
    '0': '1', '9': '2', '8': '3', '7': '4', '6': '5',
    '5': '6', '4': '7', '3': '8', '2': '9', '1': '0'
};

/**
 * A very simple encryption algorithm to encrypt a string based on permutations of the alphabet.
 * 
 * @param {string} s - The string to be encrypted.
 */
function simple_encryption(s) {
    let encrypted = '';
    for (let char of s) {
        if (encryptionKey[char]) {
            encrypted += encryptionKey[char];
        } else {
            encrypted += char;
        }
    }

    return encrypted;
}

/**
 * A very simple decryption algorithm to decrypt a string based on permutations of the alphabet.
 *  
 * @param {string} s - The string to be decrypted.
 *
 * @returns 
 */
function simple_decryption(s) {
    let decrypted = '';
    for (let char of s) {
        if (decryptionKey[char]) {
            decrypted += decryptionKey[char];
        } else {
            decrypted += char;
        }
    }

    return decrypted;
}

/**
 * Gets the morse code from the query string and decrypts it.
 */
function getMorseCodeFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const code = simple_decryption(urlParams.get('morse'));

    return code;
}

/**
 * @returns {string} The output type from the query string.
 */
function getOutputTypeFromQuery() {
    const urlParams = new URLSearchParams(window.location.search);
    const output = urlParams.get('output');

    return output;
}

/**
 * Configures the client play button based on the output type from the query string.
 */
function configureClientPlayButton() {
    const output = getOutputTypeFromQuery();
    const playButton = document.querySelector('#playButton');

    if (output === 'light') {
        playButton.innerHTML = 'Play Morse Code as Light Flashes';
        playButton.onclick = displayMorseCodeLightClient;
    } else if (output === 'sound') {
        playButton.innerHTML = 'Play Morse Code as Sounds';
        playButton.onclick = playMorseCodeSoundsClient;
    } else if (output === 'vibration') {
        playButton.innerHTML = 'Play Morse Code as Vibrations';
        playButton.onclick = playMorseCodeVibrationsClient;
    }
}

/**
 * Displays the morse code translation of the input text as a sequence of light flashes.
 */
function displayMorseCodeLight() {
    const input = document.getElementById('textInput').value.toUpperCase();
    const morse_code = translateMorseCode(input);
    showLights(morse_code);
}

/**
 * Play the morse code translation of the input text as a sequence of sounds.
 */
function playMorseCodeSounds() {
    const input = document.getElementById('textInput').value.toUpperCase();
    const morse_code = translateMorseCode(input);
    playSounds(morse_code);
}

/**
 * Play the morse code translation of the input text as a sequence of vibrations.
 */
function playMorseCodeVibrations() {
    const input = document.getElementById('textInput').value.toUpperCase();
    const morse_code = translateMorseCode(input);
    vibrate(morse_code);
}

/**
 * Displays the morse code translation of the input text as a sequence of light flashes.
 */
function displayMorseCodeLightClient() {
    const input = getMorseCodeFromQuery();
    const morse_code = translateMorseCode(input);
    showLights(morse_code);
}

/**
 * Play the morse code translation of the input text as a sequence of sounds.
 */
function playMorseCodeSoundsClient() {
    const input = getMorseCodeFromQuery();
    const morse_code = translateMorseCode(input);
    playSounds(morse_code);
}

/**
 * Play the morse code translation of the input text as a sequence of vibrations.
 */
function playMorseCodeVibrationsClient() {
    const input = getMorseCodeFromQuery();
    const morse_code = translateMorseCode(input);
    vibrate(morse_code);
}

/**
 * Translates the input text to morse code and returns it as a string.
 * Each sequence of morse code characters representing a letter should be separated by a space.
 * Example: 'Hello' -> '.... . .-.. .-.. ---'
 * 
 * @param {string} input - The input text to be translated to morse code.
 * 
 * @returns {string} The morse code translation of the input text.
 */
function translateMorseCode(input) {
    let morse = '';
    for (let char of input) {
        if (morseCode[char]) {
            morse += morseCode[char] + ' ';
        } else {
            morse += ' ';
        }
    }

    return morse.trim();
}

/**
 * Shows the morse code as a sequence of light flashes.
 * 
 * @param {string} morse - The morse code to be displayed as a sequence of light flashes.
 */
async function showLights(morse) {
    const morseSequence = morse.split(' ');
    const morse_light = document.querySelector('#morse_light');

    for (let sequence of morseSequence) {
        for (let char of sequence) {
            morse_light.style.backgroundColor = 'white';

            if (char === '.') {
                await waitMs(timeShortMs);
            } else {
                await waitMs(timeLongMs);
            }

            morse_light.style.backgroundColor = 'black';

            await waitMs(timePauseAfterSignalMs);
        }

        // Wait after each letter
        await waitMs(timePauseAfterLetterMs);
    }
}

/**
 * Illustrates the morse code as a sequence of sounds.
 * 
 * @param {string} morse - The morse code to be illustrated as a sequence of sounds.
 */
async function playSounds(morse) {
    const morseSequence = morse.split(' ');

    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();

    for (let sequence of morseSequence) {
        for (let char of sequence) {
            const oscillator = audioCtx.createOscillator();
            oscillator.type = 'square';
            oscillator.frequency.setValueAtTime(440, audioCtx.currentTime);
            oscillator.connect(audioCtx.destination);        
            oscillator.start();

            if (char === '.') {
                await waitMs(timeShortMs);
            } else {
                await waitMs(timeLongMs);
            }

            oscillator.stop();

            await waitMs(timePauseAfterSignalMs);
        }

        // Wait after each letter
        await waitMs(timePauseAfterLetterMs);
    }
}

/**
 * Illustrates the morse code as a sequence of vibrations.
 * 
 * @param {string} morse - The morse code to be illustrated as a sequence of sounds.
 */
async function vibrate(morse) {
    const morseSequence = morse.split(' ');

    let pattern = [];
    for (let sequence of morseSequence) {
        for (let char of sequence) {
            if (char === '.') {
                pattern.push(timeShortMs);
            } else {
                pattern.push(timeLongMs);
            }

            pattern.push(timePauseAfterSignalMs);
        }

        // add additional waiting time after each letter
        pattern[pattern.length - 1] += timePauseAfterLetterMs;
    }

    navigator.vibrate(pattern);
}

/**
 * Generates a link to share the morse code with others.
 */
function generateLink() {
    const input = document.getElementById('textInput').value;
    const encrypted = simple_encryption(input);

    let url = window.location.href.split('?')[0];

    // remove admin.html from the url
    if (url.includes('admin.html')) {
        url = url.replace('admin.html', '');
    }

    // add the morse code to the url
    url += '?morse=' + encrypted;

    // determine which output type to use to play the morse code
    const output = document.querySelector('#outputType').value;
    url += '&output=' + output;

    // generate a QR code
    const qrCodeDiv = document.querySelector('#qrcode');
    qrCodeDiv.innerHTML = '';
    const qrCode = new QRCode(qrCodeDiv, {
        text: url,
        width: 256,
        height: 256,
        colorDark: '#000000',
        colorLight: '#ffffff',
        correctLevel: QRCode.CorrectLevel.H
    });

    // show the link as well
    const link = document.getElementById('shareLink');
    link.innerHTML = url;
}

/**
 * Small helper function to wait for a given number of milliseconds as an asynchronous operation.
 * 
 * @param {number} ms - The number of milliseconds to wait.
 */
async function waitMs(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

