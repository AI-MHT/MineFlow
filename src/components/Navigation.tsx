import React, { useState } from 'react';
import { ChevronDown, ChevronRight, FileText, Plus, X } from 'lucide-react';
import { TreeItem } from '../types';
import '../NavigationItem.css'; // Import the CSS file here

interface NavigationProps {
  items: TreeItem[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAddDocument: (parentId: string | null) => void;
  onDelete: (doc: TreeItem) => void; // Pass the document to delete
  isSidebarVisible: boolean; // Add prop to track sidebar visibility
  onHideSidebar: () => void; // Add prop to hide sidebar
  onShowSidebar: () => void; // Add prop to show sidebar
}

const NavigationItem: React.FC<{
  item: TreeItem;
  level: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
  onAddDocument: (parentId: string | null) => void;
  onDelete: (doc: TreeItem) => void; // Pass the document to delete
}> = ({ item, level, selectedId, onSelect, onAddDocument, onDelete }) => {
  const [isOpen, setIsOpen] = useState(true);
  const hasChildren = item.children && item.children.length > 0;
  const isLevel3 = level >= 2; // Level 3 is when level is 2 or more (0-based index)
  return (
    <div className="select-none">
      <div
        className={`flex items-center py-1 px-2 hover:bg-gray-100 cursor-pointer ${
          selectedId === item.id ? 'bg-blue-50' : ''
        }`}
        style={{ paddingLeft: `${level * 1.5}rem` }}
        onClick={() => onSelect(item.id)}
      >
        <button
          onClick={(e) => {
            e.stopPropagation();
            if (hasChildren) setIsOpen(!isOpen);
          }}
          className="w-6 h-6 flex items-center justify-center text-gray-500 hover:text-gray-700"
        >
          {hasChildren && (isOpen ? <ChevronDown size={18} /> : <ChevronRight size={18} />)}
        </button>
        <div className="flex-1 flex items-center gap-2 ml-1 overflow-hidden">
          {item.icon ? (
            <span className="text-lg">{item.icon}</span>
          ) : (
            <FileText size={18} className="text-gray-500" />
          )}
          <div className="marquee-container">
            <div className={`marquee ${item.label.length > 20 ? 'animate' : ''}`}>
              <span>{item.label}</span>
            </div>
          </div>
        </div>
        <div className="flex items-center gap-1 opacity-100 transition-opacity">
          {!isLevel3 && ( // Hide button at level 3
            <button
              onClick={(e) => {
                e.stopPropagation();
                onAddDocument(item.id);
              }}
              className="p-1 hover:bg-gray-200 rounded"
            >
              <Plus size={16} />
            </button>
          )}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onDelete(item); // Pass the document to delete
            }}
            className="p-1 hover:bg-gray-200 rounded text-red-500"
          >
            <X size={16} />
          </button>
        </div>
      </div>
      {hasChildren && isOpen && (
        <div>
          {item.children.map((child) => (
            <NavigationItem
              key={child.id}
              item={child}
              level={level + 1}
              selectedId={selectedId}
              onSelect={onSelect}
              onAddDocument={onAddDocument}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const Navigation: React.FC<NavigationProps> = ({
  items,
  selectedId,
  onSelect,
  onAddDocument,
  onDelete,
  isSidebarVisible,
  onHideSidebar,
  onShowSidebar,
}) => {
  return (
    <div className={`relative ${isSidebarVisible ? 'w-72' : 'w-16'} bg-white border-r h-screen overflow-y-auto transition-all duration-300`}>
      {isSidebarVisible && (
        <>
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">General</h2>
              <button
                onClick={onHideSidebar}
                className="p-1 hover:bg-gray-100 rounded"
                title="Hide Sidebar"
              >
                <X size={20} />
              </button>
            </div>
            <NavigationItem
              item={{ id: 'home', label: 'Home Page'}}
            />
          </div>
          <div className="p-4 border-b">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">Documents</h2>
              <button
                onClick={() => onAddDocument(null)}
                className="p-1 hover:bg-gray-100 rounded"
                title="Add Document"
              >
                <Plus size={20} />
              </button>
            </div>
          </div>
          <div className="py-2">
            {items.map((item) => (
              <NavigationItem
                key={item.id}
                item={item}
                level={0}
                selectedId={selectedId}
                onSelect={onSelect}
                onAddDocument={onAddDocument}
                onDelete={onDelete}
              />
            ))}
          </div>
        </>
      )}
      {!isSidebarVisible && (
        <button
          onClick={onShowSidebar}
          className="absolute top-4 right-0 p-1 bg-gray-100 rounded"
          title="Show Sidebar"
        >
          <ChevronRight size={20} />
        </button>
      )}
    </div>
  );
};

export default Navigation;