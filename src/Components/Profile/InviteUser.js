import React from 'react';
import { Modal, ModalHeader, ModalBody } from "reactstrap";
import TextField from '../Common/TextField';
import { useSelector } from 'react-redux';
import Button from '../Common/Button';

export default function InviteUser(props) {
    const appState = useSelector((state) => {
        return state.app;
    });
    const { userLanguageData } = appState;
    const translations = userLanguageData.translations;
    let { showModal, email, inviteUser, handleClose, handleInputChange } = props;
    return (
        <Modal isOpen={showModal} onClosed={handleClose} backdrop="static" keyboard={false} className="invitation-modal" centered>
            <ModalHeader toggle={handleClose}>
                {translations.SendInvitation}
            </ModalHeader>
            <ModalBody>
                <div className='helping-text'>  {translations.SendInvitationDesc}</div>
                <div className='invite-block'>
                    <TextField name="invitationEmail"
                        label={translations.NewUserEmail + " *"}
                        type="email"
                        onChange={(e) => { handleInputChange(e, null) }}
                        value={email}
                        className="text-field-2"
                    />
                    <Button label={translations.SendInvitation} onClick={inviteUser} className={`small-btn`} disabled={!email || email === "" || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(email)} />
                </div>
            </ModalBody>
        </Modal>
    );
}
