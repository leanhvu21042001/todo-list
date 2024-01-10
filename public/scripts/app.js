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
      <button class="btn btn-warning modalUpdateTodo" data-id="${
        todo.id
      }">Update</button>
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
const createTodo = (content = "", isMarked = false) => {
  // throw error if content empty
  if (!content && !content?.length) {
    throw new Error("Can not add todo without content");
  }

  return {
    id: Date.now(),
    content,
    isMarked,
    createdAt: Date.now().toString(),
  };
};

/**
 * Render to UI
 * @param {string} elements
 */
const renderTodoElements = (elements = "") => {
  // throw error if elements empty
  // if (!elements && !elements?.length) {
  //   throw new Error("Can not render todos without elements");
  // }

  document.querySelector("#todoList").innerHTML = elements;
};

/**
 *
 * @param {BigInteger} id
 * @param {String} content
 * @param {Boolean} isMarked
 * @param {Array} todoList
 * @returns
 */
const updateTodo = (id, content = "", isMarked, todoList = []) => {
  const todos = [...todoList];

  // fin index of todo by id
  const indexTodoUpdate = todos.findIndex(
    (todo) => Number(todo.id) === Number(id)
  );

  // update if exists or throw error if not
  if (todos[indexTodoUpdate]) {
    const newTodo = createTodo(content, isMarked);
    todos[indexTodoUpdate] = newTodo;
  } else {
    throw new Error("Todo not found");
  }

  return todos;
};

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

// ################ Handle: update todo ################ //
const modalUpdateTodo = new bootstrap.Modal(
  document.querySelector("#modalUpdateTodo"),
  {
    keyboard: false,
  }
);
// show modal and set data for form value
document.querySelector("#todoList").addEventListener("click", (event) => {
  const { target } = event;
  const isUpdateTodo = target.classList.value.includes("modalUpdateTodo");

  // if click on button delete
  if (isUpdateTodo) {
    // get id and find todo
    const idUpdateTodo = event.target.dataset.id;
    const todoFound = todoList.find(
      (todo) => Number(todo.id) === Number(idUpdateTodo)
    );

    // set data for form delete
    document.querySelector("#idUpdateTodo").value = idUpdateTodo;
    document.querySelector("#todoTextUpdate").value = todoFound.content;

    // show modal delete
    modalUpdateTodo.show();
  }
});

document
  .querySelector("#formUpdateTodo")
  .addEventListener("submit", (event) => {
    event.preventDefault();

    // get data from form delete
    const formData = new FormData(event.target);
    const idUpdateTodo = formData.get("idUpdateTodo");
    const todoTextUpdate = formData.get("todoTextUpdate");

    // update todo and pass new data for todoList
    todoList = updateTodo(idUpdateTodo, todoTextUpdate, false, todoList);

    // reset form and hide modal
    event.target.reset();
    modalUpdateTodo.hide();

    // render new todoList to UI.
    const elements = createTodoElements(todoList);
    renderTodoElements(elements);
  });

// ################ init render ################ //
renderTodoElements("");
