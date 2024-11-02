import { Sequelize } from "sequelize-typescript";
import { OrderModel } from "../../db/sequelize/models/order.model";
import OrderRepositoryInterface from "../../../domain/order/orderRepository.interface";
import { OrderEntity } from "../../../domain/order/order.entity";
import { OrderRespository } from "./orderRepository";

describe('Order Repository test', () => {
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

  it('should find an order by id', async () => {
    const order = new OrderEntity({ id: '1234', customerId: '1' });

    const order_repository: OrderRepositoryInterface = new OrderRespository()

    await order_repository.create(order);

    const foundOrder = await order_repository.findById(order.id);
    expect(foundOrder).toStrictEqual(order);
  });

  it('should retrieve all orders', async () => {
    const order1 = new OrderEntity({ id: '1234', customerId: '1' });
    const order2 = new OrderEntity({ id: '5678', customerId: '2' });


    const order_repository: OrderRepositoryInterface = new OrderRespository()

    await order_repository.create(order1);
    await order_repository.create(order2);

    const allOrders = await order_repository.findAll();

    expect(allOrders).toHaveLength(2);
  });

  it('should update an existing order', async () => {
    const order = new OrderEntity({ id: '1234', customerId: '1' });

    const order_repository: OrderRepositoryInterface = new OrderRespository()

    await order_repository.create(order);

    const updatedOrder = new OrderEntity({ id: '1234', customerId: '2' });
    const result = await order_repository.update(updatedOrder);

    expect(result).toBe(true);

    const orderModel = await OrderModel.findOne({ where: { id: order.id } });
    expect(orderModel?.toJSON()).toStrictEqual({
      id: updatedOrder.id,
      customerId: updatedOrder.customerId,
    });
  });


})