const fechar = document.getElementById('fechar')
const listaEnviar1 = document.getElementById('lista')


function toggleDiv(div) {
    console.log(div.style.display)
    if(div.style.display == 'none') div.style.display = 'block'
    else if(div.style.display == 'block') div.style.display = 'none'
    else div.style.display = 'none'
}

fechar.onclick = () => toggleDiv(listaEnviar1)

function ativar() {

}