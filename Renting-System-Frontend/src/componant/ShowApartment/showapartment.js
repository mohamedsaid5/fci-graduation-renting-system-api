import React, { useEffect, useState } from "react";
import pageImage from './istockphoto-1422848109-170667a.webp';
import measurement from './measurement.png'
import pr from './pr.png'
import ownership from './ownership.png'
import bedroom from './bedroom.png'
import bath from './bath.png'
import calendar_2693507 from './calendar_2693507.png'
import telephone from './telephone.png'
import communication from './communication.png'
import circle from './circle.png'
import whatsapp from './whatsapp.png'
import blank from './blank-profile-picture-973460_640.png'
import map from './map.png'
import cooling from './cooling-system.png'
import balcony from './balcony.png'
import closet from './closet.png'
import kitchen from './kitchen.png'
import landmark from './landmark.png'
import digram from './digram.png'
import investment from './investment.png'
import house from './house.png'
import { CgDisplayFlex } from "react-icons/cg";
import { useNavigate, useParams } from "react-router-dom";
import fetchData from "../../func/fetch";

import emptyImage from '../../assets/images/no-internet_up2.png'
import { ImageLoader } from "../Loader";

const ShowApartment = () => {

  const [data, setData] = useState([]);
  const goFetchSameArea = async (address) => {

    let result = await fetchData(`apartments/?address=${address}`, null, null, 'GET');

    if (result.error_status) return;
    const { data } = result;

    console.log('more: ', result);

    setData(data['results']?.filter(({ id: iId }) => iId != id))

  }

  const { id } = useParams();
  const [apartment, setApartment] = useState({});
  const navigate = useNavigate();

  const goFetch = async (id) => {
    let result = await fetchData(`apartments/${id}/`, null, null, 'GET', false);

    if (result.error_status) return navigate('/');
    const { data } = result;

    console.log(result);

    setApartment(data)
    goFetchSameArea(data['address']);
  }

  useEffect(() => {
    if (id) goFetch(id);
  }, [id]);

  const {
    added_date,
    address,
    bathrooms,
    beds,
    description,
    finishing_type,
    floor_number,
    owner,
    owner_email,
    owner_phone_number,
    owner_username,
    photos: photosList,
    price,
    rooms,
    size,
    title,
    view,
    year_of_construction
  } = apartment;

  let photos = (photosList && photosList?.length > 0) ? photosList : [{ photo: null, id: 1 }];

  return (
    <div className="container show-apartment-page">
      <div className="row e-3">
        <div className="col-sm-12 col-lg-7 ms-5 mt-2 mb-1 custom-col" style={{ width: '27rem' }}>
          {/* <img src={photos?.[0]['photo']} alt="" className="apartment-main-photo" /> */}
          <ImageLoader
            className="apartment-main-photo"
            src={photos?.[0]?.['photo']}
            key={id}
            style={{ objectFit: 'cover', borderRadius: 8 }}

          />
        </div>
        <div className="col-3 ms-5 mt-2 apartment-right-photos">
          {
            photos?.map(({ photo, id }) =>
              // <div className="card mb-1 apartment-photos-card" style={{ width: '17rem' }} key={id}>
              //   <img src={photo} alt="..." />
              // </div>

              <ImageLoader
                src={photo}
                className="card mb-1 apartment-photos-card"
                parentStyle={{ width: '17rem', maxHeight: 250 }}
                key={id}
                style={{ objectFit: 'cover' }}
              />
            )
          }
        </div>
      </div>
      <div className="row">
        <div className="col-lg-6 col-sm-12 mt-2">
          <div className="overflow-x-auto">
            <h5 className="mt-4">title: {title}</h5>
            <p>description: {description}</p>
            <ul>
              <li >
                <div className="d-flex">
                  <div className="p-2 flex-fill"><img src={measurement} alt="" width="35px" className="mb-3" />Property Type:</div>
                  <div className="p-2 flex-fill mt-2">Apartment</div>
                </div>
              </li>

              <li>
                <div className="d-flex">
                  <div className="p-2 flex-fill"><img src={ownership} alt="" width="35px" />Property Size:</div>
                  {/* <div className="p-2 flex-fill">1,507 sqft / 140 sqm</div> */}
                  <div className="p-2 flex-fill">{size} M</div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <div className="p-2 flex-fill"><img src={bedroom} alt="" width="35px" />
                    Bedrooms:
                  </div>
                  <div className="p-2 flex-fill">{rooms}</div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <div className="p-2 flex-fill"><img src={bath} alt="" width="35px" />
                    Bathrooms:
                  </div>
                  <div className="p-2 flex-fill">{bathrooms}</div>
                </div>
              </li>
              <li>
                <div className="d-flex">
                  <div className="p-2 flex-fill"><img src={calendar_2693507} alt="" width="35px" />
                    Available from:</div>
                  <div className="p-2 flex-fill "> 27 Apr 2024</div>
                </div>
              </li>
            </ul>

          </div>
        </div>
        <div className="card col-sm-12 col-lg-6">
          <div className="card-body ">
            <h5 className="card-title text-center lh-lg mb-4 mt-4">{price} EGP/month</h5>
            <a target="_blank" className="btn btn-success ms-3" href={`tel:${owner_phone_number}`}>
              <img src={telephone} alt="" width="30px" />
              Call
            </a>
            <a className="btn btn-success m-4 " target="_blank" href={`mailto:${owner_email}?subject=I Wanaa Ask You&body=Hello, I have Ask for you.`}>
              <img src={communication} alt="" width="30px" />
              Email
            </a>
            <a className="btn btn-success" target="_blank" href={`https://api.whatsapp.com/send?phone=${owner_phone_number}&text=Your%20message%20goes%20here`}>
              <img src={whatsapp} alt="" width="30px" />
              WhatsApp
            </a>
          </div>
          <div className="text-center mb-2" ><button className="btn btn-outline-success p-2 " type="button"><img src={circle} width="30px" alt="" />Save to shortlist</button>
          </div>
        </div>
        <hr className="col-5" />
        <div className="row">
          <div className="col-lg-4 col-sm-12 ">
            <h6>Location</h6>
            <img src={map} alt="" width="100px" />
            {address}
          </div>

          <div className="col-lg-6 col-sm-12">
            <h6>Agent</h6>
            <img src={blank} className="rounded-circle" alt="" width="100px" />
            {owner_username}
            <img src={pr} alt="" width="35px" />Point realestate
            (112 Properties)
          </div>
        </div>
        <hr className="col-7 mt-3" />

      </div>
      <div className="row">
        <div className="col-lg-8 col-sm-12">
          <h6>Amenities</h6>
          <ul>
            <li ><img src={cooling} width="30px" alt="" className="mb-3" /> Central A/C</li>
            <li><img src={balcony} width="30px" alt="" className="mb-3" /> Balcony</li>
            <li><img src={closet} width="30px" alt="" className="mb-3" /> Walk-in Closet</li>
            <li><img src={kitchen} width="30px" alt="" className="mb-3" /> Kitchen Appliances</li>
            <li><img src={landmark} width="30px" alt="" className="mb-3" />View of Landmark</li>
          </ul>
        </div>
      </div>
      <hr className="col-lg-7 col-sm-12 mt-2" />
      <div className="row">
        <div className="col-lg-5 col-sm-12">
          <h6>Description</h6>
          <p className="fs-6">{description}</p>
        </div>
      </div>
      <hr className="col-7  mt-2"></hr>
      <div className="row">
        <div className="col-lg-5 col-sm-12">
          <h6>Price trends</h6>
          <p>{rooms} bedrooms apartments rented in {address}</p>
          <img src={digram} alt="" width="700px" />
        </div>
      </div>
      <hr className="col-lg-7 col-sm-12 mt-2" />
      <div className="row">
        <div className="col-8">
          <div className="row">
            <div className="col-sm-6 mb-3 mb-sm-0">
              <div className="card" style={{ backgroundColor: "Lavender" }}>
                <div className="card-body">
                  <p className="card-title"><img src={investment} alt="" width="30px" />
                    <span className="fw-bold">This property costs 223% more</span>   than the</p>
                  <p className="card-text">average price of {rooms} rooms and {beds} Beds in {address} Average Rent is {price} EGP.</p>
                </div>
              </div>
            </div>
            <div className="col-sm-6 mb-3 mb-sm-0">
              <div className="card" style={{
                backgroundColor: "Lavender", height: "160px"
              }}>
                <div className="card-body">
                  <p className="card-title"><img src={house} alt="" width="30px" />
                    <span className="fw-bold">This property is the same size</span>   as the</p>
                  <p className="card-text">average size of {rooms} rooms and {beds} Beds in {address} Average size is {size} meter .</p>
                </div>
              </div>
            </div>
          </div>
        </div><br />

        <p className="lh-1">The data displayed is based on average prices and
          sizes of all listings that were live on Property Finder in {address}</p>
      </div>
      <hr className="col-7 mt-4" />
      {
        data.length > 0 && (
          <div className="row">
            <div className="col-lg-9 col-sm-12">
              <h6>More available in the same area</h6>
              <div className="card-group">

                {
                  data.map(({ id, photos: photosList, price, address, size, rooms, bathrooms, }) => {
                    let photos = (photosList && photosList?.length > 0) ? photosList : [{ photo: null, id: 1 }];

                    return <div className="card m-3 related-box" key={id}>
                      {/* <img src={photos?.[0]['photo']} alt="..." /> */}
                      <ImageLoader
                        src={photos?.[0]?.['photo']}
                        key={id}
                        style={{ objectFit: 'cover' }}
                        parentStyle={{ maxHeight: 140 }}
                      />
                      <div className="card-body">
                        <p className="card-text">Apartment</p>
                        <h6 className="card-title">{price} EGP/month</h6>
                        <p className="card-text"><small className="text-body-secondary">{address}</small></p>
                        <img src={bedroom} alt="" width="25px" /> {rooms}
                        <img src={bath} width="20px" alt="" /> {bathrooms}
                        <img src={measurement} width="30px" alt="" /> {size}
                      </div>
                    </div>
                  }
                  )
                }

              </div>
            </div>
          </div>
        )
      }
    </div>


  );
}
export default ShowApartment;