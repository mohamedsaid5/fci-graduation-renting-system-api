import React from 'react'
import Nav from './componant/Nav/Nav'
import Footer from './componant/Footer/Footer'
import Contact from './componant/Contact_Us/Contact_us'
import About from './componant/About_Us/About_us'
import Home from './componant/land_page/Land_page'
import Sign from './componant/sing_in/Sing_In'
import New_account from './componant/New_Account/New_account'
import Apartment from './componant/Apartment/Apartment'
import Forget from './componant/forget_password/Forget_password'
import Resetpassword from './componant/setNewPassword/SetPassword'
import Add from './componant/add_1/Add'
import EsraaProfile from './componant/Profile/Profile'
import Sales from './componant/Sales/Sale'
import ShowApartment from './componant/ShowApartment/showapartment'
import Apartmentshow from './componant/Apartmentshow/apartmentshow'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PublicRoute from './componant/PublicRoute'
import PrivateRoute from './componant/PrivateRoute'
import AuthProvider from './context/Auth'
import useAuth from './hooks/useAuth'
import OwnerApartment from './componant/OwnerApartment'

const App = () => {

  const { isAuth } = useAuth();

  return (

    <Router>
      <div>
        <Nav />

        <Routes>

          <Route element={<PrivateRoute isAuth={isAuth} route='Sign_in' />}>

            <Route path="/" element={<Home />} />
            <Route path="/add/:update?" element={<Add />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/Apartment" element={<Apartment />} />
            <Route path="/e_profile" element={< EsraaProfile />} />
            <Route path="/sale" element={< Sales />} />
            <Route path="/showapartment/:id" element={<ShowApartment />} />
            <Route path="/apartmentshow" element={<Apartmentshow />} />

            {/* -------------------- */}

            <Route path="/owner/apartment" element={<OwnerApartment />} />
          </Route>

          <Route element={<PublicRoute isAuth={isAuth} />}>

            <Route path="/New_account" element={<New_account />} />
            <Route path="/reset-password" element={<Resetpassword />} />
            <Route path="/Sign_in" element={<Sign />} />
            <Route path="/forget_password" element={< Forget />} />

          </Route>

        </Routes>

        {isAuth && <Footer />}
      </div>
    </Router>

  );
};

export default function AppProvideWithAuth() {
	return (
		<AuthProvider>
			<App />
		</AuthProvider>
	)
}



































// import React from 'react'



// import Apartment from './componant/Apartment/apartment'
// import Add from './componant/add_1/add'
// import Addtwo from './componant/add_2/add_2'

// import { createBrowserRouter, RouterProvider } from 'react-router-dom';


// import { RouterProvider, createBrowserRouter } from "react-router-dom";
// import Layout from "./componant/layout/Layout";
// import Home from "./componant/home/Home";
// import Parent from "./componant/parent/Parent";


// let HAMDA =  createBrowserRouter([
//   {path:"", element:<Layout/>,children:[
//     {path:"home",element:<Home/>},
//     {path:"parent",element:<Parent/>}
//   ]}
// ])
// return  <RouterProvider router={HAMDA}/>