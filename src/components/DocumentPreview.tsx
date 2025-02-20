import React from 'react';
import { DocumentItem } from '../types';

interface DocumentPreviewProps {
  document: DocumentItem;
}

const DocumentPreview: React.FC<DocumentPreviewProps> = ({ document }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6 overflow-y-auto max-h-[calc(100vh-8rem)]">
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-bold mb-2">{document.title}</h2>
          <p className="text-sm text-gray-500">Document ID: {document.documentId}</p>
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm">
          <div>
            <p className="font-medium">Effective Date</p>
            <p>{document.effectiveDate}</p>
          </div>
          <div>
            <p className="font-medium">Revision Number</p>
            <p>{document.revisionNumber}</p>
          </div>
          <div>
            <p className="font-medium">Prepared By</p>
            <p>{document.preparedBy}</p>
          </div>
          <div>
            <p className="font-medium">Approved By</p>
            <p>{document.approvedBy}</p>
          </div>
        </div>
        <div>
          <h3 className="font-medium mb-2">Scope</h3>
          <p className="text-gray-700">{document.scope}</p>
        </div>
        <div>
          <h3 className="font-medium mb-2">Purpose/Objective</h3>
          <p className="text-gray-700">{document.purpose}</p>
        </div>
        {document.status && (
          <div>
            <h3 className="font-medium mb-2">Status</h3>
            <p className="text-gray-700">{document.status}</p>
          </div>
        )}
        {document.relatedDocuments && (
          <div>
            <h3 className="font-medium mb-2">Related Documents</h3>
            <p className="text-gray-700">{document.relatedDocuments}</p>
          </div>
        )}
        {document.procedureSteps.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Procedure Steps</h3>
            <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: document.procedureSteps.join('') }} />
          </div>
        )}
        {document.stepByStepInstructions.length > 0 && (
          <div>
            <h3 className="font-medium mb-2">Step-by-Step Instructions</h3>
            <div className="text-gray-700" dangerouslySetInnerHTML={{ __html: document.stepByStepInstructions.join('') }} />
          </div>
        )}
        {document.requiredTools && (
          <div>
            <h3 className="font-medium mb-2">Required Tools</h3>
            <p className="text-gray-700">{document.requiredTools}</p>
          </div>
        )}
        {document.expectedOutcome && (
          <div>
            <h3 className="font-medium mb-2">Expected Outcome</h3>
            <p className="text-gray-700">{document.expectedOutcome}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default DocumentPreview;