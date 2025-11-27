import React, { useState, useMemo } from 'react';
import { useLocalStorage } from './hooks/useLocalStorage';
import TaskForm from './components/TaskForm';
import TaskList from './components/TaskList';
import SearchBox from './components/SearchBox';

function App() {
  const [tasks, setTasks] = useLocalStorage('tasks', []);
  const [isDarkTheme, setIsDarkTheme] = useLocalStorage('darkTheme', false);
  const [searchTerm, setSearchTerm] = useState('');
  const [editingTask, setEditingTask] = useState(null);

  // Применяем тему
  React.useEffect(() => {
    if (isDarkTheme) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [isDarkTheme]);

  // Фильтрация задач
  const filteredTasks = useMemo(() => {
    return tasks.filter(task => {
      const matchesSearch = task.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           task.tags.some(tag => tag.toLowerCase().includes(searchTerm.toLowerCase()));
      return matchesSearch;
    });
  }, [tasks, searchTerm]);

  const handleAddTask = (task) => {
    if (editingTask) {
      // Обновление существующей задачи
      setTasks(tasks.map(t => t.id === task.id ? task : t));
      setEditingTask(null);
    } else {
      // Добавление новой задачи
      setTasks([...tasks, task]);
    }
  };

  const handleEditTask = (task) => {
    setEditingTask(task);
  };

  const handleCancelEdit = () => {
    setEditingTask(null);
  };

  const handleDeleteTask = (id) => {
    if (window.confirm('Вы уверены, что хотите удалить эту задачу?')) {
      setTasks(tasks.filter(task => task.id !== id));
    }
  };

  const handleToggleComplete = (id) => {
    setTasks(tasks.map(task => 
      task.id === id ? { ...task, completed: !task.completed } : task
    ));
  };

  const toggleTheme = () => {
    setIsDarkTheme(!isDarkTheme);
  };

  return (
    <div className="container">
      <header>
        <h1>Менеджер задач</h1>
        <button className="theme-toggle" onClick={toggleTheme}>
          {isDarkTheme ? '☀️' : '🌙'}
        </button>
      </header>

      <TaskForm 
        onSubmit={handleAddTask}
        editingTask={editingTask}
        onCancelEdit={handleCancelEdit}
      />

      <SearchBox 
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
      />

      <TaskList 
        tasks={filteredTasks}
        onEdit={handleEditTask}
        onDelete={handleDeleteTask}
        onToggleComplete={handleToggleComplete}
      />
    </div>
  );
}

export default App;