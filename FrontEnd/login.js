const formLog = document.getElementById('formLogin');

formLog.addEventListener('submit', event => {
event.preventDefault();

const formData = new FormData(formLog);
const data = Object.fromEntries(formData);

console.log(data);

fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
}).then(res => {
    if (res.status === 200) {
        return res.json();
    } else if (res.status === 401 || res.status === 404) {
       document.querySelector('.errorMessage').style.display = 'block';

    };
})
.then(data => {
    if(data) {
    sessionStorage.setItem('token', data.token);
    // Actions à effectuer en cas de succès (code 200)
    console.log(data);
    // Rediriger vers la page d'accueil
    window.location.replace('index.html');
    }
})
.catch(error => {
    // Actions à effectuer en cas d'erreur (code 400 ou 401)
    console.error(error);
});
});