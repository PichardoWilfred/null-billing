//Generating the needed Inputs

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
