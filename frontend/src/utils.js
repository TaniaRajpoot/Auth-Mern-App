import {toast} from 'react-toastify'

export const handleSuccess = (msg)=>{
    toast.success(msg,{
        position:'top-right'
    })

}

export const handelError = (msg) =>{
    toast.error(msg,{
    position:'top-right'
    })
}