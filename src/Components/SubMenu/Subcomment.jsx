import React, { useState } from 'react'
import "./SubMenu.css";
import { AiFillDelete } from 'react-icons/ai';
import { firestore } from '../../Firebase';


function Subcomment(props) {
    const [modal, setModal] = useState(false);
    const deleteComment = () => {
        firestore.collection("comments").doc(props.docid).delete();
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
                        <p>Do you wanna delete your comment?</p>
                    </div>
                    <div className="modal-body">

                    </div>
                    <div className="modal-footer">
                        <button className="confirmbtn" onClick={deleteComment}>Confirm Delete</button>
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

export default Subcomment
