import { renderDataInputs } from "./forms/input.js";
import { renderSelectOptions } from "./forms/select.js";
import { renderServices } from "./forms/services.js"; //formatCurrency,

//inputs description
const inputData = [
  { placeholder: "Representante", name: "client" },
  { placeholder: "Nombre de la Empresa", name: "company" },
  { placeholder: "Subtítulo de la Empresa", name: "subtitle" },
];

//render client-data related inputs
renderDataInputs(document.getElementById("developer"), inputData);

//render the options of the select inputs
renderSelectOptions("type-bill");
renderSelectOptions("developer");

renderServices();
