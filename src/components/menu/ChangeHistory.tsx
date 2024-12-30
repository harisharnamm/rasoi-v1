import React from 'react';
import { MenuChangeLog } from '../../types/menu';
import { History, Check, AlertTriangle } from 'lucide-react';

interface ChangeHistoryProps {
  changes: MenuChangeLog[];
}

export default function ChangeHistory({ changes }: ChangeHistoryProps) {
  const getStatusIcon = (status: MenuChangeLog['status']) => {
    switch (status) {
      case 'synced':
        return <Check className="h-4 w-4 text-green-500" />;
      case 'failed':
        return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default:
        return <History className="h-4 w-4 text-gray-400 animate-spin" />;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Change History</h2>
      
      <div className="space-y-4">
        {changes.map((change) => (
          <div key={change.id} className="border-b border-gray-200 pb-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getStatusIcon(change.status)}
                <span className="font-medium text-gray-900">
                  {change.changeType.charAt(0).toUpperCase() + change.changeType.slice(1)}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {new Date(change.timestamp).toLocaleString()}
              </span>
            </div>

            <div className="mt-2 space-y-2">
              {change.changes.map((c, index) => (
                <div key={index} className="text-sm">
                  <span className="text-gray-600">{c.field}: </span>
                  <span className="text-red-500">{c.oldValue}</span>
                  <span className="mx-2">→</span>
                  <span className="text-green-500">{c.newValue}</span>
                </div>
              ))}
            </div>

            {change.platforms.length > 0 && (
              <div className="mt-2 flex items-center space-x-2">
                <span className="text-sm text-gray-500">Platforms:</span>
                {change.platforms.map((platform) => (
                  <span
                    key={platform}
                    className="px-2 py-1 text-xs bg-gray-100 text-gray-600 rounded-full"
                  >
                    {platform}
                  </span>
                ))}
              </div>
            )}

            {change.error && (
              <div className="mt-2 text-sm text-red-600">
                Error: {change.error}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}