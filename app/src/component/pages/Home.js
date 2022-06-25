import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom';
import Header from '../include/Header';
import AddDiv from '../include/AddDiv';
import ShowDiv from '../include/ShowDiv';
import { getAllBooks,updatebookAPi,getBookByIdApi,addBookApi,searchbookByAuthorNameAPi } from '../../Shared/Services';

export default function Home() {
  let navigate=useNavigate()
  const [createMode, setCreateMode] = React.useState(false)
  const [booksObject, setBooksObject] = React.useState([])
  const [inputObject, setInputObject] = React.useState({
    name:'',
    price:'',
    author:''
  })
  const [updateObject, setUpdateObject] = React.useState({
    name:'',
    price:'',
    author:''
  })


  const changeCreateStateFunc=(key,value)=>{
    setInputObject((old)=>{
      return {...old,[key]:value}
    })
  }
  const changeUpdateStateFunc=(key,value)=>{
    setUpdateObject((old)=>{
      return {...old,[key]:value}
    })
  }


  const inputData=[
    {
      name:"Book Name",
      placeholder:"Enter Book Name",
      value:inputObject.name,
      key:"name",
      valueForUpdate:updateObject.name,
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
    },
    {
      name:"Book Price",
      placeholder:"Enter Book Price",
      value:inputObject.price,
      key:"price",
      valueForUpdate:updateObject.price,
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
    },
    {
      name:"Auther Name",
      placeholder:"Enter Auther Name",
      value:inputObject.author,
      key:"author",
      valueForUpdate:updateObject.author,
      clickevent:changeCreateStateFunc,
      updateClickEvent:changeUpdateStateFunc
    },
  ]

  const filterData=(authorName)=>{
    var ac_token=localStorage.getItem('token')
    if(!ac_token){
      alert("Invalid token")
      return
    }
    searchbookByAuthorNameAPi(authorName,ac_token)
    .then(function (response) {
      console.log(response.data);
      setBooksObject((old)=>{
        return [...response.data]
      })
    })
    .catch(function (error) {
      if(error.response.status===500){
        console.log(error)
      }else{
        alert(error.response.data)
      }
    });

  }

  const insertIntoDb=()=>{
    var ac_token=localStorage.getItem('token')
    if(!ac_token){
      alert("Invalid token")
      return
    }
    addBookApi(inputObject,ac_token)
    .then(function (response) {
      alert(response.data);
      booksObject.unshift(inputObject)
    })
    .catch(function (error) {
      if(error.response.status===500){
        console.log(error)
      }else{
        alert(error.response.data)
      }
    });
  }

  const getBookById=(id)=>{
    var ac_token=localStorage.getItem('token')
    if(!ac_token){
      alert("Invalid token")
      return
    }
    getBookByIdApi(id,ac_token)
    .then(function (response) {
      console.log(response.data);
      setUpdateObject((old)=>{
        return {...old,name:response.data[0].name,price:response.data[0].price,author:response.data[0].author,id:response.data[0]._id}
      })
    })
    .catch(function (error) {
      if(error.response.status===500){
        console.log(error)
      }else{
        alert(error.response.data)
      }
      console.log(error);
    });
  }


  React.useEffect(()=>{
    console.log(updateObject)
  },[updateObject])



  const updatebook=(id)=>{
    var ac_token=localStorage.getItem('token')
    if(!ac_token){
      alert("Invalid token")
      return
    }
    updatebookAPi(updateObject,ac_token)
    .then(function (response) {
      alert(response.data);
    })
    .catch(function (error) {
      if(error.response.status===500){
        console.log(error)
      }else{
        alert(error.response.data)
      }
      console.log(error);
    });
  
  }



  React.useEffect(()=>{
    let token=localStorage.getItem('token')
    if(!token){
      navigate('/')
    }
    else{
      getAllBooks(token)
      .then(function (response) {
        setBooksObject([...response.data])
      })
      .catch(function (err) {
        if(err.response.status===500){
          console.log(err)
        }else{
          alert(err.response.data)
          navigate('/')
        }
      });
    }
  },[])
  return (
    <div className='outerDiv'>
      <Header title="Dashboard"/>
      {createMode?
      <>
      <AddDiv 
        inputData={inputData}
        save={insertIntoDb}
        
      />
      </>:
      <>
      <div className='createBtnDiv'><button className='createbtn homeCreateBtn'
      onClick={()=>{
        setCreateMode(true)
      }}
      >
        Create
      </button></div>
      </>
      }
      
      <ShowDiv 
      dataToShow={booksObject} //array of books 
      coloumsToshow={['Name','Price','Author','Action']} //headings of records
      keyOfDataToSHowObject={['name','price','author']} /// we can also create fun to get keys of object dynamically
      inputData={inputData} // array  to create input fields
      updateMode={true} //flag to resuse AddDiv Component for update Mode
      editRoute={getBookById} //function to get object which we want to update
      update={updatebook} //update book function
      filterDataFunc={filterData} //function to get data on basis of author name
      />
    
      </div>
  )
}
