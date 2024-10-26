import { Column, Model, PrimaryKey, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: 'orders',
  timestamps: true
})
export class OrderModel extends Model<OrderModel> {
  
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare id: string; 

}
