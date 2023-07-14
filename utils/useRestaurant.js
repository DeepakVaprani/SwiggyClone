import { useEffect, useState } from "react";

const useRestaurantMenu = (resId) =>
{
    const [ resInfo, setresInfo] = useState(null);
    useEffect(() =>
    {
        fetchData();
    },[]);

    const fetchData = async () => {
        const data = await fetch("https://www.swiggy.com/dapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=12.9801436&lng=77.5685724&restaurantId="+resId+"&submitAction=ENTER");
    
        const json=await data.json();
       
        setresInfo(json.data);
    }
    return resInfo;
};

export default useRestaurantMenu;