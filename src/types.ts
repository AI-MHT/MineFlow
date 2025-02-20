export interface DocumentItem {
  id: string;
  title: string;
  documentId: string;
  effectiveDate: string;
  revisionNumber: string;
  preparedBy: string;
  approvedBy: string;
  scope: string;
  purpose: string;
  status: string;
  relatedDocuments: string;
  lastReviewedDate: string;
  procedureSteps: string[];
  stepByStepInstructions: string[];
  requiredTools: string;
  expectedOutcome: string;
  children: DocumentItem[];
  icon?: string;
}

export interface Document {
  process: string;
  documents: DocumentItem[];
}

export interface TreeItem {
  id: string;
  label: string;
  icon?: string;
  children?: TreeItem[];
  document?: DocumentItem;
}