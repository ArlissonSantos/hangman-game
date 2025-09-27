/* ================================================== */
/*                  ELEMENTOS DOM                     */
/* ================================================== */

const palavraContainer = document.getElementById('palavra-container');
const tecladoContainer = document.getElementById('teclado-container');
const categoriaTexto = document.getElementById('categoria-texto');
const mensagemTexto = document.getElementById('mensagem-texto');
const partesForca = document.querySelectorAll('.parte-forca');
const btnReiniciar = document.getElementById('btn-reiniciar');

/* ================================================== */
/*                VARIÁVEIS GLOBAIS                   */
/* ================================================== */

let palavraSorteada;
let categoriaSorteada;
let letrasCorretas = [];
let tentativasErradas = 0;

/* ================================================== */
/*                    FUNÇÕES                         */
/* ================================================== */

function atualizarForca() {
    for (let i = 0; i < tentativasErradas; i++) {
        if (partesForca[i]) {
            partesForca[i].classList.add('visivel');
        }
    }
}

function gerarTeclado() {
    tecladoContainer.innerHTML = '';

    const alfabeto = 'abcdefghijklmnopqrstuvwxyz';
    alfabeto.split('').forEach(letra => {
        const botao = document.createElement('button');
        botao.className = 'tecla';
        const letraMaiuscula = letra.toUpperCase();
        botao.textContent = letraMaiuscula;
        botao.onclick = () => handleCliqueLetra(letraMaiuscula);
        tecladoContainer.appendChild(botao);
    });
}

function exibirPalavra() {
    palavraContainer.innerHTML = '';

    palavraSorteada.split('').forEach(letra => {
        const spanLetra = document.createElement('span');
        spanLetra.className = 'letra';

        if (letrasCorretas.includes(letra)) {
            spanLetra.textContent = letra;
        } else {
            spanLetra.textContent = '_';
        }
        palavraContainer.appendChild(spanLetra);
    });
}

async function iniciarJogo() {
    try {
        const response = await fetch('backend/catch_word.php');
        if (!response.ok) {
            throw new Error('Não foi possível buscar uma nova palavra.');
        }
        const data = await response.json();

        palavraSorteada = data.palavra;
        categoriaSorteada = data.categoria;

        letrasCorretas = [];
        tentativasErradas = 0;

        partesForca.forEach(parte => parte.classList.remove('visivel'));

        categoriaTexto.textContent = categoriaSorteada;
        mensagemTexto.textContent = '';
        btnReiniciar.style.display = 'none';
        exibirPalavra();
        gerarTeclado();

    } catch (error) {
        mensagemTexto.textContent = `Erro ao carregar o jogo: ${error.message}`;
        console.error(error);
    }
}


function verificarFimDeJogo() {
    const vitoria = palavraSorteada.split('').every(letra => letrasCorretas.includes(letra));
    if (vitoria) {
        mensagemTexto.textContent = `Parabéns! Você venceu! A palavra era "${palavraSorteada}".`;
        desabilitarTeclado();
        btnReiniciar.style.display = 'block';
        return;
    }

    const limiteErros = 6;
    if (tentativasErradas >= limiteErros) {
        mensagemTexto.textContent = `Você perdeu! A palavra era "${palavraSorteada}".`;
        desabilitarTeclado();
        btnReiniciar.style.display = 'block';
    }

}

function desabilitarTeclado() {
    const teclas = tecladoContainer.querySelectorAll('.tecla');
    teclas.forEach(tecla => tecla.disabled = true);
}

function handleCliqueLetra(letra) {
    const botaoClicado = Array.from(tecladoContainer.children).find(btn => btn.textContent === letra);
    botaoClicado.disabled = true;

    if (palavraSorteada.includes(letra)) {
        letrasCorretas.push(letra);
    } else {
        tentativasErradas++;
        atualizarForca();
    }

    exibirPalavra();
    verificarFimDeJogo();
}

/* ================================================== */
/*                 INICIALIZAÇÃO                      */
/* ================================================== */

iniciarJogo();
btnReiniciar.addEventListener('click', iniciarJogo);