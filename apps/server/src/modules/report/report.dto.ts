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
