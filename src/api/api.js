import axios from "axios";

// const url = "http://localhost:4788";
const url = "https://civiceyebackend.onrender.com";

export const userRegistration = async (data) => {
  try {
    const res = await axios.post(`${url}/auth/register`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const userLogin = async (data) => {
  try {
    const res = await axios.post(`${url}/auth/login`, data);
    return res;
  } catch (error) {
    return res;
  }
};

export const viewAllUser = async () => {
  try {
    const res = await axios.get(`${url}/user/get-all-user`);
    return res;
  } catch (error) {
    return error;
  }
};

export const viewUser = async (id) => {
  try {
    const res = await axios.get(`${url}/user/view-user/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const updateUser = async (id, data) => {
  try {
    const res = await axios.put(`${url}/user/update-user/${id}`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const createComplaint = async (data) => {
  try {
    const res = await axios.post(`${url}/complaint/create-complaint`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return res;
  } catch (error) {
    return error;
  }
};

export const viewAllComplaint = async () => {
  try {
    const res = await axios.get(`${url}/complaint/get-all-complaint`);
    return res;
  } catch (error) {
    return error;
  }
};

export const viewMyComplaint = async (id) => {
  try {
    const res = await axios.get(`${url}/complaint/get-my-complaint/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const updateComplaint = async (id, data) => {
  try {
    const res = await axios.put(
      `${url}/complaint/update-Complaint/${id}`,
      data
    );
    return res;
  } catch (error) {
    return error;
  }
};

export const viewComplaint = async (id) => {
  try {
    const res = await axios.get(`${url}/complaint/get-complaint/${id}`);
    return res;
  } catch (error) {
    return error;
  }
};

export const createFeedback = async (data) => {
  try {
    const res = await axios.post(`${url}/feedback/create-feedback`, data);
    return res;
  } catch (error) {
    return error.response || error;
  }
};

export const viewAllFeedback = async () => {
  try {
    const res = await axios.get(`${url}/feedback/get-feedback`);
    return res;
  } catch (error) {
    return error;
  }
};

export const updateFeedback = async (id, data) => {
  try {
    const res = await axios.put(`${url}/feedback/update-feedback/${id}`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const createEnquiry = async (data) => {
  try {
    const res = await axios.post(`${url}/enquiry/create-enquiry`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const viewAllEnquiry = async () => {
  try {
    const res = await axios.get(`${url}/enquiry/get-enquiry`);
    return res;
  } catch (error) {
    return error;
  }
};

export const updateEnquiry = async (id, data) => {
  try {
    const res = await axios.put(`${url}/enquiry/update-enquiry/${id}`, data);
    return res;
  } catch (error) {
    return error;
  }
};

export const viewReplyEnquiry = async () => {
  try {
    const res = await axios.get(`${url}/enquiry/get-reply-enquiry`);
    return res;
  } catch (error) {
    return error;
  }
};
