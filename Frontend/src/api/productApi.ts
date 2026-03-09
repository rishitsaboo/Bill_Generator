import axios from "axios";

import API from "./axios"


export const getItemsBycategory = (categoryName:string) =>  {
    return API.get(`/items/category/${categoryName}`);
}