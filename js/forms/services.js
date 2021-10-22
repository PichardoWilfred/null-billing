//moved to the main file
const services_fragment = document.createDocumentFragment();
const services_template = document.querySelector("#services-template").content;

const services = services_template.querySelector(`#service-group`);
const deleteBtn = services.querySelector(`#delete-service`);

const button = document.getElementById("add-services");

let n_services = 0;

const addCurrrencyAndDeleteBtn = (clone, n) => {
  //Instead of adding this functionalities AFTER the render has been done we Should
  //Add them in runtime somehow
  const price = clone.querySelector("#price");
  const deleteBtn = clone.querySelector(`#delete-service-${n}`);
  const serviceN = clone.querySelector(`#services-${n}`);
  //See how event Listeners actually storage in memory
  price.addEventListener(
    "keyup",
    () => {
      if (Number(price.value) == 0) price.value = 0;
      let n = parseInt(price.value.replace(/\D/g, ""), 10); //regular expressions go brrrr
      price.value = n.toLocaleString();
    },
    false
  );

  deleteBtn.addEventListener("click", (e) => {
    if (n === 0) {
      console.log("at least a service men");
    } else {
      serviceN.remove();
    }
  });
};

const newPriceInput = (n) => {
  services.setAttribute("id", `services-${n}`);
  deleteBtn.setAttribute("id", `delete-service-${n}`);

  let clone = services_template.cloneNode(true);
  addCurrrencyAndDeleteBtn(clone, n);
  services_fragment.appendChild(clone);
  document
    .querySelector("#services")
    .insertBefore(services_fragment, document.getElementById("add-services"));
};

export const renderServices = () => {
  newPriceInput(n_services); //render our first service

  button.addEventListener("click", () => {
    n_services++;
    newPriceInput(n_services); // replace for the one that only upddates the fragment
  });
};
