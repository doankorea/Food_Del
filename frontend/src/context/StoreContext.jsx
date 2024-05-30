import { createContext, useState, useEffect } from "react";
import axios from 'axios'
export const StoreContext = createContext(null)


const StoreContextProvider= (props)=>{



    const[cartItems, setCartItems]= useState({})

    const url= "http://localhost:4000"
    const [token, setToken] = useState("")
    const [food_list, setFoodlist] = useState([])
    const addToCart= async (itemId)=>{
        if(!cartItems[itemId]){
            setCartItems((prev)=>({...prev, [itemId]: 1}))   
        }
        else{
            setCartItems((prev)=>({...prev, [itemId]:prev[itemId]+1}))
        }
        if(token){
            await axios.post(url+"/api/cart/add", {itemId}, {headers: {token}})
        }
    }

    const removeFromCart= async (itemId)=>{
        setCartItems((prev)=>({...prev, [itemId]: prev[itemId]-1}))
        if (token) {
                await axios.post(`${url}/api/cart/remove`, { itemId }, { headers: { token } });
        }

    }

    
    
    const getTotalCartAmount = () => {
        return Object.entries(cartItems).reduce((total, [itemId, quantity]) => {
            const item = food_list.find(food => food._id === itemId);
            return item ? total + (item.price * quantity) : total;
        }, 0);
    };


    const fetchFoodList= async ()=>{
        const response= await axios.get(url+"/api/food/list")
        setFoodlist(response.data.data)
    }

    const loadCartData= async (token)=>{
            const response= await axios.post(`${url}/api/cart/get`, {}, { headers: { token } });
            setCartItems(response.data.cartData)
                

    }

    useEffect(()=>{
        
        async function loadData(){
            await fetchFoodList()
            const token= localStorage.getItem("token")
            if(token){
            setToken(token)
            await loadCartData(token)
            }
            
        }
        loadData()
    }, [])


    const contextValue = {
        food_list,
        cartItems,
        addToCart,  
        removeFromCart,
        setCartItems,
        getTotalCartAmount,
        url, 
        token,
        setToken

    }

    return (
        <StoreContext.Provider value={contextValue}>
            {props.children}
        </StoreContext.Provider>
    )
}

export default StoreContextProvider;