export default class Tooltip {
  constructor() {
    this._tooltips = [];
  }

  showTooltip(message, element) {
    const tooltipElement = document.createElement('DIV');
    const titleElement = document.createElement('div');
    const textElement = document.createElement('div');

    tooltipElement.classList.add('form-error');
    titleElement.classList.add('form-error-title');
    textElement.classList.add('form-error-text');

    // tooltipElement.textContent = message;
    titleElement.textContent = element.name;
    textElement.textContent = message;

    tooltipElement.appendChild(titleElement);
    tooltipElement.appendChild(textElement);

    const id = performance.now();

    this._tooltips.push({
      id,
      element: tooltipElement,
    });

    document.body.appendChild(tooltipElement);

    const { left, top } = element.getBoundingClientRect();

    tooltipElement.style.display = 'inline-block';
    tooltipElement.style.left = `${left + element.offsetWidth / 2 - tooltipElement.offsetWidth / 2}px`;
    tooltipElement.style.top = `${top - 5 - tooltipElement.offsetHeight}px`;

    return id;
  }

  removeTooltip(id) {
    const tooltipIndex = this._tooltips.findIndex((t) => t.id === id);

    if (tooltipIndex !== -1) {
      this._tooltips[tooltipIndex].element.remove();
      this._tooltips.splice(tooltipIndex, 1); // Используйте splice для удаления элемента из массива
    }
  }
}
