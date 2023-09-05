const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");

function createButton(classes) {
  const button = document.createElement("button");
  button.className = classes;
  const icon = createIcon("fa-solid fa-xmark");
  button.appendChild(icon);
  return button;
}

function createIcon(classes) {
  const icon = document.createElement("icon");
  icon.className = classes;
  return icon;
}

function addItem(e) {
  e.preventDefault();

  const newItem = itemInput.value;
  //Validate input
  if (newItem === "") {
    alert("Please add an Item");
    return;
  }

  //Create list Item

  const li = document.createElement("li");
  const textItem = document.createTextNode(newItem);
  const button = createButton("remove-item btn-link text-red");

  li.appendChild(textItem);
  li.appendChild(button);

  itemList.appendChild(li);

  itemInput.value = "";
}

//Event Listeners
itemForm.addEventListener("submit", addItem);
