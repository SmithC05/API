const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '/api/v1';
const TOKEN_KEY = 'token';

export function getToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function setToken(token) {
  localStorage.setItem(TOKEN_KEY, token);
}

export function removeToken() {
  localStorage.removeItem(TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(getToken());
}

async function request(endpoint, options = {}) {
  const token = getToken();

  const headers = {
    'Content-Type': 'application/json',
    ...(options.headers || {})
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    ...options,
    headers
  });

  const data = await response.json().catch(() => ({}));

  if (!response.ok) {
    if (response.status === 401) {
      removeToken();
    }

    const error = new Error(data.error || data.message || 'Something went wrong');
    error.status = response.status;
    throw error;
  }

  return data;
}

export function registerUser(formData) {
  return request('/auth/register', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
}

export function loginUser(formData) {
  return request('/auth/login', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
}

export function getTasks() {
  return request('/tasks');
}

export function createTask(formData) {
  return request('/tasks', {
    method: 'POST',
    body: JSON.stringify(formData)
  });
}

export function updateTask(taskId, formData) {
  return request(`/tasks/${taskId}`, {
    method: 'PUT',
    body: JSON.stringify(formData)
  });
}

export function deleteTask(taskId) {
  return request(`/tasks/${taskId}`, {
    method: 'DELETE'
  });
}
