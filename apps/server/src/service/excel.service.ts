// src/pusher/pusher.service.ts
import { Injectable } from '@nestjs/common';
import { Column, Workbook } from 'exceljs';
import * as tmp from 'tmp';
@Injectable()
export class ExcelService {
  async createExcel(
    name: string,
    columns: Partial<Column>[],
    data: any,
  ): Promise<any> {
    let resfile = null;
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet(name);
    worksheet.columns = columns;
    const tempData = [
      { no: '1', name: 'Muhammad Ichsan' },
      { no: '2', name: 'Muhammad Amin' },
    ];
    worksheet.addRows(tempData);
    tmp.file(
      {
        name: name,
        discardDescriptor: true,
        prefix: 'MyExcelService',
        postfix: 'xlsx',
        mode: parseInt('0600', 8),
      },
      async (err, file) => {
        const buffer = await workbook.xlsx.writeFile(file).then((res) => {
          console.log(res);
        });
        console.log(buffer);
        resfile = buffer;
      },
    );
    console.log(resfile);
    return resfile;
  }
}
