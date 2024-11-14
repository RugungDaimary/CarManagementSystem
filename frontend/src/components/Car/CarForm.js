import React, { useState, useEffect } from "react";
import { createCar, getCar, updateCar } from "../../services/carService";
import { useNavigate, useParams } from "react-router-dom";

const CarForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [carData, setCarData] = useState({
    title: "",
    description: "",
    images: [],
    tags: "",
  });

  useEffect(() => {
    if (id) {
      const fetchCar = async () => {
        const car = await getCar(id);
        setCarData(car);
      };

      fetchCar();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCarData({ ...carData, [name]: value });
  };

  const handleFileChange = (e) => {
    setCarData({ ...carData, images: e.target.files });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", carData.title);
    formData.append("description", carData.description);
    formData.append("tags", carData.tags);
    for (let i = 0; i < carData.images.length; i++) {
      formData.append("images", carData.images[i]);
    }

    if (id) {
      await updateCar(id, formData);
    } else {
      await createCar(formData);
    }
    navigate("/cars");
  };

  return (
    <div>
      <h1>{id ? "Edit Car" : "Create Car"}</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Title</label>
          <input
            type="text"
            name="title"
            value={carData.title}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description</label>
          <textarea
            name="description"
            value={carData.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Tags</label>
          <input
            type="text"
            name="tags"
            value={carData.tags}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Images</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleFileChange}
          />
        </div>
        <button type="submit">{id ? "Update" : "Create"}</button>
      </form>
    </div>
  );
};

export default CarForm;
