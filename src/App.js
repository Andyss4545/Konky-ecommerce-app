import './App.css';
import Home from './Components/Home/Home';
import {BrowserRouter, Route, Routes} from "react-router-dom"
import ViewProduct from './Components/ViewProduct/ViewProduct';
import Header from './Components/Header/Header';
import Checkout from './Components/Checkout/Checkout';
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';
import Payment from './Components/Checkout/Payment'
import ForgotPassword from './Components/Login/ForgotPassword';
import { useStateValue } from './StateProvider/StateProvider';
import { auth } from './firebase';
import { useEffect } from 'react';
import AllProducts from "./Components/Pages/AllProducts/AllProducts"

function App() {
  const [{}, dispatch] = useStateValue()

  useEffect(() => {
      auth.onAuthStateChanged((authUser) => {
           console.log('this is the current user', authUser)

           if(authUser) {
               dispatch({
                   type: "USER",
                   user: authUser
               })
           } else{
               dispatch({
                   type: "USER",
                   user: null
               })
           }
      })
  }, [])

  return (
    <BrowserRouter>
       <Routes>
            <Route path='/' exact element={[<Header/>, <Home/>]}/>
            <Route path='/product/:ProductId' element={[<Header/>, <ViewProduct/>]} />
            <Route path='/cart/checkout' element={[<Header/>, <Checkout/>]}/>
            <Route path='/login' element={<Login/>}/>
            <Route path='/register' element={<Register/>}/>
            <Route path='/forgotpassword' element={<ForgotPassword/>}/>
            <Route path='/payment' element={[<Header/>, <Payment/>]}/>
            <Route path='/allproducs' element={[<Header/>, <AllProducts/>]} />

       </Routes>
    </BrowserRouter>
    
  );
}

export default App;
