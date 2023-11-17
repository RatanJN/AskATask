const API_BASE_URL = 'https://askatask-server.onrender.com';

export const getUserDetails = async (token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user`, {
      method: 'GET',
      headers: {
        Authorization: `${token}`, // Set the Authorization header manually if needed
        'Content-Type': 'application/json',
      },
      credentials: 'include', // Only necessary if your endpoint is expecting cookies to be sent
    });

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      // If the response was not ok, handle it here
      const text = await response.text(); // This could be an HTML error page or error message
      throw new Error('Server did not return a JSON response.');
    }
  } catch (error) {
    console.error('Error fetching user details:', error);
    throw error;
  }
};

export const fetchCreatorDetails = async (creatorId, token) => {
  try {
    const response = await fetch(`${API_BASE_URL}/user/${creatorId}`, {
      method: 'GET',
      headers: {
        Authorization: `${token}`, // Set the Authorization header manually if needed
        'Content-Type': 'application/json',
      },
      credentials: 'include',
    });

    if (!response.ok) {
      throw new Error('Failed to fetch user details');
    }

    const creatorDetails = await response.json();
    return creatorDetails;
  } catch (error) {
    console.error('Error fetching creator details:', error);
    // Handle errors, possibly by setting an error state or showing an alert
  }
};
