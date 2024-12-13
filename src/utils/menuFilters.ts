import { MenuItem } from '../types';

export const filterAndSortMenuItems = (
  items: MenuItem[],
  {
    searchQuery,
    category,
    sortBy,
    sortOrder
  }: {
    searchQuery: string;
    category: string;
    sortBy: 'name' | 'price';
    sortOrder: 'asc' | 'desc';
  }
) => {
  return items
    .filter(item => {
      const matchesSearch = 
        item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        item.description.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = category === 'all' || item.category === category;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      const modifier = sortOrder === 'asc' ? 1 : -1;
      if (sortBy === 'name') {
        return modifier * a.name.localeCompare(b.name);
      }
      return modifier * (a.price - b.price);
    });
};

export const getUniqueCategories = (items: MenuItem[]): string[] => {
  return ['all', ...new Set(items.map(item => item.category))];
};