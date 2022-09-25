import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import './App.css'
import UserForm from './assets/components/UserForm'
import UserList from './assets/components/UserList'
import axios from 'axios'
import './assets/components/UserFCss.css'
import './assets/components/UserLCss.css'

function App() {

  const [ users, setUsers ] = useState([])
  const [ userSelected, setUserSelected ] = useState(null)
  const [ showModaleF, setShowModaleF ] = useState(false)

  useEffect(() => {
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res => {setUsers(res.data)} );
  }, [])

  const getUsers = () => {
    axios.get('https://users-crud1.herokuapp.com/users/')
      .then(res => setUsers(res.data));
  }

  const deleteUser = (id) =>{
    axios.delete(`https://users-crud1.herokuapp.com/users/${id}/`)
    .then(res => getUsers());
  }


  const selectUser = (user) => {
    setUserSelected(user)
  }

  const deselectUser = () => setUserSelected(null);
  const newUser = ()=>{
    setShowModaleF(true)
    //TODO: delete data of currentUser:useState
  }

  useEffect(()=>{
    console.log(showModaleF)
  },[showModaleF])

  const renderCards  = () =>{
    users?.map(user => (<UserCard
      key={user.id}
      user={user} 
      selectUser={selectUser} 
      deleteUser={deleteUser} 
      showHandler={setShowModaleF}
    />))
  }

   return (
    <div className="App">
      <div className='App-content'>
        <button onClick={newUser} className='btnUser'><i className="fa-solid fa-user-plus"></i>User</button>
        
            {showModaleF && (<UserForm 
            getUsers={getUsers} 
            userSelected={userSelected}
            deselectUser={deselectUser}
            showHandler={setShowModaleF}/>)}
      
        <div className='List'>        
            <UserList 
            deleteUser={deleteUser}
            showHandler={setShowModaleF}
            users={users} 
            selectUser={selectUser}
            getUsers={getUsers} />
        </div>
      </div>
    </div>
  )
}

export default App
