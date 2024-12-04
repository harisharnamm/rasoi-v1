import React from 'react';
import { Users, Award, AlertTriangle, User, Clock } from 'lucide-react';

interface CustomerSegmentsProps {
  segments: {
    vip: number;
    repeat: number;
    atRisk: number;
    oneTime: number;
    inactive: number;
    retentionRate: string;
  };
}

export default function CustomerSegments({ segments }: CustomerSegmentsProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm p-6">
      <h2 className="text-lg font-medium text-gray-900 mb-4">Customer Segments</h2>
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="p-4 bg-purple-50 rounded-lg">
          <div className="flex items-center">
            <Award className="h-5 w-5 text-purple-600" />
            <span className="ml-2 text-sm font-medium text-purple-900">VIP</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-purple-900">{segments.vip}</p>
        </div>

        <div className="p-4 bg-green-50 rounded-lg">
          <div className="flex items-center">
            <Users className="h-5 w-5 text-green-600" />
            <span className="ml-2 text-sm font-medium text-green-900">Repeat</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-green-900">{segments.repeat}</p>
        </div>

        <div className="p-4 bg-red-50 rounded-lg">
          <div className="flex items-center">
            <AlertTriangle className="h-5 w-5 text-red-600" />
            <span className="ml-2 text-sm font-medium text-red-900">At Risk</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-red-900">{segments.atRisk}</p>
        </div>

        <div className="p-4 bg-blue-50 rounded-lg">
          <div className="flex items-center">
            <User className="h-5 w-5 text-blue-600" />
            <span className="ml-2 text-sm font-medium text-blue-900">One Time</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-blue-900">{segments.oneTime}</p>
        </div>

        <div className="p-4 bg-gray-50 rounded-lg">
          <div className="flex items-center">
            <Clock className="h-5 w-5 text-gray-600" />
            <span className="ml-2 text-sm font-medium text-gray-900">Inactive</span>
          </div>
          <p className="mt-2 text-2xl font-semibold text-gray-900">{segments.inactive}</p>
        </div>
      </div>
    </div>
  );
}