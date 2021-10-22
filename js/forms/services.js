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

export const renderServices = (n, fragment, template) => {
  const services = template.querySelector(`#service-group`);

  services.setAttribute("id", `services-${n}`);

  let clone = template.cloneNode(true);
  fragment.appendChild(clone);

  //   document
  //     .querySelector("#services")
  //     .insertBefore(fragment, document.getElementById("add-services"));
  //   formatCurrency();
};
