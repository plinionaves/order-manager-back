import { ApiProperty } from '@nestjs/swagger';
import { OffsetPaginationDto } from './pagination.dto';

export class AllocationDto {
  @ApiProperty()
  id: string;

  @ApiProperty({ example: '2019-02-08' })
  deliveryAt: string;
}

export class AllocationPaginationDto {
  @ApiProperty({ type: () => [AllocationDto] })
  data: AllocationDto[];

  @ApiProperty()
  meta: OffsetPaginationDto;
}

export class AllocateOrdersDto {
  @ApiProperty({ type: Number, example: 7 })
  daysToAdd: number;
}
