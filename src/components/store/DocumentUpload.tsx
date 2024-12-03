import React from 'react';
import { FileText, Upload, X } from 'lucide-react';
import { StoreDocument } from '../../types/store';

interface DocumentUploadProps {
  documents: StoreDocument[];
  onChange: (documents: StoreDocument[]) => void;
}

export default function DocumentUpload({ documents, onChange }: DocumentUploadProps) {
  const handleDocumentUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const newDocument: StoreDocument = {
          id: crypto.randomUUID(),
          name: file.name,
          type: 'other',
          url: reader.result as string
        };
        onChange([...documents, newDocument]);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeDocument = (id: string) => {
    onChange(documents.filter(doc => doc.id !== id));
  };

  const updateDocument = (id: string, updates: Partial<StoreDocument>) => {
    onChange(documents.map(doc =>
      doc.id === id ? { ...doc, ...updates } : doc
    ));
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 space-y-6">
      <div className="flex items-center space-x-2">
        <FileText className="h-5 w-5 text-gray-400" />
        <h2 className="text-lg font-medium">Store Documents</h2>
      </div>

      <div className="space-y-4">
        {documents.map((doc) => (
          <div key={doc.id} className="flex items-center justify-between p-4 border rounded-lg">
            <div className="flex-1 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={doc.name}
                  onChange={(e) => updateDocument(doc.id, { name: e.target.value })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Type</label>
                <select
                  value={doc.type}
                  onChange={(e) => updateDocument(doc.id, { type: e.target.value as StoreDocument['type'] })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="license">License</option>
                  <option value="permit">Permit</option>
                  <option value="certificate">Certificate</option>
                  <option value="other">Other</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Expiry Date</label>
                <input
                  type="date"
                  value={doc.expiryDate ? new Date(doc.expiryDate).toISOString().split('T')[0] : ''}
                  onChange={(e) => updateDocument(doc.id, { expiryDate: new Date(e.target.value) })}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <button
                type="button"
                onClick={() => removeDocument(doc.id)}
                className="self-end px-3 py-2 text-sm text-red-600 hover:text-red-700"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        ))}

        <label className="flex flex-col items-center justify-center h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer hover:border-indigo-500">
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <Upload className="h-8 w-8 text-gray-400" />
            <p className="mt-2 text-sm text-gray-500">Click to upload a document</p>
          </div>
          <input
            type="file"
            className="hidden"
            onChange={handleDocumentUpload}
          />
        </label>
      </div>
    </div>
  );
}