import React, { useEffect, useState } from 'react';
import './Sale.css';
import homeIcon from './homeicon.png';
import arrow from './Vector.png';
import arrow2 from './Vector2.png';
import { useLocation } from 'react-router-dom';

import fetchData from '../../func/fetch';
import ApartmentCard from '../ApartmentCard';
import useAuth from '../../hooks/useAuth';
import Loader from '../Loader';

const Sales = () => {
  const location = useLocation();
  const [data, setData] = useState(location.state?.searchResults || []);
  const [total, setTotal] = useState(location.state?.total || 0);
  const [currentPage, setCurrentPage] = useState(location.state?.currentPage || 1);
  const [pageSize, setPageSize] = useState(location.state?.pageSize || 5);
  const [filters, setFilters] = useState({});
  const { addFav, favIds, removeFav } = useAuth();
  const [totalCount, setTotalCount] = useState(total);
  const [isLoading, setIsLoading] = useState(false);

  const fetchTotalPublished = async (filterQuery = '') => {
    let totalResult = await fetchData(`apartments/?${filterQuery ? `${filterQuery}&` : ''}page_size=100`, null, null, 'GET');
    if (totalResult.error_status || !totalResult.data) return 0;
    const results = totalResult.data['results'] || [];
    const pendingData = results.filter(apartment => apartment.status === 'pending');
    const deniedData = results.filter(apartment => apartment.status === 'denied');
    const totalPublished = totalResult.data['total'] - (pendingData.length + deniedData.length);
    return totalPublished;
  }

  const goFetch = async (page = 1, filterQuery = '', force = false) => {
    if (currentPage === page && !filterQuery && !force) return;

    setIsLoading(true);

    let totalPublished = await fetchTotalPublished(filterQuery);

    let result = await fetchData(`apartments/?${filterQuery ? `${filterQuery}&` : ''}page=${page}`, null, null, 'GET');

    setIsLoading(false);

    if (result.error_status || !result.data) return;
    const { data } = result;

    const publishedData = data['results'].filter(apartment => apartment.status === 'published');

    setData(publishedData);
    setTotalCount(totalPublished);
    setPageSize(data['page_size']);
    setCurrentPage(data['page']);
  }

  const goFetchWithFilter = () => {
    let query = "";
    Object.keys(filters).forEach(filter => {
      if (filters[filter] === 0 || filters[filter] === '') return;
      query = `${query !== '' ? `${query}&` : ""}${filter}=${filters[filter]}`
    });

    query !== '' ? goFetch(1, query) : goFetch(1, null, true);
  }

  useEffect(() => {
    if (!location.state?.searchResults) {
      goFetch(1, '', true); // Fetch all apartments on initial load
    }
  }, [location.state?.searchResults]);

  const onFav = async (item) => {
    const { id } = item;

    let result = await fetchData(`apartments/${id}/save/`);
    if (result.error_status) return;

    setData(data => {
      return data.map(item => {
        if (item.id === id) item.is_fav = true;
        return item;
      })
    });

    addFav(item);
  }

  const onRemoveFav = async (id) => {
    let result = await fetchData(`saved_apartments/${id}/remove/`, null, null, 'DELETE');

    if (!result.error_status) {
      removeFav(id);
    }
  }

  return (
    <>
      <div className="container">
        <div className="contaner px-4 text-center m-4">
          <div className="search-container ">
            <input className="m-2 rounded border border-3 border-success" type="text" placeholder="Search.." name="search" style={{ height: '35px', paddingLeft: '15px' }}
              onChange={({ target }) => setFilters(filters => ({ ...filters, title: target.value }))}
              value={filters?.title ?? ''} />
            <select className="btn btn-outline-secondary m-2" name="rooms" id="rooms"
              onChange={({ target }) => setFilters(filters => ({ ...filters, max_rooms: target.value }))}
            >
              <option value="0" >Rooms</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <select className="btn btn-outline-secondary m-2" name="beds" id="beds"
              onChange={({ target }) => setFilters(filters => ({ ...filters, max_beds: target.value }))}
            >
              <option value="0" >Beds</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
            </select>
            <select className="btn btn-outline-secondary m-2" name="price" id="price"
              onChange={({ target }) => setFilters(filters => ({ ...filters, max_price: target.value }))}
            >
              <option value="0" >Price</option>
              <option value="1000">1000</option>
              <option value="2000">2000</option>
              <option value="3000">3000</option>
            </select>
            <button className="btn btn-success m-2" type="submit" onClick={goFetchWithFilter}>Find</button>
          </div>
        </div>
        <hr />
        <Loader isLoading={isLoading}>
          <img className="apart_img" style={{ height: '25px' }} src={homeIcon} alt="home icon" />
          <span><small className="text-secondary ">Apartments for sale in Ismaillia </small></span>
          <p>
            <small className="text-secondary">({totalCount}) properties </small>
            <h5>Apartments for sale in Ismaillia</h5>
          </p>
          <div className="row" style={{ marginTop: '1rem' }}>
            {
              data.map(item => {
                return <ApartmentCard item={item} key={item.id} onFav={() => onFav(item)} isFav={favIds?.includes(item.id)} onRemoveFav={() => onRemoveFav(item.id)} />
              })
            }
            <div className="container px-4 text-center">
              <div className="btn-toolbar" role="toolbar" aria-label="Toolbar with button groups">
                <div className=" m-5 text-center" role="group" aria-label="First group">
                  {
                    currentPage > 1 && (
                      <button type="button" className="m-2 btn" onClick={() => goFetch(currentPage - 1)}>
                        <img src={arrow} alt="left arrow" />
                      </button>
                    )
                  }
                  {
                    Array.from({ length: Math.ceil(totalCount / pageSize) }, (_, i) => i + 1).map(item => (
                      <button type="button" className={`m-2 btn ${item === currentPage ? ' btn-outline-success' : ''}`} key={item} onClick={() => goFetch(item)}>{item}</button>
                    ))
                  }
                  {
                    (currentPage < Math.ceil(totalCount / pageSize)) && (
                      <button type="button" className="m-2 btn" onClick={() => goFetch(currentPage + 1)}>
                        <img src={arrow2} alt="right arrow" />
                      </button>
                    )
                  }
                </div>
              </div>
              <div className="row gx-5">
                <div className="col">
                  <div className="p-3">
                    <h5>Affordable Searches</h5>
                    <small className="text-body-secondary">Apartments for sale in Cairo for under 700K L.E</small><br />
                    <small className="text-body-secondary">Apartments for sale in Cairo for under 850K L.E</small><br />
                    <small className="text-body-secondary">Apartments for sale in Cairo for under 200K L.E</small>
                  </div>
                </div>
                <div className="col">
                  <div className="p-3">
                    <h5>Explore More</h5>
                    <small className="text-body-secondary">Rented apartments for Sale in Cairo</small><br />
                    <small className="text-body-secondary">Luxury Apartments for Sale in Cairo</small><br />
                    <small className="text-body-secondary">Apartments for Sale in Cairo, Fully Paid in Cash</small>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Loader>
      </div>
    </>
  )
}

export default Sales;
