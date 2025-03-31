import jsPDF from 'jspdf';
import autoTable from 'jspdf-autotable';
import * as XLSX from 'xlsx';
import { formatCurrency } from '@/lib/utils';

// Định dạng ngày
export function formatDate(date: Date): string {
  return date.toLocaleDateString('vi-VN');
}

interface ExportColumn {
  header: string;
  key: string;
  format?: (value: any) => string;
}

// Xuất báo cáo PDF
export function exportToPDF(
  data: any[],
  columns: ExportColumn[],
  filename: string,
  title: string,
  subtitle?: string,
  logo?: string
) {
  const doc = new jsPDF('p', 'mm', 'a4');
  const pageWidth = doc.internal.pageSize.getWidth();

  // Thêm header
  doc.setFontSize(18);
  doc.text(title, pageWidth / 2, 20, { align: 'center' });

  if (subtitle) {
    doc.setFontSize(12);
    doc.text(subtitle, pageWidth / 2, 30, { align: 'center' });
  }

  // Thêm ngày xuất báo cáo
  doc.setFontSize(10);
  doc.text(
    `Ngày xuất báo cáo: ${formatDate(new Date())}`,
    pageWidth / 2,
    subtitle ? 40 : 30,
    { align: 'center' }
  );

  // Chuẩn bị dữ liệu cho bảng
  const headers = columns.map(col => col.header);
  const rows = data.map(item =>
    columns.map(col => {
      const value = item[col.key];
      return col.format ? col.format(value) : value;
    })
  );

  // Thêm bảng
  autoTable(doc, {
    head: [headers],
    body: rows,
    startY: subtitle ? 45 : 35,
    styles: {
      fontSize: 9,
      cellPadding: 3,
    },
    headStyles: {
      fillColor: [59, 130, 246],
      textColor: [255, 255, 255],
      fontStyle: 'bold',
    },
  });

  // Thêm footer
  const pageCount = doc.internal.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    doc.setFontSize(10);
    doc.text(
      `Trang ${i} / ${pageCount}`,
      pageWidth / 2,
      doc.internal.pageSize.getHeight() - 10,
      { align: 'center' }
    );
  }

  // Lưu file
  doc.save(`${filename}.pdf`);
}

// Xuất báo cáo Excel
export function exportToExcel(
  data: any[],
  columns: ExportColumn[],
  filename: string,
  sheetName: string = 'Sheet1'
) {
  // Chuẩn bị dữ liệu cho Excel
  const excelData = data.map(item => {
    const row: Record<string, any> = {};
    columns.forEach(col => {
      const value = item[col.key];
      row[col.header] = col.format ? col.format(value) : value;
    });
    return row;
  });

  // Tạo workbook và worksheet
  const wb = XLSX.utils.book_new();
  const ws = XLSX.utils.json_to_sheet(excelData);

  // Thêm worksheet vào workbook
  XLSX.utils.book_append_sheet(wb, ws, sheetName);

  // Lưu file
  XLSX.writeFile(wb, `${filename}.xlsx`);
}

// Xuất báo cáo CSV
export function exportToCSV(
  data: any[],
  columns: ExportColumn[],
  filename: string
) {
  // Chuẩn bị dữ liệu cho CSV
  const csvData = data.map(item => {
    const row: Record<string, any> = {};
    columns.forEach(col => {
      const value = item[col.key];
      row[col.header] = col.format ? col.format(value) : value;
    });
    return row;
  });

  // Tạo worksheet từ dữ liệu
  const ws = XLSX.utils.json_to_sheet(csvData);

  // Tạo workbook và thêm worksheet
  const wb = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(wb, ws, 'Data');

  // Lưu file
  XLSX.writeFile(wb, `${filename}.csv`);
}
