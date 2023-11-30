const API_BASE_URL = 'http://10.239.66.104:3000/api/tasks';

export const createNewTask = async (taskData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/create`, {
      method: 'POST',
      headers: {
        Authorization: `${token}`, // Set the Authorization header manually
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(taskData),
    });
    const data = await response.json();
    const header = await response.header;
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
      useCredentials: true, // Only necessary if your endpoint is expecting cookies to be sent
    });

    if (
      response.ok &&
      response.headers.get('content-type')?.includes('application/json')
    ) {
      const data = await response.json();
      return data;
    } else {
      const text = await response.text();
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
  } catch (error) {
    console.error(error);
  }
};

export const updateTaskById = async (taskId, updateData, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/${taskId}`, {
      method: 'PUT',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
      body: JSON.stringify(updateData),
    });

    const data = await response.json(); // Always parse the response to JSON

    if (!response.ok) {
      // Include more details in the error message
      const errorDetail = data.message || 'Unknown error occurred'; // Adjust depending on how your API structures error messages
      throw new Error(`Failed to update the task: ${errorDetail}`);
    }

    // Return the parsed data (which should contain the updated task details)
    return data;
  } catch (error) {
    console.error('Error updating task:', error.message);
    throw new Error(error.message); // Re-throw the error with the message
  }
};

export const acceptTaskById = async (taskId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/accept/${taskId}`, {
      method: 'PUT',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Necessary if the API sets/reads cookies
    });
    if (response.ok) {
      // Handle success
      return true;
    } else {
      if (response.headers.get('content-type')?.includes('application/json')) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to accept the task.');
      } else {
        // Handle non-JSON response
        const text = await response.text();
        throw new Error(text || 'Failed to accept the task.');
      }
    }
  } catch (error) {
    throw error;
  }
};

export const closeTaskById = async (taskId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/close/${taskId}`, {
      method: 'PUT',
      headers: {
        Authorization: `${token}`,
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });
    const data = await response.json();
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
  } catch (error) {
    console.error(error);
  }
};
