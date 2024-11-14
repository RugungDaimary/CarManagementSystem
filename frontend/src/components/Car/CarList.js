import React, { useEffect, useState } from "react";
import { getCars } from "../../services/carService";

const CarList = () => {
  const [cars, setCars] = useState([]);

  useEffect(() => {
    const fetchCars = async () => {
      const carsData = await getCars();
      setCars(carsData);
    };

    fetchCars();
  }, []);

  return (
    <div>
      <h1>Car List</h1>
      <ul>
        {cars.map((car) => (
          <li key={car._id}>
            <a href={`/car/${car._id}`}>{car.title}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CarList;
