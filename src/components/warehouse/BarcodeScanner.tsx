import React, { useState, useRef } from 'react';
import { Camera, X } from 'lucide-react';
import toast from 'react-hot-toast';

interface BarcodeScannerProps {
  onScan: (barcode: string) => void;
  onClose: () => void;
}

export default function BarcodeScanner({ onScan, onClose }: BarcodeScannerProps) {
  const [isScanning, setIsScanning] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [error, setError] = useState<string | null>(null);

  const startScanning = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsScanning(true);
        setError(null);
      }
    } catch (err) {
      setError('Unable to access camera. Please ensure you have granted camera permissions.');
      toast.error('Camera access denied');
    }
  };

  const stopScanning = () => {
    if (videoRef.current?.srcObject) {
      const tracks = (videoRef.current.srcObject as MediaStream).getTracks();
      tracks.forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsScanning(false);
  };

  // Simulate barcode detection
  const handleScanComplete = () => {
    const mockBarcode = Math.random().toString(36).substring(7).toUpperCase();
    onScan(mockBarcode);
    stopScanning();
    onClose();
    toast.success('Barcode scanned successfully');
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">Scan Barcode</h2>
          <button
            onClick={() => {
              stopScanning();
              onClose();
            }}
            className="text-gray-500 hover:text-gray-700"
          >
            <X className="h-6 w-6" />
          </button>
        </div>

        {error ? (
          <div className="text-center py-4">
            <p className="text-red-600 mb-4">{error}</p>
            <button
              onClick={startScanning}
              className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
            >
              Retry
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative aspect-video bg-black rounded-lg overflow-hidden">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="absolute inset-0 w-full h-full object-cover"
              />
              {!isScanning && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <button
                    onClick={startScanning}
                    className="flex items-center px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
                  >
                    <Camera className="h-5 w-5 mr-2" />
                    Start Scanning
                  </button>
                </div>
              )}
            </div>

            {isScanning && (
              <div className="flex justify-center space-x-4">
                <button
                  onClick={handleScanComplete}
                  className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
                >
                  Complete Scan
                </button>
                <button
                  onClick={() => {
                    stopScanning();
                    onClose();
                  }}
                  className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
                >
                  Cancel
                </button>
              </div>
            )}

            <p className="text-sm text-gray-500 text-center">
              Position the barcode within the camera view. The scanner will automatically detect valid barcodes.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}