const services_fragment = document.createDocumentFragment();
const services_template = document.querySelector("#services-template").content;
//
const services = services_template.querySelector(`#service-group`);
const deleteBtn = services.querySelector(`#delete-service`);

const button = document.getElementById("add-services");
const total = document.getElementById("total");

let servicePrices = {};
let totalPrice = 0;
let id_service = 0;

function formatCurrency(value) {
  let newValue = value;
  if (Number(newValue) == 0) newValue = 0;
  let n = parseInt(newValue.replace(/\D/g, ""), 10);
  newValue = n.toLocaleString();
  return newValue;
}
const addCurrrencyAndDeleteBtn = (clone, n) => {
  const price = clone.querySelector("#price");
  const deleteBtn = clone.querySelector(`#delete-service-${n}`);
  const service = clone.querySelector(`#services-${n}`);
  //See how event listeners actually storage in memory
  price.addEventListener(
    "keyup",
    () => {
      price.value = formatCurrency(price.value);
    },
    false
  );

  deleteBtn.addEventListener("click", () => {
    if (n === 0) {
      console.log("at least a service men");
    } else {
      service.animate(
        [
          { transform: "translateY(0)", opacity: "1" },
          { transform: "translateY(-35px)", opacity: "0" },
        ],
        {
          duration: 160,
        }
      );
      setTimeout(() => {
        service.remove();
        updatePrices(document);
      }, 150);
    }
  });
};

function updateAmount(services) {
  services.forEach((element) => {
    const price = parseInt(element.value.replace(",", ""));
    const service = element.parentNode.parentNode.getAttribute("id");

    servicePrices[service] = price;
    totalPrice = 0;
    for (let name in servicePrices) {
      totalPrice += servicePrices[name];
    }
    if (totalPrice > 0) total.textContent = formatCurrency(String(totalPrice));
  });
}

function updatePrices(document) {
  //if it doesnt work over here, prompt them elsewhere
  const container = document.querySelector("#service-input-container");
  const services = container.querySelectorAll("#price");
  servicePrices = {};

  updateAmount(services); //Updates the totalPrice

  //Makes the blur-event on said prices, to update the totalPrice.
  services.forEach((element) => {
    element.addEventListener("blur", () => {
      const price = parseInt(element.value.replace(",", "")); // converts them to integer
      const service = element.parentNode.parentNode.getAttribute("id"); //get's its service name

      servicePrices[service] = price; //updates itself each time we add/delete one
      totalPrice = 0; //re-initializes the total-amount.
      for (let name in servicePrices) {
        totalPrice += servicePrices[name];
      }

      if (totalPrice > 0)
        total.textContent = formatCurrency(String(totalPrice));
    });
  });
}

const newPriceInput = (n) => {
  //getting a new instance of the template
  services.setAttribute("id", `services-${n}`);
  deleteBtn.setAttribute("id", `delete-service-${n}`);

  let clone = services_template.cloneNode(true);
  addCurrrencyAndDeleteBtn(clone, n);

  services_fragment.appendChild(clone);
  document
    .querySelector("#service-input-container")
    .insertBefore(services_fragment, document.getElementById("add-services"));
  updatePrices(document);
};

export const serviceQuantity = () => {
  const father = document.getElementById("service-input-container");
  const children = father.querySelectorAll(".service-group");
  return children.length;
};

export const renderServices = () => {
  newPriceInput(id_service); //render our first service
  button.addEventListener("click", () => {
    // replace for the one that only upddates the fragment
    if (serviceQuantity() <= 5) {
      id_service++; //for now, is only possible to have 6 services inside the bill.
      newPriceInput(id_service);
    } else {
      console.log("service limit exceeded");
    }
  });
};
