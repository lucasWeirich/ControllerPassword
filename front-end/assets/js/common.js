// -----------------------------------------------------------------
// Variables Globais API
const _URL_BASE = 'http://localhost:2222/';
const _HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${sessionStorage.getItem('token')}`,
};
// -----------------------------------------------------------------
// Function copy password
function copyPassword(e) {
    navigator.clipboard.writeText(e)
        .then(() => {
            alertMessage('Password copied!', '--ok');
        })
        .catch(err => {
            alertMessage(`Something went wrong: ${err}`, '--error');
        })
}

// -----------------------------------------------------------------
// Function alert messages
function alertMessage(txt, status) {
    let msgAlert = document.getElementById('alertMessage');

    msgAlert.innerText = txt;
    msgAlert.classList.add(status);
    msgAlert.classList.add('--active');

    setTimeout(() => {
        msgAlert.classList.remove(status);
        msgAlert.classList.remove('--active');
    }, 4000);
}