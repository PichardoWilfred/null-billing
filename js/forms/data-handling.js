import {
  HighlightInput,
  HighlightService,
  HighlightSelect,
  highlightForm,
} from "./form-animations.js";
import { printInvoice } from "../pdf-handling/pdf-handler.js";

let validForm = false;

export function sendFormData() {
  const total = document.getElementById("total").innerText || undefined;

  const client = document.querySelector("#client").value || undefined;
  const company = document.querySelector("#company").value || undefined;
  const subtitle = document.querySelector("#subtitle").value || undefined;

  const typeDocument = document.getElementById("type-document").innerText;
  const developer = document.getElementById("type-developer").innerText;

  const services = document.querySelector("#service-input-container");

  let serviceData = [];
  //getting the services data
  for (let i = 0; i < services.children.length - 1; i++) {
    const father = services.children[i];
    const price = father.querySelector("#price").value || undefined;

    const name = father.querySelector("#name").value || undefined;
    serviceData.push({
      name: services.children[i].getAttribute("id"),
      service: name,
      price: price,
    });
  }

  //only adding said value, key name will be added automatically.
  const formData = {
    total,
    client,
    company,
    subtitle,
    services: serviceData,
  };
  //validating inputs
  console.log(formData);
  for (const element in formData) {
    if (formData[element] === undefined) {
      let DOMReference = document
        .querySelector("#" + element)
        .getAttribute("id");
      HighlightInput(DOMReference);
      validForm = false;
    } else if (formData[element] instanceof Object) {
      //when we reach the last object
      formData[element].forEach((service) => {
        for (let e in service) {
          //if a property of said object returns undefined grab said reference and color its first children
          if (service[e] === undefined) {
            // console.log(e + " from " + { ...service } + " is invalid");
            HighlightService(service.name);
            validForm = false;
          }
        }
      });
    } else {
      // console.log(element + " is Valid");
      validForm = true;
    }
  }

  //adding
  formData["typeDocument"] = typeDocument === "TIPO" ? undefined : typeDocument;
  formData["developer"] = developer === "DESARROLLADOR" ? undefined : developer;
  //validating selects
  if (formData["typeDocument"] === undefined) {
    HighlightSelect("type-document");
    validForm = false;
  }
  if (formData["developer"] === undefined) {
    HighlightSelect("type-developer");
    validForm = false;
  }

  if (validForm) {
    printInvoice(formData);
    highlightForm();
  } else {
    return null;
  }
}
