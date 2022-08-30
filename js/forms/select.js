//show the options div
let showMenu = (selectGroup, optionsGroup, icon) => {
  optionsGroup.classList.remove("invisible");
  selectGroup.classList.add("options-opened");
  rotate(icon);
};

let hideMenu = (selectGroup, optionsGroup, icon) => {
  optionsGroup.classList.add("invisible");
  selectGroup.classList.remove("options-opened");
  rotate(icon);
};

//rotate the drop-down icon
let rotate = (icon) => {
  icon.classList.toggle("upside-down");
};

export const renderSelectOptions = (typeBill, selectID) => {
  const father = document.getElementById(typeBill);
  const selectGroup = father.querySelector("#select-group");
  const optionsGroup = father.querySelector("#option-group");

  const typeDocument = father.querySelector(`#${selectID}`);
  const options = father.querySelectorAll(".option");
  const icon = father.querySelector("#dropdown-icon");

  selectGroup.addEventListener("click", () => {
    if (!selectGroup.classList.contains("options-opened")) {
      showMenu(selectGroup, optionsGroup, icon); //toggling the menu visibility
    } else {
      hideMenu(selectGroup, optionsGroup, icon);
    }
  });

  options.forEach((e) => {
    e.addEventListener("click", () => {
      hideMenu(selectGroup, optionsGroup, icon); //closing the menu
      typeDocument.textContent = e.textContent; //we change the text value
    });
  });

  document.addEventListener("click", (event) => {
    if (!father.contains(event.target)) {
      if (selectGroup.classList.contains("options-opened")) rotate(icon);
      hideMenu(selectGroup, optionsGroup); //closing the menu
    }
  });
};
