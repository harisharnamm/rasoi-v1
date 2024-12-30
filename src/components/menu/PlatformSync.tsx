import React from 'react';
import { SyncStatus } from '../../types/menu';
import { RefreshCw, Check, AlertTriangle } from 'lucide-react';

interface PlatformSyncProps {
  platforms: {
    id: string;
    name: string;
    logo: string;
  }[];
  syncStatus: Record<string, SyncStatus>;
  onSync: (platformId: string) => void;
}

export default function PlatformSync({ platforms, syncStatus, onSync }: PlatformSyncProps) {
  const getStatusIcon = (status: SyncStatus['status']) => {
    switch (status) {
      case 'success':
        return <Check className="h-5 w-5 text-green-500" />;
      case 'failed':
        return <AlertTriangle className="h-5 w-5 text-red-500" />;
      case 'in-progress':
        return <RefreshCw className="h-5 w-5 text-blue-500 animate-spin" />;
      default:
        return null;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Platform Integration</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {platforms.map((platform) => {
          const status = syncStatus[platform.id];
          
          return (
            <div
              key={platform.id}
              className="flex items-center justify-between p-4 border rounded-lg"
            >
              <div className="flex items-center space-x-3">
                <img
                  src={platform.logo}
                  alt={platform.name}
                  className="w-8 h-8 rounded-full"
                />
                <div>
                  <h3 className="font-medium text-gray-900">{platform.name}</h3>
                  {status && (
                    <p className="text-sm text-gray-500">
                      Last sync: {status.lastSync.toLocaleTimeString()}
                    </p>
                  )}
                </div>
              </div>

              <div className="flex items-center space-x-2">
                {status && getStatusIcon(status.status)}
                <button
                  onClick={() => onSync(platform.id)}
                  disabled={status?.status === 'in-progress'}
                  className="p-2 text-gray-400 hover:text-gray-600 disabled:opacity-50"
                >
                  <RefreshCw className="h-5 w-5" />
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}