let addDiv = {
  color: "red",
  backgroundColor: "blue",
  height: "300px",
  width: "200px",
};

let todo = document.getElementById("todoList");

let div = document.createElement("div");

for (let style in addDiv) {
  div.style[style] = addDiv[style];
  return div;
}

document.getElementById("addItems").addEventListener("click", function () {
  div.innerHTML = todo;
});
