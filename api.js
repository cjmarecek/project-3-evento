import { API_URL } from 'react-native-dotenv';

//  Login as admin
export const login = async (username, password) => {
  const response = await fetch(`${API_URL}/authenticate`, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (response.ok) {
    const json = await response.json();
    return json.token;
  }

  const errMessage = await response.text();
  throw new Error(errMessage);
};


// Fetch events 
export const getEvents = async () => {
  try {
    const response = await fetch(`${API_URL}/api/events`);
    const json = await response.json();
    return json;
  } catch (error) {
    const errMessage = await response.text();
    throw new Error(errMessage);
  }
};

export const postEvent = async (event) => {
  let formData = new FormData();
  formData.append('title', event.title);
  formData.append('description', event.description);
  formData.append('place', event.place);
  formData.append('date', event.date);
  if (event.image) {
    let uriParts = event.image.split('.');
    let fileType = uriParts[uriParts.length - 1];
    let name = uriParts[uriParts.length - 2];
    formData.append('image', {
      uri: event.image,
      name: `${name}.${fileType}`,
      type: `image/${fileType}`,
    });
  }else{
    formData.append('image', null)
  }
  let options = {
    method: 'POST',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await fetch(`${API_URL}/api/events`, options);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
  } catch (error) {
    console.log(error);

    throw new Error(error);
  }
};

export const getEvent = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/events/${id}`);
    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error(error);
  }
};

export const putEvent = async (event) => {
  let formData = new FormData();
  formData.append('title', event.title);
  formData.append('description', event.description);
  formData.append('place', event.place);
  formData.append('date', event.date);
  if (event.image){
    let uriParts = event.image.split('.');
    let fileType = uriParts[uriParts.length - 1];
    let name = uriParts[uriParts.length - 2];
    formData.append('image', {
      uri: event.image,
      name: `${name}.${fileType}`,
      type: `image/${fileType}`,
    });
  } 
  
  let options = {
    method: 'PUT',
    body: formData,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'multipart/form-data',
    },
  };

  try {
    const response = await fetch(`${API_URL}/api/events/${event.id}`, options);
    if (response.ok) {
      const json = await response.json();
      return json;
    }
  } catch (error) {
    throw new Error(error);
  }
};

export const deleteEvent = async (id) => {
  try {
    const response = await fetch(`${API_URL}/api/events/${id}`, {
      method: 'DELETE',
      headers: {
        'content-type': 'application/json',
      },
    });
    if (response.ok) {
      const json = await response.json();
      return json;
    }
  } catch (error) {
    throw new Error(error);
  }
};
