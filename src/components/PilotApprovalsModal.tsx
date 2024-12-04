import React, { useState } from 'react';
import { X, Check, AlertTriangle, DollarSign, TrendingDown, Truck, MessageSquare, Tag } from 'lucide-react';

interface Task {
  id: string;
  title: string;
  description: string;
  impact: string;
  priority: 'high' | 'medium' | 'low';
  status: 'pending' | 'approved' | 'rejected';
}

interface PilotApprovalsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function PilotApprovalsModal({ isOpen, onClose }: PilotApprovalsModalProps) {
  const [tasks, setTasks] = useState<Task[]>([
    {
      id: '1',
      title: 'Reorder Low Stock Items',
      description: 'Would you like me to reorder inventory for items below threshold? Tomatoes, Onions, and Chicken are running low.',
      impact: 'Prevent stockout and potential disruption to kitchen operations',
      priority: 'high',
      status: 'pending'
    },
    {
      id: '2',
      title: 'Process Payment Reminders',
      description: 'Shall I process pending payment reminders for overdue accounts? There are 12 customers with outstanding balances.',
      impact: 'Improve cash flow and reduce outstanding payments',
      priority: 'medium',
      status: 'pending'
    },
    {
      id: '3',
      title: 'Optimize Delivery Routes',
      description: 'Multiple orders are awaiting dispatch. Should I optimize the delivery routes for today\'s shipments?',
      impact: 'Reduce delivery time and improve efficiency',
      priority: 'high',
      status: 'pending'
    },
    {
      id: '4',
      title: 'Analyze Customer Feedback',
      description: 'Customer feedback ratings have dropped below target. Would you like me to analyze the recent negative reviews?',
      impact: 'Identify areas for improvement in customer satisfaction',
      priority: 'medium',
      status: 'pending'
    },
    {
      id: '5',
      title: 'Adjust Product Pricing',
      description: 'Several price changes were detected in supplier quotes. Should I adjust our product pricing accordingly?',
      impact: '$3,840 potential annual savings',
      priority: 'high',
      status: 'pending'
    }
  ]);

  const handleApprove = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'approved' } : task
    ));
  };

  const handleReject = (taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId ? { ...task, status: 'rejected' } : task
    ));
  };

  const handleApproveAll = () => {
    setTasks(prev => prev.map(task => 
      task.status === 'pending' ? { ...task, status: 'approved' } : task
    ));
  };

  if (!isOpen) return null;

  const getPriorityColor = (priority: Task['priority']) => {
    switch (priority) {
      case 'high':
        return 'bg-red-50 text-red-700';
      case 'medium':
        return 'bg-yellow-50 text-yellow-700';
      case 'low':
        return 'bg-blue-50 text-blue-700';
    }
  };

  const getTaskIcon = (title: string) => {
    if (title.includes('Stock')) return AlertTriangle;
    if (title.includes('Payment')) return DollarSign;
    if (title.includes('Delivery')) return Truck;
    if (title.includes('Feedback')) return MessageSquare;
    if (title.includes('Pricing')) return Tag;
    return TrendingDown;
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-3xl max-h-[90vh] overflow-hidden">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-xl font-semibold text-gray-900">Pilot Approval Tasks</h2>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-500">
              <X className="h-6 w-6" />
            </button>
          </div>

          <div className="space-y-4 max-h-[60vh] overflow-y-auto">
            {tasks.map(task => {
              const TaskIcon = getTaskIcon(task.title);
              return (
                <div key={task.id} className="bg-gray-50 rounded-lg p-4">
                  <div className="flex items-start justify-between">
                    <div className="flex items-start space-x-3">
                      <div className="mt-1">
                        <TaskIcon className="h-5 w-5 text-gray-400" />
                      </div>
                      <div>
                        <h3 className="font-medium text-gray-900">{task.title}</h3>
                        <p className="text-sm text-gray-600 mt-1">{task.description}</p>
                        <p className="text-sm text-green-600 mt-2">{task.impact}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs font-medium rounded-full ${getPriorityColor(task.priority)}`}>
                        {task.priority}
                      </span>
                      {task.status === 'pending' ? (
                        <>
                          <button
                            onClick={() => handleApprove(task.id)}
                            className="p-1 text-green-600 hover:text-green-700"
                          >
                            <Check className="h-5 w-5" />
                          </button>
                          <button
                            onClick={() => handleReject(task.id)}
                            className="p-1 text-red-600 hover:text-red-700"
                          >
                            <X className="h-5 w-5" />
                          </button>
                        </>
                      ) : (
                        <span className={`text-sm font-medium ${
                          task.status === 'approved' ? 'text-green-600' : 'text-red-600'
                        }`}>
                          {task.status.charAt(0).toUpperCase() + task.status.slice(1)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div className="mt-6 flex justify-end space-x-4">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200"
            >
              Cancel
            </button>
            <button
              onClick={handleApproveAll}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Approve All
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}