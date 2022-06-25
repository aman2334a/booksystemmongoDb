import React from 'react'

export default function AddDiv(props) {

    React.useEffect(()=>{

    },[])
  return (
    <div className='addDiv'>
        <span className='pageTitle'>Add Book</span>
        <div className='addDivInputs'>
       {
           props.inputData&&props.inputData.map((item,index)=>{
               return<div  key={index} className='inputDiv'>
                    <input type="text" value={props.updateMode?item.valueForUpdate:item.value??''} placeholder={item.placeholder} 
                    onChange={(e)=>{
                        if(props.updateMode){
                            item.updateClickEvent(item.key,e.target.value)
                        }else{
                            item.clickevent(item.key,e.target.value)
                        }
                    }}
                    />
               </div>
               
           })
       }
    </div>
       {props.inputData &&
       props.updateMode?<>
       <button className='createbtn'
       onClick={()=>{
        props.update()
       }}
       >Update</button>
       </>:
       <>
       <button className='createbtn'
       onClick={()=>{
        props.save()
       }}
       >Submit</button>
       </>
       }
    </div>
  )
}
