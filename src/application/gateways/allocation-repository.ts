import {
  OffsetPaginationInput,
  OffsetPaginationOutput,
} from '@/domain/interfaces';

export interface OrderAllocation {
  id: string;
  deliveryAt: string;
}

export interface AllocationRepository {
  save: (allocations: OrderAllocation[]) => Promise<void>;
  list: (
    input?: OffsetPaginationInput,
  ) => Promise<OffsetPaginationOutput<OrderAllocation>>;
}
