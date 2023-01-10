//código escrito a partir de um tutorial -> https://freshman.tech/todo-list/

//array que irá armazenar os itens da lista
let todoItems = [];

function renderTodo(todo) {
  //seleciona a classe que a tarefa será inserida
  const list = document.querySelector(".js-todo-list");

  const item = document.querySelector(`[data-key='${todo.id}']`); //fiquei procurando uma aspa aqui por uns 20min btw

  if (todo.deleted) {
    item.remove();
    return;
  }

  //verifica se o valor inserido é true, se não for será inserido uma string vazia
  const isChecked = todo.checked ? "done" : "";

  //cria uma lista e armazena na constante node
  const node = document.createElement("li");

  //define a classe de acordo com a validação
  node.setAttribute("class", `todo-item ${isChecked}`);

  //define o data-key com a id do input
  node.setAttribute("data-key", todo.id);

  //criação do objeto na lista
  node.innerHTML = `
    <input id="${todo.id}" type="checkbox"/>
    <label for="${todo.id}" class="tick js-tick"></label>
    <span>${todo.text}</span>
    <button class="delete-todo js-delete-todo">
    <svg><use href="#delete-icon"></use></svg>
    </button>
  `;

  if (item) {
    list.replaceChild(node, item);
  } else {
    list.append(node);
  }
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
  todoItems.push(todo);

  //renderiza a tarefa adicionada
  renderTodo(todo);
}

//--------------------------------------------------------------------//
//função para marcar uma tarefa como realizada
function toggleDone(key) {
  //localiza o todo na lista todoItems
  const index = todoItems.findIndex((item) => item.id === Number(key));

  todoItems[index].checked = !todoItems[index].checked;
  renderTodo(todoItems[index]);
}
//--------------------------------------------------------------------//

//--------------------------------------------------------------------//
//função para deletar
function deleteTodo(key) {
  //localiza o todo na lista todoItems
  //o findIndex returna o primeiro elemento encontrado em uma lista que satisfaça as operações descritas
  const index = todoItems.findIndex((item) => item.id === Number(key));

  const todo = {
    deleted: true, //adiciona uma nova propriedade
    ...todoItems[index], //cria um novo objeto com as propriedades do todo atual
  };

  //basicamente recria a lista com os elementos que não são os que foram passados no parâmetro
  todoItems = todoItems.filter((item) => item.id !== Number(key));
  renderTodo(todo);
}
//--------------------------------------------------------------------//

const form = document.querySelector(".js-form");

//o evento submit é acionado quando um form é inserido, normalmente usado par isChecked o form antes de mandar para o servidor
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

//--------------------------------------------------------------------//
//marcar a tarefa como completa
//seleciona todo o div em que as tarefas estão renderizadas
const list = document.querySelector(".js-todo-list");

//atribui um click á lista e aos filhos (da lista)
list.addEventListener("click", (event) => {
  //a propriedade target retorna o elemento que acionou o evento
  if (event.target.classList.contains("js-tick")) {
    const itemKey = event.target.parentElement.dataset.key;
    toggleDone(itemKey);
  }

  //atribui click ao js-delete-todo
  if (event.target.classList.contains("js-delete-todo")) {
    //a key do todo é reconhecida pela função
    //a key é armazenada em uma constante
    const itemKey = event.target.parentElement.dataset.key;
    //a constante serve de parâmetro para a função que irá executar a ação
    deleteTodo(itemKey);
  }
});
//--------------------------------------------------------------------//
