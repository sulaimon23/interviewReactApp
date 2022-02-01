import './App.css';
import { AddUser } from './component/user/AddUser';
import { UserList } from './component/user/UserList';
import { User } from './component/user/index'
import { EditUser } from './component/user/EditUser';
import { Routes, Route } from 'react-router-dom'

function App() {
    return (
        <User >
            <Routes>
                <Route path="/" element={<UserList />}></Route>
                <Route path="*" exact={true} element={<UserList />}></Route>
                <Route path="/add" element={<AddUser />}></Route>
                <Route path="/user/:id" element={<EditUser />}></Route>
            </Routes>
        </User>
    );
}

export default App;
