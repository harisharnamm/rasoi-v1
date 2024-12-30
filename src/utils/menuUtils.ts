import { MenuCategory, MenuItem } from '../types';

export const groupItemsByCategory = (
  items: MenuItem[],
  categories: MenuCategory[]
): Record<string, MenuItem[]> => {
  const groupedItems: Record<string, MenuItem[]> = {
    uncategorized: []
  };

  // Initialize arrays for each category
  categories.forEach(category => {
    if (category.isActive) {
      groupedItems[category.id] = [];
    }
  });

  // Group items by category
  items.forEach(item => {
    let hasCategory = false;

    // Check if item has a category that matches any active category
    categories.forEach(category => {
      if (category.isActive && item.category === category.name) {
        if (!groupedItems[category.id]) {
          groupedItems[category.id] = [];
        }
        groupedItems[category.id].push(item);
        hasCategory = true;
      }
    });

    if (!hasCategory) {
      groupedItems.uncategorized.push(item);
    }
  });

  return groupedItems;
};

export const sortCategoriesByDisplayOrder = (categories: MenuCategory[]): MenuCategory[] => {
  return [...categories].sort((a, b) => a.displayOrder - b.displayOrder);
};

export const getCategoryStats = (
  category: MenuCategory,
  items: MenuItem[]
): { totalItems: number; activeItems: number; averagePrice: number } => {
  const categoryItems = items.filter(item => item.categories?.includes(category.id));
  const activeItems = categoryItems.filter(item => item.available);
  
  return {
    totalItems: categoryItems.length,
    activeItems: activeItems.length,
    averagePrice: categoryItems.length
      ? categoryItems.reduce((sum, item) => sum + item.price, 0) / categoryItems.length
      : 0
  };
};