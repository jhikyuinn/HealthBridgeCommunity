import React, { useState, useEffect } from 'react'
import { firestore } from '../../Firebase';
import Commentitem from "../Comment/Commentitem";
import { GridLoader } from "react-spinners";
import { css } from "@emotion/react";
import "./style.css";

const override = css`
display: block;
margin: 0 auto;
`;

function Comment(props) {
  const [comments, setComments] = useState([]);
  const [loading, setLoading] = useState(true);
  


  useEffect(() => {

    firestore.collection("comments").orderBy('timestamp', "desc").onSnapshot((snapshot) => {
      setComments(snapshot.docs.map((doc) => (
          {
              content: doc.postID, id: doc.id, comment: doc.data()
          })))
      setLoading(false);

  })

}, [])
  return (
    <>  {loading ? <><div className="feedloader"><GridLoader color={"#FF5700"} css={override} /></div>
    </> :
        <>
            {comments.length ? <>
                {comments.map(({ content, id, comment }) => (
                    <Commentitem content={content} comment={comment} id={id} key={id}></Commentitem>
                ))}
            </> : <> <div className="blog-item" >
                <div className="blog-item-content">There Are No Posts To Display</div>
            </div></>}
        </>}

    </>
);
}
export default Comment;
