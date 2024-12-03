import React from 'react';
import { Clock } from 'lucide-react';
import { OperatingHours } from '../../types/store';

interface OperatingHoursInputProps {
  value: OperatingHours[];
  onChange: (hours: OperatingHours[]) => void;
}

const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];

export default function OperatingHoursInput({ value, onChange }: OperatingHoursInputProps) {
  const updateHours = (index: number, updates: Partial<OperatingHours>) => {
    const newHours = [...value];
    newHours[index] = { ...newHours[index], ...updates };
    onChange(newHours);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <Clock className="h-5 w-5 text-gray-400" />
        <h2 className="text-lg font-medium">Operating Hours</h2>
      </div>

      <div className="space-y-4">
        {days.map((day, index) => (
          <div key={day} className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
            <div className="font-medium capitalize">{day}</div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                checked={value[index].isClosed}
                onChange={(e) => updateHours(index, { isClosed: e.target.checked })}
                className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
              />
              <span className="ml-2 text-sm text-gray-600">Closed</span>
            </div>

            {!value[index].isClosed && (
              <>
                <div>
                  <label className="block text-sm text-gray-600">Opening Time</label>
                  <input
                    type="time"
                    value={value[index].open}
                    onChange={(e) => updateHours(index, { open: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>

                <div>
                  <label className="block text-sm text-gray-600">Closing Time</label>
                  <input
                    type="time"
                    value={value[index].close}
                    onChange={(e) => updateHours(index, { close: e.target.value })}
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}