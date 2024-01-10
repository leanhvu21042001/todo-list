document
  .querySelector("#form-search")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    const formData = new FormData(event.target);
    const term = formData.get("searchTerm");
    const created = formData.get("searchCreated");
    const status = formData.get("searchStatus");

    let todoFound = todoList.filter((obj) => obj.content.includes(term));

    if (status) {
      todoFound = todoFound.filter(
        (todo) => Number(todo.isMarked) === Number(status)
      );
    }

    if (created && created === "asc") {
      todoFound.sort(function (a, b) {
        return Number(a.createdAt) - Number(b.createdAt);
      });
    }

    if (created && created === "desc") {
      todoFound.sort(function (a, b) {
        return Number(b.createdAt) - Number(a.createdAt);
      });
    }

    const elements = createTodoElements(todoFound);
    renderTodoElements(elements);
  });

document.querySelector("#resetButton").addEventListener("click", (event) => {
  event.preventDefault();

  document.querySelector("#form-search").reset();

  const elements = createTodoElements(todoList);
  renderTodoElements(elements);
});
