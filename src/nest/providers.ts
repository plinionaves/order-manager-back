import { Provider } from '@nestjs/common';
import { AllocateOrders, ListAllocations } from '@/application/usecases';
import {
  InMemoryAllocationRepository,
  InMemoryPurchaseOrderRepository,
  InMemorySalesOrderRepository,
} from '@/infra/in-memory';

type ProviderMap = Record<string, Provider>;

export const REPOSITORIES: ProviderMap = {
  IN_MEMORY_SALES_ORDER_REPOSITORY: {
    provide: InMemorySalesOrderRepository,
    useFactory: () => new InMemorySalesOrderRepository(),
  },
  IN_MEMORY_PURCHASE_ORDER_REPOSITORY: {
    provide: InMemoryPurchaseOrderRepository,
    useFactory: () => new InMemoryPurchaseOrderRepository(),
  },
  IN_MEMORY_ALLOCATION_REPOSITORY: {
    provide: InMemoryAllocationRepository,
    useFactory: () => new InMemoryAllocationRepository(),
  },
};

// here I simplified the providers, but I could use 'useFactory' to
// decide which implementation (in-memory, postgres, etc) to use based
// on the env or another param. For example, for local development, I
// could use in -memory and for production, I could use postgres
export const USECASES: ProviderMap = {
  ALLOCATE_ORDERS: {
    provide: AllocateOrders,
    useFactory: (
      salesOrderRepository,
      purchaseOrderRepository,
      allocationRepository,
    ) =>
      new AllocateOrders(
        salesOrderRepository,
        purchaseOrderRepository,
        allocationRepository,
      ),
    inject: [
      InMemorySalesOrderRepository,
      InMemoryPurchaseOrderRepository,
      InMemoryAllocationRepository,
    ],
  },
  LIST_ALLOCATIONS: {
    provide: ListAllocations,
    useFactory: (allocationRepository) =>
      new ListAllocations(allocationRepository),
    inject: [InMemoryAllocationRepository],
  },
};

export const PROVIDERS = { REPOSITORIES, USECASES };
