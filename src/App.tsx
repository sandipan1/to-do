import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import TaskInput from './components/TaskInput';
import TaskList from './components/TaskList';
import './index.css';

// Predefined pastel color mapping for tags
const TAG_COLORS: { [key: string]: string } = {
  work: 'bg-blue-100 text-blue-700',
  personal: 'bg-pink-100 text-pink-700',
  urgent: 'bg-red-100 text-red-700',
  home: 'bg-green-100 text-green-700',
  shopping: 'bg-purple-100 text-purple-700',
  ideas: 'bg-yellow-100 text-yellow-700',
  // Add more as needed or use a dynamic generator
};

type Task = {
  id: number;
  title: string;
  tags: string[];
  date: string;
  completed: boolean;
};

function App() {
  console.log('App rendering');
  const [tasks, setTasks] = useState<Task[]>(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });
  const [activeTab, setActiveTab] = useState('active');
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    console.log('Tasks updated:', tasks);
  }, [tasks]);

  const addTask = (title: string, tags: string[], date: string) => {
    console.log('Adding task:', { title, tags, date });
    const newTask: Task = { id: Date.now(), title, tags, date, completed: false };
    setTasks(prev => {
      const updated = [...prev, newTask];
      console.log('New tasks state:', updated);
      return updated;
    });
  };

  const toggleComplete = (id: number) => {
    console.log('Toggling task:', id);
    setTasks(prev => prev.map(t => t.id === id ? { ...t, completed: !t.completed } : t));
  };

  const uniqueTags = Array.from(new Set(tasks.flatMap(task => task.tags)));

  const getTagColor = (tag: string) => {
    return TAG_COLORS[tag.toLowerCase()] || 'bg-gray-100 text-gray-700'; // Fallback color
  };

  const filteredTasks = selectedTag
    ? tasks.filter(task => task.tags.includes(selectedTag))
    : tasks;

  const activeTasks = filteredTasks.filter(task => !task.completed);
  const completedTasks = filteredTasks.filter(task => task.completed);

  console.log('Active tasks:', activeTasks);
  console.log('Completed tasks:', completedTasks);
  console.log('Unique tags:', uniqueTags);
  console.log('Selected tag:', selectedTag);

  return (
    <div className="flex h-screen bg-gray-50">
      <Sidebar
        setTab={setActiveTab}
        activeTab={activeTab}
        tags={uniqueTags}
        getTagColor={getTagColor}
        setSelectedTag={setSelectedTag}
        selectedTag={selectedTag}
      />
      <div className="flex-1 p-8 overflow-auto">
        <TaskInput addTask={addTask} existingTags={uniqueTags} />
        <TaskList
          tasks={activeTab === 'active' ? activeTasks : completedTasks}
          toggleComplete={toggleComplete}
          getTagColor={getTagColor}
        />
      </div>
    </div>
  );
}

export default App;