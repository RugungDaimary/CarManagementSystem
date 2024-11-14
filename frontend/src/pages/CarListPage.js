import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCars, deleteCar, searchCars } from "../slices/carSlice";
import { useNavigate } from "react-router-dom";

const CarListPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { cars, loading, error } = useSelector((state) => state.cars);
  const [keyword, setKeyword] = useState("");

  useEffect(() => {
    dispatch(fetchCars());
  }, [dispatch]);

  const handleDelete = async (id) => {
    await dispatch(deleteCar(id));
    dispatch(fetchCars()); // Refresh the list after deletion
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    if (keyword.trim()) {
      dispatch(searchCars(keyword));
    } else {
      dispatch(fetchCars());
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">My Cars</h1>
      <div className="w-1/4 mb-4">
        <button
          onClick={() => navigate("/create-car")}
          className="w-full px-4 py-2 bg-indigo-600 text-white rounded-md"
        >
          Create Car
        </button>
      </div>
      <form onSubmit={handleSearch} className="w-1/4 mb-4">
        <div className="flex">
          <input
            type="text"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search cars..."
            className="flex-grow px-4 py-2 border rounded-l-md"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-indigo-600 text-white rounded-r-md"
          >
            Search
          </button>
        </div>
      </form>
      {loading && <p>Loading...</p>}
      {error && <p className="text-red-600">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cars.map((car) => (
          <div key={car._id} className="p-4 bg-white rounded shadow-md">
            <h2 className="text-xl font-bold">{car.title}</h2>
            {car.images.length > 0 && (
              <img
                src={car.images[0]}
                alt={car.title}
                className="w-full h-auto rounded-md"
              />
            )}
            <button
              onClick={() => navigate(`/edit-car/${car._id}`)}
              className="mt-2 px-4 py-2 bg-indigo-600 text-white rounded-md"
            >
              Edit
            </button>
            <button
              onClick={() => handleDelete(car._id)}
              className="mt-2 px-4 py-2 bg-red-600 text-white rounded-md"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CarListPage;
