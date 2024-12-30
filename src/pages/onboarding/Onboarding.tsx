import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, CheckCircle, ChefHat, Package, Users, BarChart3 } from 'lucide-react';
import confetti from 'canvas-confetti';

const features = [
  {
    id: 'menu',
    title: 'Menu Management',
    description: 'Create and manage your menu items, categories, and pricing',
    icon: ChefHat,
    video: 'https://example.com/videos/menu-tutorial.mp4'
  },
  {
    id: 'inventory',
    title: 'Inventory Control',
    description: 'Track stock levels, manage suppliers, and automate reordering',
    icon: Package,
    video: 'https://example.com/videos/inventory-tutorial.mp4'
  },
  {
    id: 'staff',
    title: 'Staff Management',
    description: 'Manage employees, roles, and permissions',
    icon: Users,
    video: 'https://example.com/videos/staff-tutorial.mp4'
  },
  {
    id: 'analytics',
    title: 'Analytics & Reports',
    description: 'Get insights into your business performance',
    icon: BarChart3,
    video: 'https://example.com/videos/analytics-tutorial.mp4'
  }
];

export default function Onboarding() {
  const navigate = useNavigate();
  const [completedFeatures, setCompletedFeatures] = useState<string[]>([]);
  const [currentVideo, setCurrentVideo] = useState<string | null>(null);

  const handleFeatureComplete = (featureId: string) => {
    if (!completedFeatures.includes(featureId)) {
      setCompletedFeatures([...completedFeatures, featureId]);
      
      // Trigger confetti when a feature is completed
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  const progress = (completedFeatures.length / features.length) * 100;

  useEffect(() => {
    // Check if all features are completed
    if (completedFeatures.length === features.length) {
      // Redirect to setup page after a short delay
      const timer = setTimeout(() => {
        navigate('/setup');
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [completedFeatures, navigate]);

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto space-y-8">
        {/* Progress Bar */}
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-lg font-medium text-gray-900">Getting Started</h2>
            <span className="text-sm text-gray-500">
              {completedFeatures.length} of {features.length} completed
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div
              className="bg-indigo-600 h-2 rounded-full transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {features.map((feature) => {
            const isCompleted = completedFeatures.includes(feature.id);
            const Icon = feature.icon;

            return (
              <div
                key={feature.id}
                className={`bg-white rounded-lg shadow-sm p-6 transition-all duration-300 ${
                  isCompleted ? 'border-2 border-green-500' : 'hover:shadow-md'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 rounded-lg ${
                      isCompleted ? 'bg-green-100' : 'bg-indigo-100'
                    }`}>
                      <Icon className={`h-6 w-6 ${
                        isCompleted ? 'text-green-600' : 'text-indigo-600'
                      }`} />
                    </div>
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {feature.title}
                      </h3>
                      <p className="mt-1 text-sm text-gray-500">
                        {feature.description}
                      </p>
                    </div>
                  </div>
                  {isCompleted ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : null}
                </div>

                <div className="mt-4 flex justify-between items-center">
                  <button
                    onClick={() => setCurrentVideo(feature.video)}
                    className="flex items-center text-sm text-indigo-600 hover:text-indigo-700"
                  >
                    <Play className="h-4 w-4 mr-1" />
                    Watch Tutorial
                  </button>
                  {!isCompleted && (
                    <button
                      onClick={() => handleFeatureComplete(feature.id)}
                      className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
                    >
                      Mark as Complete
                    </button>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Navigation Buttons */}
        <div className="flex justify-between">
          <button
            onClick={() => navigate('/')}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
          >
            Skip Tutorial
          </button>
          {completedFeatures.length === features.length && (
            <button
              onClick={() => navigate('/setup')}
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-lg hover:bg-indigo-700"
            >
              Continue to Setup
            </button>
          )}
        </div>

        {/* Video Modal */}
        {currentVideo && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-4 max-w-2xl w-full">
              <div className="flex justify-end mb-2">
                <button
                  onClick={() => setCurrentVideo(null)}
                  className="text-gray-500 hover:text-gray-700"
                >
                  <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
              <div className="aspect-w-16 aspect-h-9">
                <video
                  src={currentVideo}
                  controls
                  className="rounded-lg"
                  autoPlay
                >
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}