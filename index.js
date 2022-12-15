let addDiv = {
  color: "red",
  backgroundColor: "blue",
  height: "300px",
  width: "200px",
};

let todo = document.getElementById("todo");
let addItems = document.getElementById("addItems");

let div = document.createElement("div");

addItems.addEventListener("click", function () {
  for (let style in addDiv) {
    div.style[style] = addDiv[style];
    div.style.visibility = "visible";
  }

  todo.appendChild(div);
});
