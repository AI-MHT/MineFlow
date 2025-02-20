import React from 'react';
import { DocumentItem } from '../types';

interface DocumentFormProps {
  document: DocumentItem;
  onUpdate: (document: Partial<DocumentItem>) => void;
}

const DocumentForm: React.FC<DocumentFormProps> = ({ document, onUpdate }) => {
  return (
    <div className="bg-white shadow-lg p-6 overflow-y-auto max-h-[calc(100vh-8rem)] w-full h-full transition-all duration-300 flex flex-col">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 flex-1">
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Document Title
          </label>
          <input
            type="text"
            value={document.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Document ID
          </label>
          <input
            type="text"
            value={document.documentId}
            onChange={(e) => onUpdate({ documentId: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
          />
        </div>
        <div className="col-span-1 sm:col-span-2">
          <label className="block text-sm font-semibold text-gray-800 mb-1">
            Effective Date
          </label>
          <input
            type="date"
            value={document.effectiveDate}
            onChange={(e) => onUpdate({ effectiveDate: e.target.value })}
            className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all duration-300"
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentForm;