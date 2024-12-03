import { Store, StoreLocation, OperatingHours, StoreManager } from '../types/store';

export const validateStore = (store: Partial<Store>): string[] => {
  const errors: string[] = [];

  if (!store.name?.trim()) {
    errors.push('Store name is required');
  }

  if (!validateLocation(store.location)) {
    errors.push('Invalid location details');
  }

  if (!validateOperatingHours(store.operatingHours)) {
    errors.push('Invalid operating hours');
  }

  if (!validateManager(store.manager)) {
    errors.push('Invalid manager details');
  }

  if (!store.contactEmail?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.push('Invalid email address');
  }

  if (!store.contactPhone?.match(/^\+?[\d\s-]{10,}$/)) {
    errors.push('Invalid phone number');
  }

  return errors;
};

const validateLocation = (location?: StoreLocation): boolean => {
  if (!location) return false;

  return !!(
    location.address?.trim() &&
    location.city?.trim() &&
    location.state?.trim() &&
    location.zipCode?.trim() &&
    typeof location.latitude === 'number' &&
    typeof location.longitude === 'number' &&
    location.latitude >= -90 &&
    location.latitude <= 90 &&
    location.longitude >= -180 &&
    location.longitude <= 180
  );
};

const validateOperatingHours = (hours?: OperatingHours[]): boolean => {
  if (!hours?.length || hours.length !== 7) return false;

  return hours.every(hour => {
    if (hour.isClosed) return true;

    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d)$/;
    return timeRegex.test(hour.open) && timeRegex.test(hour.close);
  });
};

const validateManager = (manager?: StoreManager): boolean => {
  if (!manager) return false;

  return !!(
    manager.name?.trim() &&
    manager.email?.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/) &&
    manager.phone?.match(/^\+?[\d\s-]{10,}$/) &&
    ['store_manager', 'assistant_manager'].includes(manager.role)
  );
};