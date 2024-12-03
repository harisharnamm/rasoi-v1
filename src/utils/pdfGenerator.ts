import jsPDF from 'jspdf';
import { CartItem } from '../types';

interface BillDetails {
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  items: CartItem[];
  subtotal: number;
  tax: number;
  total: number;
  orderType: 'dining' | 'delivery' | 'pickup';
  tableNumber?: string;
  isPaid: boolean;
  paymentMethod?: string;
}

export const generateRetailInvoice = (details: BillDetails) => {
  const doc = new jsPDF();
  const restaurantName = "Cloud Kitchen";
  const gstNo = "GST123456789";
  const fssaiNo = "FSSAI123456789";
  
  // Logo (placeholder position)
  doc.rect(10, 10, 30, 30); // Placeholder for logo
  
  // Header
  doc.setFontSize(12);
  doc.text("RETAIL INVOICE", 150, 15);
  
  doc.setFontSize(24);
  doc.text(restaurantName, 80, 30);
  
  doc.setFontSize(10);
  doc.text(`GST No: ${gstNo}`, 10, 45);
  doc.text(`FSSAI No: ${fssaiNo}`, 10, 50);
  
  // Customer Details
  doc.setFontSize(12);
  doc.text(`Order #: ${details.orderNumber}`, 10, 65);
  doc.text(`Customer: ${details.customerName}`, 10, 70);
  doc.text(`Phone: ${details.customerPhone}`, 10, 75);
  doc.text(`Order Type: ${details.orderType}`, 10, 80);
  if (details.tableNumber) {
    doc.text(`Table No: ${details.tableNumber}`, 10, 85);
  }
  
  // Items Table
  let yPos = 95;
  doc.line(10, yPos, 200, yPos);
  yPos += 5;
  
  doc.text("Item", 10, yPos);
  doc.text("Qty", 100, yPos);
  doc.text("Price", 130, yPos);
  doc.text("Total", 170, yPos);
  
  yPos += 5;
  doc.line(10, yPos, 200, yPos);
  yPos += 10;
  
  details.items.forEach(item => {
    doc.text(item.name, 10, yPos);
    doc.text(item.quantity.toString(), 100, yPos);
    doc.text(item.price.toFixed(2), 130, yPos);
    doc.text((item.price * item.quantity).toFixed(2), 170, yPos);
    yPos += 7;
  });
  
  // Totals
  yPos += 5;
  doc.line(10, yPos, 200, yPos);
  yPos += 10;
  
  doc.text("Subtotal:", 130, yPos);
  doc.text(details.subtotal.toFixed(2), 170, yPos);
  yPos += 7;
  
  doc.text("Tax (GST):", 130, yPos);
  doc.text(details.tax.toFixed(2), 170, yPos);
  yPos += 7;
  
  doc.setFontSize(14);
  doc.text("Grand Total:", 130, yPos);
  doc.text(details.total.toFixed(2), 170, yPos);
  
  // Payment Status
  yPos += 15;
  doc.setFontSize(12);
  doc.text(`Payment Status: ${details.isPaid ? 'PAID' : 'UNPAID'}`, 10, yPos);
  if (details.paymentMethod) {
    doc.text(`Payment Method: ${details.paymentMethod}`, 10, yPos + 7);
  }
  
  return doc;
};

export const generateKOT = (details: BillDetails) => {
  const doc = new jsPDF({
    format: [80, 150] // Smaller format for KOT
  });
  
  doc.setFontSize(16);
  doc.text("KITCHEN ORDER TICKET", 10, 10);
  
  doc.setFontSize(12);
  doc.text(`Order #: ${details.orderNumber}`, 10, 20);
  doc.text(`Type: ${details.orderType}`, 10, 27);
  if (details.tableNumber) {
    doc.text(`Table: ${details.tableNumber}`, 10, 34);
  }
  
  doc.line(10, 40, 70, 40);
  
  let yPos = 45;
  details.items.forEach(item => {
    doc.setFontSize(12);
    doc.text(`${item.quantity}x ${item.name}`, 10, yPos);
    yPos += 7;
  });
  
  doc.line(10, yPos, 70, yPos);
  yPos += 7;
  
  doc.setFontSize(10);
  doc.text(`Time: ${new Date().toLocaleTimeString()}`, 10, yPos);
  
  return doc;
};