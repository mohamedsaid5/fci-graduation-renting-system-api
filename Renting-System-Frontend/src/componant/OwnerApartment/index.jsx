import React, { useEffect, useState } from "react";
import './newApartment.css';
import fetchData from "../../func/fetch";
import ApartmentCard from "../ApartmentCard";
import Loader from "../Loader";
import { useNavigate } from 'react-router-dom'; // Import useNavigate at the top of your file


const OwnerApartment = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const goFetch = async () => {
    setIsLoading(true);

    let result = await fetchData(`apartments/owner-apartments/`, null, null, 'GET', false);
    
    setIsLoading(false);

    if (result.error_status) return;
    const { data } = result;

    setData(data)
  }

  const onDelete = async (id) => {
    let result = await fetchData(`apartments/${id}/delete/`, null, null, 'DELETE');
    if (result.error_status) return;
    setData(data => data.filter(({ id: iId }) => iId != id));
  }

  useEffect(() => {
    goFetch();
  }, [])

  return (
    <>
      <div className="container">
      <button 
        className="" 
        style={{ backgroundColor: '#218838', borderColor: '#218838' }} 
        onClick={() => navigate('/add')}
      >
        Add Apartment
      </button>
        <Loader isLoading={isLoading}>
          <div className="combo">
            <div className="row">

              {
                data.map(item => {
                  return <ApartmentCard owner item={item} key={item.id} onDelete={() => onDelete(item.id)} />
                })
              }

            </div>
          </div>
        </Loader>
      </div>

    </>
  )
}

export default OwnerApartment;