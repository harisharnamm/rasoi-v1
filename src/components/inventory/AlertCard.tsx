import React from 'react';
import { AlertTriangle } from 'lucide-react';

interface AlertCardProps {
  title: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  action?: {
    label: string;
    onClick: () => void;
  };
}

export default function AlertCard({ title, description, severity, action }: AlertCardProps) {
  const severityColors = {
    low: 'bg-yellow-50 border-yellow-200 text-yellow-700',
    medium: 'bg-orange-50 border-orange-200 text-orange-700',
    high: 'bg-red-50 border-red-200 text-red-700'
  };

  return (
    <div className={`rounded-lg border p-4 ${severityColors[severity]}`}>
      <div className="flex items-start">
        <AlertTriangle className="h-5 w-5 mr-3 mt-0.5" />
        <div className="flex-1">
          <h3 className="font-medium">{title}</h3>
          <p className="text-sm mt-1">{description}</p>
          {action && (
            <button
              onClick={action.onClick}
              className="mt-2 text-sm font-medium hover:underline"
            >
              {action.label}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}