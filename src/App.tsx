import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import RoleSwitcher from './components/RoleSwitcher';
import AdminDashboard from './pages/admin/Dashboard';
import AdminMenu from './pages/admin/Menu';
import AdminOrders from './pages/admin/Orders';
import AdminBilling from './pages/admin/Billing';
import AdminAnalytics from './pages/admin/Analytics';
import AdminStores from './pages/admin/Stores';
import ManagerMenu from './pages/manager/ManagerMenu';
import TableLayout from './pages/manager/TableLayout';
import WaiterDashboard from './pages/waiter/WaiterDashboard';
import InventoryLayout from './components/inventory/InventoryLayout';
import InventoryDashboard from './pages/inventory/Dashboard';
import InventoryItems from './pages/inventory/Items';
import InventoryVendors from './pages/inventory/Vendors';
import InventoryPurchases from './pages/inventory/Purchases';
import InventoryUsage from './pages/inventory/Usage';
import InventoryHistory from './pages/inventory/History';
import UserMenu from './pages/user/Menu';
import Cart from './pages/user/Cart';
import Checkout from './pages/user/Checkout';
import Header from './components/Header';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="pt-16">
          <Routes>
            <Route path="/admin" element={<AdminDashboard />} />
            <Route path="/admin/menu" element={<AdminMenu />} />
            <Route path="/admin/orders" element={<AdminOrders />} />
            <Route path="/admin/billing" element={<AdminBilling />} />
            <Route path="/admin/analytics" element={<AdminAnalytics />} />
            <Route path="/admin/stores/*" element={<AdminStores />} />
            
            <Route path="/manager/tables" element={<TableLayout />} />
            <Route path="/manager/menu" element={<ManagerMenu />} />
            <Route path="/waiter" element={<WaiterDashboard />} />
            
            <Route path="/admin/inventory/*" element={<InventoryLayout />}>
              <Route index element={<InventoryDashboard />} />
              <Route path="items" element={<InventoryItems />} />
              <Route path="vendors" element={<InventoryVendors />} />
              <Route path="purchases" element={<InventoryPurchases />} />
              <Route path="usage" element={<InventoryUsage />} />
              <Route path="history" element={<InventoryHistory />} />
            </Route>
            
            <Route path="/" element={<UserMenu />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
          </Routes>
        </div>
        <Toaster position="bottom-right" />
        <RoleSwitcher />
      </div>
    </BrowserRouter>
  );
}

export default App;