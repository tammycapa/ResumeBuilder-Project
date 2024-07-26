const itemForm = document.getElementById("resume-form");
const jobTitleInput = document.getElementById("job-title-input");
const companyInput = document.getElementById("company-input");
const employmentStartInput = document.getElementById("employment-start-input");
const employmentEndInput = document.getElementById("employment-end-input");
const responsibilitiesInput = document.getElementById("responsibilities-input");
const itemList = document.getElementById("resume-list");
const clearBtn = document.getElementById("clear");
const formBtn = itemForm.querySelector(".add-btn");
const cancelEditBtn = itemForm.querySelector(".cancel-btn");
let isEditing = false;

function diplayList() {
  const itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.forEach((item, index) => addItemToDOM(item, index));
  reloadList();
}

function onAddItem(e) {
  e.preventDefault();

  const newExperience = {
    jobTitle: jobTitleInput.value,
    company: companyInput.value,
    startDate: employmentStartInput.value,
    endDate: employmentEndInput.value,
    responsibilities: responsibilitiesInput.value,
  };

  let idx = getItemsFromStorage().length + 1;
  // Check if user is currently editing a resume item
  if (isEditing) {
    const itemToEdit = itemList.querySelector(".edit-mode");
    idx = itemToEdit.getAttribute("data-key");
    deleteFromLocalStorage(idx);
    itemToEdit.classList.remove("edit-mode");
    cancelEditBtn.style.display = "none";
    itemToEdit.remove();
    isEditing = false;
  }

  addItemToDOM(newExperience, idx);
  addItemToStorage(newExperience, idx);
  reloadList();

  jobTitleInput.value = "";
  companyInput.value = "";
  employmentStartInput.value = "";
  employmentEndInput.value = "";
  responsibilitiesInput.value = "";
}

function addItemToDOM(
  { jobTitle, company, startDate, endDate, responsibilities },
  index
) {
  const li = document.createElement("li");
  li.setAttribute("data-key", index);

  const rowBody = document.createElement("div");
  rowBody.classList.add("row-body");

  const titleDiv = document.createElement("div");
  titleDiv.classList.add("title-container");
  titleDiv.appendChild(document.createTextNode(jobTitle));
  titleDiv.appendChild(document.createTextNode(" at "));
  titleDiv.appendChild(document.createTextNode(company));

  const periodDiv = document.createElement("div");
  periodDiv.classList.add("date-container");
  periodDiv.appendChild(document.createTextNode(startDate));
  periodDiv.appendChild(document.createTextNode(" to "));
  periodDiv.appendChild(document.createTextNode(endDate));

  const summaryDiv = document.createElement("div");
  summaryDiv.classList.add("summary-container");
  summaryDiv.appendChild(document.createTextNode(responsibilities));

  rowBody.appendChild(titleDiv);
  rowBody.appendChild(periodDiv);
  rowBody.appendChild(summaryDiv);
  li.appendChild(rowBody);

  const buttonsContainer = document.createElement("div");
  buttonsContainer.className = "buttons-container";
  const editButton = document.createElement("button");
  editButton.className = "edit-item row-btn text-green";
  const editIcon = createIcon("fa-solid fa-pen");
  editButton.appendChild(editIcon);

  const removeButton = document.createElement("button");
  removeButton.className = "remove-item row-btn text-red";
  const removeIcon = createIcon("fa-solid fa-xmark");
  removeButton.appendChild(removeIcon);

  buttonsContainer.appendChild(editButton);
  buttonsContainer.appendChild(removeButton);
  li.appendChild(buttonsContainer);
  itemList.appendChild(li);
}

function createIcon(classes) {
  const icon = document.createElement("i");
  icon.className = classes;
  return icon;
}

