//moved to the main file
const services_fragment = document.createDocumentFragment();
const services_template = document.querySelector("#services-template").content;

const services = services_template.querySelector(`#service-group`);
const deleteBtn = services.querySelector(`#delete-service`);

const button = document.getElementById("add-services");
let n_services = 0;

const addCurrrencyAndDeleteBtn = (clone, n) => {
  const price = clone.querySelector("#price");
  const deleteBtn = clone.querySelector(`#delete-service-${n}`);
  const service = clone.querySelector(`#services-${n}`);

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
          duration: 150,
        }
      );
      setTimeout(() => {
        service.remove();
      }, 150);
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
    .querySelector("#service-input-container")
    .insertBefore(services_fragment, document.getElementById("add-services"));

  document.getElementById(`services-${n}`).animate(
    [
      // keyframes
      { transform: "translateY(-35px)", opacity: "0" },
      { transform: "translateY(0)", opacity: "1" },
    ],
    {
      // timing options
      duration: 150,
    }
  );
};

export const renderServices = () => {
  newPriceInput(n_services); //render our first service

  button.addEventListener("click", () => {
    n_services++;
    newPriceInput(n_services); // replace for the one that only upddates the fragment
  });
};
