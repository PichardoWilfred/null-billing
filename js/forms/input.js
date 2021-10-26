export const renderTextInputs = (data) => {
  const template = document.querySelector("#input-group-template").content; //get the template
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
  document.querySelector("#text-input-container").appendChild(fragment); //apending all the inputs
};
