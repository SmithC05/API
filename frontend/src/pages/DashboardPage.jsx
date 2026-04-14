import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import TaskForm from '../components/TaskForm';
import TaskList from '../components/TaskList';
import {
  createTask,
  deleteTask,
  getTasks,
  removeToken,
  updateTask
} from '../services/api';

const emptyForm = {
  title: '',
  description: ''
};

function DashboardPage() {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState(emptyForm);
  const [editingTask, setEditingTask] = useState(null);
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loadingTasks, setLoadingTasks] = useState(true);
  const [savingTask, setSavingTask] = useState(false);

  const loadTasks = async () => {
    setLoadingTasks(true);
    setError('');

    try {
      const response = await getTasks();
      setTasks(response.data?.tasks || []);
    } catch (requestError) {
      if (requestError.status === 401) {
        navigate('/login');
        return;
      }

      setError(requestError.message || 'Failed to load tasks');
    } finally {
      setLoadingTasks(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value
    }));
  };

  const resetForm = () => {
    setFormData(emptyForm);
    setEditingTask(null);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setSavingTask(true);
    setMessage('');
    setError('');

    try {
      if (editingTask) {
        await updateTask(editingTask.id, formData);
        setMessage('Task updated successfully');
      } else {
        await createTask(formData);
        setMessage('Task created successfully');
      }

      resetForm();
      await loadTasks();
    } catch (requestError) {
      if (requestError.status === 401) {
        navigate('/login');
        return;
      }

      setError(requestError.message || 'Failed to save task');
    } finally {
      setSavingTask(false);
    }
  };

  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description || ''
    });
    setMessage('');
    setError('');
  };

  const handleDelete = async (taskId) => {
    const confirmed = window.confirm('Are you sure you want to delete this task?');

    if (!confirmed) {
      return;
    }

    setMessage('');
    setError('');

    try {
      await deleteTask(taskId);
      setMessage('Task deleted successfully');

      if (editingTask && editingTask.id === taskId) {
        resetForm();
      }

      await loadTasks();
    } catch (requestError) {
      if (requestError.status === 401) {
        navigate('/login');
        return;
      }

      setError(requestError.message || 'Failed to delete task');
    }
  };

  const handleLogout = () => {
    removeToken();
    navigate('/login');
  };

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div>
          <h1>Dashboard</h1>
          <p>Manage your tasks after logging in.</p>
        </div>

        <button type="button" className="secondary-button" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {message && <p className="success-message">{message}</p>}
      {error && <p className="error-message">{error}</p>}

      <div className="dashboard-grid">
        <TaskForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          onCancel={resetForm}
          isEditing={Boolean(editingTask)}
          loading={savingTask}
        />

        <div>
          <h2>Your Tasks</h2>
          <TaskList
            tasks={tasks}
            onEdit={handleEdit}
            onDelete={handleDelete}
            loading={loadingTasks}
          />
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
