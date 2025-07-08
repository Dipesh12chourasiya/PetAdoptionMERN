import axiosInstance from "./axiosInstance";

export const getAllPets = () => {
  return axiosInstance.get("/pets/all");
};

export const getPetsByCategory = ({ category }) => {
  return axiosInstance.get(`/pets/category/${category}`);
};

export const getPetById = ({ id }) => {
  return axiosInstance.get(`/pets/get/${id}`);
};


export const createPet = async (formData) => {
  const token = localStorage.getItem("token");

  const res = await axios.post("http://localhost:5000/api/pets", formData, {
    headers: {
      "Content-Type": "multipart/form-data",
      Authorization: token,
    },
  });

  return res.data;
};
