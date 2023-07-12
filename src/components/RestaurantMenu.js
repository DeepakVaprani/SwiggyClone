import {useEffect, useState} from "react";
import Shimmer from "./Shimmer";
import { useParams } from "react-router-dom";

const RestaurantMenu =() =>{

    const [resInfo, setresInfo] = useState(null);
    const { resId} = useParams();
    useEffect(() =>{
        fetchMenu();
    }, []);

    const fetchMenu = async () =>{
        const data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9801436&lng=77.5685724&restaurantId=41102&submitAction=ENTER");
    
        const json=await data.json;
        setresInfo(json.data);
    }

    if(resInfo==null)
    {
        return <Shimmer/>
    }
    
    const { name, cuisines, costForTwoMessage} = resInfo?.cards[0]?.card?.card?.info;
    
    
    const{itemCards} = resInfo?.cards[2]?.groupedCard?.cardGroupMap?.REGULAR?.cards[1]?.card?.card;

    return (
        <div className="menu">
        
        <h1>{name}</h1> 
        <h2>{cuisines.join(',')}</h2>
        <h2>{costForTwoMessage}</h2>
        <h2>Menu</h2>
        <ul>
        {itemCards.map((item) =>(
            <li>{item.card.info.name}</li>))}
            
        </ul>
        </div>
    );
};

export default RestaurantMenu;