import { Sequelize } from "sequelize-typescript";
import { OrderModel } from "../../db/sequelize/models/order.model";
import OrderRepositoryInterface from "../../../domain/order/orderRepository.interface";
import { OrderEntity } from "../../../domain/order/order.entity";
import { OrderRespository } from "./orderRepository";

describe('Oreder Repository test', () => {
  let sequelize: Sequelize;

  beforeEach(async () => {

    sequelize = new Sequelize({
      dialect: 'sqlite',
      storage: ':memory:',
      logging: false,
      sync: {force: true}
    });

    sequelize.addModels([OrderModel]);
    await sequelize.sync();
  })

  afterEach(async () => {
    await sequelize.close();
  })

  it('should create a new order', async () => {

    const customer = {
      id: '1',
      name: 'full cycle'
    }
    
    const order = new OrderEntity({
      id: '1234',
      customerId: customer.id,
    })

    const order_repository: OrderRepositoryInterface = new OrderRespository()

    await order_repository.create(order)

    const orderModel = await OrderModel.findOne({
      where: {
        id: order.id
      }
    })

    expect(orderModel?.toJSON()).toStrictEqual({
      id: order.id,
      customerId: customer.id,
    })
  })

})