export type CsvCell = string | number | null | undefined;

/**
 * Downloads a CSV file that Excel can open directly.
 *
 * The UTF-8 BOM is intentional: without it Excel misreads accented Spanish
 * characters (á, é, í, ó, ú, ñ).
 */
export function downloadCsv(filename: string, rows: CsvCell[][]): void {
  const csv = rows
    .map(row => row.map(cell => escapeCsv(String(cell ?? ''))).join(','))
    .join('\r\n');

  const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8;' });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function escapeCsv(value: string): string {
  return `"${value.replace(/"/g, '""')}"`;
}
