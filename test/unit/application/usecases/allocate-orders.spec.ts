import { AllocateOrders } from '@/application/usecases';
import { PurchaseOrder, SalesOrder } from '@/domain/entities';
import {
  InMemoryAllocationRepository,
  InMemoryPurchaseOrderRepository,
  InMemorySalesOrderRepository,
} from '@/infra/in-memory';
import { expectedAllocations } from '@/test/mocks';

function makeSut(
  initialSalesOrders: SalesOrder[] = null,
  initialPurchaseOrders: PurchaseOrder[] = null,
) {
  const salesOrderRepository = !initialSalesOrders
    ? new InMemorySalesOrderRepository()
    : new InMemorySalesOrderRepository(initialSalesOrders);
  const purchaseOrderRepository = !initialPurchaseOrders
    ? new InMemoryPurchaseOrderRepository()
    : new InMemoryPurchaseOrderRepository(initialPurchaseOrders);
  const allocationRepository = new InMemoryAllocationRepository();
  const sut = new AllocateOrders(
    salesOrderRepository,
    purchaseOrderRepository,
    allocationRepository,
  );

  return {
    sut,
    salesOrderRepository,
    purchaseOrderRepository,
    allocationRepository,
  };
}

describe('Allocate Orders', () => {
  describe('should return allocation list correctly', () => {
    test('using challenge input', async () => {
      const { sut } = makeSut();

      const result = await sut.execute();

      expect(result).toHaveLength(4);
      expect(result).toStrictEqual(expectedAllocations);
    });

    test('using custom input', async () => {
      const initialSalesOrders = [
        new SalesOrder({ id: 'S1', created: '2024-03-03', quantity: 5 }),
        new SalesOrder({ id: 'S2', created: '2024-03-15', quantity: 3 }),
      ];
      const initialPurchaseOrders = [
        new PurchaseOrder({ id: 'P1', receiving: '2024-02-25', quantity: 4 }),
        new PurchaseOrder({ id: 'P2', receiving: '2024-02-28', quantity: 2 }),
        new PurchaseOrder({ id: 'P2', receiving: '2024-03-07', quantity: 2 }),
      ];
      const { sut } = makeSut(initialSalesOrders, initialPurchaseOrders);

      const result = await sut.execute();

      expect(result).toHaveLength(2);
      expect(result).toStrictEqual([
        { id: 'S1', deliveryAt: '2024-03-06' },
        { id: 'S2', deliveryAt: '2024-03-15' },
      ]);
    });
  });

  test('should process the flow correctly', async () => {
    const {
      sut,
      allocationRepository,
      purchaseOrderRepository,
      salesOrderRepository,
    } = makeSut();
    const salesOrdersListSpy = jest.spyOn(salesOrderRepository, 'list');
    const purchaseOrdersListSpy = jest.spyOn(purchaseOrderRepository, 'list');
    const allocationSaveSpy = jest.spyOn(allocationRepository, 'save');

    await sut.execute();

    expect(salesOrdersListSpy).toHaveBeenCalledTimes(1);
    expect(purchaseOrdersListSpy).toHaveBeenCalledTimes(1);
    expect(allocationSaveSpy).toHaveBeenCalledTimes(1);
    expect(allocationSaveSpy).toHaveBeenCalledWith(expectedAllocations);
  });
});
