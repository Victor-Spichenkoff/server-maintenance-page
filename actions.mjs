// import axios from 'axios';

const resposta = document.getElementById('resposta')
const btn = document.getElementById('btn')
const btn2 = document.getElementById('btn2')
const listados = document.querySelectorAll('listados')


// const url = 'http://localhost:2009'
// const url = 'https://server-maintenance.onrender.com'//old
const url = 'https://server-maintenance-ssu7.onrender.com'

const loadGif = 'https://cdn.pixabay.com/animation/2023/10/08/03/19/03-19-26-213_512.gif'


const status = document.getElementById('manter-individual')


getStatusAfeterFetch()



async function carregarStatus() {
    try{
        status.innerHTML = 'Buscando...'
        const res = await axios.get(url+'/currenton')
        const msg = res.data
        console.log('try: ' + res)
    
        status.innerText = msg
    
        return msg
    } catch(e) { 
        status.innerHTML = 'Não foi obtida resposta'
        console.log('Erro no statusGetter: '+  e)
        return false
        // const timeOutAtual = setTimeout(()=> {
        //     carregarStatus()
        //     tentativas++
        // }, 3000)
        // if(tentativas > 10) return false//não deu mesmo
     }
} 


async function testar(dois = false) {

    resposta.innerHTML = ''
    resposta.classList.remove('personalizar')
    const img = document.createElement('img')
    img.classList.add('image')//
    img.src = loadGif

    resposta.appendChild(img)
    
    var sec = 0
    const tempoDecorrido = setInterval(()=> {
        sec++, 1000
    })

    if(dois) var res = await axios(url+'/forceAllOnce')
    // if(dois) var res = await axios(url+'/initialLoad')
    else var res =  await axios(url+'/load')
    const msg = res.data

    clearInterval(tempoDecorrido)

    resposta.classList.add('personalizar')

    // resposta.removeChild(img)
    resposta.innerText = msg
}

async function setarUma(nome) {
    const res = await axios.get(url+'/'+nome)

    // const currenton = await axios.get(url+ '/currenton')


    getStatusAfeterFetch()
}


var tentativas = 0
async function getStatusAfeterFetch() {
    const res = await carregarStatus()
    tentativas++

    if(tentativas > 5) {//não deu
        tentativas = 0
        status.innerText = 'Cancelada'
        return
    }

    if(res) return
    setTimeout(getStatusAfeterFetch, 2000)
}



btn.onclick = testar
btn2.onclick = () => testar(true)//é o dois(initial load)

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
    getStatusAfeterFetch()
}


//varias mensagens area
const vmRes = document.getElementById('varias-menagens-res')//variasMsgResposta
var vmTentativas = 0

async function getStatusSeveralMenssages() {
    vmRes.innerHTML = 'Buscando...'

    const interval = setInterval(async ()=>{
        tentativas++
        if(tentativas  > 5) {
            vmTentativas = 0
            vmRes.innerHTML = 'Cancelado'
            clearInterval(interval)
        }
        try{
            const res = await axios(url+'/hightMenssagesStatus')
            if(res) clearInterval(interval)
            vmRes.innerHTML = res.data
        } catch(e) {
            vmRes = 'Erro na busca'
        }
    }, 1000)
    
}

getStatusSeveralMenssages()

async function toggleSeveralMenssages() {
    vmRes.innerHTML = 'Buscando'
    const res = await axios(url + '/toggleHightMenssages')
    vmRes.innerHTML = res.data
}

document.getElementById('msg-constantes').onclick = toggleSeveralMenssages