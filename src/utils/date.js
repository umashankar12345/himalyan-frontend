export const  dashDate=(passedDate)=>{
    const date=new Date(passedDate)
    return date.getDate()+"-"+(date.getMonth()+1)+"-"+date.getFullYear()
}