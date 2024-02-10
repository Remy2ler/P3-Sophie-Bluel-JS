document.getElementById('index').style.fontWeight = 'bold'

const reponse = await fetch("http://localhost:5678/api/works")
const works = await reponse.json()
const sectionGallery = document.querySelector(".gallery")
const modale = document.getElementById("modalBody")
const titre = document.createElement("p")
const btnModale = document.createElement("button")

function genererTravaux(travaux) {
    sectionGallery.innerHTML = ""
    for (let i = 0; i < travaux.length; i++) {
        const article = travaux[i]
        const travail = document.createElement("figure")
        const imageTravail = document.createElement("img")
        imageTravail.src = article.imageUrl
        const descriptionTravail = document.createElement("figcaption")
        descriptionTravail.innerText = article.title

        sectionGallery.appendChild(travail)
        travail.appendChild(imageTravail)
        travail.appendChild(descriptionTravail)
        travail.id = article.id
    }
}

async function ouvrirGallerieModale() {
    btnModale.disabled = false
    document.getElementById("btnRetour").style.display = "none"

    const divModulable = document.createElement("div")
    divModulable.id = "divModulable"
    const reponse = await fetch("http://localhost:5678/api/works")
    const works = await reponse.json()
    modale.innerHTML = ""
    titre.innerText = "Galerie photo"
    modale.appendChild(titre)
    modale.appendChild(divModulable)
    for (let i = 0; i < works.length; i++) {
        const article = works[i]
        const travail = document.createElement("figure")
        const lienSuppr = document.createElement("a")
        lienSuppr.innerHTML = '<i class="fa-solid fa-trash-can"></i>'
        const imageTravail = document.createElement("img")
        imageTravail.src = article.imageUrl

        divModulable.appendChild(travail)
        travail.appendChild(imageTravail)
        travail.appendChild(lienSuppr)
        travail.id = article.id
    }
    btnModale.innerText = "Ajouter une photo"
    modale.appendChild(btnModale)
    const btnFermer = document.getElementById('croixModale')
    document.getElementById('modal').style.display = null
    document.querySelectorAll('div figure a i').forEach(function (i) {
        i.addEventListener('click', async function (e) {
            const cibleID = (e.target.parentElement.parentElement).id
            fetch(`http://localhost:5678/api/works/${cibleID}`, {
                method: 'DELETE',
                headers: {
                    'Authorization': `Bearer ${localStorage.getItem('token')}`,
                }
            })
            const reponse = await fetch("http://localhost:5678/api/works")
            const works = await reponse.json()
            genererTravaux(works)
            ouvrirGallerieModale()
        })
    })
    document.getElementById('modal').addEventListener('click', fermerModale)

    modale.addEventListener('click', function (e) {
        stopPropag(e)
    })

    btnFermer.addEventListener('click', fermerModale)
    btnModale.addEventListener('click', ouvrirAjoutModale)
}
async function envoyerProjet() {
    const formData = new FormData()
    formData.append('image', document.getElementById('ajoutPhoto').files[0])
    formData.append('title', document.getElementById('titreAjout').value)
    formData.append('category', parseInt(document.getElementById('categorieAjout').value))

    fetch('http://localhost:5678/api/works', {
        method: 'POST',
        headers: {
            'Authorization': `Bearer ${localStorage.getItem('token')}`
        },
        body: formData,
    })
        .then(async function () {
            const reponse = await fetch("http://localhost:5678/api/works")
            const works = await reponse.json()
            genererTravaux(works)
            fermerModale()
        })
}

