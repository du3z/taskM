import React, { useState, useEffect } from 'react';

function TaskForm({ onSubmit, editingTask, onCancelEdit }) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [deadline, setDeadline] = useState('');
  const [tags, setTags] = useState([]);
  const [currentTag, setCurrentTag] = useState('');

  useEffect(() => {
    if (editingTask) {
      setTitle(editingTask.title);
      setDescription(editingTask.description);
      setDeadline(editingTask.deadline || '');
      setTags(editingTask.tags || []);
    } else {
      resetForm();
    }
  }, [editingTask]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    const task = {
      id: editingTask?.id || Date.now().toString(),
      title: title.trim(),
      description: description.trim(),
      deadline: deadline || null,
      tags: [...tags],
      completed: editingTask?.completed || false,
      createdAt: editingTask?.createdAt || new Date().toISOString()
    };

    onSubmit(task);
    resetForm();
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setDeadline('');
    setTags([]);
    setCurrentTag('');
  };

  const addTag = () => {
    const tag = currentTag.trim();
    if (tag && !tags.includes(tag)) {
      setTags([...tags, tag]);
      setCurrentTag('');
    }
  };

  const removeTag = (tagToRemove) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  return (
    <section className="task-form">
      <h2>{editingTask ? 'Редактировать задачу' : 'Добавить новую задачу'}</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="taskTitle">Название</label>
          <input
            type="text"
            id="taskTitle"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="taskDescription">Описание</label>
          <textarea
            id="taskDescription"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="taskDeadline">Дедлайн</label>
          <input
            type="datetime-local"
            id="taskDeadline"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
          />
        </div>
        
        <div className="form-group">
          <label>Теги</label>
          <div className="tag-input">
            <input
              type="text"
              value={currentTag}
              onChange={(e) => setCurrentTag(e.target.value)}
              onKeyPress={handleTagKeyPress}
              placeholder="Добавить тег"
            />
            <button type="button" className="btn btn-primary" onClick={addTag}>
              Добавить
            </button>
          </div>
          <div className="task-tags">
            {tags.map(tag => (
              <span key={tag} className="task-tag">
                {tag}
                <span className="tag-remove" onClick={() => removeTag(tag)}>×</span>
              </span>
            ))}
          </div>
        </div>
        
        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            {editingTask ? 'Обновить задачу' : 'Добавить задачу'}
          </button>
          {editingTask && (
            <button type="button" className="btn" onClick={onCancelEdit}>
              Отмена
            </button>
          )}
        </div>
      </form>
    </section>
  );
}

export default TaskForm;