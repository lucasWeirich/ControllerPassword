// -----------------------------------------------------------------
// VARIABLES GLOBAIS
const _bodyTable = document.getElementById('content-table');
// ALL INPUTS
const _create = {
    form: document.querySelector('form#create'),
    name: document.querySelector('form#create [name="name"]'),
    username: document.querySelector('form#create [name="username"]'),
    password: document.querySelector('form#create [name="password"]'),
    host: document.querySelector('form#create [name="host"]'),
    type: document.querySelector('form#create [name="type"]'),
    favorite: 1,
};
const _edit = {
    form: document.querySelector('form#edit'),
    id: document.querySelector('form#edit [name="id"]'),
    name: document.querySelector('form#edit [name="name"]'),
    username: document.querySelector('form#edit [name="username"]'),
    password: document.querySelector('form#edit [name="password"]'),
    host: document.querySelector('form#edit [name="host"]'),
    type: document.querySelector('form#edit [name="type"]'),
    modified: document.querySelector('form#edit [name="modified"]'),
    favorite: 1,
};
const _search = {
    form: document.querySelector('form#search'),
    data: document.querySelector('form#search [name="search"]'),
}

// -----------------------------------------------------------------
// Function for to do all request for db.json
async function allRequest(route, method, body) {
    const request = await fetch(`${_URL_BASE}${route}`, {
        method,
        header: _HEADERS,
        body,
    });
    return await request.json();
}

// -----------------------------------------------------------------
// Function create HTML of table body
function createTable(res) {
    _bodyTable.innerHTML = '';

    res.forEach(item => {
        _bodyTable.innerHTML += `
            <tr id="service_${item.id}">
                <td id="fav_${item.id}" class="td_favorite ${item.favorite === 1 ? '--favorited' : ''}"></td>
                <td>${item.name}</td>
                <td>${item.username}</td>
                <td>${item.password}</td>
                <td>${item.host}</td>
                <td>${item.type}</td>
                <td>${item.modified.substring(0, 10)}</td>
            </tr>
        `;
    });
}

// -----------------------------------------------------------------
// Function select service
function selectService() {
    const _services = document.querySelectorAll('table tbody#content-table tr');

    _services.forEach(service => {
        service.addEventListener('click', function () {
            if (this.className === '--selected') {
                this.classList.remove('--selected');
                return;
            }

            _services.forEach((item) => {
                item.classList.remove('--selected');
            })

            this.classList.add('--selected');
        });
    });
    updateFavorite();
}

// -----------------------------------------------------------------
// Function update favorite of service
function updateFavorite() {
    let favorites = document.querySelectorAll('table tbody#content-table .td_favorite');

    favorites.forEach(fav => {
        fav.addEventListener("click", async function () {
            let id = this.id;
            let idFavorite = id.replace('fav_', '');

            let body = {
                favorite: fav.className.includes('--favorited') ? 0 : 1
            }

            const res = await allRequest(`services_favorites/${idFavorite}`, 'put', JSON.stringify(body));
            console.log(res)
        })
    })
}

// -----------------------------------------------------------------
// CRUD - REQUEST
// -----------------------------------------------------------------

// -----------------------------------------------------------------
// Function return object with data for request 
function createObjectData(e) {
    let date = new Date();
    let day = date.getDate();
    let month = date.getMonth();
    let year = date.getFullYear();

    return ({
        name: e.name.value,
        username: e.username.value,
        password: e.password.value,
        host: e.host.value,
        type: e.type.value,
        modified: `${year}-${month}-${day}`
    })
}

// -----------------------------------------------------------------
// Function validate inputs
function validadeInputs(inputs) {
    let aux = true;

    for (let i in inputs) {
        if (inputs[i] === undefined || inputs[i] === '' || inputs[i] === null) {
            aux = false;
        }
    }
    return aux;
}

// -----------------------------------------------------------------
// Function create service
_create.form.addEventListener('submit', async function (e) {
    e.preventDefault();

    let newService = createObjectData(_create);
    console.log(newService)

    if (validadeInputs(newService)) {
        const res = await allRequest('services', 'patch', JSON.stringify(newService));
        console.log(res);
    } else {
        alert("CAMPO VAZIO!!!")
    }
    updateAll();
});

// -----------------------------------------------------------------
// Function search service
_search.form.addEventListener('submit', async function (e) {
    e.preventDefault();
    let data = _search.data.value;

    if (!(data === '')) {
        const res = await allRequest(`services_search/${data}`, 'get');
        createTable(res);
    }
    updateAll();
})

// -----------------------------------------------------------------
// Function all favorites service
async function allFavorites() {
    const res = await allRequest(`services_favorites`, 'get');
    createTable(res);
    updateAll();
}

// -----------------------------------------------------------------
// Function fill data for update service
function fillInputsEdit(e) {
    _edit.id.value = e.id;
    _edit.name.value = e.name;
    _edit.username.value = e.username;
    _edit.password.value = e.password;
    _edit.host.value = e.host;
    _edit.type.value = e.type;
    _edit.modified.value = e.modified.substring(0, 10);
}

// -----------------------------------------------------------------
// Function update service
_edit.form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (validadeInputs(_edit)) {
        let serviceUpdate = JSON.stringify(createObjectData(_edit));
        const res = await allRequest(`services/${_edit.id.value}`, 'put', serviceUpdate);
        console.log(res)
    }
    updateAll();
})

// -----------------------------------------------------------------
// Function delete service
async function deleteService() {
    let id = document.querySelector('#content-table .--selected').id;
    let idDelete = id.replace('service_', '');
    const res = await allRequest(`services/${idDelete}`, 'delete');
    console.log(res);
    updateAll();
}

// -----------------------------------------------------------------
// Function update all
async function updateAll() {
    selectService();
}

// -----------------------------------------------------------------
// Function initialized of page
async function initialized() {
    const res = await allRequest('services', 'get');
    createTable(res);
    selectService();
}

// -----------------------------------------------------------------
// Initialized Page
initialized();