import API_URL from "./apiURL.jsx";

// Empty Object
const API = {};

// Methods
API.get = (endpoint) => callFetch(endpoint, "GET", null);
API.post = (endpoint, data) => callFetch(endpoint, "POST", data);
API.put = (endpoint, data) => callFetch(endpoint, "PUT", data);
API.delete = (endpoint) => callFetch(endpoint, "DELETE", null);

const callFetch = async (endpoint, method, record) => {
  // Build request object
  let requestObj = { method: method }; // GET, POST, PUT or DELETE
  if (record) {
    requestObj = {
      ...requestObj,
      headers: { "Content-type": "application/json" }, // Tell the API you are sending json
      body: JSON.stringify(record), // Converts JSON object to string for transmission
    };
  }

  // Call fetch with the built requestObj and process the response
  try {
    let result = null;
    const endpointAddress = API_URL + endpoint;
    const response = await fetch(endpointAddress, requestObj);
    if (response.status !== 204) result = await response.json();
    return response.status >= 200 && response.status < 300
      ? { isSuccess: true, result }
      : { isSuccess: false, message: `${result.message}` };
  } catch (error) {
    return { isSuccess: false, message: error.message };
  }
};

export default API;
