export const formatCurrency = () => {
  const prices = document.querySelectorAll("#price");
  prices.forEach((price) => {
    price.addEventListener(
      "keyup", //when you finish typing
      () => {
        if (Number(price.value) == 0) price.value = 0;
        let n = parseInt(price.value.replace(/\D/g, ""), 10); //regular expressions go brrrr
        price.value = n.toLocaleString();
      },
      false
    );
  });
};

//moved to the main file
const services_fragment = document.createDocumentFragment();
const services_template = document.querySelector("#services-template").content;

export const renderServices = (n) => {
  //remove loop or document fragment
  const services = services_template.querySelector(`#service-group`);

  for (let index = 0; index < n; index++) {
    services.setAttribute("id", `services-${index}`);

    let clone = services_template.cloneNode(true);
    services_fragment.appendChild(clone);
  }

  document
    .querySelector("#services")
    .insertBefore(services_fragment, document.getElementById("add-services"));

  formatCurrency();
};
