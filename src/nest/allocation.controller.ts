import { ApiQuery, ApiResponse } from '@nestjs/swagger';
import { Body, Controller, Get, HttpStatus, Post, Query } from '@nestjs/common';
import { AllocateOrders, ListAllocations } from '@/application/usecases';
import {
  AllocateOrdersDto,
  AllocationDto,
  AllocationPaginationDto,
} from './dto';

@Controller('allocations')
export class AllocationController {
  constructor(
    private readonly allocateOrders: AllocateOrders,
    private readonly listAllocations: ListAllocations,
  ) {}

  @ApiResponse({ status: HttpStatus.CREATED, type: [AllocationDto] })
  @Post()
  async allocate(@Body() body: AllocateOrdersDto) {
    return await this.allocateOrders.execute(body);
  }

  @ApiResponse({ status: HttpStatus.OK, type: AllocationPaginationDto })
  @ApiQuery({ name: 'page', required: false, type: String, example: 1 })
  @ApiQuery({ name: 'pageSize', required: false, type: String, example: 10 })
  @Get()
  async list(@Query('page') page: number, @Query('pageSize') pageSize: number) {
    return await this.listAllocations.execute({ page, pageSize });
  }
}
