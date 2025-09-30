import React, { useEffect, useState } from "react";
import './newApartment.css';
import deleteIcon from './deleteIcon.png'
import fetchData from "../../func/fetch";
import useAuth from "../../hooks/useAuth";
import ApartmentCard from "../ApartmentCard";

// Inside your component function
const Apartmentshow = () => {
 
  const [data, setData] = useState([]);
  const [total, setTotal] = useState([]);
  const [currentPage, setCurrentPage] = useState(0);
  const [filters, setFilters] = useState({});
  const { addFav, removeFav, favIds } = useAuth();

  const goFetch = async (page = 1, filterQuery, force = false) => {
    if (currentPage == page && !filterQuery && !force) return;

    let result = await fetchData(`apartments/?${filterQuery ? `${filterQuery}` : `page=${page}`}`, null, null, 'GET', !filterQuery);

    if (result.error_status) return;
    const { data } = result;

    setData(data['results'])
    let totalList = [];

    for (let i = 0; i < (data['total_pages'] ?? 2); i++) {
      totalList.push(i + 1);
    }

    setTotal(totalList)
    setCurrentPage(data['page']);

    console.log(result);
  }


  useEffect(() => {
    goFetch();
  }, [])

  const onFav = async (item) => {
    const { id } = item;

    let result = await fetchData(`apartments/${id}/save/`);
    if (result.error_status) return;
    addFav(item);
  }

  const onRemoveFav = async (id) => {
    let result = await fetchData(`saved_apartments/${id}/remove/`, null, null, 'DELETE');

    console.log(result);

    if (!result.error_status) {
        removeFav(id);
    }
}

  return (
    <>





      <div className="container">

     
        <div className='all'>
          <div classNameName="con1E">
            <div className="accountE">
              <p className="p1E">My Account</p>
              <table border="1">
                <tr><td>Saved properties (0)</td></tr>
                <tr><td>Contacted properties (0)</td></tr>
                <tr><td>Saved searches (0)</td></tr>
              </table>
            </div>

          </div>

          <div className="apartmentE">
            <div className="conE">
              <span className="cateE">Category:</span>
              <input type="text" value="All" />
              <button className="delE">
                <img src={deleteIcon} alt="delete icon" />
                <span>Delete all</span>
              </button>
              <div className="sortE">
                <span className="cateE">Sort by:</span>
                <input type="text" value="Recently saved" />
              </div>
            </div>
          </div>
        </div>
        <div className="combo">


          <div className="row">

            {
              data.map(item => {
                return <ApartmentCard item={item} key={item.id} onFav={() => onFav(item)} isFav={favIds?.includes(item.id)} onRmoveFav={() => onRemoveFav(item.id)} />
              })
            }

          </div>
        </div>
      </div>

    </>
  )
}

export default Apartmentshow;