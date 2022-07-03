import React, { useState } from 'react'
import "./style.css";
import { AiFillDelete } from 'react-icons/ai';
import { firestore, storage } from '../../Firebase';


function CommentMenu(props) {
    const [modal, setModal] = useState(false);

    const deleteUnused = async (id) => {
        const unusedComments = await firestore.collection('comments').where("postID", "==", `${id}`).get()
        const batch = firestore.batch();
        unusedComments.forEach(doc => {
            batch.delete(doc.ref);
        });
        await batch.commit();
    }

    

    const openModal = () => {
        setModal(true);
    }

    const closeModal = () => {
        setModal(false);
    }

    const Modal = () => {
        if (!modal) {
            return null
        }

        return (
            <div className="modal-main">
                <div className="modal">
                    <div className="modal-header">
                        <p>Confirmation</p>
                        <p>Do you wanna delete your post?</p>
                    </div>
                    <div className="modal-body">

                    </div>
                    <div className="modal-footer">
                        <button className="confirmbtn" onClick={deleteUnused}>Confirm Delete</button>
                        <button className="cancelbtn " onClick={closeModal}>Cancel</button>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <>
            <AiFillDelete onClick={openModal} className="delete_icon" />
            <Modal />
        </>

    )
}

export default CommentMenu
