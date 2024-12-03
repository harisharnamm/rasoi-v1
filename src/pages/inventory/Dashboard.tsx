import React from 'react';
import { useStore } from '../../store/useStore';
import { Package, DollarSign, AlertTriangle, Users } from 'lucide-react';
import DashboardCard from '../../components/inventory/DashboardCard';
import AlertCard from '../../components/inventory/AlertCard';
import ProductCard from '../../components/inventory/ProductCard';
import VendorCard from '../../components/inventory/VendorCard';

export default function InventoryDashboard() {
  const { inventory, vendors } = useStore();

  const lowStockItems = inventory.filter(
    item => item.currentStock <= item.minimumStock
  );

  const stats = {
    totalItems: inventory.length,
    lowStockItems: lowStockItems.length,
    totalVendors: vendors.length,
    totalValue: inventory.reduce(
      (sum, item) => sum + item.currentStock * item.price,
      0
    ),
  };

  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold text-gray-900">Inventory Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <DashboardCard
          title="Total Items"
          value={stats.totalItems}
          icon={Package}
        />
        <DashboardCard
          title="Low Stock Items"
          value={stats.lowStockItems}
          icon={AlertTriangle}
        />
        <DashboardCard
          title="Total Vendors"
          value={stats.totalVendors}
          icon={Users}
        />
        <DashboardCard
          title="Inventory Value"
          value={`$${stats.totalValue.toFixed(2)}`}
          icon={DollarSign}
        />
      </div>

      {/* Alerts Section */}
      {lowStockItems.length > 0 && (
        <div className="space-y-4">
          <h2 className="text-lg font-semibold text-gray-900">Alerts</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {lowStockItems.map(item => (
              <AlertCard
                key={item.id}
                title={`Low Stock Alert: ${item.name}`}
                description={`Current stock (${item.currentStock} ${item.unit}) is below minimum level (${item.minimumStock} ${item.unit})`}
                severity={
                  item.currentStock === 0
                    ? 'high'
                    : item.currentStock < item.minimumStock / 2
                    ? 'medium'
                    : 'low'
                }
                action={{
                  label: 'Create Purchase Order',
                  onClick: () => {
                    // Handle purchase order creation
                  },
                }}
              />
            ))}
          </div>
        </div>
      )}

      {/* Recent Items */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Recent Items</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {inventory.slice(0, 6).map(item => {
            const vendor = vendors.find(v => v.id === item.vendorId);
            return (
              <ProductCard
                key={item.id}
                name={item.name}
                sku={item.sku}
                currentStock={item.currentStock}
                unit={item.unit}
                minimumStock={item.minimumStock}
                vendor={vendor?.name || 'Unknown Vendor'}
                onOrderClick={() => {
                  // Handle order creation
                }}
              />
            );
          })}
        </div>
      </div>

      {/* Vendor Overview */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-gray-900">Vendor Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.slice(0, 3).map(vendor => {
            const vendorProducts = inventory.filter(
              item => item.vendorId === vendor.id
            );
            const lowStockProducts = vendorProducts.filter(
              item => item.currentStock <= item.minimumStock
            );

            return (
              <VendorCard
                key={vendor.id}
                name={vendor.name}
                email={vendor.email}
                phone={vendor.contact}
                category={vendor.category}
                productsCount={vendorProducts.length}
                lowStockProducts={lowStockProducts.length}
                onViewProducts={() => {
                  // Handle viewing vendor products
                }}
              />
            );
          })}
        </div>
      </div>
    </div>
  );
}