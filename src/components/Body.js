import RestaurantCard from "./RestaurantCard"
import {useState, useEffect} from "react";
import Shimmer from "./Shimmer";



const Body = () => {

    const[listOfRestaurants, setlistOfRestaurants] = useState([]);
    const[searchText, setsearchText] = useState("");
    const[filteredRest,setfilteredRest] = useState("");

    useEffect(()=>{
        fetchData();
    },[]);

    const fetchData = async () =>{
        const data = await fetch("https://www.swiggy.com/dapi/restaurants/list/v5?lat=12.9801436&lng=77.5685724&page_type=DESKTOP_WEB_LISTING");
    
        const json = await data.json();
        setfilteredRest(json?.data?.cards[2]?.data?.data?.cards);
        setlistOfRestaurants(json?.data?.cards[2]?.data?.data?.cards);

    }

    if(listOfRestaurants.length==0){
        return <h1><Shimmer/></h1>
    }
   
    return(
        <div className="body">
            <div className="filter">
            <div className="search">
                <input type="text" className="search-box" value ={searchText} onChange={(e) => {
                    setsearchText(e.target.value);
                }}/>
                <button onClick={()=>{
                        const filteredRest = listOfRestaurants.filter((res)=>(res.data.name.toLowerCase().includes(searchText.toLowerCase())));
                        setlistOfRestaurants(filteredRest);
                }}>Search</button>
            </div>
                <button className="filter-btn" onClick={()=>
                {const filteredList = listOfRestaurants.filter((res)=>res.data.avgRating>4);
                setfilteredRest(filteredList)
                }}>Top Rated Restaurants</button>
                
            </div>
            <div className="res-container">
            {
                filteredRest.map((restaurant) => (
                <RestaurantCard key = {restaurant.data.id} resData={restaurant}/>))
            }
            </div>
        </div>
    )
}

export default Body;