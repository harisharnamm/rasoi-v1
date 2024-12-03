import { StoreSalesRecord, StoreInventoryItem, StorePerformanceMetrics } from '../types/store';

export const calculateInventoryMetrics = (
  inventory: StoreInventoryItem[],
  sales: StoreSalesRecord[],
  period: { start: Date; end: Date }
) => {
  const metrics = {
    turnoverRate: 0,
    wastagePercentage: 0,
    stockouts: 0,
    lowStockAlerts: 0
  };

  // Calculate inventory turnover rate
  const averageInventory = inventory.reduce((sum, item) => sum + item.currentStock, 0) / inventory.length;
  const totalSold = sales.reduce((sum, sale) => 
    sum + sale.inventoryImpact.reduce((itemSum, impact) => itemSum + impact.quantity, 0), 
    0
  );
  metrics.turnoverRate = averageInventory ? totalSold / averageInventory : 0;

  // Calculate wastage percentage
  const totalWastage = sales.reduce((sum, sale) =>
    sum + sale.inventoryImpact.reduce((itemSum, impact) => itemSum + impact.wastage, 0),
    0
  );
  metrics.wastagePercentage = totalSold ? (totalWastage / totalSold) * 100 : 0;

  // Count stockouts and low stock alerts
  inventory.forEach(item => {
    if (item.currentStock === 0) {
      metrics.stockouts++;
    } else if (item.currentStock <= item.minimumStock) {
      metrics.lowStockAlerts++;
    }
  });

  return metrics;
};

export const calculateSalesMetrics = (
  sales: StoreSalesRecord[],
  period: { start: Date; end: Date }
) => {
  const filteredSales = sales.filter(
    sale => sale.date >= period.start && sale.date <= period.end
  );

  const metrics = {
    total: 0,
    byCategory: {} as Record<string, number>,
    averageOrderValue: 0,
    peakHours: [] as string[]
  };

  // Calculate total sales and sales by category
  filteredSales.forEach(sale => {
    metrics.total += sale.revenue;
    
    // Group sales by hour to find peak hours
    const hour = sale.date.getHours();
    metrics.byCategory[hour] = (metrics.byCategory[hour] || 0) + sale.revenue;
  });

  // Calculate average order value
  metrics.averageOrderValue = filteredSales.length
    ? metrics.total / filteredSales.length
    : 0;

  // Find peak hours (top 3 hours by sales)
  metrics.peakHours = Object.entries(metrics.byCategory)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 3)
    .map(([hour]) => `${hour}:00`);

  return metrics;
};