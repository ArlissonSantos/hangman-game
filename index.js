// jogoforca.js

const palavras = ["javascript", "programacao", "internet", "html", "ac-dc"];
let palavraAtual = "";
let letrasTentadas = [];
let tentativasRestantes = 5;

const formCadastro = document.getElementById("formCadastro");
const jogoDiv = document.getElementById("jogo");
const cadastroDiv = document.getElementById("cadastro");
const palavraDisplay = document.getElementById("palavra");
const tentativasDisplay = document.getElementById("tentativas");
const letraInput = document.getElementById("letra");
const btnTentar = document.getElementById("btnTentar");
const mensagem = document.getElementById("mensagem");

// Inicia o jogo depois que o usuário fizer o cadastro
formCadastro.addEventListener("submit", function(e) {
    e.preventDefault();

    // Aqui poderia haver um ajax para validar cadastro no PHP
    // Por enquanto, apenas inicia o jogo
    iniciarJogo();

    // Mostra área do jogo e oculta cadastro
    cadastroDiv.style.display = "none";
    jogoDiv.style.display = "block";
});

// Função para iniciar o jogo
function iniciarJogo() {
    // Escolhe palavra aleatória
    palavraAtual = palavras[Math.floor(Math.random() * palavras.length)];
    letrasTentadas = [];
    tentativasRestantes = 6;
    mensagem.textContent = "";
    atualizarDisplay();
    letraInput.disabled = false;
    btnTentar.disabled = false;
    letraInput.focus();
}

// Atualiza a exibição da palavra com letras e "_"
function atualizarDisplay() {
    let display = palavraAtual.split("").map(letra => (letrasTentadas.includes(letra) ? letra : "_")).join(" ");
    palavraDisplay.textContent = display;
    tentativasDisplay.textContent = tentativasRestantes;
}

// Função chamada ao clicar em tentar letra
btnTentar.addEventListener("click", tentarLetra);
letraInput.addEventListener("keyup", function(event) {
    if (event.key === "Enter") {
        tentarLetra();
    }
});

function tentarLetra() {
    let letra = letraInput.value.toLowerCase();

    if (!letra || letra.length !== 1 || !letra.match(/[a-z]/i)) {
        alert("Digite uma letra válida.");
        letraInput.value = "";
        return;
    }

    if (letrasTentadas.includes(letra)) {
        alert("Letra já tentada!");
        letraInput.value = "";
        return;
    }

    letrasTentadas.push(letra);

    if (!palavraAtual.includes(letra)) {
        tentativasRestantes--;
    }

    atualizarDisplay();
    letraInput.value = "";
    letraInput.focus();

    verificarStatus();
}

// Verifica se o jogador ganhou, perdeu ou continua jogando
function verificarStatus() {
    if (!palavraDisplay.textContent.includes("_")) {
        mensagem.textContent = "Parabéns! Você venceu! 🎉";
        finalizarJogo();
    } else if (tentativasRestantes <= 0) {
        mensagem.textContent = Você perdeu! A palavra era: ${palavraAtual};
        atualizarDisplayCompleto();
        finalizarJogo();
    }
}

// Revela palavra completa ao perder
function atualizarDisplayCompleto() {
    palavraDisplay.textContent = palavraAtual.split("").join(" ");
}

// Bloqueia o input ao finalizar
function finalizarJogo() {
    letraInput.disabled = true;
    btnTentar.disabled = true;
}