import { InventoryUsage, InventoryHistory } from '../types';

interface FilterOptions {
  searchQuery: string;
  dateRange: {
    start: string;
    end: string;
  };
  reason?: string;
  action?: string;
}

export const filterUsageLogs = (logs: InventoryUsage[], options: FilterOptions) => {
  return logs.filter(log => {
    const matchesSearch = log.itemId.toLowerCase().includes(options.searchQuery.toLowerCase()) ||
                         log.notes?.toLowerCase().includes(options.searchQuery.toLowerCase());
    
    const logDate = new Date(log.date);
    const matchesDateRange = (!options.dateRange.start || logDate >= new Date(options.dateRange.start)) &&
                           (!options.dateRange.end || logDate <= new Date(options.dateRange.end));
    
    const matchesReason = options.reason === 'all' || log.reason === options.reason;

    return matchesSearch && matchesDateRange && matchesReason;
  });
};

export const filterHistoryLogs = (logs: InventoryHistory[], options: FilterOptions) => {
  return logs.filter(log => {
    const matchesSearch = log.itemName.toLowerCase().includes(options.searchQuery.toLowerCase()) ||
                         log.sku.toLowerCase().includes(options.searchQuery.toLowerCase()) ||
                         log.user.toLowerCase().includes(options.searchQuery.toLowerCase()) ||
                         log.notes?.toLowerCase().includes(options.searchQuery.toLowerCase());
    
    const logDate = new Date(log.timestamp);
    const matchesDateRange = (!options.dateRange.start || logDate >= new Date(options.dateRange.start)) &&
                           (!options.dateRange.end || logDate <= new Date(options.dateRange.end));
    
    const matchesAction = options.action === 'all' || log.action === options.action;

    return matchesSearch && matchesDateRange && matchesAction;
  });
};