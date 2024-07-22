class PathBlock {
  data: { items?: string[] };

  constructor(data: { data?: { items?: string[] } } = {}) {
    this.data = data.data && data.data.items ? data.data : { items: [] };
  }

  static get toolbox() {
    return {
      title: "Caminho",
      icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-grid"><rect x="3" y="3" width="7" height="7"></rect><rect x="14" y="3" width="7" height="7"></rect><rect x="14" y="14" width="7" height="7"></rect><rect x="3" y="14" width="7" height="7"></rect></svg>',
    };
  }

  render() {
    const container = document.createElement("div");
    const title = document.createElement("p");
    const input = document.createElement("input");

    container.className = "w-full p-3 my-3";
    title.className = "text-gray-600 text-sm font-medium mb-3";
    title.textContent = "Digite o caminho (separando por ponto e vírgula):";
    input.className = "w-full cdx-input";
    input.placeholder = "ex: Módulos; Execução Orçamentária; Despesa; etc";
    input.id = `path-${new Date().getTime()}`;
    input.value = (this.data.items || []).join("; ");

    input.addEventListener("input", (event) => {
      const value = (event.target as HTMLInputElement).value;
      this.data.items = value.split(";").map((item) => item.trim());
    });

    container.appendChild(title);
    container.appendChild(input);
    return container;
  }

  save(blockContent: HTMLElement) {
    const input = blockContent.querySelector("input")!;
    return {
      items: input.value.split(";").map((item) => item.trim()),
    };
  }
}

export default PathBlock;
