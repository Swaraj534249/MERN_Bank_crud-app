import React, { useContext, useState } from 'react'
import { NavLink, useNavigate } from "react-router-dom";
import { addData } from './context/ContextProvider';

const Register = () => {

    const {getuData,setuData} = useContext(addData);

    const history = useNavigate("");

    const [inpVal, setInp] = useState({
        name:"",
        accNo:"",
        bank:"",
        add1:"",
        add2:"",
        city:"",
        country:"",
        zip:""
    })
    const setData = (e) =>{
        console.log(e.target.value);
        const {name,value} = e.target;
        setInp((preval)=>{
            return{
                ...preval,
                [name]:value
            }
        })
    }

    const addinpdata = async(e)=>{

        e.preventDefault();

        const {name,accNo,bank,add1,add2,city,country,zip} = inpVal;

        const res = await fetch("http://localhost:8003/register", {
            method: "POST",
            headers: {
                "Content-Type":"application/json"
            },
            body:JSON.stringify({
                name,accNo,bank,add1,add2,city,country,zip
            })
        });

        const data = await res.json();
        console.log(data);

        if(res.status === 422 || !data){
            alert("error");
            console.log("error");
            return
        }
        else{
            alert("Data added");
            console.log("Data added");
            // setuData(data);
            history("/");
            
        }
    }

    return (
        <div className='container'>
            <NavLink to="/">
                Home
            </NavLink>

            <form className='mt-5'>
                <div className='row'>
                    <div class="col-lg-6 col-md-6 col-12 mb-3">
                        <label for="exampleInputEmail1" class="form-label">Name</label>
                        <input type="text" onChange={setData} value={inpVal.name} name='name' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                </div>
                <div className='row'>
                    <div class="col-lg-6 col-md-6 col-12  mb-3">
                        <label for="exampleInputEmail1" class="form-label">Bank Account No.</label>
                        <input type="text" onChange={setData} value={inpVal.accNo} name='accNo' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="col-lg-6 col-md-6 col-12  mb-3">
                        <label for="exampleInputPassword1" class="form-label">Bank Name</label>
                        <input type="text" onChange={setData} value={inpVal.bank} name='bank' class="form-control" id="exampleInputPassword1" />
                    </div>
                </div>
                <div className='row'>
                    <div class="col  mb-3">
                        <label for="exampleInputEmail1" class="form-label">Address Line 1</label>
                        <textarea class="form-control" onChange={setData} value={inpVal.add1} name='add1' id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                </div>
                <div className='row'>
                    <div class="col  mb-3">
                        <label for="exampleInputEmail1" class="form-label">Address Line 2</label>
                        <textarea class="form-control" onChange={setData} value={inpVal.add2} name='add2' id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                </div>
                <div className='row'>
                    <div class="col-lg-6 col-md-6 col-12  mb-3">
                        <label for="exampleInputEmail1" class="form-label">City</label>
                        <input type="text" onChange={setData} value={inpVal.city} name='city' class="form-control" id="exampleInputEmail1" aria-describedby="emailHelp" />
                    </div>
                    <div class="col-lg-6 col-md-6 col-12  mb-3">
                        <label for="exampleInputPassword1" class="form-label">Country</label>
                        <input type="text" onChange={setData} value={inpVal.country} name='country' class="form-control" id="exampleInputPassword1" />
                    </div>
                    <div class="col-lg-6 col-md-6 col-12  mb-3">
                        <label for="exampleInputPassword1" class="form-label">Zip Code</label>
                        <input type="text" onChange={setData} value={inpVal.zip} name='zip' class="form-control" id="exampleInputPassword1" />
                    </div>
                </div>
                <button type="submit" onClick={addinpdata} class="btn btn-primary">Submit</button>
            </form>
        </div>
    )
}

export default Register