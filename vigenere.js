/*
    CSCV337 Web Programming - Provided File
    vigenere.js 
    Notes:  You may add functions to this script to organize your code.  I've included JavaScript-based QUnit tests
    you can use to validate your implementation of the algorithm, which refer to the encrypt/decrypt functions.
    Include vigenere.js within your HTML file.
*/

function encrypt(plaintext, key) {
    if (!plaintext || !key) throw false;

    key = key.replace(/\s+/g, ""); // remove spaces in the key
    if (!/^[a-zA-Z]+$/.test(key)) throw false;

    let ciphertext = "";
    let keyIndex = 0;

    for (let i = 0; i < plaintext.length; i++) {
        let char = plaintext[i];
        let keyChar = key[keyIndex % key.length];

        if (/[a-zA-Z]/.test(char)) {
            let isUpper = char === char.toUpperCase();
            let base = isUpper ? 65 : 97;

            let charCode = char.charCodeAt(0) - base;
            let keyCode = keyChar.toLowerCase().charCodeAt(0) - 97;

            let cipherCode = (charCode + keyCode) % 26;
            ciphertext += String.fromCharCode(cipherCode + base);

            keyIndex++; // only increment for alphabetic characters
        } else {
            ciphertext += char; // keep spaces, punctuation, etc.
        }
    }

    return ciphertext;
}

function decrypt(ciphertext, key) {
    if (!ciphertext || !key) throw false;

    key = key.replace(/\s+/g, "");
    if (!/^[a-zA-Z]+$/.test(key)) throw false;

    let plaintext = "";
    let keyIndex = 0;

    for (let i = 0; i < ciphertext.length; i++) {
        let char = ciphertext[i];
        let keyChar = key[keyIndex % key.length];

        if (/[a-zA-Z]/.test(char)) {
            let isUpper = char === char.toUpperCase();
            let base = isUpper ? 65 : 97;

            let charCode = char.charCodeAt(0) - base;
            let keyCode = keyChar.toLowerCase().charCodeAt(0) - 97;

            let plainCode = (charCode - keyCode + 26) % 26;
            plaintext += String.fromCharCode(plainCode + base);

            keyIndex++;
        } else {
            plaintext += char;
        }
    }

    return plaintext;
}

function handleEncrypt() {
    const plaintext = document.getElementById("plaintext").value;
    const key = document.getElementById("key").value;
    const resultBox = document.getElementById("result");
    const errorBox = document.getElementById("error");

    try {
        const result = encrypt(plaintext, key);
        resultBox.textContent = result;
        errorBox.textContent = "";
    } catch (e) {
        resultBox.textContent = "";
        errorBox.textContent = "Encryption failed: Please provide a valid key and non-empty plaintext.";
    }
}

function handleDecrypt() {
    const ciphertext = document.getElementById("ciphertext").value;
    const key = document.getElementById("key").value;
    const resultBox = document.getElementById("result");
    const errorBox = document.getElementById("error");

    try {
        const result = decrypt(ciphertext, key);
        resultBox.textContent = result;
        errorBox.textContent = "";
    } catch (e) {
        resultBox.textContent = "";
        errorBox.textContent = "Decryption failed: Please provide a valid key and non-empty ciphertext.";
    }
}

window.addEventListener("DOMContentLoaded", function () {
    const encryptBtn = document.getElementById("encryptBtn");
    const decryptBtn = document.getElementById("decryptBtn");

    if (encryptBtn && decryptBtn) {
        encryptBtn.addEventListener("click", handleEncrypt);
        decryptBtn.addEventListener("click", handleDecrypt);
    }
});