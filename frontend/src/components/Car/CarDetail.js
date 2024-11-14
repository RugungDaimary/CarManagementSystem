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
    <div>
      <h1>{car.title}</h1>
      <p>{car.description}</p>
      <div>
        {car.images.map((image, index) => (
          <img key={index} src={image} alt={`Car ${index}`} />
        ))}
      </div>
      <button onClick={() => navigate(`/edit-car/${id}`)}>Edit</button>
      <button onClick={handleDelete}>Delete</button>
    </div>
  );
};

export default CarDetailPage;
