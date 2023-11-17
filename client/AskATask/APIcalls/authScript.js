const API_BASE_URL = 'https://askatask-server.onrender.com'; // Ensure correct protocol and IP address

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    return true;
  } catch (error) {
    console.error('Registration failed', error);
    return false;
  }
};

export const loginUser = async (credentials) => {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(credentials),
      credentials: 'include', // to ensure cookies are included with the request
    });
    return response;
    // Handle successful login, e.g., redirecting to the dashboard or storing the response in the state/context
  } catch (error) {
    console.error('Login failed', error);
    // You may also want to throw the error to be handled by the calling function
    throw error;
  }
};
