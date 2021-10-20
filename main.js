const template = document.querySelector("#input-group").content;
const form = document.querySelector("#form");
const button = document.querySelector("#button");

const fragment = document.createDocumentFragment();

const data = [
  { placeholder: "Representante", name: "client" },
  { placeholder: "Nombre de la Empresa", name: "company" },
  { placeholder: "Subtítulo de la Empresa", name: "subtitle" },
];

for (element of data) {
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
}

form.insertBefore(fragment, button);
