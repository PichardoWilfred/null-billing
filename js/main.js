import { renderDataInputs } from "./forms/input.js";
import { renderSelectOptions } from "./forms/select.js";

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

let price = document.getElementById("price");
price.addEventListener(
  "keyup", //when you finish typing
  () => {
    if (Number(price.value) == 0) price.value = 0;
    let n = parseInt(price.value.replace(/\D/g, ""), 10); //regular expressions go brrrr
    price.value = n.toLocaleString();
  },
  false
);
