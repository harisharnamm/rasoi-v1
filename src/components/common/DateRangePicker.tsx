import React from 'react';
import { Calendar } from 'lucide-react';

interface DateRangePickerProps {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
}

export default function DateRangePicker({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange
}: DateRangePickerProps) {
  return (
    <div className="flex items-center space-x-2">
      <Calendar className="h-5 w-5 text-gray-400" />
      <input
        type="date"
        value={startDate}
        onChange={(e) => onStartDateChange(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
      <span className="text-gray-500">to</span>
      <input
        type="date"
        value={endDate}
        onChange={(e) => onEndDateChange(e.target.value)}
        className="rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  );
}