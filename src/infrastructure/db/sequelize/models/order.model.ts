import { Column, Model, PrimaryKey, Table, DataType } from 'sequelize-typescript';

@Table({
  tableName: "orders",
  timestamps: false,
})
export class OrderModel extends Model {
  
  @PrimaryKey
  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare id: string; 

  @Column({
    type: DataType.STRING,
    allowNull: false
  })
  declare customerId: string;

}
