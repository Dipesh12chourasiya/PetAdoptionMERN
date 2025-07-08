import React, { useState } from "react";
import FormControl from "@mui/material/FormControl";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import Button from "@mui/material/Button";
import { Controller, useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createPet } from "../services/pets"; // Assuming this is the path to your createPet API function

const schema = yup
  .object({
    name: yup.string().required(),
    age: yup.string().required(),
    breed: yup.string().required(),
    color: yup.string().required(),
    description: yup.string().required(),
  })
  .required();

const CreatePet = ({ closeModal }) => {
  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: "",
      age: "",
      breed: "",
      color: "",
      description: "",
    },
    resolver: yupResolver(schema),
  });

  const [selectedImage, setSelectedImage] = useState(null);
  const [additionalImages, setAdditionalImages] = useState([]);

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("age", data.age);
    formData.append("breed", data.breed);
    formData.append("color", data.color);
    formData.append("description", data.description);

    // Append images
    if (selectedImage) {
      formData.append("image", selectedImage);
    }

    additionalImages.forEach((file) => {
      formData.append("additionalImages", file);
    });

    try {
      await createPet(formData);
      alert("Pet created successfully!");
      reset(); // Reset the form after successful submission
      closeModal(); // Close the modal if provided
    } catch (error) {
      console.error("Error creating pet:", error);
      alert("Failed to create pet. Please try again.");
    }
  };

  const handleImageChange = (e) => {
    setSelectedImage(e.target.files[0]);
  };

  const handleAdditionalImagesChange = (e) => {
    setAdditionalImages(Array.from(e.target.files));
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="name">Name</InputLabel>
        <Controller
          name="name"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <OutlinedInput
              error={errors.name}
              id="name"
              label="Name"
              {...field}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="age">Age</InputLabel>
        <Controller
          name="age"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <OutlinedInput
              error={errors.age}
              id="age"
              label="Age"
              {...field}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="breed">Breed</InputLabel>
        <Controller
          name="breed"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <OutlinedInput
              error={errors.breed}
              id="breed"
              label="Breed"
              {...field}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="color">Color</InputLabel>
        <Controller
          name="color"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <OutlinedInput
              error={errors.color}
              id="color"
              label="Color"
              {...field}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <InputLabel htmlFor="description">Description</InputLabel>
        <Controller
          name="description"
          control={control}
          rules={{ required: true }}
          render={({ field }) => (
            <OutlinedInput
              error={errors.description}
              id="description"
              label="Description"
              {...field}
            />
          )}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          onChange={handleImageChange}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <input
          type="file"
          accept="image/png, image/jpeg"
          multiple
          onChange={handleAdditionalImagesChange}
        />
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <Button variant="contained" color="success" type="submit">
          Create Pet
        </Button>
      </FormControl>
      <FormControl fullWidth sx={{ m: 1 }}>
        <Button variant="contained" color="warning" onClick={closeModal}>
          Cancel
        </Button>
      </FormControl>
    </form>
  );
};

export default CreatePet;
