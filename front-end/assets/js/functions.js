// -----------------------------------------------------------------
// Function update title of request
function titleRequest(e) {
    let title = document.getElementById('title-option');
    title.innerHTML = e;
}

// -----------------------------------------------------------------
// Function open and close navigation
let openCloseNav = document.querySelector('.__navigations .openClose');

openCloseNav.addEventListener("click", function () {
    let navigation = document.querySelector('.__navigations');
    navigation.classList.toggle('--active');
})

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