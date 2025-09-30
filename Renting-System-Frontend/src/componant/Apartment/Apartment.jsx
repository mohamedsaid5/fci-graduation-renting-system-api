import React from 'react'
import '../Apartment/apartment.css'
import Carousel from 'react-bootstrap/Carousel';
import 'bootstrap/dist/css/bootstrap.min.css';
import Apart_Img from './apartment.jpg'
import Table from 'react-bootstrap/Table';

export default function apartment() {
  return (
    <div className='apartment'>

      <div className="page_up">

        <div className="gallary">
          <Carousel>
            <Carousel.Item>
              <img
                className="d-block w-100 apart_img"
                src={Apart_Img}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 apart_img"
                src={Apart_Img}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 apart_img "
                src={Apart_Img}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>

        </div>

        <div className="contact_contanier">
          <div className="user contact_contanier_row">
            <p className='first'><span><i className="fa-regular fa-circle-user"></i></span> User Name</p>
          </div>
          <div className="user contact_contanier_row">
            <p className='sec'><span><i className="fa-brands fa-whatsapp"></i></span> WhatsApp</p>
          </div>
          <div className="user contact_contanier_row">
            <p className='thried'><span><i className="fa-solid fa-phone"></i></span> Call</p>
          </div>
          <div className="user contact_contanier_row">
            <p className='fourth'><span><i className="fa-solid fa-envelope"></i></span> Email</p>
          </div>

        </div>

      </div>
      <div className="page_down">
        <div className="left">
          <p className='page_down_left'><span>Apartment</span> January 23 , 2024</p>
          <h4>2200EGP/month</h4>
          <p>apartment 130m in Ismailia</p>
          <p className='Location'> <span><i className="fa-solid fa-location-dot"></i>Ismailia</span></p>
          <div className="tabel">
            <h3> Listing Details</h3>
            <div className="details_tabel">
              <Table striped bordered hover>
                <thead>
                  <tr>

                    <th>Size (in meter)</th>
                    <th> 130 M <sup>2</sup></th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>Room</td>
                    <td>3</td>

                  </tr>
                  <tr>
                    <td>Baths</td>
                    <td>1</td>
                  </tr>
                  <tr>
                    <td>Seller Role</td>
                    <td>Property Owner</td>
                  </tr>
                  <tr>
                    <td>Baths</td>
                    <td>Main Street</td>
                  </tr>
                  <tr>
                    <td>Price</td>
                    <td>2200EGP/month</td>
                  </tr>
                </tbody>
              </Table>
            </div>
          </div>

        </div>
        <div className="right">
          <div className="card_1">

            <div className="card_img">
              <img className='land_img' src={Apart_Img} alt=" none" />

            </div>

            <div className="card_img_contant">
              <div className="card_main_content">
                <p className='Apartment green'>Apartment</p>
                <h3>2200EGP/month</h3>
                <span className='card_1_row'><i className="fa-solid fa-location-dot location green"></i> ismailia</span>


                <div className="Apartment_icons">
                  <span className='icon'><i className="fa-solid fa-couch couch"></i> 3</span>
                  <span className='icon'> <i className="fa-solid fa-bath bath"></i> 2</span>
                  <span className='icon'> <i className="fa-solid fa-crop crop bath1 "></i> 120 m<sup>2</sup></span>
                </div>
              </div>

              <div className="card_contacts card_contacts_1">

                <div className="call call_1">
                  <span><i className="fa-solid fa-phone"></i></span>
                  <span>Call</span>
                </div>

                <div className="call">
                  <span><i className="fa-solid fa-envelope"></i></span>
                  <span>Email</span>
                </div>

                <div className="call">
                  <span><i className="fa-brands fa-whatsapp"></i></span>
                  <span>WhatsApp</span>
                </div>

              </div>

            </div>

          </div>

        </div>


      </div>

    </div>
  )
}
