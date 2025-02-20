import React, { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { DocumentItem } from '../types';

interface DocumentFormLevel1Props {
  document: DocumentItem;
  onUpdate: (document: Partial<DocumentItem>) => void;
}

const DocumentFormLevel1: React.FC<DocumentFormLevel1Props> = ({ document, onUpdate }) => {
  const [procedureSteps, setProcedureSteps] = useState<string>(document.procedureSteps.join('\n'));
  const [stepByStepInstructions, setStepByStepInstructions] = useState<string>(document.stepByStepInstructions.join('\n'));

  const handleProcedureStepsChange = (value: string) => {
    setProcedureSteps(value);
    onUpdate({ procedureSteps: value.split('\n').filter(step => step.trim()) });
  };

  const handleStepByStepInstructionsChange = (value: string) => {
    setStepByStepInstructions(value);
    onUpdate({ stepByStepInstructions: value.split('\n').filter(step => step.trim()) });
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Document Title</label>
          <input
            type="text"
            value={document.title}
            onChange={(e) => onUpdate({ title: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Document ID</label>
          <input
            type="text"
            value={document.documentId}
            onChange={(e) => onUpdate({ documentId: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Effective Date</label>
          <input
            type="date"
            value={document.effectiveDate}
            onChange={(e) => onUpdate({ effectiveDate: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Revision Number</label>
          <input
            type="text"
            value={document.revisionNumber}
            onChange={(e) => onUpdate({ revisionNumber: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Prepared By</label>
          <input
            type="text"
            value={document.preparedBy}
            onChange={(e) => onUpdate({ preparedBy: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Approved By</label>
          <input
            type="text"
            value={document.approvedBy}
            onChange={(e) => onUpdate({ approvedBy: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Scope</label>
          <textarea
            value={document.scope}
            onChange={(e) => onUpdate({ scope: e.target.value })}
            className="w-full p-2 border rounded-md"
            rows={3}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Purpose/Objective</label>
          <textarea
            value={document.purpose}
            onChange={(e) => onUpdate({ purpose: e.target.value })}
            className="w-full p-2 border rounded-md"
            rows={3}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
          <input
            type="text"
            value={document.status}
            onChange={(e) => onUpdate({ status: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Related Documents</label>
          <input
            type="text"
            value={document.relatedDocuments}
            onChange={(e) => onUpdate({ relatedDocuments: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Required Tools</label>
          <input
            type="text"
            value={document.requiredTools}
            onChange={(e) => onUpdate({ requiredTools: e.target.value })}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Expected Outcome</label>
          <textarea
            value={document.expectedOutcome}
            onChange={(e) => onUpdate({ expectedOutcome: e.target.value })}
            className="w-full p-2 border rounded-md"
            rows={2}
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Procedure Steps</label>
          <ReactQuill
            value={procedureSteps}
            onChange={handleProcedureStepsChange}
            modules={{
              toolbar: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean']
              ],
            }}
            className="w-full p-2 border rounded-md"
          />
        </div>
        <div className="md:col-span-2">
          <label className="block text-sm font-medium text-gray-700 mb-1">Step-by-Step Instructions</label>
          <ReactQuill
            value={stepByStepInstructions}
            onChange={handleStepByStepInstructionsChange}
            modules={{
              toolbar: [
                [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
                [{size: []}],
                ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
                ['link', 'image'],
                ['clean']
              ],
            }}
            className="w-full p-2 border rounded-md"
          />
        </div>
      </div>
    </div>
  );
};

export default DocumentFormLevel1;