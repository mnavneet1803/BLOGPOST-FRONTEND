import React from 'react';
import './App.css';
import NewNavbar from './components/NewNavbar';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from './components/Home';
import PostForm from "./components/PostForm";
import UpdatePostForm from './components/UpdatePostForm';
import PostById from './components/PostById';
import ContactUs from './components/ContactUs';
import SignUp from './components/Signup';
import SignIn from './components/Signin';
import SignOut from './components/Signout';
import { AuthProvider } from './components/AuthContext';

function App() {
  return (
    <div className="App">
      <AuthProvider>
        <BrowserRouter>
          <NewNavbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/blog/create/post" element={<PostForm />} />
            <Route path="/blog/:id" element={<PostById />} />
            <Route path="/blog/update/post/:id" element={<UpdatePostForm />} />
            <Route path="/blog/contact/us" element={<ContactUs />} />
            <Route path="/blog/signup/user" element={<SignUp />} />
            <Route path="/blog/signin/user" element={<SignIn />} />
            <Route path="/blog/signout/user" element={<SignOut />} />
          </Routes>
        </BrowserRouter>
      </AuthProvider>
    </div>
  );
}

export default App;
