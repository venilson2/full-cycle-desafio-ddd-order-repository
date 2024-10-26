import RepositoryInterface from '../@sahred/interfaces/repository.interface';
import { OrderEntity } from './order.entity';

export default interface OrderRepositoryInterface extends RepositoryInterface<OrderEntity> {
}
