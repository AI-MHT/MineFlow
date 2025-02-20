import React, { useState } from 'react';
import { Save } from 'lucide-react';
import DocumentFormLevel1 from './components/DocumentFormLevel1';
import DocumentFormLevel2 from './components/DocumentFormLevel2';
import DocumentFormLevel3 from './components/DocumentFormLevel3';
import DocumentPreview from './components/DocumentPreview';
import Navigation from './components/Navigation';
import Modal from './components/Modal';
import { Document, DocumentItem, TreeItem } from './types';
import './index.css';
import ImageComponent from './components/ImageComponent'; // Importer le ImageComponent

function generateId() {
  return Math.random().toString(36).substr(2, 9);
}

function createEmptyDocument(title: string): DocumentItem {
  return {
    id: generateId(),
    title,
    documentId: '',
    effectiveDate: '',
    revisionNumber: '',
    preparedBy: '',
    approvedBy: '',
    scope: '',
    purpose: '',
    status: '',
    relatedDocuments: '',
    lastReviewedDate: '',
    procedureSteps: [],
    stepByStepInstructions: [],
    requiredTools: '',
    expectedOutcome: '',
    children: []
  };
}

function getDocumentDepth(doc: DocumentItem, depth = 0): number {
  if (!doc.children.length) return depth;
  return Math.max(...doc.children.map(child => getDocumentDepth(child, depth + 1)));
}

function updateDocuments(docs: DocumentItem[], parentId: string | null, newDoc: DocumentItem): DocumentItem[] {
  return docs.map(doc => {
    if (doc.id === parentId) {
      if (getDocumentDepth(doc) < 2) {
        return {
          ...doc,
          children: [...doc.children, newDoc],
        };
      }
    }
    return {
      ...doc,
      children: updateDocuments(doc.children, parentId, newDoc),
    };
  });
}

function deleteDocument(docs: DocumentItem[], id: string): DocumentItem[] {
  return docs.filter(doc => {
    if (doc.id === id) return false;
    doc.children = deleteDocument(doc.children, id);
    return true;
  });
}

function findDocumentById(docs: DocumentItem[], id: string): DocumentItem | null {
  for (const doc of docs) {
    if (doc.id === id) return doc;
    for (const child of doc.children) {
      const found = findDocumentById(child.children, id);
      if (found) return found;
    }
  }
  return null;
}

function buildTree(items: DocumentItem[]): TreeItem[] {
  return items.map(doc => ({
    id: doc.id,
    label: doc.title,
    children: doc.children.map(child => ({
      id: child.id,
      label: child.title,
      children: getDocumentDepth(child) < 2 ? child.children.map(subChild => ({
        id: subChild.id,
        label: subChild.title,
        children: []
      })) : []
    }))
  }));
}

function App() {
  const [document, setDocument] = useState<Document>({
    process: 'Document Management',
    documents: [
      createEmptyDocument('mec'),
    ]
  });
  const [selectedDocumentId, setSelectedDocumentId] = useState<string | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [documentToDelete, setDocumentToDelete] = useState<DocumentItem | null>(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);

  const handleAddDocument = (parentId: string | null = null) => {
    if (parentId) {
      const parentDoc = findDocumentById(document.documents, parentId);
      if (parentDoc && getDocumentDepth(parentDoc) >= 2) {
        return; 
      }
    }

    const newDoc = createEmptyDocument('New Document');
    setDocument(prev => ({
      ...prev,
      documents: parentId
        ? updateDocuments(prev.documents, parentId, newDoc)
        : [...prev.documents, newDoc]
    }));
    setSelectedDocumentId(newDoc.id);
  };

  const handleDeleteDocument = () => {
    if (!documentToDelete) return;
    setDocument(prev => ({
      ...prev,
      documents: deleteDocument(prev.documents, documentToDelete.id)
    }));
    setSelectedDocumentId(null);
    setIsDeleteModalOpen(false); 
  };

  const selectedDocument = selectedDocumentId
    ? findDocumentById(document.documents, selectedDocumentId)
    : null;

  const getDocumentForm = (document: DocumentItem) => {
    const depth = getDocumentDepth(document);
    switch (depth) {
      case 0:
        return <DocumentFormLevel1 document={document} onUpdate={(updatedDoc) => handleUpdateDocument(updatedDoc)} />;
      case 1:
        return <DocumentFormLevel2 document={document} onUpdate={(updatedDoc) => handleUpdateDocument(updatedDoc)} />;
      case 2:
        return <DocumentFormLevel3 document={document} onUpdate={(updatedDoc) => handleUpdateDocument(updatedDoc)} />;
      default:
        return null;
    }
  };

  const handleUpdateDocument = (updatedDoc: Partial<DocumentItem>) => {
    setDocument(prev => {
      const updateDoc = (docs: DocumentItem[]): DocumentItem[] => {
        return docs.map(doc => {
          if (doc.id === selectedDocumentId) {
            return { ...doc, ...updatedDoc };
          }
          return {
            ...doc,
            children: updateDoc(doc.children)
          };
        });
      };
      return { ...prev, documents: updateDoc(prev.documents) };
    });
  };

  return (
    <div className="flex h-screen">
      <Navigation
        items={buildTree(document.documents)}
        selectedId={selectedDocumentId}
        onSelect={setSelectedDocumentId}
        onAddDocument={handleAddDocument}
        onDelete={(doc) => {
          setDocumentToDelete(doc);
          setIsDeleteModalOpen(true); 
        }} 
        isSidebarVisible={isSidebarVisible} 
        onHideSidebar={() => setIsSidebarVisible(false)}
        onShowSidebar={() => setIsSidebarVisible(true)}
      />
      <div className={`flex-1 overflow-hidden ${isSidebarVisible ? 'ml-72' : 'ml-0'} transition-all duration-300`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">Document Editor</h1>
            <div className="flex gap-2">
              <button
                onClick={() => alert('Saving functionality to be implemented')}
                className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors"
              >
                <Save size={20} />
                Save
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {selectedDocument ? (
              <>
                {getDocumentForm(selectedDocument)}
                <DocumentPreview document={selectedDocument} />
              </>
            ) : (
              <div className="col-span-2 flex items-center justify-center h-64 bg-gray-50 rounded-lg">
                <p className="text-gray-500">Select a document from the navigation tree</p>
              </div>
            )}
          </div>
          <ImageComponent /> {/* Ajouter le ImageComponent ici */}
        </div>
      </div>
      {isDeleteModalOpen && documentToDelete && (
        <Modal onClose={() => setIsDeleteModalOpen(false)}>
          <div className="flex flex-col items-center">
            <p className="mb-4 text-gray-700">Are you sure you want to delete the document "{documentToDelete.title}" with ID "{documentToDelete.documentId}"?</p>
            <div className="flex gap-2">
              <button
                onClick={handleDeleteDocument}
                className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
              >
                Delete
              </button>
              <button
                onClick={() => setIsDeleteModalOpen(false)}
                className="bg-gray-300 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-400 transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  );
}

export default App;