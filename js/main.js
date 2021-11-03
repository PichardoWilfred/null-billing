import { renderTextInputs } from "./forms/input.js";
import { renderSelectOptions } from "./forms/select.js";
import { renderServices } from "./forms/services.js";
import { sendFormData } from "./forms/data-handling.js";

//inputs description
const inputData = [
  { placeholder: "Representante", name: "client" },
  { placeholder: "Nombre de la Empresa", name: "company" },
  { placeholder: "Subtítulo de la Empresa", name: "subtitle" },
];

//render client-data related inputs
renderTextInputs(inputData);

//render the options of the select inputs
renderSelectOptions("type-bill", "type-document");
renderSelectOptions("developer", "type-developer");

renderServices();

//adding the event listener to the button
document.getElementById("bill-button").addEventListener("click", sendFormData);
