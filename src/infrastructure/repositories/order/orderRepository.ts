import { OrderEntity } from "../../../domain/order/order.entity";
import OrderRepositoryInterface from "../../../domain/order/orderRepository.interface";
import { OrderModel } from "../../db/sequelize/models/order.model";

export class OrderRespository implements OrderRepositoryInterface  {

  async findAll(): Promise<OrderEntity[]> {
    
    const ordersModel = await OrderModel.findAll();

    const orders = ordersModel.map(order => {
      return new OrderEntity({
        id: order.id,
        customerId: order.customerId
      })
    })
    
    return orders;

  }

  async findById(id: string): Promise<OrderEntity> {
    const orderModel = await OrderModel.findOne({where: {id}});

    if(!orderModel) throw new Error(`Order ${id} not found`);

    return new OrderEntity({
      id: orderModel.id,
      customerId: orderModel.customerId
    })
  }

  async update(entity: OrderEntity): Promise<boolean> {
    
    const affectedCount = await OrderModel.update({customerId: entity.customerId}, {where: {id: entity.id}})

    if (affectedCount[0] == 0) {
      return false;
    }

    return true;
  }

  async create(entity: OrderEntity): Promise<OrderEntity> {
    const orderModel =  await OrderModel.create({id: entity.id, customerId: entity.customerId})

    return new OrderEntity({
      id: orderModel.id,
      customerId: orderModel.customerId
    })
  }
}