import React from 'react'
import About_us from '../About_Us/about_us.css'


export default function about_us() {
  return (
    <div>
        <div className="about_us_img">
            
            <div className="about_us_layer_text">
                <h1 className='text_about'> AboutUs</h1>
            </div>
        </div>
            <div className="about_us_Containt_upper">
                <h3>
                The Renting System.com Difference :
                </h3>
                <p className='upper'>
                Our search, content, and advertising strategies are designed to bring millions of transaction-ready buyers and sellers to Renting System.com, where they can find a great agent, or connect to their current one and collaborate during the entire process.
                </p>
                <p className='lower'>
                We offer a full line of advertising products and online marketing services designed to help real estate professionals connect with interested buyers and sellers. If your goals include connecting with quality buyers and sellers searching for their next home and leveraging the right tools and services to grow your business, you’ve come to the right place! Renting System.com has tons of resources to help you stay informed of what’s happening in the industry, what’s working for successful agents, and what tactics are leading to success in today’s market.
                </p>

            </div>

            <div className="about_us_Containt_lower">
                <h3>Interested in Joining Our Team?</h3>
                <h4>What We Offer:</h4>
                <p>* Extensive property listings.</p>
                <p>* Expert agent matching.</p>
                <p>* Personalized property recommendations.</p>
                <p>* Seamless communication tools.</p>
                <p>* Market insights and trends.</p>
            </div>

    </div>
  )
}
