import { createSlice} from "@reduxjs/toolkit"

import { apiCallBegan } from "./api"
// let id = 0
const initialState = {
    tasks:[],
    loading:false,
    error:null
}

// export const fetchTasks = createAsyncThunk('fetchTasks',async (a,{rejectWithValue}) =>{
//     try {
//         const response = await axios.get("/api/tasks")
//         return {tasks:response.data}
        
//     } catch (error) {
//         return rejectWithValue({error:error.message})
        
//     }

// })
// console.log(asyncthnk)





const taskSlice = createSlice({
    name:"Tasks",
    initialState,
    reducers:{
        //action:function
        apiRequested:(state,action) =>{
            state.loading = true
        },
        apiRequestFailed:(state,action)=>{
            state.loading = false
        },
        getTasks:(state,action) => {
            state.tasks = action.payload
            state.loading = false
        },
        addTask:(state,action) =>{
            state.tasks.push(action.payload)
            // console.log(action.payload)

        
        },
        removeTask:(state,action) =>{
            console.log(action.payload.id)
            const index = state.tasks.findIndex(task=>task.id===action.payload.id)
            state.tasks.splice(index,1)
        },
        completedTask:(state,action)=>{
            const index = state.tasks.findIndex(task => task.id === action.payload.id)
            state.tasks[index].completed = action.payload.completed        },
        
    },
    // extraReducers:(builder) =>{
    //     builder.addCase(fetchTasks.pending,(state,action)=>{
    //         state.loading = true
    //     })
    //     builder.addCase(fetchTasks.fulfilled,(state,action) => {
    //         state.tasks = action.payload.tasks
    //         state.loading = false
    //     })
    //     builder.addCase(fetchTasks.rejected,(state,action) =>{
    //         state.error = action.payload.error
    //         state.loading = false
    //     })
    // }
})
// console.log(taskSlice)



export const {apiRequested,apiRequestFailed,getTasks,addTask,completedTask,removeTask} = taskSlice.actions


export const taskReducer = taskSlice.reducer


//Action creators
const url = '/api/tasks'

export const loadTasks = () =>{
    return apiCallBegan({
        url,
        onStart:apiRequested.type,
        onSuccess:getTasks.type,
        onError:apiRequestFailed.type
    })
}

export const addNewTask = (task) =>{
    return apiCallBegan({
        url,
        method:"POST",
        data:task,
        onSuccess:addTask.type,

    })
}
export const updateCompleted = (task) =>{
    return apiCallBegan({
        url:`${url}/${task.id}`,
        method:"PATCH",
        data:task,
        onSuccess:completedTask.type
    })
}
export const removeOneTask = (task) =>{
    return apiCallBegan({
        url :`${url}/${task.id}`,
        method:"DELETE",
        data:task,
        onSuccess:removeTask.type
    })

}