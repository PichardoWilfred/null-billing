export function HighlightInput(id) {
  const input = document.getElementById(id);
  input.animate(
    [
      {
        borderBottomColor: "#F44336",
      },
      { borderBottomColor: "white" },
    ],
    { duration: 1500 }
  );
}

export function HighlightService(id) {
  const serviceGroup = document.getElementById(id).children[0];
  serviceGroup.animate(
    [{ borderBottomColor: "#F44336" }, { borderBottomColor: "white" }],
    { duration: 1500 }
  );
}

export function HighlightSelect(element) {
  const select = document.getElementById(element).parentNode.parentNode;
  select.animate([{ borderColor: "#F44336" }, { borderColor: "white" }], {
    duration: 1500,
  });
}

export const HighlightForm = () => {
  const selects = document.querySelectorAll("#select-group");
  for (const select of selects) {
    select.animate([{ borderColor: "#0DFF89" }, { borderColor: "white" }], {
      duration: 3000,
    });
  }
  //
  const staticInputs = document
    .getElementById("text-input-container")
    .querySelectorAll("input");
  for (let input of staticInputs) {
    input.animate(
      [{ borderBottomColor: "#0DFF89" }, { borderBottomColor: "white" }],
      {
        duration: 3000,
      }
    );
  }
  //
  const services = document.querySelectorAll("#price-group");
  for (let service of services) {
    service.animate(
      [{ borderBottomColor: "#0DFF89" }, { borderBottomColor: "white" }],
      {
        duration: 3000,
      }
    );
  }
};
