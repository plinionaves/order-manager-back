import { SalesOrder } from '@/domain/entities';
import { OrderRepository } from '@/application/gateways';

const initialSalesOrders: SalesOrder[] = [
  new SalesOrder({ id: 'S1', created: '2020-01-02', quantity: 6 }),
  new SalesOrder({ id: 'S2', created: '2020-11-05', quantity: 2 }),
  new SalesOrder({ id: 'S3', created: '2019-12-04', quantity: 3 }),
  new SalesOrder({ id: 'S4', created: '2019-01-20', quantity: 2 }),
  new SalesOrder({ id: 'S5', created: '2019-12-05', quantity: 9 }),
];

export class InMemorySalesOrderRepository
  implements OrderRepository<SalesOrder>
{
  private readonly orders: SalesOrder[];

  constructor(initialOrders = initialSalesOrders) {
    this.orders = initialOrders;
  }

  async list() {
    return this.orders;
  }
}
