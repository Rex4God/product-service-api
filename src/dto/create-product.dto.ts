export class CreateProductDTO {
    name: string;
    description: string;
    price: number;
    category: string;
  
    constructor(name: string, description: string, price: number, category: string) {
      this.name = name;
      this.description = description;
      this.price = price;
      this.category = category;
    }
  }
  