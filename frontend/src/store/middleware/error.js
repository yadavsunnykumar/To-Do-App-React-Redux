const error = store=>next=>action=>{
    if(action.type === "SHOW_ERROR"){
        console.log(action.payload.error)
        next(action)
    }else{
        console.log(action)
        next(action)

    }
}

export default error