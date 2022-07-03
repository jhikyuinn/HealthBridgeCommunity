import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthContext";

import Signin from "../Authentication/Signin";
import { useState } from "react";
import { AiFillLike } from "react-icons/ai";
import { BiCommentDetail } from "react-icons/bi";
import { firestore } from "../../Firebase";
import { Link } from "react-router-dom";
const Sidebaritem = ({ post, id }) => {
  const { currentUser } = useAuth();
  const [view, setView] = useState(false);
  const [likes, setLikes] = useState(0);
  const [docID, setDOCID] = useState("");
  const [liked, setLiked] = useState(false);
 

  const handleLike = () => {
    if (liked === false) {
      // console.log("liking");
      firestore.collection("likes").add({
        postId: id,
        user: currentUser.uid,
      });
      setLiked(true);
    } else {
      if (docID) {
        firestore.collection("likes").doc(docID).delete();
        // console.log("disliked")
        setDOCID("");
        setLiked(false);
      }
    }
  };

  useEffect(() => {
    let componentMounted = true;
    const getLikeDocs = async () => {
      await firestore
        .collection("likes")
        .where("postId", "==", `${id}`)
        .onSnapshot((snapshot) => {
          if (componentMounted) {
            
            setLikes(snapshot.docs.length);
          }
        });
    };

    const checkLiked = async () => {
      if (currentUser) {
        await firestore
          .collection("likes")
          .where("user", "==", `${currentUser.uid}`)
          .where("postId", "==", `${id}`)
          .onSnapshot((snapshot) => {
            if (snapshot.docs.length === 1) {
              if (componentMounted) {
                setLiked(true);
                setDOCID(snapshot.docs[0].id);
              }
            } else {
              if (componentMounted) {
                setDOCID("");
                setLiked(false);
              }
            }
          });
      }
    };

    checkLiked();
    getLikeDocs();
    return () => {
      componentMounted = false;
    };
  },);

  return (
    <>
      <div className="blog-item" key={id}>
      <>
      {post?(
          <>
        <div className="blog-item-header">
          <h3>{post.caption}</h3>
        </div>
        <p className="blogtime">
            {post.timestamp ? (
              <>{post.timestamp.toDate().toLocaleDateString()} {post.timestamp.toDate().toLocaleTimeString('en-US')}</>
            ) : (
              <></>
            )}
        </p>

        <div className="post-menu">
          {currentUser ? (
            <div className="viewpostbtns" onClick={handleLike}>
              <AiFillLike className={liked ? "likedbtn" : "likebtn"} /> {likes}
            </div>
          ) : (
            <div className="viewpostbtns">
              <AiFillLike className={liked ? "likedbtn" : "likebtn"} /> {likes}
            </div>
          )}
          </div>
          </>
        ):(
            <></>
        )}
    </>
    </div>
    </>
  );
};

export default Sidebaritem;
