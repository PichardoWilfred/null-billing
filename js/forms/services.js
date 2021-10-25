const services_fragment = document.createDocumentFragment();
const services_template = document.querySelector("#services-template").content;
//
const services = services_template.querySelector(`#service-group`);
const deleteBtn = services.querySelector(`#delete-service`);

const button = document.getElementById("add-services");
const total = document.getElementById("total");

let allPriceServices = {};
let totalPrice = 0;
let n_services = 0;

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
        checkPrices(document);
      }, 150);
    }
  });
};

function updatePrice(services) {
  services.forEach((element) => {
    const price = parseInt(element.value.replace(",", ""));
    const service = element.parentNode.parentNode.getAttribute("id");

    allPriceServices[service] = price;
    totalPrice = 0;
    for (let name in allPriceServices) {
      totalPrice += allPriceServices[name];
    }
    if (totalPrice > 0) total.textContent = formatCurrency(String(totalPrice));
  });
}

function checkPrices(document) {
  //if it doesnt work over here, prompt them elsewhere
  const container = document.querySelector("#service-input-container");
  const services = container.querySelectorAll("#price");
  allPriceServices = {};

  updatePrice(services);

  services.forEach((element) => {
    element.addEventListener("blur", () => {
      const price = parseInt(element.value.replace(",", ""));
      const service = element.parentNode.parentNode.getAttribute("id");

      allPriceServices[service] = price;
      totalPrice = 0;
      for (let name in allPriceServices) {
        totalPrice += allPriceServices[name];
      }

      if (totalPrice > 0)
        total.textContent = formatCurrency(String(totalPrice));
    });
  });
}

const newPriceInput = (n) => {
  services.setAttribute("id", `services-${n}`);
  deleteBtn.setAttribute("id", `delete-service-${n}`);

  let clone = services_template.cloneNode(true);
  addCurrrencyAndDeleteBtn(clone, n);

  services_fragment.appendChild(clone);
  document
    .querySelector("#service-input-container")
    .insertBefore(services_fragment, document.getElementById("add-services"));
};

export const renderServices = () => {
  newPriceInput(n_services); //render our first service
  checkPrices(document);

  button.addEventListener("click", () => {
    n_services++;
    newPriceInput(n_services); // replace for the one that only upddates the fragment
    checkPrices(document);
  });
};