function addItemToStorage(item, index) {
  const itemsFromStorage = getItemsFromStorage();
  const id = itemsFromStorage.length + 1;
  item.id = index;
  itemsFromStorage.push(item);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function getItemsFromStorage() {
  let itemsFromStorage;

  if (localStorage.getItem("items") === null) {
    itemsFromStorage = [];
  } else {
    itemsFromStorage = JSON.parse(localStorage.getItem("items"));
  }

  return itemsFromStorage;
}

function onClickItem(e) {
  if (e.target.parentElement.classList.contains("remove-item")) {
    const buttonElement = e.target.parentElement;
    deleteItem(buttonElement.parentElement.parentElement);
  } else if (e.target.parentElement.classList.contains("edit-item")) {
    const buttonElement = e.target.parentElement;
    onItemEdit(buttonElement.parentElement.parentElement);
  }
}

function onCancelEdit() {
  isEditing = false;

  itemList.querySelectorAll("li").forEach((i) => {
    i.classList.remove("edit-mode");
    const editBtn = i.querySelector(".edit-item");
    const removeBtn = i.querySelector(".remove-item");
    editBtn.disabled = false;
    removeBtn.disabled = false;
  });

  reloadList();

  jobTitleInput.value = "";
  companyInput.value = "";
  employmentStartInput.value = "";
  employmentEndInput.value = "";
  responsibilitiesInput.value = "";
}

function onItemEdit(item) {
  isEditing = true;

  const rowContent = item.childNodes[0];
  const title = rowContent.children[0];
  const jobTitle = title.childNodes[0].nodeValue;
  const company = title.childNodes[2].nodeValue;

  const period = rowContent.children[1];
  const startDate = period.childNodes[0].nodeValue;
  const endDate = period.childNodes[2].nodeValue;

  const summary = rowContent.children[2].textContent;

  itemList.querySelectorAll("li").forEach((i) => {
    i.classList.remove("edit-mode");
    const editBtn = i.querySelector(".edit-item");
    const removeBtn = i.querySelector(".remove-item");
    editBtn.disabled = false;
    removeBtn.disabled = false;
  });

  cancelEditBtn.style.display = "block";

  item.classList.add("edit-mode");
  formBtn.innerHTML = '<i class="fa-solid fa-pen"></i>   Update Item';
  formBtn.style.backgroundColor = "#228B22";

  const editBtn = item.querySelector(".edit-item");
  const removeBtn = item.querySelector(".remove-item");
  editBtn.disabled = true;
  removeBtn.disabled = true;

  jobTitleInput.value = jobTitle;
  companyInput.value = company;
  employmentStartInput.value = startDate;
  employmentEndInput.value = endDate;
  responsibilitiesInput.value = summary;
}

function deleteItem(item) {
  item.remove();
  deleteFromLocalStorage(item.getAttribute("data-key"));
  if (isEditing) onCancelEdit();
  reloadList();
}

function deleteFromLocalStorage(index) {
  let itemsFromStorage = getItemsFromStorage();
  itemsFromStorage.splice(index, 1);
  localStorage.setItem("items", JSON.stringify(itemsFromStorage));
}

function clearList() {
  while (itemList.firstChild) {
    itemList.removeChild(itemList.firstChild);
  }

  localStorage.removeItem("items");
  reloadList();
}

function reloadList() {
  jobTitleInput.value = "";
  companyInput.value = "";
  employmentStartInput.value = "";
  employmentEndInput.value = "";
  responsibilitiesInput.value = "";

  const items = itemList.querySelectorAll("li");

  if (items.length === 0) {
    clearBtn.style.display = "none";
  } else {
    clearBtn.style.display = "block";
  }

  formBtn.innerHTML = '<i class="fa-solid fa-plus"></i> Add Item';
  formBtn.style.backgroundColor = "#333";

  isEditing = false;
  cancelEditBtn.style.display = "none";
}

// Initialise application
function init() {
  itemForm.addEventListener("submit", onAddItem);
  itemList.addEventListener("click", onClickItem);
  clearBtn.addEventListener("click", clearList);
  cancelEditBtn.addEventListener("click", onCancelEdit);
  document.addEventListener("DOMContentLoaded", diplayList);

  reloadList();
}

init();