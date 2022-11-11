import React, { useContext, useEffect, useState } from 'react'
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import CreateIcon from '@mui/icons-material/Create';
import DeleteIcon from '@mui/icons-material/Delete';
import { NavLink } from 'react-router-dom';
import { addData } from './context/ContextProvider';
import ReactPaginate from "react-paginate";

const Home = () => {

  const [getuserData, setuserData] = useState([]);
  console.log(getuserData);

  const { getuData, setuData } = useContext(addData);

  const getdata = async (e) => {

    const res = await fetch("http://localhost:8003/getData", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    });

    const data = await res.json();
    // console.log(data);

    if (res.status === 422 || !data) {
      console.log("error");
    }
    else {
      setuserData(data);
      console.log("Get Data");
    }
  }

  useEffect(() => {
    getdata();
  }, [])

  const deleteuser = async (id) => {
    const res2 = await fetch(`http://localhost:8003/delete/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json"
      }
    });
    const deletedata = await res2.json();

    console.log(deletedata);

    if (res2.status === 422 || !deletedata) {
      console.log("error");
    }
    else {
      console.log("Data deleted");
      getdata();
    }
  }

  const [pageNumber, setpageNumber] = useState(0);
  const userPerPage = 5;
  const pagesVisited = pageNumber * userPerPage;

  const displayUsers = getuserData.slice(pagesVisited, pagesVisited + userPerPage)
    .map((getuserData, id) => {

      return (
        <tr >
          {/* <th scope="row">{id + 1}</th> */}
          <td>{getuserData.name}</td>
          <td>{getuserData.accNo}</td>
          <td>{getuserData.bank}</td>
          <td className='d-flex justify-content-around'>
            <NavLink to={`view/${getuserData._id}`}><button className='btn btn-success'><RemoveRedEyeIcon /></button></NavLink>
            <NavLink to={`edit/${getuserData._id}`}><button className='btn btn-primary'><CreateIcon /></button></NavLink>
            <button className='btn btn-danger' onClick={() => deleteuser(getuserData._id)}><DeleteIcon /></button>
          </td>
        </tr>
      )
    })

const pageCount = Math.ceil(getuserData.length / userPerPage);
const changePage = ({selected}) =>{
setpageNumber(selected);
}

  return (

    <>
      {
        getuData ?
          <>
            <div class="alert alert-success alert-dismissible fade show" role="alert">
              <strong>Success</strong> User Added Successfully
              <button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
          </> : ""
      }


      <div className='mt-5'>
        <div className='container'>
          <div className='add_btn mt-2 mb-2'>
            <NavLink to="/register" className='btn btn-primary'>Add Data</NavLink>
          </div>

          <table class="table">
            <thead>
              <tr className='table-dark'>
                {/* <th scope="col">Id</th> */}
                <th scope="col">Vendor name</th>
                <th scope="col">Bank Acc. No.</th>
                <th scope="col">Bank Name</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody >

              {/* {
                getuserData.map((element, id) => {
                  return (
                    <>
                      <tr >
                        <th scope="row">{id + 1}</th>
                        <td>{element.name}</td>
                        <td>{element.accNo}</td>
                        <td>{element.bank}</td>
                        <td className='d-flex justify-content-around'>
                          <NavLink to={`view/${element._id}`}><button className='btn btn-success'><RemoveRedEyeIcon /></button></NavLink>
                          <NavLink to={`edit/${element._id}`}><button className='btn btn-primary'><CreateIcon /></button></NavLink>
                          <button className='btn btn-danger' onClick={() => deleteuser(element._id)}><DeleteIcon /></button>
                        </td>
                      </tr>
                    </>
                  )
                })
              } */}

              {displayUsers}
<ReactPaginate 
          previousLabel = {"<  "}
          nextLabel = {"  >"}

          pageCount = {pageCount}
          onPageChange ={changePage}
          containerClassName={"pagination"}
          previousLinkClassName={"priviousBtn"}
          nextClassName={"nextBtn"}
          activeClassName = {"paginationActive"}
          />
            </tbody>
          </table>

          

        </div>
      </div>

    </>
  )
}

export default Home