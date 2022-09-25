import React from 'react';

const UserList = ({ users, deleteUser, showHandler, selectUser }) => {
    const onUserEdit = user => {
        showHandler(true)
        selectUser(user)
    }


    return (
        <>
            <ul className='list-User'>
                {
                    users?.map(user => (<li className='listUser'>
                        <div className='Name'><b>{user.first_name} {user.last_name}</b></div>
                        <div className='Birthday'><b><i className="fa-solid fa-cake-candles"></i></b> {user.birthday}</div>
                        <div className='Email'>{user.email}</div>
                        <span className='btn'>
                            <button onClick={()=>onUserEdit(user)} className={'Btn_L'}>Edit</button>
                            <button onClick={() => deleteUser(user.id)} className={'Btn_L'}><i className="fa-solid fa-trash"></i></button>
                        </span>
                    </li>))

                }
            </ul>
        </>
    );
};

export default UserList;