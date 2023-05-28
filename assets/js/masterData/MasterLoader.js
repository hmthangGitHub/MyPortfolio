import { MasterProjectContainer } from './MasterProjectContainer.js';
import { MasterProjectMetaDataContainer } from './MasterProjectMetaDataContainer.js';

export class MasterLoader {
  static async createInstance(className) {
    const filePath = `./assets/js/masterData/json/${className.replace('Container', '')}.json`;  

    try {
      const response = await fetch(filePath);
      const data = await response.json();
      const ClassObject = eval(className); // Create a reference to the class using its name
      return new ClassObject(data);
    } catch (error) {
      console.error(`Error loading data for ${className} from ${filePath}:`, error);
      throw error;
    }
  }
}