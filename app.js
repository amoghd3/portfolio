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
  const items = [...document.querySelectorAll("[data-work-item]")];
  if (!tabs.length) return;

  const ids = new Set(panels.map((panel) => panel.dataset.workPanel));
  const aliases = { excel: "ducky" };
  let openId = "";

  const resolve = (id) => {
    if (ids.has(id)) return id;
    const aliased = aliases[id];
    return aliased && ids.has(aliased) ? aliased : "";
  };

  const show = (id, scroll) => {
    const next = resolve(id);
    openId = next;
    tabs.forEach((tab) => {
      const on = tab.dataset.workTab === next;
      tab.classList.toggle("is-on", on);
      tab.setAttribute("aria-selected", on ? "true" : "false");
      tab.setAttribute("aria-expanded", on ? "true" : "false");
    });
    panels.forEach((panel) => {
      panel.hidden = panel.dataset.workPanel !== next;
    });
    items.forEach((item) => {
      item.classList.toggle("is-open", item.dataset.workItem === next);
    });
    const nextHash = next ? `#${next}` : "";
    if (location.hash !== nextHash) {
      history.replaceState(null, "", nextHash || location.pathname);
    }
    if (scroll && next) {
      const item = items.find((entry) => entry.dataset.workItem === next);
      item?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      const id = tab.dataset.workTab;
      show(openId === id ? "" : id, true);
    });
  });

  const fromHash = () => {
    const id = location.hash.slice(1);
    show(resolve(id), false);
  };

  window.addEventListener("hashchange", fromHash);
  fromHash();
}

document.querySelectorAll(".map").forEach(wireMap);
wireWork();
