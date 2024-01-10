// import axios from 'axios';

const resposta = document.getElementById('resposta')
const btn = document.getElementById('btn')
const listados = document.querySelectorAll('listados')


// const url = 'http://localhost:2006'
// const url = 'https://server-maintenance.onrender.com'//old
const url = 'https://server-maintenance-ssu7.onrender.com'

const loadGif = 'https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif'


carregarStatus()


const status = document.getElementById('manter-individual')
async function carregarStatus() {

    const res = await axios.get(url+'/currenton')
    const msg = res.data

    status.innerText = msg
} 


async function testar() {

    resposta.innerHTML = ''
    resposta.classList.remove('personalizar')
    const img = document.createElement('img')
    img.classList.add('image')//
    img.src = loadGif

    resposta.appendChild(img)
    
    var sec = 0
    setInterval(()=> console.log(sec++), 1000)
    const res =  await axios(url+'/load')
    const msg = res.data

    resposta.classList.add('personalizar')

    // resposta.removeChild(img)
    resposta.innerText = msg
}

async function setarUma(nome) {
    const res = await axios.get(url+'/'+nome)

    carregarStatus()
}



btn.onclick = testar

const portfolio = document.getElementById('portfolio')
portfolio.onclick = async () => setarUma('portfolio')

const vss = document.getElementById('vss')
vss.onclick = async () => setarUma('vss')

const lista = document.getElementById('lista-mercado')
lista.onclick = async () => setarUma('lista')

const paginacao = document.getElementById('paginacao')
paginacao.onclick = async () => setarUma('paginacao')

const all = document.getElementById('all')
all.onclick = async () => setarUma('all')



const desligar = document.getElementById('desligar')
desligar.onclick = () => {
    axios.get(url+'/turnoff')
}