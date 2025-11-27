import React from 'react';

function TaskItem({ task, onEdit, onDelete, onToggleComplete }) {
  const isOverdue = () => {
    if (!task.deadline || task.completed) return false;
    return new Date(task.deadline) < new Date();
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Нет дедлайна';
    return new Date(dateString).toLocaleString('ru-RU');
  };

  return (
    <div className={`task-item ${isOverdue() ? 'overdue' : ''} ${task.completed ? 'completed' : ''}`}>
      <div className="task-header">
        <div className="task-title">{task.title}</div>
        <div className="task-actions">
          <button onClick={() => onEdit(task)} title="Редактировать">
            edit
          </button>
          <button onClick={() => onDelete(task.id)} title="Удалить">
            delete
          </button>
          <button onClick={() => onToggleComplete(task.id)} title={task.completed ? 'Отметить невыполненной' : 'Отметить выполненной'}>
            {task.completed ? '-' : '+'}
          </button>
        </div>
      </div>
      
      <div className="task-description">
        {task.description || 'Нет описания'}
      </div>
      
      {task.tags.length > 0 && (
        <div className="task-tags">
          {task.tags.map(tag => (
            <span key={tag} className="task-tag">{tag}</span>
          ))}
        </div>
      )}
      
      <div className={`task-deadline ${isOverdue() ? 'overdue' : ''}`}>
        Дедлайн: {formatDate(task.deadline)} {isOverdue() && !task.completed && '(ПРОСРОЧЕНО)'}
      </div>
    </div>
  );
}

export default TaskItem;