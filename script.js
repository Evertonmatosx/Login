// ===============================
// CONFIGURAÇÃO DO LOGIN
// ===============================

const loginForm = document.getElementById("loginForm");
const usuarioInput = document.getElementById("usuario");
const senhaInput = document.getElementById("senha");
const lembrarInput = document.getElementById("lembrar");


// ===============================
// USUÁRIOS
// ===============================

// Busca os usuários salvos no navegador.
// Caso não exista nenhum, cria um usuário padrão.
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [
    {
        usuario: "evertonryan985@gmail.com",
        senha: "100721"
    }
];


// ===============================
// RECUPERAR USUÁRIO LEMBRADO
// ===============================

const usuarioSalvo = localStorage.getItem("usuarioLembrado");

if (usuarioSalvo) {
    usuarioInput.value = usuarioSalvo;
    lembrarInput.checked = true;
}


// ===============================
// MENSAGEM
// ===============================

function mostrarMensagem(texto, sucesso = false) {

    let mensagem = document.getElementById("mensagemLogin");

    if (!mensagem) {

        mensagem = document.createElement("p");

        mensagem.id = "mensagemLogin";

        mensagem.style.textAlign = "center";
        mensagem.style.marginTop = "15px";
        mensagem.style.fontWeight = "600";

        loginForm.appendChild(mensagem);
    }

    mensagem.textContent = texto;

    if (sucesso) {
        mensagem.style.color = "#90ee90";
    } else {
        mensagem.style.color = "#ff8080";
    }
}


// ===============================
// LOGIN
// ===============================

loginForm.addEventListener("submit", function (event) {

    // Impede o formulário de recarregar a página
    event.preventDefault();

    const usuario = usuarioInput.value.trim();
    const senha = senhaInput.value;

    // Verifica campos vazios
    if (usuario === "" || senha === "") {

        mostrarMensagem("Preencha todos os campos.");

        return;
    }


    // Procura o usuário
    const usuarioEncontrado = usuarios.find(function (pessoa) {

        return (
            pessoa.usuario.toLowerCase() === usuario.toLowerCase() &&
            pessoa.senha === senha
        );

    });


    // Usuário ou senha incorretos
    if (!usuarioEncontrado) {

        mostrarMensagem("Usuário ou senha incorretos.");

        return;
    }


    // ===============================
    // LEMBRAR USUÁRIO
    // ===============================

    if (lembrarInput.checked) {

        localStorage.setItem(
            "usuarioLembrado",
            usuario
        );

    } else {

        localStorage.removeItem("usuarioLembrado");

    }


    // ===============================
    // CRIAR SESSÃO
    // ===============================

    sessionStorage.setItem(
        "usuarioLogado",
        usuario
    );


    // Login realizado
    mostrarMensagem(
        "Login realizado com sucesso!",
        true
    );


    // ===============================
    // REDIRECIONAMENTO
    // ===============================

    window.location.href = "inicio.html";

});


// ===============================
// CADASTRO e ESQUECI A SENHA
// ===============================
// Agora são páginas próprias: cadastro.html e esqueci-senha.html
// (os links no HTML já apontam direto para elas, sem precisar de JS aqui)