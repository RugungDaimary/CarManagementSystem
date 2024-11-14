import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCar, deleteCar } from "../slices/carSlice";
import { useParams, useNavigate } from "react-router-dom";

const CarDetailPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { car, loading, error } = useSelector((state) => state.cars);

  useEffect(() => {
    dispatch(fetchCar(id));
  }, [dispatch, id]);

  const handleDelete = async () => {
    await dispatch(deleteCar(id));
    navigate("/cars");
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!car) return <div>No car found</div>;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">{car.title}</h1>
      <p className="mb-4">{car.description}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-4">
        {car.images.map((image, index) => (
          <img
            key={index}
            src={image}
            alt={`Car ${index}`}
            className="w-full h-auto rounded-md"
          />
        ))}
      </div>
      <button
        onClick={() => navigate(`/edit-car/${id}`)}
        className="mr-4 px-4 py-2 bg-indigo-600 text-white rounded-md"
      >
        Edit
      </button>
      <button
        onClick={handleDelete}
        className="px-4 py-2 bg-red-600 text-white rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default CarDetailPage;
