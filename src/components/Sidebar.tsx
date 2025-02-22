import React from 'react';

const Sidebar: React.FC<{
  setTab: (tab: string) => void;
  activeTab: string;
  tags: string[];
  getTagColor: (tag: string) => string;
  setSelectedTag: (tag: string | null) => void;
  selectedTag: string | null;
}> = ({ setTab, activeTab, tags, getTagColor, setSelectedTag, selectedTag }) => {
  return (
    <div className="w-64 bg-white shadow-md p-6 h-screen">
      <h1 className="text-2xl font-semibold text-gray-800 mb-8">To-Do</h1>
      <button
        onClick={() => setTab('active')}
        className={`w-full text-left py-3 px-4 mb-2 rounded-lg text-gray-700 font-medium ${
          activeTab === 'active' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
        }`}
      >
        Active Tasks
      </button>
      <button
        onClick={() => setTab('completed')}
        className={`w-full text-left py-3 px-4 mb-6 rounded-lg text-gray-700 font-medium ${
          activeTab === 'completed' ? 'bg-blue-100 text-blue-600' : 'hover:bg-gray-100'
        }`}
      >
        Completed Tasks
      </button>
      <h2 className="text-lg font-medium text-gray-700 mb-4">Tags</h2>
      {tags.length === 0 ? (
        <p className="text-gray-500 text-sm">No tags yet</p>
      ) : (
        <div className="space-y-3"> {/* Increased space with class `space-y-3` */}
          {tags.map(tag => (
            <button
              key={tag}
              onClick={() => setSelectedTag(tag === selectedTag ? null : tag)}
              className={`inline-block px-2 py-1 rounded-md text-sm font-medium ${getTagColor(tag)} ${
                tag === selectedTag ? 'ring-2 ring-offset-2 ring-gray-400' : 'hover:opacity-80'
              }`}
            >
              {tag}
            </button>
          ))}
          {selectedTag && (
            <button
              onClick={() => setSelectedTag(null)}
              className="mt-3 text-sm text-gray-500 hover:text-gray-700"
            >
              Clear Filter
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default Sidebar;