import React, {useState, useContext, useEffect} from 'react'
import { useParams, useHistory } from 'react-router-dom'
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantFinder from '../apis/RestaurantFinder';

function UpdateRestaurant(props) {
    const {id} = useParams();
    const [fullName, setFullName] = useState('')
    const [location, setLocation] = useState('')
    const [priceRange, setPriceRange] = useState('')
    let history = useHistory()

    useEffect(() => {
        const fetchData = async () => {
            const res = await RestaurantFinder.get(`/${id}`)
            const restaurant = res.data.data.restaurant;
            setLocation(restaurant.location)
            setFullName(restaurant.full_name)
            setPriceRange(restaurant.rating)
        };
        fetchData()
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        await RestaurantFinder.put(`/${id}/update`, {
            full_name: fullName,
            location,
            rating: priceRange
        })
        history.push('/')
    }
  return (
    <div>
      <form action="" className="container">
          <div className="form-group">
              <label htmlFor="name">Name</label>
              <input type="text" id="name" className="form-control" value={fullName} onChange={(e) => setFullName(e.target.value)}/>
          </div>
          <div className="form-group">
              <label htmlFor="location">Location</label>
              <input type="text" id="location" className="form-control" value={location} onChange={(e) => setLocation(e.target.value)}/>
          </div>
          <div className="form-group">
            <label htmlFor="price_range">Price Range</label>
            <select name="" id="" className="custom-select my-1 mr-sm-2" value={priceRange} onChange={(e) => setPriceRange(e.target.value)}>
                <option disabled>Price Range</option>
                <option value="1">$</option>
                <option value="2">$$</option>
                <option value="3">$$$</option>
                <option value="4">$$$$</option>
            </select>
          </div>
          <button type="submit" onClick={handleSubmit} className="btn btn-primary">Submit</button>
      </form>
    </div>
  )
}

export default UpdateRestaurant
