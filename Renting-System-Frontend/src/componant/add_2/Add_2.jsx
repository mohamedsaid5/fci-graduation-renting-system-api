import React from 'react'
import Addtwo from '../add_2/add_2.css'

export default function add_2() {
  return (
    <div className='add_2'>
    <div className="add_header">
    
    </div>

    <div className="title">
    <h3>Add Your Photo</h3>
    </div>

    <div className="read_term">
        
      <p> Please , Make sure each photo is smaller than 8 megadytes and the max of selected photos is 10 
      </p>
      
    </div>

    <div className="file">
            <form action="">
                <div className="photo">
                    <div className="upload">
                        <h3>drop your images here</h3>
                    <input type="file" name="" id="photo" />
                    <label htmlFor="photo">
                        <span><i class="fa-solid fa-plus"></i></span> Upload Photo
                    </label>
                    </div>
                </div>
                <div className="next_btn">
                    <button type="submit">Next</button>
                </div>
            </form>
    </div>

    </div>
  )
}
