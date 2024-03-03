import { AllocationRepository, OrderAllocation } from '@/application/gateways';
import {
  OffsetPaginationInput,
  OffsetPaginationOutput,
} from '@/domain/interfaces';

export class InMemoryAllocationRepository implements AllocationRepository {
  private allocations: OrderAllocation[] = [];

  async save(allocations: OrderAllocation[]): Promise<void> {
    this.allocations = allocations;
  }

  async list(
    input?: OffsetPaginationInput,
  ): Promise<OffsetPaginationOutput<OrderAllocation>> {
    const { page = 1, pageSize = 10 } = input ?? {};

    const start = (page - 1) * pageSize;
    const end = start + pageSize;

    const data = this.allocations.slice(start, end);

    return {
      data,
      meta: {
        hasNextPage: end < this.allocations.length,
        hasPreviousPage: page > 1,
        total: this.allocations.length,
      },
    };
  }
}
