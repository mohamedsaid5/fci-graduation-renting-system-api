import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../land_page/land_page.css';
import Phone from './phone.png';
import fetchData from '../../func/fetch';
import { Link } from 'react-router-dom';
import useAuth from '../../hooks/useAuth';

export default function LandPage() {
  const [search, setSearch] = useState('');
  const { user } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const navigate = useNavigate();

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  const handleCityClick = async (city) => {
    const result = await fetchData(`apartments/?title=${city}`, null, null, 'GET');
    if (result.error_status) return;

    const { data } = result;
    console.log(data)
    const publishedData = data['results'].filter(apartment => apartment.status === 'published');


    navigate('/sale', { state: { searchResults: publishedData, total: data['total'], currentPage: data['page'], pageSize: data['page_size'] } });
  };

  const handleDownloadClick = () => {
    window.location.href = 'http://bit.ly/4bpfepY';
  };

  return (
    <div className='land'>
      <div className="land_img">
        <div className="home_layer">
          <div className="con">
            <div className="rent_bed">
              <h1>Find your perfect home!</h1>
            </div>
            <div className="search" style={{ marginBottom: '5%' }}>
              <span id='search'><i className="fa-solid fa-magnifying-glass"></i></span>
              <input
                type="search"
                id="search"
                placeholder='City, community or building'
                value={search}
                onChange={({ target }) => setSearch(target.value)}
              />
              <button className='btn_search' onClick={() => handleCityClick(search)}>
                Search
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="contant">
        <div className="left">
          <h2>Download Egypt's most trusted app</h2>
          <p>Welcome to our intuitive apartment search app, designed to make finding your perfect home effortless. Discover a wide range of apartments tailored to your preferences and needs, all at your fingertips. With powerful search filters, detailed listings, and real-time updates, finding the ideal apartment has never been easier. Whether you're looking for a cozy studio, a spacious loft, or a luxury penthouse, our app has you covered. Start your apartment hunting journey today and find the home you've been dreaming of!</p>
          <button type="button" onClick={handleDownloadClick}>Download</button>
        </div>
        <div className="right">
          <img src={Phone} alt="Phone" />
        </div>
      </div>
      <div className="explore">
        <h2>Explore More Apartments</h2>
        <div className="hr">
          <p>Rent</p>
          <div className="div">
            <span className="color"></span>
          </div>
        </div>
      </div>
      <div className="countries">
        <div className="cairo" onClick={() => handleCityClick('Cairo')}>
          <p>Cairo</p>
        </div>
        <div className="cairo" onClick={() => handleCityClick('Giza')}>
          <p>Giza</p>
        </div>
        <div className="cairo" onClick={() => handleCityClick('Alexandria')}>
          <p>Alexandria</p>
        </div>
        <div className="cairo" onClick={() => handleCityClick('Suez')}>
          <p>Suez</p>
        </div>
        <div className="cairo" onClick={() => handleCityClick('Damiette')}>
          <p>Damiette</p>
        </div>
        <div className="cairo" onClick={() => handleCityClick('Matrouh')}>
          <p>Matrouh</p>
        </div>
        <div className="cairo" onClick={() => handleCityClick('El Ismailia')}>
          <p>El Ismailia</p>
        </div>
        <div className="cairo" onClick={() => handleCityClick('Sharqia')}>
          <p>Sharqia</p>
        </div>
        <div className="cairo" onClick={() => handleCityClick('Al Fayum')}>
          <p>Al Fayum</p>
        </div>
        <div className="cairo" onClick={() => handleCityClick('Asyut')}>
          <p>Asyut</p>
        </div>
        <div className="cairo" onClick={() => handleCityClick('Kafr El Sheikh')}>
          <p>Kafr El Sheikh</p>
        </div>
        <div className="cairo" onClick={() => handleCityClick('Port Said')}>
          <p>Port Said</p>
        </div>
      </div>

      <div className="find">
        <div className="find_apartment" onClick={toggleDropdown}>
          <p>Find Apartments <span><i className="fa-solid fa-chevron-down"></i></span></p>
        </div>
        {isDropdownOpen && (
          <div className="dropdown-content">
            <div className="apartment" onClick={() => handleCityClick('Cairo')}>
              <p>Apartments for rent in Cairo</p>
              <p>Apartments for rent in Zamalek</p>
            </div>
            <div className="apartment" onClick={() => handleCityClick('Madinaty')}>
              <p>Apartments for rent in Madinaty</p>
              <p>Apartments for rent in Hay El Maadi</p>
            </div>
            <div className="apartment" onClick={() => handleCityClick('Nasr City')}>
              <p>Apartments for rent in Nasr City</p>
            </div>
          </div>
        )}
      </div>

      <div className="advertise">
        <p>Looking to advertise your apartment? We can help.</p>
        <span><Link to="/add">List your apartment with us</Link></span>
      </div>
    </div>
  );
}
