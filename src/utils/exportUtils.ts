export const exportToCSV = (data: any[], filename: string) => {
  // Convert array of objects to CSV string
  const headers = Object.keys(data[0]);
  const csvRows = [
    headers.join(','),
    ...data.map(row =>
      headers.map(header => {
        const cell = row[header]?.toString() || '';
        // Escape quotes and wrap in quotes if contains comma
        return cell.includes(',') ? `"${cell.replace(/"/g, '""')}"` : cell;
      }).join(',')
    )
  ];
  const csvString = csvRows.join('\n');

  // Create and download file
  const blob = new Blob([csvString], { type: 'text/csv;charset=utf-8;' });
  const link = document.createElement('a');
  if (link.download !== undefined) {
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `${filename}-${new Date().toISOString().split('T')[0]}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
};