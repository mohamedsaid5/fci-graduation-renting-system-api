import './nav.css'
import yourImage from './transparent_logo.png';
import React from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import useAuth from '../../hooks/useAuth';
import guest from '../../assets/icons/guest.png'
import { NavLink } from 'react-router-dom';

export default function Navb() {
  const { isAuth, updateAuth, user } = useAuth();

  return (
    <Navbar collapseOnSelect expand="lg" bg="light" data-bs-theme="light" variant="light">
      <Container>
        {/* Brand/logo on the left */}
        <NavLink className='cust_nav_link' to="/">
          <Navbar.Brand><img className='logo' src={yourImage} alt="Logo" style={{ width: '90px', height: '90px' }} /></Navbar.Brand>
        </NavLink>
        {/* Hamburger toggle button for mobile */}
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />

        <Navbar.Collapse id="responsive-navbar-nav">
          {/* Centered navigation links */}
          <Nav className="mx-auto">

            {
              isAuth && (
                <>
                  <NavLink className='cust_nav_link' to="/sale">
                    <div>Rent</div>
                  </NavLink>
                  <NavLink className='cust_nav_link' to="/about">
                    <div >About Us</div>
                  </NavLink>
                  <NavLink className='cust_nav_link' to="/contact">
                    <div>Contact Us</div>
                  </NavLink>
                </>

              )
            }
          </Nav>

          {/* Optional: Add additional content on the right */}
          {
            !isAuth ? (
              <Nav>
                <NavLink className='cust_nav_link' to="/sign_in">
                  <Button variant="outline-light" className="p-1 btn_media" style={{
                    color: '#28a745', borderColor: '#28a745'
                  }}>
                    Sign In
                  </Button>
                </NavLink>

                <NavLink className='cust_nav_link' to="/New_account">
                  <Button variant="outline-light" className="p-1 btn_media" style={{
                    color: '#28a745', borderColor: '#28a745'
                  }}>
                    Sign Up
                  </Button>
                </NavLink>
              </Nav>
            ) :
              (
                <>
                  <Nav className='logedin-sec'>
                    <Nav.Item>
                      <Button variant="success" className=" p-1" onClick={() => updateAuth(false)}>Logout</Button>
                    </Nav.Item>

                    <NavLink className='cust_nav_link' to="/e_profile">
                      <div className="avatar-icon">
                        <img src={user.avatar ?? guest} alt="" />
                      </div>
                    </NavLink>
                  </Nav>

                </>
              )
          }
        </Navbar.Collapse>
      </Container>
    </Navbar>



  )
}
