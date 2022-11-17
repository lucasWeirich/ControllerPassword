// -----------------------------------------------------------------
// Variables Globais API
const _URL_BASE = 'http://localhost:3000/';
const _HEADERS = {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
};

// -----------------------------------------------------------------
// Function copy password
function copyPassword(e) {
    navigator.clipboard.writeText(e.innerHTML)
        .then(() => {
            console.log("Password copied...")
        })
        .catch(err => {
            console.log('Something went wrong', err);
        })
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