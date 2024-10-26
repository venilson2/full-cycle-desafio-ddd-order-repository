import { v7 as uuid } from 'uuid'
import { OrderItemEntity } from "./orderItem.entity";

export class OrderEntity {
    private id: string;
    private customerId: string;
    private items: OrderItemEntity[] = [];
  
  constructor(params: {id?:string, customerId?: string}) {
      this.id = params.id || uuid();
      this.customerId = params.customerId || uuid();
  }

  public addItem(productId: string, quantity: number, price: number): void {
      if (quantity <= 0) {
          throw new Error("Quantity must be greater than zero.");
      }
      if (price <= 0) {
          throw new Error("Price must be greater than zero.");
      }
      
      const existingItem = this.items.find(item => item.productId === productId);
      
      if (existingItem) {
          existingItem.quantity += quantity;
      } else {

        const order = new OrderEntity({});

        const orderItem = new OrderItemEntity({
          productId: productId,
          quantity: quantity,
          price: price,
          orderId: order.id
        });
        this.items.push(orderItem);
      }
  }

  public removeItem(productId: string): void {
      const itemIndex = this.items.findIndex(item => item.productId === productId);
      
      if (itemIndex === -1) {
          throw new Error("Item not found in order.");
      }
      
      this.items.splice(itemIndex, 1);
  }

  public calculateTotal(): number {
      return this.items.reduce((total, item) => total + (item.price * item.quantity), 0);
  }

  public getId(): string {
    return this.id;
  }

  public getItems(): OrderItemEntity[] {
    return this.items;
  }

  public getCustomerId(): string {
    return this.customerId;
  }
}
