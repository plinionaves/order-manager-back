import { PurchaseOrder, SalesOrder } from '@/domain/entities';
import { UseCase } from '@/domain/interfaces';
import { quickSort } from '@/domain/algorithms/sorting';
import {
  AllocationRepository,
  OrderAllocation,
  OrderRepository,
} from '../gateways';

export interface AllocateOrdersInput {
  daysToAdd?: number;
}

export type AllocateOrdersOutput = OrderAllocation[];

export class AllocateOrders
  implements UseCase<AllocateOrdersInput, AllocateOrdersOutput>
{
  constructor(
    private readonly salesOrderRepository: OrderRepository<SalesOrder>,
    private readonly purchaseOrderRepository: OrderRepository<PurchaseOrder>,
    private readonly allocationRepository: AllocationRepository,
  ) {}

  async execute(input?: AllocateOrdersInput): Promise<AllocateOrdersOutput> {
    let [salesOrders, purchaseOrders] = await Promise.all([
      this.salesOrderRepository.list(),
      this.purchaseOrderRepository.list(),
    ]);

    [salesOrders, purchaseOrders] = await Promise.all([
      quickSort(structuredClone(salesOrders), SalesOrder.compare),
      quickSort(structuredClone(purchaseOrders), PurchaseOrder.compare),
    ]);

    const { daysToAdd = 7 } = input ?? {};
    const additionalDays = daysToAdd * 24 * 60 * 60 * 1000;
    const allocations: OrderAllocation[] = [];

    let j = 0;

    for (let i = 0; i < salesOrders.length; i++) {
      if (j >= purchaseOrders.length) {
        break;
      }

      const salesOrder = salesOrders[i];

      while (j < purchaseOrders.length && salesOrder.quantity > 0) {
        const purchaseOrder = purchaseOrders[j];

        if (purchaseOrder.quantity >= salesOrder.quantity) {
          const receivingDate = new Date(purchaseOrder.receiving);
          const salesDate = new Date(salesOrder.created);
          const receivingDatePlusDays = new Date(
            receivingDate.getTime() + additionalDays,
          );
          let deliveryAt: Date;

          if (receivingDatePlusDays > salesDate) {
            deliveryAt = receivingDatePlusDays;
          } else {
            deliveryAt = salesDate;
          }

          allocations.push({
            id: salesOrder.id,
            deliveryAt: deliveryAt.toISOString().slice(0, 10),
          });

          purchaseOrder.quantity -= salesOrder.quantity;
          salesOrder.quantity = 0;
        } else {
          salesOrder.quantity -= purchaseOrder.quantity;
          purchaseOrder.quantity = 0;
          j++;
        }
      }
    }

    await this.allocationRepository.save(allocations);

    return allocations;
  }
}
