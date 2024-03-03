import { ApiProperty } from '@nestjs/swagger';

export class OffsetPaginationDto {
  @ApiProperty()
  total: number;

  @ApiProperty()
  hasNextPage: boolean;

  @ApiProperty()
  hasPreviousPage: boolean;
}
