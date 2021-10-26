//show the options div
let showMenu = (selectGroup, optionsGroup) => {
  optionsGroup.classList.remove("invisible");
  selectGroup.classList.add("options-opened");
};

let hideMenu = (selectGroup, optionsGroup) => {
  optionsGroup.classList.add("invisible");
  selectGroup.classList.remove("options-opened");
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
      rotate(icon);
      showMenu(selectGroup, optionsGroup); //toggling the menu visibility
      optionsGroup.style.width = selectGroup.clientWidth - 1 + "px"; //-- setting the width --
      optionsGroup.style.marginTop = "-5px"; //-- setting the top distance --
    } else {
      rotate(icon);
      hideMenu(selectGroup, optionsGroup);
    }
  });

  options.forEach((e) => {
    e.addEventListener("click", () => {
      hideMenu(selectGroup, optionsGroup); //closing the menu
      rotate(icon); //rotating option
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
