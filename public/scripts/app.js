//add Todo
let todoList = [];

const formAdd = document.querySelector('#formAdd');
formAdd.addEventListener('submit', function (event) {
  event.preventDefault();
  const formData = new FormData(event.target);
  const todoText = formData.get('todoText');
  todoList = [...todoList, {
    id: Date.now(),
    context: todoText,
    mark: false,
    created: Date.now().toString(),
  }]

});