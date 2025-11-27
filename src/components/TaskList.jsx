import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ tasks, onEdit, onDelete, onToggleComplete }) {
  if (tasks.length === 0) {
    return (
      <div className="empty-state">
        <p>Задачи не найдены. Добавьте новую задачу чтобы начать!</p>
      </div>
    );
  }

  return (
    <section className="task-list">
      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onEdit={onEdit}
          onDelete={onDelete}
          onToggleComplete={onToggleComplete}
        />
      ))}
    </section>
  );
}

export default TaskList;