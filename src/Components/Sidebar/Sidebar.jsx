import React, { useState, useEffect } from 'react'
import { firestore } from '../../Firebase';
import Sidebaritem from "../Sidebar/Sidebaritem";
import { GridLoader } from "react-spinners";
import { css } from "@emotion/react";
import "./Sidebar.css";

const override = css`
display: block;
margin: 0 auto;
`;
function Sidebar() {
    const [posts, setPosts] = useState([])
    const [likes, setLikes] = useState([])
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        firestore.collection("posts").orderBy('likes', "").onSnapshot((snapshot) => {

            setPosts(snapshot.docs.map((doc) => (
                {
                    id: doc.id, post: doc.data()
                })))
            setLoading(false);
            
        })

        firestore.collection("likes").onSnapshot((snapshot) =>{
          setLikes(snapshot.docs.map((doc)=>(
            {
              id:doc.id
            })))
          })


    }, [])
    return (
      
        <>  {loading ? <><div className="feedloader"><GridLoader color={"#FF5700"} css={override} /></div>
        </> :
            <>
            <p className="p">Hot topic</p>
                {posts.length && likes.postId == posts.id ? <>
                    {posts.map(({ id, post }) => (
                        <Sidebaritem post={post} id={id} key={id}></Sidebaritem>
                    ))}
                </> : <> <div className="blog-item" >
                    <div className="blog-item-content">There Are No Posts To Display</div>
                </div></>}
            </>}

        </>
    )
}

export default Sidebar