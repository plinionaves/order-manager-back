import { PurchaseOrder } from '@/domain/entities';
import { OrderRepository } from '@/application/gateways';

const initialPurchaseOrders: PurchaseOrder[] = [
  new PurchaseOrder({ id: 'P1', receiving: '2020-01-04', quantity: 4 }),
  new PurchaseOrder({ id: 'P2', receiving: '2020-01-05', quantity: 3 }),
  new PurchaseOrder({ id: 'P3', receiving: '2019-02-01', quantity: 5 }),
  new PurchaseOrder({ id: 'P4', receiving: '2019-03-05', quantity: 1 }),
  new PurchaseOrder({ id: 'P5', receiving: '2019-02-20', quantity: 7 }),
];

export class InMemoryPurchaseOrderRepository
  implements OrderRepository<PurchaseOrder>
{
  private readonly orders: PurchaseOrder[];

  constructor(initialOrders = initialPurchaseOrders) {
    this.orders = initialOrders;
  }

  async list() {
    return this.orders;
  }
}
