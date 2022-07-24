import React from 'react';
import { Button, Modal, ModalFooter, ModalHeader, ModalBody } from "reactstrap";
export default function Popup(props) {
    let { text, title, showModal, handleClose, btn1Text, btn1Click, btn2Text } = props;
    return (
        <Modal isOpen={showModal} onClosed={handleClose} backdrop="static" keyboard={false} className="info-modal" centered>
            {title && <ModalHeader closeButton>
                {title}
            </ModalHeader>}
            <ModalBody>{text}</ModalBody>
            <ModalFooter>
                {btn2Text && <Button variant="secondary" onClick={handleClose}>
                    {btn2Text}
                </Button>
                }
                <Button type='button' variant="primary" color="primary" onClick={btn1Click} >
                    {btn1Text}
                </Button>
            </ModalFooter>
        </Modal>
    );
}
