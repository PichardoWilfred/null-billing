import * as forms from "./forms.js";

//inputs description
const inputData = [
  { placeholder: "Representante", name: "client" },
  { placeholder: "Nombre de la Empresa", name: "company" },
  { placeholder: "Subtítulo de la Empresa", name: "subtitle" },
];

forms.renderInputs(document.getElementById("developer"), inputData);

//type-options
forms.renderSelectOptions("type-bill");
forms.renderSelectOptions("developer");
