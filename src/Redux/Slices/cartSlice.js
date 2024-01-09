import { createSlice } from "@reduxjs/toolkit";

const cartSlice =createSlice({
    name:"cart",
    initialState:[],
    reducers:{
        addtoCart:(state,action)=>{
            const existingProduct =state.find(item=>item.id==action.payload.id)
            if(existingProduct){
                const newState = state.filter(item=>item.id!=existingProduct.id)
                existingProduct.quantity++
                existingProduct.totalPrice =existingProduct.quantity * existingProduct.price
                state = ([...newState,existingProduct])
            }else{
                state.push({...action.payload,quantity:1,totalPrice:action.payload.price})
            }
        },
        removeCart:(state,action)=>{
            return state.filter(item=>item.id!=action.payload)
        },
        emptyCart:(state)=>{
            return state=[]
        },
        incQuantity:(state,action)=>{
            const existingProduct=state.find(item=>item.id==action.payload.id)
            const newState =state.filter(item=>item.id!=existingProduct.id)
            existingProduct.quantity++
            existingProduct.totalPrice=existingProduct.quantity * existingProduct.price
            state=([...newState,existingProduct])
        },
        decQuantity: (state, action) => {
            const { id } = action.payload;
        
            return state.map(item => {
                if (item.id === id && item.quantity > 0) {
                    return { ...item, quantity: item.quantity - 1, totalPrice: item.totalPrice - item.price };
                }
                return item;
            }).filter(item => item.quantity > 0);
        }
    }
})
export const {addtoCart,removeCart,emptyCart,incQuantity,decQuantity}=cartSlice.actions;
export default cartSlice.reducer

