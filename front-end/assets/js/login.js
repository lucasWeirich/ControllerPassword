// ALL INPUTS
const _login = {
    form: document.querySelector('form#login'),
    username: document.querySelector('form#login [name="username"]'),
    password: document.querySelector('form#login [name="password"]'),
};

_login.form.addEventListener('submit', async function (e) {
    e.preventDefault();

    const dataLogin = {
        u_username: _login.username.value,
        u_password: _login.password.value,
    }

    if (validateInputs(dataLogin)) {
        const request = await fetch(`${_URL_BASE}user_login`, {
            method: 'post',
            headers: _HEADERS,
            mode: 'cors',
            body: JSON.stringify(dataLogin),
        });

        const res = await request.json();
       
        if (res.token !== undefined) {
            sessionStorage.token = res.token;
            window.location = '/front-end';
            alertMessage(res.message, '--ok');
            return;
        }
        alertMessage(res.message, '--error');
    } else {
        alertMessage('Complete todos os campos!', '--info');
        return;
    }
});

// -----------------------------------------------------------------
// CRUD - REQUEST
// -----------------------------------------------------------------

// -----------------------------------------------------------------
// Function validate inputs
function validateInputs(inputs) {
    let aux = true;

    for (let i in inputs) {
        if (inputs[i] === undefined || inputs[i] === '' || inputs[i] === null) {
            aux = false;
        }
    }
    return aux;
}