import {
  OffsetPaginationInput,
  OffsetPaginationOutput,
  UseCase,
} from '@/domain/interfaces';
import { AllocationRepository, OrderAllocation } from '../gateways';

export type ListAllocationsInput = OffsetPaginationInput;

export type ListAllocationsOutput = OffsetPaginationOutput<OrderAllocation>;

export class ListAllocations
  implements UseCase<ListAllocationsInput, ListAllocationsOutput>
{
  constructor(private readonly allocationRepository: AllocationRepository) {}

  async execute(input?: ListAllocationsInput): Promise<ListAllocationsOutput> {
    // could receive information about the logged user too and
    // validate if it has permission to list allocations
    return this.allocationRepository.list(input);
  }
}
