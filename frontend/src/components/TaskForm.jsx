function TaskForm({
  formData,
  onChange,
  onSubmit,
  onCancel,
  isEditing,
  loading
}) {
  return (
    <form className="card task-form" onSubmit={onSubmit}>
      <h2>{isEditing ? 'Edit Task' : 'Add Task'}</h2>

      <label className="field">
        <span>Title</span>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={onChange}
          placeholder="Enter task title"
          required
        />
      </label>

      <label className="field">
        <span>Description</span>
        <textarea
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Enter task description"
          rows="4"
        />
      </label>

      <div className="button-row">
        <button type="submit" disabled={loading}>
          {loading ? 'Saving...' : isEditing ? 'Update Task' : 'Create Task'}
        </button>

        {isEditing && (
          <button type="button" className="secondary-button" onClick={onCancel}>
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}

export default TaskForm;
