import { Module } from '@nestjs/common';
import { ReportService } from './report.service';
import { ReportController } from './report.controller';
import { ExcelService } from 'src/service/excel.service';
import { ConnectionService } from '../connection/connection.service';

@Module({
  imports: [],
  providers: [ReportService, ExcelService, ConnectionService],
  controllers: [ReportController],
})
export class ReportModule {}
