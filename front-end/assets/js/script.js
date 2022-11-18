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
    type: document.querySelector('form#create [name="type"]')
};
const _edit = {
    form: document.querySelector('form#edit'),
    id: document.querySelector('form#edit [name="id"]'),
    name: document.querySelector('form#edit [name="name"]'),
    username: document.querySelector('form#edit [name="username"]'),
    password: document.querySelector('form#edit [name="password"]'),
    host: document.querySelector('form#edit [name="host"]'),
    type: document.querySelector('form#edit [name="type"]'),
    modified: document.querySelector('form#edit [name="modified"]')
};
const _search = {
    form: document.querySelector('form#search'),
    data: document.querySelector('form#search [name="search"]'),
}

// -----------------------------------------------------------------
// Function for to do all request for db.json
async function allRequest(route, _method, body) {
    const request = await fetch(`${_URL_BASE}${route}`, {
        method: _method,
        header: _HEADERS,
        mode: 'cors',
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
            <tr id="service_${item.s_id}">
                <td id="fav_${item.s_id}" class="td_favorite ${item.s_favorite === 1 ? '--favorited' : ''}"></td>
                <td>${item.s_name}</td>
                <td>${item.s_username}</td>
                <td class="--copy" onclick="copyPassword('${item.s_password}')">${item.s_password}</td>
                <td>${item.s_host}</td>
                <td>${item.s_type}</td>
                <td>${item.s_modified.substring(0, 10)}</td>
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
                s_favorite: fav.className.includes('--favorited') ? 0 : 1
            }

            const res = await allRequest(`services_favorites/${idFavorite}`, 'put', JSON.stringify(body));
            this.classList.toggle('--favorited');
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
    let month = Number(date.getMonth() + 1);
    let year = date.getFullYear();

    return ({
        s_name: e.name.value,
        s_username: e.username.value,
        s_password: e.password.value,
        s_host: e.host.value,
        s_type: e.type.value,
        s_modified: `${year}-${month}-${day}`
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

    if (validadeInputs(newService)) {
        const res = await allRequest('services', 'POST', JSON.stringify(newService));
        alertMessage(res.message, '--ok');
    } else {
        alertMessage('Complete todos os campos!', '--info');
        return;
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
    selectService();
})

// -----------------------------------------------------------------
// Function all favorites service
async function allFavorites() {
    const res = await allRequest(`services_favorites`, 'get');
    createTable(res);
    selectService();
    titleRequest('All Favorites');
}

// -----------------------------------------------------------------
// Function fill data for update service
function fillInputsEdit(e) {
    _edit.id.value = e.s_id;
    _edit.name.value = e.s_name;
    _edit.username.value = e.s_username;
    _edit.password.value = e.s_password;
    _edit.host.value = e.s_host;
    _edit.type.value = e.s_type;
    _edit.modified.value = e.s_modified.substring(0, 10);
}

// -----------------------------------------------------------------
// Function update service
_edit.form.addEventListener('submit', async function (e) {
    e.preventDefault();

    if (validadeInputs(_edit)) {
        let serviceUpdate = JSON.stringify(createObjectData(_edit));
        const res = await allRequest(`services/${_edit.id.value}`, 'put', serviceUpdate);
        alertMessage(res.message, '--ok');
    }
    updateAll();
})

// -----------------------------------------------------------------
// Function delete service
async function deleteService() {
    let id = document.querySelector('#content-table .--selected').id;
    let idDelete = id.replace('service_', '');
    const res = await allRequest(`services/${idDelete}`, 'delete');
    alertMessage(res, '--ok');
    updateAll();
}

// -----------------------------------------------------------------
// Function filter services with type
async function filterType(type) {
    const res = await allRequest(`services_type/${type}`, 'get');
    createTable(res);
    selectService();
    titleRequest(`Filter by Type: <span style="text-transform: uppercase; margin-left: 10px">${type}</span>`);
}

// -----------------------------------------------------------------
// Function update all
async function updateAll() {
    let popupActive = document.querySelector('.__popup.--active');
    let inputs = document.querySelectorAll('input:not([type=submit])');

    if (popupActive) popupActive.classList.remove('--active');
    inputs.forEach(i => i.value = '')
    initialized();
}

// -----------------------------------------------------------------
// Function initialized of page
async function initialized() {
    const res = await allRequest('services', 'get');
    createTable(res);
    selectService();
    titleRequest('All Items');
}

// -----------------------------------------------------------------
// Initialized Page
initialized();