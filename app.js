function wireMap(root) {
  const nodes = [...root.querySelectorAll(".node")];
  const steps = [...root.querySelectorAll(".steps li")];
  const card = root.querySelector(".step-card");
  if (!nodes.length) return;

  const activate = (id) => {
    nodes.forEach((node) => node.classList.toggle("is-on", node.dataset.step === id));
    steps.forEach((step) => step.classList.toggle("is-on", step.dataset.step === id));
    const match = steps.find((step) => step.dataset.step === id);
    if (card && match) card.textContent = match.textContent;
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

function wireWork() {
  const tabs = [...document.querySelectorAll("[data-work-tab]")];
  const panels = [...document.querySelectorAll("[data-work-panel]")];
  if (!tabs.length) return;

  const ids = new Set(panels.map((panel) => panel.dataset.workPanel));

  const show = (id) => {
    if (!ids.has(id)) return;
    tabs.forEach((tab) => {
      const on = tab.dataset.workTab === id;
      tab.classList.toggle("is-on", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.workPanel !== id;
    });
    if (location.hash !== `#${id}`) {
      history.replaceState(null, "", `#${id}`);
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => show(tab.dataset.workTab));
  });

  const fromHash = () => {
    const id = location.hash.slice(1);
    if (id && ids.has(id)) {
      show(id);
      return;
    }
    show("studio");
  };

  window.addEventListener("hashchange", fromHash);
  fromHash();
}

document.querySelectorAll(".map").forEach(wireMap);
wireWork();
