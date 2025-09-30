import React, { useEffect, useState } from 'react'
import '../add_1/add.css'
import fetchData from '../../func/fetch';
import useAuth from '../../hooks/useAuth';
import { useNavigate, useParams } from 'react-router-dom';
import { mediaHandle } from '../../func/mediaHandle';
import { objectToFormData } from '../../func/helpers';
import { API_BASE } from '../../constants';
import { getStorageItem } from '../../func/localstorage';
import { handleError } from '../../func/handleError';

export default function Add() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const { update } = useParams();

  const [formData, setFormData] = useState({
    "title": '',
    "title_en": '',
    "title_ar": '',
    "description": '',
    "description_en": '',
    "description_ar": '',
    "address": '',
    "price": 0,
    "rooms": 1,
    "size": 6,
    "beds": 1,
    "bathrooms": 1,
    "view": '',
    "finishing_type": '',
    "floor_number": 0,
    "year_of_construction": 0
  });

  const [photos, setPhotos] = useState({});
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const [medias, setMedias] = useState({
    1: null,
    2: null,
    3: null,
    4: null,
    5: null,
  });


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    let description = formData['description_en'] != '' ? formData['description_en'] : formData['description_ar'];
    let title = formData['title_en'] != '' ? formData['title_en'] : formData['title_ar'];

    let body = {
      ...formData,
      description,
      title,
    };

    delete body['photos'];

    let form = objectToFormData(body);

    for (const key in medias) {
      medias[key] && form.append('photos', medias[key]);
    }

    console.log(form.getAll('photos'));

    let token = getStorageItem('auth_t');

    try {
      setIsLoading(true);

      const response = await fetch(`${API_BASE}/api/apartments/${update ? `${update}/update` : 'create'}/`, {
        method: update ? 'PUT' : 'POST',
        body: form,
        headers: {
          'Authorization': `Token ${token}`,
        }
      });
      const data = await response?.json();

      setIsLoading(false);
      if (!response?.ok) return setError(handleError(data, 'Somethink Want Warn Please Try Again!'));

      data.id && navigate(`/showapartment/${data.id}`)

    } catch ({ message }) {
      setIsLoading(false);
      setError(message);
    }
  };

  useEffect(() => {
    if (user?.user_type == 'student') navigate('/');
  }, [user.user_type])

  useEffect(() => {
    if (!update) return;

    const handleData = async () => {
      let result = await fetchData(`apartments/${update}/`, null, null, 'GET');

      if (result.error_status) return navigate('/');
      const { data } = result;

      setFormData((prevFormData) => ({ ...prevFormData, ...data }));
    }

    handleData();

  }, [update])

  const handleSetMedia = (file, key) => {
    setMedias(files => ({ ...files, [key]: file }));

    let photo = file && mediaHandle(file)?.file;
    if (photo) setPhotos(photos => ({ ...photos, [key]: photo }));
  }

  const clearMedia = (key) => {
    setMedias(medias => ({ ...medias, [key]: null }));
    setPhotos(photos => ({ ...photos, [key]: null }));
  }

  return (
    <div className='add_page'>

      <div className="add_header">

      </div>
      <div className="read_terms">
        <p>Kindly read terms and instuctions of adding listing on Renting System here <span><i className="fa-solid fa-xmark"></i></span></p>
      </div>
      <div className="upper_filds">
        <h3>List Property</h3>
        <form onSubmit={handleSubmit}>

 {
  !update && (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0.5rem' }}>
    {
      Object.keys(medias).map(k => (
        <label key={k} style={{ padding: '0 0.5rem' }}>
          <div className="curved-add-apartment" style={{ cursor: 'pointer' }}>
            {photos?.[k] && <img src={photos?.[k]} alt="" />}

            {
              medias[k] ? (
                <div className="curved-add-apartment-x h" onClick={
                  () => {
                    setTimeout(() => clearMedia(k), 50);
                  }}>
                  x
                </div>
              ) : (
                <div className="curved-add-apartment-x x">
                  +
                </div>
              )
            }
          </div>

          {!medias[k] && <input type="file" onChange={({ target }) => handleSetMedia(target.files[0], k)} accept="image/*" hidden />}
        </label>
      ))
    }
  </div>
  )
 }

          

          <div className="filds">
            <label htmlFor="title_english">Title : </label>
            <input type="text" name="title_en" id="title_english" value={formData.title_en} onChange={handleChange} />
            <label htmlFor="description_english">Description : </label>
            <input type="text" name="description_en" id="description_english" value={formData.description_en} onChange={handleChange} />

          </div>
          <h3>Property Details</h3>
          <div className="lower_filds">
            <div className="up">
              <div className="one">
                <label htmlFor="size">Size (in meters ) :</label>
                <input type="number" name="size" id="size" value={formData.size} onChange={handleChange} />
              </div>
              <div className="one">
                <label htmlFor="price">Price (EGP) :</label>
                <input type="number" name="price" id="price" value={formData.price} onChange={handleChange} />

              </div>
              <div className="one">

                <label htmlFor="rooms">Rooms :</label>
                <input type="number" name="rooms" id="rooms" value={formData.rooms} onChange={handleChange} />
              </div>
              <div className="one">

                <label htmlFor="bathrooms">Bathrooms :</label>
                <input type="number" name="bathrooms" id="bathrooms" value={formData.bathrooms} onChange={handleChange} />
              </div>
            </div>
            <div className="up ">
              <div className="one">
                <label htmlFor="beds"> Beds :</label>
                <input type="number" name="beds" id="beds" value={formData.beds} onChange={handleChange} />
              </div>
              <div className="one">
                <label htmlFor="floor_number"> Floor :</label>
                <input type="number" name="floor_number" id="floor_number" value={formData.floor_number} onChange={handleChange} />
              </div>
              <div className="one">
                <label htmlFor="year_of_construction">Year Of Construction :</label>
                <input type="number" name="year_of_construction" id="year_of_construction" value={formData.year_of_construction} onChange={handleChange} />

              </div>
              <div className="one">

                <label htmlFor="finishing_type">Finishing Type :</label>
                <input type="text" name="finishing_type" id="finishing_type" value={formData.finishing_type} onChange={handleChange} />
              </div>
            </div>

            <div className="footer_filds">
              <div className="last_fild">
                <label htmlFor="address">Property Address  :</label>
                <input type="text" name="address" id="address" value={formData.address} onChange={handleChange} />
              </div>

              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', textAlign: 'center', paddingTop: '1rem' }}>
                {error && <p style={{ color: 'red' }}>{error}</p>}
              </div>

              <div className="btn">
                <button disabled={isLoading} type="submit" style={isLoading ? { background: '#9ad9b5' } : {}}>{isLoading ? 'Uploading...' : `${update ? 'update' : 'Add'}`}</button>
              </div>

            </div>
          </div>
        </form>
      </div>


    </div>
  )
}
