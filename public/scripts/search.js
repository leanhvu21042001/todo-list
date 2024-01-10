document
  .querySelector("#form-search")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const term = formData.get("searchTerm");
    const created = formData.get("searchCreated");
    const status = formData.get("searchStatus");

    const todoFound = todoList.filter((obj) => obj.content.includes(term));

    if (status) {
      todoFound.filter((todo) => todo.isMarked === Number(status));
    }

    if (created && created === "asc") {
      todoFound.sort(function (a, b) {
        return a.createdAt - b.createdAt;
      });
    }

    if (created && created === "desc") {
      todoFound.sort(function (a, b) {
        return b.createdAt - a.createdAt;
      });
    }

    const elements = createTodoElements(todoFound);
    renderTodoElements(elements);
  });
