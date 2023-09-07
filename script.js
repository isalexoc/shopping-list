const itemForm = document.getElementById("item-form");
const itemInput = document.getElementById("item-input");
const itemList = document.getElementById("item-list");
const clear = document.getElementById("clear");
const filter = document.querySelector(".filter");
const btnForm = itemForm.querySelector(".btn");
let isEditMode = false;

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

function addItemOnSubmit(e) {
  e.preventDefault();
  const stringInput = itemInput.value.toLowerCase().trim();
  const newItem = stringInput.charAt(0).toUpperCase() + stringInput.slice(1);
  //Validate input
  if (newItem === "") {
    alert("Please add an Item");
    return;
  }

  if (isEditMode) {
    const itemOnEdit = itemList.querySelector(".edit-mode");
    itemOnEdit.classList.remove("edit-mode");
    removeItemFromStorage(itemOnEdit.textContent);
    itemOnEdit.remove();
    isEditMode = false;
  } else {
    if (checkIfItemExist(newItem)) {
      alert("Item already exists");
      return;
    }
  }

  addItemOnDOM(newItem);
  addItemLocalStorage(newItem);

  itemInput.value = "";

  checkItems();
}

function addItemOnDOM(newItem) {
  //Create list Item

  const li = document.createElement("li");
  const textItem = document.createTextNode(newItem);
  const button = createButton("remove-item btn-link text-red");

  li.appendChild(textItem);
  li.appendChild(button);

  itemList.appendChild(li);
}

function addItemLocalStorage(item) {
  const localStorageData = getItemsFromStorage();

  localStorageData.push(item);
  localStorage.setItem("items", JSON.stringify(localStorageData));
}

function setItemOnEditMode(item) {
  itemList
    .querySelectorAll("li")
    .forEach((li) => li.classList.remove("edit-mode"));

  isEditMode = true;
  item.classList.add("edit-mode");
  btnForm.innerHTML = '<i class = "fa-solid fa-pen"></i> Update Item';
  btnForm.style.backgroundColor = "#228B22";
  itemInput.value = item.textContent;
}

function onClickItem(e) {
  const item = e.target.parentElement.parentElement;
  if (e.target.parentElement.classList.contains("remove-item")) {
    removeItem(item);
  } else {
    setItemOnEditMode(e.target);
  }
}

function removeItemFromStorage(item) {
  let localStorageData = getItemsFromStorage();
  localStorageData = localStorageData.filter((i) => i !== item);
  localStorageData = JSON.stringify(localStorageData);
  localStorage.setItem("items", localStorageData);
}

function removeItem(item) {
  //Remove item from DOM
  item.remove();

  //Remove Item from Local storage
  removeItemFromStorage(item.textContent);
  checkItems();
}

function clearItems() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }
  localStorage.removeItem("items");
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

function checkIfItemExist(item) {
  const localStorageData = getItemsFromStorage();
  return localStorageData.includes(item);
}

function getItemsFromStorage() {
  let localStorageData;
  if (localStorage.getItem("items") === null) {
    localStorageData = [];
  } else {
    localStorageData = JSON.parse(localStorage.getItem("items"));
  }
  return localStorageData;
}

function displayItems() {
  let localStorageData = getItemsFromStorage();
  if (localStorageData) {
    localStorageData.forEach((item) => {
      addItemOnDOM(item);
    });
  }

  checkItems();
}

function checkItems() {
  itemInput.value = "";

  if (!itemList.firstChild) {
    filter.style.display = "none";
    clear.style.display = "none";
  } else {
    filter.style.display = "block";
    clear.style.display = "block";
  }

  btnForm.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  btnForm.style.backgroundColor = "#333";
  isEditMode = false;
}

//Initialize App

function init() {
  //Event Listeners
  itemForm.addEventListener("submit", addItemOnSubmit);
  itemList.addEventListener("click", onClickItem);
  clear.addEventListener("click", clearItems);
  filter.addEventListener("input", filterItems);
  document.addEventListener("DOMContentLoaded", displayItems);
  checkItems();
}

init();
