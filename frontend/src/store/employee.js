import { createSlice } from "@reduxjs/toolkit";
let id = 0
const empSlice = createSlice({
    name:"Employee",
    initialState:[],
    reducers:{
        addEmp:(state,action) =>{
            state.push({
                id:++id,
                name:action.payload.name
            })
        },
        removeEmp:(state,action) =>{
            const index = state.findIndex(emp => emp.id === action.payload.id)
            state.splice(index,1)
        },
       
    }
})


export const {addEmp,removeEmp} = empSlice.actions
export const empReducer = empSlice.reducer