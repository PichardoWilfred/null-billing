//Generating the needed Inputs
export const renderInputs = (before, data) => {
  const template = document.querySelector("#input-group").content; //get the template
  const fragment = document.createDocumentFragment(); //fragment to load

  data.forEach((element) => {
    const { name, placeholder } = element;
    const input = template.querySelector("input");
    input.setAttribute("id", name);
    input.setAttribute("name", name);
    input.setAttribute("required", "required");

    const label = template.querySelector("label");
    label.setAttribute("for", name);
    label.innerText = placeholder;

    let clone = template.cloneNode(true);
    fragment.appendChild(clone);
  });

  document.querySelector("#form").insertBefore(fragment, before); //adding said fragment
};

//Trying Currying these functions
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

export const renderSelectOptions = (typeBill) => {
  const father = document.getElementById(typeBill);
  const selectGroup = father.querySelector("#select-group");
  const optionsGroup = father.querySelector("#option-group");

  const typeDocument = father.querySelector("#type-document");
  const options = father.querySelectorAll(".option");
  const icon = father.querySelector("#dropdown-icon");

  selectGroup.addEventListener("click", () => {
    showMenu(selectGroup, optionsGroup); //toggling the menu display property
    rotate(icon);
    optionsGroup.style.width = selectGroup.clientWidth - 1 + "px"; //-- setting the width --
    optionsGroup.style.marginTop = "-5px"; //-- setting the top distance --
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

// export const renderSelect = (before, { placeholder, options }) => {
//   const template = document.getElementById("select-template").content;
//   const fragment = document.createDocumentFragment();

//   const selectSection = template.querySelector(".select-section"); //father
//   //children
//   const selectGroup = template.getElementById("select-group");
//   selectGroup.setAttribute("id", "select-group");

//   const optionGroup = template.getElementById("option-group");
//   //selected
//   const span = template.getElementById("icon");
//   const p = template.getElementById("type-document"); //maybe change?
//   p.textContent = placeholder;
//   p.setAttribute("id", "type-document");
//   span.appendChild(p);
//   selectGroup.appendChild(span);
//   selectSection.appendChild(selectGroup);

//   options.forEach((element) => {
//     const option = template.querySelector(".option");
//     option.textContent = element;
//   });

//   let clone = template.cloneNode(true);
//   fragment.appendChild(clone);

//   form.insertBefore(fragment, before); //adding said fragment
// };
{
  /* <template id="select-template">
<div class="select-section">
    <div class="select-group" id="select-group">
        <span id="icon">
            <p id="type-document">example</p>
        </span>
    </div>

    <div id="option-group" class="option-group invisible">
        <div class="option">
            <p></p>
        </div>
    </div>
</div>
</template> */
}
