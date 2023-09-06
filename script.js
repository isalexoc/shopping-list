const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clear = document.getElementById("clear");
const filter = document.querySelector(".filter");

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

  checkItems();
}

function removeItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    e.target.parentElement.parentElement.remove();
    checkItems();
  }
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  checkItems();
}

function filterItems(e) {
  const text = e.target.value.toLowerCase();
  const items = document.querySelectorAll("li");
  items.forEach((item) => {
    const itemName = item.firstChild.textContent.toLowerCase();

    if (itemName.indexOf(text) != -1) {
      item.style.display = "flex";
    } else {
      item.style.display = "none";
    }
  });
}

function checkItems() {
  if (!itemList.firstChild) {
    filter.style.display = "none";
    clear.style.display = "none";
  } else {
    filter.style.display = "block";
    clear.style.display = "block";
  }
}

//Event Listeners
itemForm.addEventListener("submit", addItem);
itemList.addEventListener("click", removeItem);
clear.addEventListener("click", clearItems);
filter.addEventListener("input", filterItems);

checkItems();
