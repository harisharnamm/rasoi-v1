import React from 'react';
import Sidebar from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50 pt-16">
      <Sidebar />
      <main className="lg:pl-64 transition-all duration-300 ease-in-out">
        {children}
      </main>
    </div>
  );
}