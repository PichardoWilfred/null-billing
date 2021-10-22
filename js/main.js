import { renderDataInputs } from "./forms/input.js";
import { renderSelectOptions } from "./forms/select.js";
import { renderServices, formatCurrency } from "./forms/services.js"; //formatCurrency,

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

//working
const button = document.getElementById("add-services");
let n = 0;

const services_fragment = document.createDocumentFragment();
const services_template = document.querySelector("#services-template").content;

const services = services_template.querySelector(`#service-group`);

services.setAttribute("id", `services-${n}`);

let clone = services_template.cloneNode(true);
services_fragment.appendChild(clone);

document
  .querySelector("#services")
  .insertBefore(services_fragment, document.getElementById("add-services"));
formatCurrency();

button.addEventListener("click", () => {
  n++;
  services.setAttribute("id", `services-${n}`);

  let clone = services_template.cloneNode(true);
  services_fragment.appendChild(clone);

  document
    .querySelector("#services")
    .insertBefore(services_fragment, document.getElementById("add-services"));
  formatCurrency();
});
