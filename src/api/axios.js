import axios from "axios";

const instance = axios.create({
  baseURL: "http://streamapp2-env.eba-jqkp2xdu.us-east-2.elasticbeanstalk.com", // Set base URL to json-server
  headers: {
    "Content-Type": "application/json",
  },
});

const handleErrors = (error, endpoint) => {
  console.error(`Error with request to ${endpoint}:`, error);
  throw error;
};

instance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response.status === 401) {
      const event = new CustomEvent("unauthorized");
      window.dispatchEvent(event);
    }
    return Promise.reject(error);
  }
);

const get = async (endpoint, authToken) => {
  console.log(authToken, "+++");
  try {
    const response = await instance.get(endpoint, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleErrors(error, endpoint);
  }
};




const post = async (endpoint, data, authToken) => {
  try {
    const response = await instance.post(endpoint, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleErrors(error, endpoint);
    // throw error.response;
  }
};

const put = async (endpoint, data, authToken) => {
  try {
    const response = await instance.put(endpoint, data, {
      headers: {
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleErrors(error, endpoint);
  }
};

const deleteRequest = async (url, authToken) => {
  try {
    const response = await instance.delete(url, {
      headers: {
        "Referrer-Policy": "same-origin",
        Authorization: `Bearer ${authToken}`,
      },
    });
    return response.data;
  } catch (error) {
    handleErrors(error, url);
  }
};

export { instance, get, post, deleteRequest, put };







// axios.interceptors.request.use((request) => {
//   console.log("Request URL:", request.url);  // Debugging the URL
//   if (request.url === '/api/UploadVedios/StoreVideo') {
//     console.log("Mocking POST request to:", request.url);
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         resolve({
//           status: 200,
//           data: { message: "Video uploaded successfully (Mock Response)" },
//         });
//       }, 1000);
//     });
//   }
//   return request;
// });





axios.interceptors.request.use((request) => {
  if (request.url === '/api/UploadVedios/StoreVideo') {
    console.log("Mocking POST request to:", request.url);

    // Simulate a delay for the mock response
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          status: 200,
          data: { message: "Video uploaded successfully (Mock Response)" },
        });
      }, 1000);
    });
  }
  return request;
});

 