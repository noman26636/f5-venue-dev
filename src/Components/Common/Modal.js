import React from 'react';
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
export default function Popup(props) {
    let { text, title, showModal, handleClose, btn1Text, btn1Click, btn2Text } = props;
    return (
        <Modal isOpen={showModal} onHide={handleClose} backdrop="static" keyboard={false} className="info-modal">
            {title && <ModalHeader closeButton>
                {title}
            </ModalHeader>}
            <ModalBody>{text}</ModalBody>
            <ModalFooter>
                {btn2Text && <Button variant="secondary" onClick={handleClose}>
                    {btn2Text}
                </Button>
                }
                <Button type='button' variant="primary" color="primary" onClick={btn1Click}>
                    {btn1Text}
                </Button>
            </ModalFooter>
        </Modal>
        // <>
        //     <button type="button" className="btn btn-primary" data-toggle="modal" data-target="#exampleModal">
        //         Launch demo modal
        //     </button>

        //     <div className="modal fade" id="exampleModal" tabIndex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        //         <div className="modal-dialog" role="document">
        //             <div className="modal-content">
        //                 <div className="modal-header">
        //                     <h5 className="modal-title" id="exampleModalLabel">Modal title</h5>
        //                     <button type="button" className="close" data-dismiss="modal" aria-label="Close">
        //                         <span aria-hidden="true">&times;</span>
        //                     </button>
        //                 </div>
        //                 <div className="modal-body">
        //                     ...
        //                 </div>
        //                 <div className="modal-footer">
        //                     <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
        //                     <button type="button" className="btn btn-primary">Save changes</button>
        //                 </div>
        //             </div>
        //         </div>
        //     </div>
        // </>
    );
}
