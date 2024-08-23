import { Inject, Injectable, StreamableFile } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ExcelService } from 'src/service/excel.service';
import { ConnectionService } from '../connection/connection.service';
import { Order } from 'src/entity/order.entity';
import * as ExcelJS from 'exceljs';
import { Between } from 'typeorm';
@Injectable()
export class ReportService {
  private tenantId: string;
  constructor(
    private excelService: ExcelService,
    @Inject(REQUEST) private readonly request,
    private readonly connectionService: ConnectionService,
  ) {
    this.tenantId = this.request.tenantId;
  }

  async getReport() {
    const orderRepo = await this.connectionService.getRepository(
      Order,
      this.tenantId,
    );
    const totalRevenue = (await orderRepo
      .createQueryBuilder('order')
      .select('SUM(order.totalAmount)', 'total')
      .getRawOne()) as { total: string };
    const totalOrderCount = await orderRepo
      .createQueryBuilder('order')
      .getCount();

    const startDate = new Date(new Date().setHours(0, 0, 0, 0)); // 12:00 AM
    const endDate = new Date(new Date().setHours(23, 59, 59, 999)); // 11:59 PM
    const totalOrderTodayCount = await orderRepo
      .createQueryBuilder('order')
      .where('order.created_at BETWEEN :startDate AND :endDate', {
        startDate,
        endDate,
      })
      .getCount();
    return {
      totalRevenue: totalRevenue.total,
      totalOrderCount,
      totalOrderTodayCount,
    };
  }

  async getTodaySales() {
    const res = [];
    let currentDay = new Date().getDate();
    const currentMonth = new Date().getMonth() + 1;
    const currentYear = new Date().getFullYear();
    while (currentDay > 0) {
      const orderRepo = await this.connectionService.getRepository(
        Order,
        this.tenantId,
      );
      const startDate = new Date(
        new Date(`${currentYear}-${currentMonth}-${currentDay}`).setHours(
          9,
          0,
          0,
          0,
        ),
      ); // 12:00 AM
      const endDate = new Date(
        new Date(`${currentYear}-${currentMonth}-${currentDay}`).setHours(
          23,
          59,
          59,
          999,
        ),
      ); // 11:59 PM
      const totalOrderTodayCount = await orderRepo
        .createQueryBuilder('order')
        .select('SUM(order.totalAmount)', 'total')
        .where('order.created_at BETWEEN :startDate AND :endDate', {
          startDate,
          endDate,
        })
        .getRawMany();
      if (totalOrderTodayCount.length) {
        res.push({
          label: `${new Date().getMonth()}/${currentDay}`,
          data: totalOrderTodayCount[0].total || '0',
        });
      }
      currentDay--;
    }

    return res;
    // .select('SUM(order.totalAmount)', 'total');
  }

  async getLineChart() {
    const startTime = '9:00';
    const endTime = '22:00';
    const now = new Date();
    const getCurrentDayTime = new Date(new Date(now).setHours(9, 0, 0, 0));
    const orderRepo = await this.connectionService.getRepository(
      Order,
      this.tenantId,
    );
    const data = await orderRepo
      .createQueryBuilder('order')
      .where('order.created_at BETWEEN :startDate AND :endDate', {
        startDate: new Date(new Date(now).setHours(9, 0, 0, 0)),
        endDate: new Date(new Date().setHours(23, 59, 59, 999)),
      })
      .getMany();
    let start = Number(startTime.split(':')[0]);
    const end = Number(endTime.split(':')[0]);
    const res = [];
    while (start < end) {
      const minDate = new Date(getCurrentDayTime.setHours(start)).getTime();
      const maxDate = new Date(getCurrentDayTime.setHours(start + 1)).getTime();
      const filteredData =
        data.filter(
          (dt) =>
            new Date(dt.created_at).getTime() >= minDate &&
            new Date(dt.created_at).getTime() <= maxDate,
        ) || [];
      const totalSum: number =
        filteredData.length > 1
          ? (filteredData.reduce((a, b): any =>
              typeof a === 'number'
                ? a + b.totalAmount
                : b
                ? a.totalAmount + b.totalAmount
                : a.totalAmount,
            ) as unknown as any)
          : filteredData.length == 1
          ? filteredData[0].totalAmount
          : 0;
      res.push({
        label: new Date(getCurrentDayTime.setHours(start))
          .toTimeString()
          .split(' ')[0],
        data: totalSum,
      });
      start++;
    }
    return res;
  }

  async getPaymentOverview() {
    const orderRepo = await this.connectionService.getRepository(
      Order,
      this.tenantId,
    );
    const totals = await orderRepo
      .createQueryBuilder('order')
      .select('order.paymentMethod', 'paymentMethod')
      .addSelect('SUM(order.totalAmount)', 'total')
      .groupBy('order.paymentMethod')
      .getRawMany();

    return totals.map((row) => ({
      label: row.paymentMethod,
      data: parseFloat(row.total),
    }));
  }

  async getOrderOverview() {
    const orderRepo = await this.connectionService.getRepository(
      Order,
      this.tenantId,
    );
    const totals = await orderRepo
      .createQueryBuilder('order')
      .select('order.status', 'label')
      .addSelect('COUNT(order.id)', 'data')
      .groupBy('order.status')
      .getRawMany();
    return totals;
  }

  async generateMonthlySalesReport(fromDate: Date, toDate: Date) {
    const orderRepo = await this.connectionService.getRepository(
      Order,
      this.tenantId,
    );
    console.log(
      fromDate,
      toDate,
      new Date(fromDate.setHours(0, 0, 0)),
      new Date(toDate.setHours(23, 59, 59)),
    );
    const data = await orderRepo.find({
      where: {
        created_at: Between(
          new Date(fromDate.setHours(0, 0, 0)),
          new Date(toDate.setHours(23, 59, 59)),
        ),
      },
    });
    const workbook = new ExcelJS.Workbook();
    const worksheet = workbook.addWorksheet('Monthly Sales Report');

    // Add headers
    worksheet.columns = [
      { header: 'Id', key: 'id', width: 15 },
      { header: 'Date', key: 'created_at', width: 15 },
      { header: 'Payment method', key: 'paymentMethod', width: 15 },
      { header: 'Total', key: 'total', width: 15 },
    ];
    let totalAmount = 0;
    // Add sales data
    data.forEach((el, i) => {
      totalAmount += el.totalAmount;
      worksheet.addRow({
        id: `ODR-${el.id}`,
        created_at: new Date(el.created_at).toLocaleDateString(),
        paymentMethod: el.paymentMethod,
        total: el.totalAmount,
      });
      if (data.length - 1 <= i) {
        worksheet.addRow({
          id: '',
          date: '',
          paymentMethod: 'Total',
          total: totalAmount,
        });
      }
    });
    // Write the workbook to the response
    const res = await workbook.xlsx.writeBuffer();
    return res;
  }
}
