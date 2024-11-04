export class OrderEntity {
  private _id: string;
  private _customerId: string;
  
  constructor(params: {id:string, customerId: string}) {
    this._id = params.id; 
    this._customerId = params.customerId;
    this.validate();
  }

  validate(): boolean {
    if(this._id.length === 0)throw new Error('Id is required')
    if (this._customerId.length === 0) throw new Error("Customer Id is required");
    return true;
  }

  get id(): string {
    return this._id;
  }

  get customerId(): string {
    return this._customerId;
  }
}
