import { useState, useCallback } from 'react';
import { MenuCategory } from '../types/menu';

export function useMenuCategories(initialCategories: MenuCategory[] = []) {
  const [categories, setCategories] = useState(initialCategories);

  const addCategory = useCallback((category: Omit<MenuCategory, 'id'>) => {
    setCategories(prev => [...prev, { ...category, id: crypto.randomUUID() }]);
  }, []);

  const updateCategory = useCallback((id: string, updates: Partial<MenuCategory>) => {
    setCategories(prev =>
      prev.map(category =>
        category.id === id ? { ...category, ...updates } : category
      )
    );
  }, []);

  const deleteCategory = useCallback((id: string) => {
    setCategories(prev => prev.filter(category => category.id !== id));
  }, []);

  const reorderCategories = useCallback((sourceId: string, targetId: string) => {
    setCategories(prev => {
      const categories = [...prev];
      const sourceIndex = categories.findIndex(c => c.id === sourceId);
      const targetIndex = categories.findIndex(c => c.id === targetId);
      
      const [removed] = categories.splice(sourceIndex, 1);
      categories.splice(targetIndex, 0, removed);
      
      return categories.map((category, index) => ({
        ...category,
        displayOrder: index + 1
      }));
    });
  }, []);

  const toggleCategoryVisibility = useCallback((id: string) => {
    setCategories(prev =>
      prev.map(category =>
        category.id === id ? { ...category, isActive: !category.isActive } : category
      )
    );
  }, []);

  return {
    categories,
    addCategory,
    updateCategory,
    deleteCategory,
    reorderCategories,
    toggleCategoryVisibility
  };
}