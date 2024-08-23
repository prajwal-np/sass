import {
  Body,
  Controller,
  Get,
  Header,
  Post,
  Query,
  Res,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ReportService } from './report.service';
import { response, Response } from 'express';
import { DateRange } from './report.dto';

@ApiTags('Report')
@Controller()
export class ReportController {
  constructor(private readonly reportService: ReportService) {}

  @Get('/card')
  createReport() {
    return this.reportService.getReport();
  }

  @Get('/line-chart')
  getLineCart() {
    return this.reportService.getLineChart();
  }

  @Get('/bar-chart')
  getBarChart() {
    return this.reportService.getTodaySales();
  }

  @Get('/payment-overview')
  getPaymentOverview() {
    return this.reportService.getPaymentOverview();
  }

  @Get('/order-overview')
  getOrderOverview() {
    return this.reportService.getOrderOverview();
  }

  @Get('/report-download')
  async getReport(@Query() dto: DateRange, @Res() response: Response) {
    console.log(dto.fromDate);
    const uint8Array = await this.reportService.generateMonthlySalesReport(
      new Date(dto.fromDate),
      new Date(dto.toDate),
    );
    response.setHeader(
      'Content-Type',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    );
    response.setHeader(
      'Content-Disposition',
      'attachment; filename=monthly_sales_report.xlsx',
    );
    response.send(uint8Array);
  }
}
