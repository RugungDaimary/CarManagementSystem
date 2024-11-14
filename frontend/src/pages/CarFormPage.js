import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createCar, fetchCar, updateCar, fetchCars } from "../slices/carSlice";
import { useNavigate, useParams } from "react-router-dom";

const CarFormPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error } = useSelector((state) => state.cars);
  const [carData, setCarData] = useState({
    title: "",
    description: "",
    images: [],
    tags: "",
  });

  useEffect(() => {
    if (id) {
      const fetchCarData = async () => {
        const car = await dispatch(fetchCar(id)).unwrap();
        setCarData({
          title: car.title,
          description: car.description,
          images: [],
          tags: car.tags.join(", "),
        });
      };

      fetchCarData();
    }
  }, [id, dispatch]);

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
      await dispatch(updateCar({ id, carData: formData }));
    } else {
      await dispatch(createCar(formData));
    }
    dispatch(fetchCars()); // Refresh the list after creating/updating a car
    navigate("/cars");
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded shadow-md">
        <h2 className="text-2xl font-bold text-center">
          {id ? "Edit Car" : "Create Car"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title
            </label>
            <input
              type="text"
              name="title"
              value={carData.title}
              onChange={handleChange}
              placeholder="Title"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              value={carData.description}
              onChange={handleChange}
              placeholder="Description"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Tags
            </label>
            <input
              type="text"
              name="tags"
              value={carData.tags}
              onChange={handleChange}
              placeholder="Tags"
              required
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Images
            </label>
            <input
              type="file"
              name="images"
              multiple
              onChange={handleFileChange}
              className="w-full px-3 py-2 mt-1 border rounded-md focus:outline-none focus:ring focus:ring-indigo-200"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full px-4 py-2 font-bold text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-200"
          >
            {loading
              ? id
                ? "Updating..."
                : "Creating..."
              : id
              ? "Update Car"
              : "Create Car"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CarFormPage;
