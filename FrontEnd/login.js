localStorage.removeItem("token")
document.getElementById('login').style.fontWeight = 'bold'

document.querySelector('form').addEventListener('submit', function (event) {
    event.preventDefault()
    const mail = JSON.stringify(document.getElementById('email').value)
    const mdp = JSON.stringify(document.getElementById('mdp').value)
    fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: { "Content-Type": "application/json" },
        body: '{"email":' + mail + ', "password":' + mdp + '}'
    })
        .then((response) => response.json())
        .then((data) => {
            if (data.userId == 1) {
                localStorage.setItem("token", data.token)
                window.location.assign("index.html")
            } else {
                alert(`Erreur dans l'identifiant ou le mot de passe`)
            }
        })
})