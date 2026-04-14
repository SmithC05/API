function TaskList({ tasks, onEdit, onDelete, loading }) {
  if (loading) {
    return <p className="card">Loading tasks...</p>;
  }

  if (tasks.length === 0) {
    return <p className="card">No tasks found yet.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div className="card task-item" key={task.id}>
          <h3>{task.title}</h3>
          <p>{task.description || 'No description added.'}</p>
          <small>Task ID: {task.id}</small>

          <div className="button-row">
            <button type="button" onClick={() => onEdit(task)}>
              Edit
            </button>
            <button
              type="button"
              className="danger-button"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;
