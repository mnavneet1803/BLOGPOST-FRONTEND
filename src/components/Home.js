import React from "react";
import Axios from "axios";
import { useEffect, useState } from 'react';
import Post from './Post'

function Home() {
  const [data1, setData] = useState("")

  const getData = () => {
    return Axios.get("http://localhost:3004/blogs")
      .then((response) => setData(response.data));
  }

  useEffect(() => {
    getData()
  }, []);




  return (
    <>

        <div className='container d-flex flex-wrap'>

      {
        data1 && data1.AllPosts.length > 0 && data1.AllPosts.map((item, index) => (


          <Post key={index} id={item.id} title={item.title} content={item.content} src={item.imageUrl} createdAt={item.createdAt} />
        ))
      }
      </div>
    </>
  );
}

export default Home;
