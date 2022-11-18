// -----------------------------------------------------------------
// Variables Globais API
const _URL_BASE = 'http://localhost:2222/';
const _HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

function titleRequest(e) {
    let title = document.getElementById('title-option');
    title.innerHTML = e;
}

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
// Function copy password
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

// -----------------------------------------------------------------
// Function popup create
let popupCreate = document.getElementById('popupCreate');
let openPopupCreate = document.querySelectorAll('.openPopupCreate');

openPopupCreate.forEach(btn => {
    btn.addEventListener("click", function () {
        popupCreate.classList.add('--active');
    });
});

popupCreate.addEventListener("click", function (e) {
    if (e.target.id === "popupCreate") {
        popupCreate.classList.remove('--active');
    }
});

// -----------------------------------------------------------------
// Function popup edit
let popupEdit = document.getElementById('popupEdit');
let openPopupEdit = document.querySelectorAll('.openPopupEdit');

openPopupEdit.forEach(btn => {
    btn.addEventListener("click", async function () {
        if (!(document.querySelector('#content-table .--selected'))) return alertMessage('Select first service!', '--info');
        const res = await getDataUpdate();
        fillInputsEdit(res);
        popupEdit.classList.add('--active');
    });
});

popupEdit.addEventListener("click", function (e) {
    if (e.target.id === "popupEdit") {
        popupEdit.classList.remove('--active');
    }
});

// -----------------------------------------------------------------
// Function popup delete
let popupDelete = document.getElementById('popupDelete');
let openPopupDelete = document.querySelectorAll('.openPopupDelete');

openPopupDelete.forEach(btn => {
    btn.addEventListener("click", function () {
        if (!(document.querySelector('#content-table .--selected'))) return alertMessage('Select first service!', '--info');
        popupDelete.classList.add('--active');
    });
});

popupDelete.addEventListener("click", function (e) {
    if (e.target.id === "popupDelete") {
        popupDelete.classList.remove('--active');
    }
});

// -----------------------------------------------------------------
// Function cancel all popup
let closePopup = document.querySelectorAll('.__popup .--closePopup');

closePopup.forEach(btn => {
    btn.addEventListener("click", function () {
        let popupActive = document.querySelector('.__popup.--active');
        popupActive.classList.remove('--active');
    })
})

// -----------------------------------------------------------------
// Function get data for update service
async function getDataUpdate() {
    let id = document.querySelector('#content-table .--selected').id;
    let idUpdate = id.replace('service_', '');
    return (await allRequest(`services/${idUpdate}`, 'get'));
}