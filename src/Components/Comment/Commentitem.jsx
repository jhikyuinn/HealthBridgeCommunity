import React, { useState, useEffect } from "react";
import { useAuth } from "../../context/AuthContext";
import { firestore } from '../../Firebase';
import SubComment from "../SubMenu/Subcomment";
import './style.css'
const Commentitem = ({ comment, id }) => {
    const { currentUser } = useAuth();  
    const [posts,setPosts] = useState([]);
    console.log(posts.id);

    useEffect(() => {
        firestore.collection("posts").onSnapshot((snapshot) => {

            setPosts(snapshot.docs.map((doc) => (
                {
                    id: doc.id
                })))
            
        })
    }, [])

  return (
    <>
      <div className="blog-item" key={id}>
        <div className="blog-item-header">
          <div className="blog-user">
            <div className="blog-user-detail">
              Posted By:
              {currentUser ? (
                <>
                  {currentUser.uid === comment.uid ? (
                    <>
                    <p className="blog-username">{comment.displayName}</p>
                    <img className="userPic" src={comment.displayPic} alt=""></img>

                    <h3 className="blog-item-content">{comment.comment}</h3>
                    <div className="comment_right">
                    <p className="blogtime">
                    {comment.timestamp ? (
                      <>{comment.timestamp.toDate().toLocaleDateString()} {comment.timestamp.toDate().toLocaleTimeString('en-US')}</>
                    ) : (
                      <></>
                    )}
                    </p>

                    <div className="blog-user-menu">
                    <SubComment docid={id} comment={comment} />
                    </div>
                    </div>

                    </>

              ) : (
                <>
                      <p className="blog-username">{comment.displayName}</p>
                      <img className="userPic" src={comment.displayPic} alt=""></img>
                      <h3 className="blog-item-content">{comment.comment}</h3>
                        
                      <p className="blogtime">
                      {comment.timestamp ? (
                        <>{comment.timestamp.toDate().toLocaleDateString()} {comment.timestamp.toDate().toLocaleTimeString('en-US')}</>
                      ) : (
                        <></>
                      )}
                      </p>
                </>
                  )}
              </>
              ) : (
                <></>
              )}
              </div>
              </div>
              </div>
              </div>
              </>

    );
  }

export default Commentitem;
