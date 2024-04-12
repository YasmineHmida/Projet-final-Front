// Variables
const nameInput = document.getElementById("name-input");
const RnameInput = document.getElementById("Rname-input");
const ingInput = document.getElementById("ing-input");
const methInput = document.getElementById("meth-input");
const addBtn = document.getElementById("add-btn");
const cardContainer = document.getElementById("card-container");
const updateBtn = document.getElementById("update-btn");
const cancelBtn = document.getElementById("cancel-btn");
let currentRecetteIndex = null;
let Recettes = JSON.parse(localStorage.getItem("Recettes")) || [];
getRecettes();

function createRecette() {
    const name = nameInput.value.trim();
    const Rname= RnameInput.value.trim();
    const ing= ingInput.value.trim();
    const meth= methInput.value.trim();  
  let validRecette = true;
  if (name.length < 3) {
    nameInput.style.borderColor = "red";
    validRecette = false;
  }
  if (validRecette) {
    const newRecette = {
      name,
      Rname,
      ing,
      meth,
    };
    Recettes.push(newRecette);
    resetForm();
    saveData();
  }
}
function getRecettes() {
    const cardContainer = document.getElementById("card-container");
    cardContainer.innerHTML = "";
    Recettes.forEach((Recette, index) => {
      const card = document.createElement("div");
      card.className = "card";
      const nameDiv = document.createElement("div");
      nameDiv.innerText = Recette.name;
      nameDiv.className = "name";
      const RnameDiv = document.createElement("div");
      RnameDiv.innerText = Recette.Rname;
      RnameDiv.className = "Rname";
      const ingDiv = document.createElement("div");
      ingDiv.innerText ="Ingrédients:" + Recette.ing;
      ingDiv.className = "ing";
      const methDiv = document.createElement("div");
      methDiv.innerText = "Méthode:"+ Recette.meth;
      methDiv.className = "meth";
      const actionDiv = document.createElement("div");
      const editBtn = document.createElement("button");
      editBtn.className = "edit-btn";
      editBtn.innerText = "Edit";
      editBtn.addEventListener("click", () => showUpdateRecette(index));
  
      const deleteBtn = document.createElement("button");
      deleteBtn.className = "delete-btn";
      deleteBtn.innerText = "Delete";
      deleteBtn.addEventListener("click", () => deleteRecette(index));
  
      actionDiv.appendChild(editBtn);
      actionDiv.appendChild(deleteBtn);
      card.appendChild(RnameDiv);
      card.appendChild(ingDiv);
      card.appendChild(methDiv);
      card.appendChild(nameDiv);
      card.appendChild(actionDiv);
      cardContainer.appendChild(card);
    });
  }
  
function updateRecette() {
  Recettes[currentRecetteIndex].name = nameInput.value;
  Recettes[currentRecetteIndex].Rname = RnameInput.value;
  Recettes[currentRecetteIndex].ing = ingInput.value;
  Recettes[currentRecetteIndex].meth = methInput.value;
  saveData();
  cancelUpdate();
}

function cancelUpdate() {
  resetForm();
  addBtn.style.display = " inline";
  updateBtn.style.display = "none";
  cancelBtn.style.display = "none";
}

function showUpdateRecette(index) {
  currentRecetteIndex = index;
  nameInput.value = Recettes[index].name;
  RnameInput.value = Recettes[index].Rname;
  ingInput.value = Recettes[index].ing;
  methInput.value = Recettes[index].meth;
  addBtn.style.display = " none";
  updateBtn.style.display = "inline";
  cancelBtn.style.display = "inline";
}

function saveData() {
  localStorage.setItem("Recettes", JSON.stringify(Recettes));
  getRecettes();
}

function deleteRecette(index) {
  Recettes.splice(index, 1);
  saveData();
}

function resetForm() {
    nameInput.value = "";
    RnameInput.value = "";
    ingInput.value = "";
    methInput.value = "";
}
addBtn.addEventListener("click", createRecette);
cancelBtn.addEventListener("click", cancelUpdate);
updateBtn.addEventListener("click", updateRecette);