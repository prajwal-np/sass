import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ExcelService } from 'src/service/excel.service';

@Module({
  imports: [],
  providers: [ReportService, ExcelService],
  controllers: [ReportController],
})
export class ReportModule {}
