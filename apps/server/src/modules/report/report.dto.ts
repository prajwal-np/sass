import { ApiProperty } from '@nestjs/swagger';

export class ReportRequest {
  @ApiProperty()
  type: string;

  @ApiProperty()
  startDate?: string;

  @ApiProperty()
  endDate?: string;

  @ApiProperty()
  reportType: string;
}

export class DateRange {
  @ApiProperty({
    type: 'string',
    default: new Date(),
  })
  fromDate: string;

  @ApiProperty({
    type: 'string',
    default: new Date(),
  })
  toDate: string;
}
