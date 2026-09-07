function wireSystem(root) {
  const nodes = [...root.querySelectorAll(".node")];
  const steps = [...root.querySelectorAll(".steps li")];
  if (!nodes.length || !steps.length) return;

  const activate = (id) => {
    nodes.forEach((node) => node.classList.toggle("is-on", node.dataset.step === id));
    steps.forEach((step) => step.classList.toggle("is-on", step.dataset.step === id));
  };

  nodes.forEach((node) => {
    const pick = () => activate(node.dataset.step);
    node.addEventListener("mouseenter", pick);
    node.addEventListener("click", pick);
  });

  steps.forEach((step) => {
    step.addEventListener("mouseenter", () => activate(step.dataset.step));
    step.addEventListener("click", () => activate(step.dataset.step));
  });
}

document.querySelectorAll(".system").forEach(wireSystem);
