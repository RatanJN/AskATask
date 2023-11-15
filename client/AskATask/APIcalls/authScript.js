const API_BASE_URL = 'http://10.0.0.15:3000'; // Ensure correct protocol and IP address

export const registerUser = async (userData) => {
  try {
    const response = await fetch(`${API_BASE_URL}/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(userData),
      credentials: 'include', // to ensure cookies are included with the request
    });
    const data = await response.json();
    console.log('Registration successful', data);
  } catch (error) {
    console.error('Registration failed', error);
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
    //const data = await response.json();
    // setAuthToken(response.headers.map["set-cookie"]);
    // console.log(authToken);
    return response;
    // Handle successful login, e.g., redirecting to the dashboard or storing the response in the state/context
  } catch (error) {
    console.error('Login failed', error);
    // You may also want to throw the error to be handled by the calling function
    throw error;
  }
};
