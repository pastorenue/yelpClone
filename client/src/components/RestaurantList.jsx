import React, {useEffect, useContext} from 'react'
import RestaurantFinder from '../apis/RestaurantFinder'
import { RestaurantContext } from '../context/RestaurantContext'
import {useHistory} from 'react-router-dom'


const RestaurantList = (props) => {

    const {restaurants, setRestaurants} = useContext(RestaurantContext)
    let history = useHistory()

    useEffect(() => {
        const getList = async () => {
            try {
                const response = await RestaurantFinder.get('/')
                //console.log(response.data.data)
                setRestaurants(response.data.data)
            } catch (err) {
                
            }
        }
        getList();
    }, [])

    const handleDelete = async (e,id) => {
      e.stopPropagation();
      try {
          await RestaurantFinder.delete(`/${id}`);
          setRestaurants(restaurants.filter(restaurant => {
            return restaurant.id !== id;
          })) 
      } catch (err) {
        
      }
    }

    const handleSelect = (id) => {
      history.push(`/restaurants/${id}`)
    }

    const handleUpdate = (e, id) => {
      e.stopPropagation()
      history.push(`/restaurants/${id}/update`)
    }
  return (
    <div className="list-group">
      <table className="table table-hover table-dark">
          <thead>
              <tr className="bg-primary">
                <th scope="col">Restaurant</th>
                <th scope="col">Location</th>
                <th scope="col">Price Range</th>
                <th scope="col">Ratings</th>
                <th scope="col">Edit</th>
                <th scope="col">Delete</th>
              </tr>
          </thead>
          <tbody>
              {restaurants && restaurants.map(restaurant => {
                  return (
                    <tr onClick={() => handleSelect(restaurant.id)} key={parseInt(restaurant.id)} style={{cursor:'pointer'}}>
                        <td>{restaurant.full_name}</td>
                        <td>{restaurant.location}</td>
                        <td>{"$".repeat(restaurant.rating)}</td>
                        <td>Rating</td>
                        <td><button onClick={(e) => handleUpdate(e,restaurant.id)} className="btn btn-warning">Edit</button></td>
                        <td><button onClick={(e) => handleDelete(e,restaurant.id)} className="btn btn-danger">Delete</button></td>
                    </tr>
                )
              })}
          </tbody>
      </table>
    </div>
  )
}

export default RestaurantList
