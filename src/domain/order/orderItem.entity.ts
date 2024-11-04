import { v4 as uuid } from 'uuid'

export class OrderItemEntity {
  private _id: string;
  private _productId: string;
  private _quantity: number;
  private _price: number;
  private _orderId: string;
  
  constructor(params: {
    id?: string,
    productId: string,
    quantity: number,
    price: number,
    orderId: string
  }) {
    this._id = params.id || uuid();
    this._productId = params.productId;
    this._quantity = params.quantity;
    this._price = params.price;
    this._orderId = params.orderId
  }

  get id(): string {
    return this._id;
  }

  get productId(): string {
    return this._productId;
  }

  get quantity(): number {
    return this._quantity;
  }

  get price(): number {
    return this._price;
  }

  get orderId(): string {
    return this._orderId;
  }

  set productId(productId: string) {
    this._productId = productId
  }

  set quantity(quantity: number) {
    if (quantity <= 0) {
      throw new Error("Quantity must be greater than zero.");
    }
    this._quantity = quantity;
  }

  set price(price: number) {
    if (price <= 0) {
      throw new Error("Price must be greater than zero.");
    }
    this._price = price;
  }
} 