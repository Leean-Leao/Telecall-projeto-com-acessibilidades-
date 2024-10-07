//evento de rolagem, o cabeçalho se enfontra transparente apartir do momento que o usuario da scrooll na pagina, assim acionando a classe que mostra uma barra fixa junto com os titulos 
window.addEventListener("scroll", function() {
  let header = document.querySelector('#header')
  header.classList.toggle('rolagem', window.scrollY > 0);
})

//cria eventos ao clicar nos botoes para aumentar e diminuir fonte, chamando as funções dentro dele mesmo 

document.getElementById("aumentar-fonte").addEventListener("click", function() {
  aumentarFonte();
})

document.getElementById("diminuir-fonte").addEventListener("click", function() {
  diminuirFonte();
})
//criei uma variavel para recebr o tamanho das fontes do corpo da pagina, e utilizei uma segunda que recebera o valor da primeira + 1.2rem
function aumentarFonte() {
  var currentSize = parseFloat(getComputedStyle(document.body).fontSize);
  var newSize = currentSize * 1.2;//aumenta a fonte em 20% acrescentando um estilo ao body chamaro fontSize que recebe minha ultima variavel com o tamanho ja somado a cada vez que voce clica no botao 
  document.body.style.fontSize = newSize + "px";
}
function diminuirFonte() {
  var currentSize = parseFloat(getComputedStyle(document.body).fontSize);
  var newSize = currentSize / 1.2; //diminui a fonte em 20%
  document.body.style.fontSize = newSize + "px";
}
var buttonlogin = document.getElementById('buttonlogin');

var buttoncadastro = document.getElementById('buttoncadastro');

document.addEventListener('DOMContentLoaded', function() {

  //analisa se o token existe indicando que o usuario fez ou nao login e apartir dessa informação ele mostra ou some os botes para cadastro e login
  if (!localStorage.getItem('token')) {


    buttonlogin.style.display = 'block';
    buttoncadastro.style.display = 'block';

  } else {

    buttonlogin.style.display = 'none';
    buttoncadastro.style.display = 'none';
  }
});
