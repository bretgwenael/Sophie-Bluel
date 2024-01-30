const formEl = document.querySelector('form');

formEl.addEventListener('submit', event => {
event.preventDefault();

const formData = new FormData(formEl);
const data = Object.fromEntries(formData);

console.log(FormData);

fetch('http://localhost:5678/api/users/login', {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
}).then(res => {
    if (res.ok) {
        // Status code 200-299 indique une réponse réussie
        return res.json();
    } else {
        // Status code 400 ou 401
        throw new Error(`Erreur HTTP: ${res.status}`);
    }
})
.then(data => {
    localStorage.setItem('token', data.token);
    // Actions à effectuer en cas de succès (code 200)
    console.log(data);
    // Rediriger vers la page d'accueil
    window.location.href = 'index.html';
})
.catch(error => {
    // Actions à effectuer en cas d'erreur (code 400 ou 401)
    console.error(error);
    // Afficher un message d'erreur
    alert('Identifiant ou mot de passe incorrect.');
});
});