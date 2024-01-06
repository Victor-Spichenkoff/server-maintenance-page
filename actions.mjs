// import axios from 'axios';


const resposta = document.getElementById('resposta')
const btn = document.getElementById('btn')

const url = 'http://localhost:2006'
const loadGif = 'https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif'


async function testar() {

    resposta.innerHTML = ''
    resposta.classList.remove('personalizar')
    const img = document.createElement('img')
    img.classList.add('image')//
    img.src = loadGif

    resposta.appendChild(img)

    const res =  await axios(url+'/load')
    const msg = res.data

    resposta.classList.add('personalizar')

    // resposta.removeChild(img)
    resposta.innerText = msg
}

btn.onclick = testar
// export{}