export class ComponentLoader {
  static async loadComponents(components) {
    return Promise.all(
      Object.entries(components).map(([elementId, filePath]) =>
        this.loadComponent(elementId, filePath)
      )
    );
  }

  static async loadComponent(elementId, filePath) {
    try {
      const response = await fetch(filePath);
      const data = await response.text();
      const element = document.getElementById(elementId);
      if (element) {
        element.innerHTML = data;
      }
    } catch (error) {
      console.error(`Error loading ${elementId}:`, error);
    }
  }
}
