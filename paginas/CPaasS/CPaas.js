document.addEventListener('DOMContentLoaded', function() {

  var userlogado = JSON.parse(localStorage.getItem('userlogado'));

  if (userlogado && userlogado.nome) {
    var logado = document.querySelector('#logado');
    logado.innerHTML = 'Olá, ' + userlogado.nome;

    var nameuser = document.querySelector('#nomeuser');
    nameuser.innerHTML = userlogado.nome;

  } else {
    // Usuário não está logado, redirecione para a página de login

  }

  // Verifique o token apenas se o usuário não estiver logado
  if (!localStorage.getItem('token')) {

    function exibirMensagem(mensagem) {

      var overlay = document.getElementById('overlay');

      var mensagemDiv = document.getElementById('mensagem');
      mensagemDiv.innerHTML = mensagem;

      // Exibir a mensagem
      mensagemDiv.style.display = 'block';
      overlay.style.display = 'block'


      // Ocultar a mensagem após 3 segundos (3000 milissegundos)
      setTimeout(function() {
        mensagemDiv.style.display = 'none';
        overlay.style.display = 'block'
      }, 4000);
    }

    // Exemplo de uso
    exibirMensagem('Você precisa estar logado para acessar está página!!!!!');

    setTimeout(function() {
      window.location.href = '../../login-cadastro/cadastro.html';
    }, 3000);

  }
});
function sair() {
  localStorage.removeItem('token');
  window.location.href = "../../index.html";
}
