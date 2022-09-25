import axios from 'axios';
import React, { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import "./UserFCss.css";
import Form from "../image/Formulario.png";
import { useState } from 'react';

const UserForm = ({getUsers, userSelected, deselectUser, showHandler}) => {

    const { register, handleSubmit, reset } = useForm ();



    
    useEffect(() => {
        if(userSelected){
            reset(userSelected)
        }
    }, [userSelected])

    const submit = (data) =>{
        if(userSelected){
            axios.put(`https://users-crud1.herokuapp.com/users/${userSelected.id}/`,data)
            .then(() => {
                getUsers()
                showHandler(false)
            })

        }else{
            axios.post('https://users-crud1.herokuapp.com/users/',data)
                .then(() => {
                    getUsers()
                    showHandler(false)
                })
                .catch(error => console.log(error.response));
        }
        clear();
    }

    const clear = () =>{
        reset({
            email: "",
            first_name: "",
            last_name: "",
            birthday: "",
            password: "",
        })
        deselectUser();
    }

    const closeModale = (evt) =>{
        if(evt.target.id === 'idForm') showHandler(false)
    }

    const [ isVisible, setIsVisible] = useState(false)

        return (
        <div onClick={closeModale} className='Form' id='idForm'>
        <form onSubmit={handleSubmit(submit)}  className='form'>
            <img src={Form} alt="" />
            <div className='fromCont'>
                <div className='input-contianer'>
                    <label htmlFor="email">Email</label>
                    <br />
                    <input type="email" id='email' placeholder="user@example.com" {...register("email")} className='input'/>
                </div>
                <div className='input-contianer'>
                    <label htmlFor="firstName">First Name</label>
                    <br />
                    <input type="text" id='firstname' placeholder="Tipe your first name" {...register("first_name")} className='input'/>
                </div>
                <div className='input-contianer'>
                    <label htmlFor="lastName">Last Name</label>
                    <br />
                    <input type="text" id='lastname' placeholder="Tipe your last name" {...register("last_name")} className='input'/>
                </div>
                <div className='input-contianer'>
                    <label htmlFor="birthday">Birthday</label>
                    <br />
                    <input type="date" id='birthday' placeholder="Tipe your Birthday date" {...register("birthday")} className='input'/>
                </div>
                <div className='input-contianer'>
                    <label htmlFor="password">Password</label>
                    <br />
                    <i className="fa-solid fa-key"></i>
                    <input type={isVisible ? "text" : "password"} id='password' {...register("password")} className='input' />
                    <button type='button' onClick={() => setIsVisible(!isVisible)} className={'Visibility'}>{isVisible ? <i class="fa-solid fa-eye"></i>:<i class="fa-solid fa-eye-slash"></i>}</button>
                </div>
                </div>
                <span className='BtnList'>
                <button className='Btn_List'><i className="fa-solid fa-arrow-up-from-bracket"></i></button>
                <button onClick={clear} type="button" className='Btn_List'>
                <i className="fa-solid fa-trash"></i>
                    </button>
                </span>
        </form>
        </div>
    );
};

export default UserForm;