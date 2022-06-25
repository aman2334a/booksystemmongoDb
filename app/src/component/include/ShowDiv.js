import React from 'react'
import AddDiv from './AddDiv'
export default function ShowDiv(props) {
  const [selectedIndex, setSelectedIndex] = React.useState(-1)
  const [queryParameter, setQueryParameter] = React.useState('') 

  return (
    <div className='ShowDiv'>
       {props.dataToShow.length>0?
      <>
      <div className='searchBoxDiv'> 
        <div className='main_search '>
          <div className='searchBox'>
            <input type="text"  value={queryParameter} placeholder="Enter Author Name"
            onChange={(e)=>{
              setQueryParameter(e.target.value)
            }}
            />
          </div>
          <button className='searchBtn'
          onClick={()=>{
            props.filterDataFunc(queryParameter)
          }}
          >search</button>
        </div>
      </div>

      <div className='columnsHeadings'>
      {props.coloumsToshow&&props.coloumsToshow.map((columnNameItem,columnNameIndex)=>{
        return <div key={columnNameIndex} className='column'>{columnNameItem}</div>
      })}
      </div>
      {props.dataToShow.map((dataToShowItem,dataToShowIndex)=>{
        return <div key={dataToShowIndex}><div  className='row'>
          {props.keyOfDataToSHowObject&&props.keyOfDataToSHowObject.map((keyItem,keyIndex)=>{
            return <div className='column' key={keyIndex}>
              {dataToShowItem[keyItem]}
            </div>
          })}
          <div className='column'>
          <span className='customEditBtn'
                onClick={()=>{
                  setSelectedIndex((old)=>{
                    if(old===dataToShowIndex){
                      return -1
                    }
                    return dataToShowIndex
                  })
                  props.editRoute(dataToShowItem._id)
                }}
              >Edit</span>
          </div>
        </div>
          {selectedIndex===dataToShowIndex&&
            <AddDiv 
            inputData={props.inputData}
            updateMode={true}
            update={props.update}
            />
  
          }
        </div>

      })}
      </>
      :<>
      <center>No Books Available</center>
      </> 
      }
    </div>
  )
}
