import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import MainLayout from './components/layout/MainLayout';
import RoleSwitcher from './components/RoleSwitcher';
import AdminDashboard from './pages/admin/Dashboard';
import AdminMenu from './pages/admin/Menu';
import AdminOrders from './pages/admin/Orders';
import AdminBilling from './pages/admin/Billing';
import AdminAnalytics from './pages/admin/Analytics';
import AdminStores from './pages/admin/Stores';
import Categories from './pages/admin/menu/Categories';
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
import Warehouse from './pages/inventory/Warehouse';
import UserMenu from './pages/user/Menu';
import Cart from './pages/user/Cart';
import Checkout from './pages/user/Checkout';
import Header from './components/Header';
import CustomerAnalytics from './pages/admin/CustomerAnalytics';
import Integrations from './pages/admin/Integrations';
import LiveOrders from './pages/admin/LiveOrders';
import EmployeeManagement from './pages/admin/EmployeeManagement';
import Account from './pages/admin/Account';
import Onboarding from './pages/onboarding/Onboarding';
import Setup from './pages/onboarding/Setup';
import OrderStatus from './pages/user/OrderStatus';
import KitchenView from './pages/kitchen/KitchenView';

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-gray-50">
        <Header />
        <Routes>
          <Route path="/onboarding" element={<Onboarding />} />
          <Route path="/setup" element={<Setup />} />
          {/* Admin Routes */}
          <Route path="/admin/*" element={
            <MainLayout>
              <Routes>
                <Route index element={<AdminDashboard />} />
                <Route path="menu" element={<AdminMenu />} />
                <Route path="menu/categories" element={<Categories />} />
                <Route path="orders" element={<AdminOrders />} />
               <Route path="orders/live" element={<LiveOrders />} />
                <Route path="billing" element={<AdminBilling />} />
                <Route path="analytics" element={<AdminAnalytics />} />
                <Route path="stores/*" element={<AdminStores />} />
                <Route path="customers" element={<CustomerAnalytics />} />
                <Route path="integrations" element={<Integrations />} />
                <Route path="employees" element={<EmployeeManagement />} />
                <Route path="account" element={<Account />} />
                <Route path="inventory/*" element={<InventoryLayout />}>
                  <Route index element={<InventoryDashboard />} />
                  <Route path="items" element={<InventoryItems />} />
                  <Route path="vendors" element={<InventoryVendors />} />
                  <Route path="purchases" element={<InventoryPurchases />} />
                  <Route path="usage" element={<InventoryUsage />} />
                  <Route path="warehouse" element={<Warehouse />} />
                  <Route path="history" element={<InventoryHistory />} />
                </Route>
              </Routes>
            </MainLayout>
          } />

          {/* Kitchen Routes */}
          <Route path="/kitchen" element={<KitchenView />} />
          
          {/* Manager Routes */}
          <Route path="/manager/tables" element={<TableLayout />} />
          <Route path="/manager/menu" element={<ManagerMenu />} />
          
          {/* Waiter Routes */}
          <Route path="/waiter" element={<WaiterDashboard />} />
          
          {/* Customer Routes */}
          <Route path="/" element={<UserMenu />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/orders" element={<OrderStatus />} />
        </Routes>
        <Toaster position="bottom-right" />
        <RoleSwitcher />
      </div>
    </BrowserRouter>
  );
}

export default App;