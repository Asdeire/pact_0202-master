function gcd(a, b) {
    return b === 0 ? a : gcd(b, a % b);
}

function modInverse(a, m) {
    for (let i = 0; i < m; i++) {
        if ((a * i) % m === 1) {
            return i;
        }
    }
    return 1;
}

function generateKeys() {
    const p = 61;
    const q = 53;
    const n = p * q;
    const phi = (p - 1) * (q - 1);
    let e = 17;
    let d = modInverse(e, phi);
    return { publicKey: { n, e }, privateKey: { n, d } };
}

function encrypt(message, publicKey) {
    const { n, e } = publicKey;
    return message.split('').map(char => {
        const charCode = char.charCodeAt(0);
        const encryptedChar = BigInt(Math.pow(charCode, e) % n);
        return encryptedChar.toString();
    }).join(' ');
}

const keys = generateKeys();
const publicKey = keys.publicKey;
const privateKey = keys.privateKey;

const originalMessage = 'Hello, RSA!';
const encryptedMessage = encrypt(originalMessage, publicKey);

const outputElement = document.getElementById('output');
outputElement.innerHTML = `
      <p>Original Message: ${originalMessage}</p>
      <p>Encrypted Message: ${encryptedMessage}</p>
`;


