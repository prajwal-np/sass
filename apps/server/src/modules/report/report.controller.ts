import { Controller, Get, Header, Res } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReportService } from './report.service';
import { Response } from 'express';

@ApiTags('Report')
@Controller()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('')
  @Header('Content-type', 'text/xlsx')
  async createReport(@Res() res: Response) {
    const buffer = await this.reportService.getReport();
    return res.download(buffer);
  }
}
