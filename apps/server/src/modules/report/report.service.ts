import { Injectable } from '@nestjs/common';
import { ExcelService } from 'src/service/excel.service';

@Injectable()
export class ReportService {
  constructor(private excelService: ExcelService) {}

  getReport() {
    return this.excelService.createExcel(
      `${Date.now()}.xlsx`,
      [
        { header: 'No', key: 'no' },
        { header: 'Name', key: 'name' },
      ],
      [],
    );
  }
}
