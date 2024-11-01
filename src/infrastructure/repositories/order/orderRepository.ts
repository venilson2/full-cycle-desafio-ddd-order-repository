import { OrderEntity } from "../../../domain/order/order.entity";
import OrderRepositoryInterface from "../../../domain/order/orderRepository.interface";
import { OrderModel } from "../../db/sequelize/models/order.model";

export class OrderRespository implements OrderRepositoryInterface  {

  async create(entity: OrderEntity): Promise<OrderEntity> {
    const orderModel =  await OrderModel.create({id: entity.id, customerId: entity.customerId})
    
    return new OrderEntity({
      id: orderModel.id,
      customerId: orderModel.customerId
    })
  }
}