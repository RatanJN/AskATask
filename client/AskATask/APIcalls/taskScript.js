const API_BASE_URL = 'http://10.0.0.43:3000/api/tasks';

export const createNewTask = async (taskData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/create`, {
      method: 'POST',
      credentials: 'include', // to send cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    const data = await response.json();
    const header=await response.header;
    console.log(header)
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const getAllTasks = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}`, {
      method: 'GET',
      headers: {
        Authorization: `${token}`, // Set the Authorization header manually
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Only necessary if your endpoint is expecting cookies to be sent
    });

    if (
      response.ok &&
      response.headers.get('content-type')?.includes('application/json')
    ) {
      const data = await response.json();
      return data;
    } else {
      const text = await response.text();
      console.log(text);
      throw new Error('Server did not return a JSON response.');
    }
  } catch (error) {
    console.error('Error fetching tasks:', error);
  }
};

export const getTaskById = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${taskId}`, {
      credentials: 'include', // to send cookies
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const getMyTasks = async () => {
  try {
    const response = await fetch(`${API_BASE_URL}/mytasks`, {
      credentials: 'include', // to send cookies
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const updateTaskById = async (taskId, updateData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${taskId}`, {
      method: 'PUT',
      credentials: 'include', // to send cookies
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updateData),
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const acceptTaskById = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/accept/${taskId}`, {
      method: 'PUT',
      credentials: 'include', // to send cookies
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const closeTaskById = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/close/${taskId}`, {
      method: 'PUT',
      credentials: 'include', // to send cookies
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};

export const deleteTaskById = async (taskId) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${taskId}`, {
      method: 'DELETE',
      credentials: 'include', // to send cookies
    });
    const data = await response.json();
    console.log(data);
  } catch (error) {
    console.error(error);
  }
};