function ouvrirAjoutModale() {
    document.getElementById("btnRetour").style.display = null
    document.getElementById("btnRetour").addEventListener('click', function (e) {
        stopPropag(e)
    })
    document.getElementById("btnRetour").addEventListener('click', function () {
        btnModale.removeEventListener('click', envoyerProjet)
        ouvrirGallerieModale()
    })

    const divModulable = document.getElementById("divModulable")
    btnModale.removeEventListener('click', ouvrirAjoutModale)

    titre.innerText = "Ajout photo"

    divModulable.innerHTML = ""

    const divPhotoForm = document.createElement("div")
    divPhotoForm.classList.add("photoForm")
    const logoIMG = document.createElement("img")
    logoIMG.setAttribute("src", "./assets/icons/VectorlogoIMG.png")
    logoIMG.id = 'logoIMG'
    const btnChoisir = document.createElement("button")
    btnChoisir.id = "btnChoisir"
    btnChoisir.setAttribute("onclick", "document.getElementById('ajoutPhoto').click();")
    btnChoisir.innerText = "+ Ajouter photo"
    const caracs = document.createElement("p")
    caracs.innerText = "jpg, png : 4mo max"
    const formulaireAjout = document.createElement("form")
    formulaireAjout.id = "formulaireAjout"
    const choixPhoto = document.createElement("input")
    choixPhoto.setAttribute("type", "file")
    choixPhoto.id = "ajoutPhoto"
    choixPhoto.setAttribute("accept", ".png, .jpg")
    choixPhoto.style.display = "none"
    const labelTitre = document.createElement("label")
    labelTitre.setAttribute("for", "titreAjout")
    labelTitre.innerText = "Titre"
    const inputTitre = document.createElement("input")
    inputTitre.setAttribute("type", "text")
    inputTitre.setAttribute("name", "titreAjout")
    inputTitre.id = "titreAjout"
    const labelCategorie = document.createElement("label")
    labelCategorie.setAttribute("for", "categorieAjout")
    labelCategorie.innerText = "Catégorie"
    const inputCategorie = document.createElement("select")
    inputCategorie.setAttribute("name", "categorieAjout")
    inputCategorie.id = "categorieAjout"
    const catNull = document.createElement("option")
    catNull.setAttribute("value", null)
    catNull.setAttribute("selected", "selected")
    const cat1 = document.createElement("option")
    cat1.setAttribute("value", "1")
    cat1.innerText = "Objets"
    const cat2 = document.createElement("option")
    cat2.setAttribute("value", "2")
    cat2.innerText = "Appartements"
    const cat3 = document.createElement("option")
    cat3.setAttribute("value", "3")
    cat3.innerText = "Bars & Restaurant"

    divModulable.appendChild(formulaireAjout)
    formulaireAjout.appendChild(divPhotoForm)
    divPhotoForm.appendChild(logoIMG)
    divPhotoForm.appendChild(choixPhoto)
    divPhotoForm.appendChild(btnChoisir)
    divPhotoForm.appendChild(caracs)
    formulaireAjout.appendChild(labelTitre)
    formulaireAjout.appendChild(inputTitre)
    formulaireAjout.appendChild(labelCategorie)
    formulaireAjout.appendChild(inputCategorie)
    inputCategorie.appendChild(catNull)
    inputCategorie.appendChild(cat1)
    inputCategorie.appendChild(cat2)
    inputCategorie.appendChild(cat3)

    btnModale.innerText = "Valider"
    btnModale.disabled = true
    btnChoisir.addEventListener('click', function (e) {
        e.preventDefault()
    })
    document.getElementById('ajoutPhoto').addEventListener('change', function () {
        const urlImg = URL.createObjectURL(document.getElementById('ajoutPhoto').files[0])
        const contenuDiv = document.querySelectorAll('.photoForm *')
        for (const contenu of contenuDiv) {
            contenu.style.display = "none"
        }
        const previsuaImg = document.createElement('img')
        previsuaImg.setAttribute('src', urlImg)
        previsuaImg.id = ("previsuImg")
        divPhotoForm.appendChild(previsuaImg)
    })
    const inputs = [document.getElementById('ajoutPhoto'), document.getElementById('titreAjout'), document.getElementById('categorieAjout')]
    for (const input of inputs) {
        input.addEventListener("input", function () {
            if (document.getElementById('ajoutPhoto').files[0] !== undefined && document.getElementById('titreAjout').value !== '' && document.getElementById('categorieAjout').value !== 'null') {
                btnModale.disabled = false
            } else {
                btnModale.disabled = true
            }
        })
    }
    btnModale.addEventListener('click', envoyerProjet)
}

function fermerModale() {
    document.getElementById('modal').style.display = "none"
    btnModale.removeEventListener('click', envoyerProjet)
}

function stopPropag(e) {
    e.stopPropagation()
}

genererTravaux(works)

const btns = document.querySelectorAll(".btns-tri button")

document.querySelector('.btn-tous').style.backgroundColor = '#1D6154'
document.querySelector('.btn-tous').style.color = '#fffef8'

let dernierBoutonClique = document.querySelector('.btn-tous')


for (const btn of btns) {
    btn.addEventListener("click", function (event) {
        if (dernierBoutonClique) {
            dernierBoutonClique.style.backgroundColor = '#fffef8'
            dernierBoutonClique.style.color = "#1D6154"
        }
        event.target.style.backgroundColor = '#1D6154'
        event.target.style.color = "#fffef8"

        dernierBoutonClique = event.target

        if (btn.dataset.category === "all") {
            genererTravaux(works)
        } else {
            const travaux = works.filter(function (travail) {
                return travail.category.name === btn.dataset.category
            })
            genererTravaux(travaux)
        }
    })
}

if (localStorage.getItem("token")) {
    document.getElementById('login').setAttribute("href", "#")
    document.getElementById('login').innerText = "logout"
    document.getElementById('login').addEventListener('click', function () {
        localStorage.removeItem("token")
        window.location.reload()
    })
    document.querySelector('.edition').style.display = "flex"
    document.querySelector('.btns-tri').style.display = "none"
    document.getElementById('ouvertureModal').style.display = "inline"
}
document.getElementById('ouvertureModal').addEventListener('click', function () {
    ouvrirGallerieModale(works)
})