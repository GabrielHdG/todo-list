//código escrito a partir de um tutorial -> https://freshman.tech/todo-list/

//array que irá armazenar os itens da lista
let listaTodo = [];

function renderTodo(todo) {
  //seleciona a classe que a tarefa será inserida
  const list = document.querySelector(".js-todo-list");

  //verifica se o valor inserido é true, se não for será inserido uma string vazia
  const validar = todo.checked ? "done" : "";

  //cria uma lista e armazena na constante node
  const node = document.createElement("li");

  //define a classe de acordo o a validação
  node.setAttribute("class", `todo-item ${validar}`);

  //define o data-key com a id do input
  node.setAttribute("data-key", todo.id);

  node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

  list.append(node);
}

//função que sera executada para adicionar o input no array
function addTodo(text) {
  //objeto que armazena o que será inserido pelo usuário
  const todo = {
    text, //valor será printado na tela a partir do que for escrito pelo usuário
    checked: false, //quando a tarefa for marcada como realizada, a propriedade será mudada para true
    id: Date.now(), //se o usuário desejar deletar uma tarefa, a tarefa será localizada pelo id
  };

  //o texto do objeto é inserido no array
  listaTodo.push(todo);

  //printa a lista
  renderTodo(todo);
}

const form = document.querySelector(".js-form");

//o evento submit é acionado quando um form é inserido, normalmente usado par validar o form antes de mandar para o servidor
form.addEventListener("submit", (event) => {
  // impede que a página atualize depois que alguma tarefa for inserida
  event.preventDefault();

  //seleciona o valor do input
  const input = document.querySelector(".js-todo-input");

  //remove os espaços em branco do input
  const text = input.value.trim();

  //se o input não for fazio, o valor é enviado para a função
  if (text !== "") {
    addTodo(text);
    input.value = "";
    input.focus();
  }
});
