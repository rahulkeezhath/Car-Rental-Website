import React from 'react'

const AddCar = () => {
  return (
       <div className="add_car_container">
            <div className="add_car_wrapper">
                <div className="add_car_header">
                    <h1> Car</h1>
                    <span ><i className="ri-close-fill"></i></span>
                </div>
                <form  className='add_car_form_wrapper'>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Name</label>
                        <input type="text" name="name" />
         
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Rent</label>
                        <input type="text" name="rent" id=""  />
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Place</label>
                        <select name="place">
                            <optgroup>
                                <option hidden value=''>Select City</option>
                               
                            </optgroup>
                        </select>
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Brand</label>
                        <select name="brand">
                            <optgroup>
                                <option hidden value=''>Select Brand</option>
                            </optgroup>
                        </select>
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Type</label>
                        <select name="body">
                            <optgroup>
                                <option hidden value=''>Select Type</option>
                                <option value="SUV">SUV</option>
                                <option value="Sedan">Sedan</option>
                                <option value="MPV">Crossover</option>
                                <option value="Hatchback">Hatchback</option>
                            </optgroup>
                        </select>
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Transmission</label>
                        <select name="transmission" id="">
                            <optgroup>
                                <option hidden value=''>Select Transmission</option>
                                <option value="Auto">Auto</option>
                                <option value="Manual">Manual</option>
                            </optgroup>
                        </select>
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Fuel</label>
                        <select name="fuel">
                            <optgroup>
                                <option hidden value=''>Select Fuel Type</option>
                                <option value="Petrol">Petrol</option>
                                <option value="Diesel">Diesel</option>
                                <option value="EV">EV</option>
                            </optgroup>
                        </select>
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Registration No.</label>
                        <input type="text" name="registrationNo" id=""/>
                    </div>
                    <div className='add_car_input_wrapper'>
                        <label htmlFor="">Image</label>
                        <img className='previewImage' alt="preview" />
                    </div>
                    <button type='submit'></button>
                </form>
            </div>
        </div>
  )
}

export default AddCar
