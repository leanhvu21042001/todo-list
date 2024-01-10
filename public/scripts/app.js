// ################ Functions ################ //

/**
 *
 * @param {Array<{id: string, content: string, mark: boolean, created: Date}>} todoList
 */
const createTodoElements = (todoList = []) => {
  let elements = "";

  todoList.forEach((todo) => {
    elements += `<li class="list-group-item d-flex justify-content-between align-items-center">
    <p class="m-0">${todo.content}</p>
    <div class="d-flex gap-4">
      <input
        class="form-check-input"
        style="height: 2rem; width: 2rem; cursor: pointer"
        type="checkbox"
        ${todo.isMarked ? "checked" : ""}
      />
      <button class="btn btn-danger" data-id="${todo.id}">Delete</button>
      <button class="btn btn-warning" data-id="${todo.id}">Update</button>
    </div>
  </li>`;
  });

  return elements;
};

/**
 *
 * @param {string} content
 * @returns
 */
const createTodo = (content = "") => {
  // throw error if content empty
  if (!content && !content?.length) {
    throw new Error("Can not add todo without content");
  }

  return {
    id: Date.now(),
    content,
    isMarked: false,
    createdAt: Date.now().toString(),
  };
};

/**
 * Render to UI
 * @param {string} elements
 */
const renderTodoElements = (elements = "") => {
  // throw error if elements empty
  if (!elements && !elements?.length) {
    throw new Error("Can not render todos without elements");
  }

  document.querySelector("#todoList").innerHTML = elements;
};

/**
 *
 * @param {string} id
 * @param {Array} todos
 * @returns
 */
function removeTodo(id, todos = []) {
  return todos.filter((todo) => Number(todo.id) !== Number(id));
}

// ################ Global variables ################ //
let todoList = [];

// ################ Handle: add todo ################ //
document.querySelector("#formAdd").addEventListener("submit", function (event) {
  event.preventDefault();

  // Get data of form
  const formData = new FormData(event.target);
  const todoText = formData.get("todoText");

  // push new todo to todoList
  todoList = [...todoList, createTodo(todoText)];

  // reset form data
  event.target.reset();

  // render new todoList to UI.
  const elements = createTodoElements(todoList);
  renderTodoElements(elements);
});

// ################ init render ################ //
renderTodoElements("");
