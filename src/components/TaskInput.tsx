import React, { useState } from 'react';

const TaskInput: React.FC<{ addTask: (title: string, tags: string[], date: string) => void; existingTags: string[] }> = ({
  addTask,
  existingTags,
}) => {
  const [title, setTitle] = useState('');
  const [tags, setTags] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const handleSubmit = () => {
    if (title) {
      addTask(title, tags.split(',').map(tag => tag.trim()).filter(Boolean), date);
      setTitle('');
      setTags('');
      setDate(new Date().toISOString().split('T')[0]);
      setShowSuggestions(false);
    }
  };

  const handleTagChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setTags(e.target.value);
    setShowSuggestions(true);
  };

  const handleTagSelect = (tag: string) => {
    const currentTags = tags.split(',').map(t => t.trim()).filter(Boolean);
    const lastTag = currentTags.pop() || '';
    if (!lastTag || tag.startsWith(lastTag)) {
      setTags([...currentTags, tag].join(', ') + (currentTags.length ? ', ' : ''));
    }
    setShowSuggestions(false);
  };

  const suggestions = existingTags.filter(tag =>
    tag.toLowerCase().startsWith(tags.split(',').pop()?.trim().toLowerCase() || '')
  );

  return (
    <div className="mb-8 bg-white p-6 rounded-lg shadow-sm border border-gray-200 relative">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a task..."
        className="w-full p-3 mb-4 text-gray-800 text-lg border-b border-gray-200 focus:outline-none focus:border-blue-300"
      />
      <div className="flex gap-4 relative">
        <input
          type="text"
          value={tags}
          onChange={handleTagChange}
          onFocus={() => setShowSuggestions(true)}
          onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
          placeholder="Tags (e.g., work, personal)"
          className="flex-1 p-2 text-gray-600 text-sm border-b border-gray-200 focus:outline-none focus:border-blue-300"
        />
        {showSuggestions && suggestions.length > 0 && (
          <div className="autosuggest">
            {suggestions.map(tag => (
              <div
                key={tag}
                onMouseDown={() => handleTagSelect(tag)}
                className="autosuggest-item text-gray-700"
              >
                {tag}
              </div>
            ))}
          </div>
        )}
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="p-2 text-gray-600 text-sm border-b border-gray-200 focus:outline-none focus:border-blue-300"
        />
      </div>
      <button
        onClick={handleSubmit}
        className="mt-4 w-full py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
      >
        Add Task
      </button>
    </div>
  );
};

export default TaskInput;