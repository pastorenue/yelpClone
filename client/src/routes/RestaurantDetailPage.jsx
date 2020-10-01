import React, { useContext, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { RestaurantContext } from '../context/RestaurantContext';
import RestaurantFinder from '../apis/RestaurantFinder';
import Review from '../components/Review';
import AddReview from '../components/AddReview';

function RestaurantDetailPage() {

    const {id} = useParams();
    const {selectedRestaurant, setSelectedRestaurant} = useContext(RestaurantContext);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await RestaurantFinder.get(`/${id}`);
                setSelectedRestaurant(res.data.data);
            } catch (err) {
              console.error(err);  
            }
        }
        fetchData();
    }, [])

    return (
       <div className="container">{selectedRestaurant && (
           <>
           <h1 className="text-center display-1">{selectedRestaurant.restaurant.full_name}</h1>
            <div className="mt-3">
                <Review reviews={selectedRestaurant.reviews} />
                <AddReview />
            </div>
           </>
       )}</div>
    )
}

export default RestaurantDetailPage
