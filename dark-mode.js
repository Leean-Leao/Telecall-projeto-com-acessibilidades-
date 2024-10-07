document.addEventListener('DOMContentLoaded', function() {

  //reconhece o botao com id chk e utiliza ele para mudar as variaveis utilizando a classe body.dark utilizada em todas as tolhas de estilo 

  const chk = document.getElementById('chk');

  //guarda no local storage a informação que mantera o tema ativo durante a sessão
  const isDarkMode = localStorage.getItem('darkMode') === 'enabled';

  //apartir do localstorage, dependendo da informação recebida é verdadeiro ou falso que o tem foi de fato ativado 
  if (isDarkMode) {
    document.body.classList.add('dark');
    chk.checked = true;
  }

  chk.addEventListener('change', () => {
    document.body.classList.toggle('dark');


    if (chk.checked) {
      localStorage.setItem('darkMode', 'enabled');
    } else {
      localStorage.removeItem('darkMode');
    }
  });
});