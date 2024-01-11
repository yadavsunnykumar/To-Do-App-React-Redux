//Store Configuratioon
import {configureStore } from '@reduxjs/toolkit'
import {empReducer } from './employee'
import {taskReducer} from './task'
import error from './middleware/error'
import api from './middleware/api'


const store = configureStore({
    reducer:{
    Tasks:taskReducer,
    Employee:empReducer
    },
    middleware:(getDefaultMiddleware) =>  [...getDefaultMiddleware(),api,error]
})




export default store