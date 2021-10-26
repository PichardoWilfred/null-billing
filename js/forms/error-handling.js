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
