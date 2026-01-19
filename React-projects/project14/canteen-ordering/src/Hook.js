import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

export function  useGetRestaurantData() {
    const dispatch = useDispatch();
    const restaurantData = useSelector((state) => state.app.restaurantData);
    async function getData(){
        let apiData = await fetch ("https://mocki.io/v1/b0ed27cf-5681-4804-beaa-f5bb7044a3e6");
        let jsonData =  await apiData.json();
        console.log(jsonData);
    }
    useEffect(() =>{
        if(restaurantData.length !== 0) return;
        getData();
    },[restaurantData]);
}