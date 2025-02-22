import React from 'react';

type Task = { id: number; title: string; tags: string[]; date: string; completed: boolean };

const TaskList: React.FC<{
  tasks: Task[];
  toggleComplete: (id: number) => void;
  getTagColor: (tag: string) => string;
}> = ({ tasks, toggleComplete, getTagColor }) => {
  return (
    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
      {tasks.length === 0 ? (
        <p className="p-6 text-gray-500 text-center">No tasks yet.</p>
      ) : (
        tasks.map(task => (
          <div
            key={task.id}
            className="flex items-center p-4 border-b border-gray-100 hover:bg-gray-50 transition-colors"
          >
            <input
              type="checkbox"
              checked={task.completed}
              onChange={() => toggleComplete(task.id)}
              className="checkbox mr-4"
            />
            <div className="flex-1">
              <p className={`text-gray-800 ${task.completed ? 'line-through text-gray-400' : ''}`}>
                {task.title}
              </p>
              <p className="text-sm text-gray-500">
                {task.tags.map(tag => (
                  <span
                    key={tag}
                    className={`inline-block px-1.5 py-0.5 rounded mr-1 ${getTagColor(tag)}`}
                  >
                    {tag}
                  </span>
                ))}
                {task.tags.length > 0 && ' - '}
                {task.date}
              </p>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default TaskList;