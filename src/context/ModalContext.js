import React, { createContext, useState } from "react"

export const ModalContext = createContext();

export const ModalProvider = ({ children }) => {

    const [modalData, setModalData] = useState({ title: null, body: null, size: null });
    const [isModalOpen, setIsModalOpen] = useState(false)

    function openModal() {
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false)
    }

    return <ModalContext.Provider value={{ setModalData, openModal, closeModal }}>
        <div class={"modal fade " + (isModalOpen ? "show" : '')} id="modal" tabIndex="-1" style={{ display: isModalOpen ? 'block' : 'none' }} aria-modal="true" role="dialog">
            <div class={"modal-dialog modal-dialog-centered modal-dialog-scrollable " + modalData.size}>
                <div class="modal-content">
                    <div class="modal-header">
                        <h5 class="modal-title" id="exampleModalLabel">{modalData.title}</h5>
                        <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={e=>closeModal()}></button>
                    </div>
                    <div class="modal-body">
                        {modalData.body}
                    </div>
                </div>
            </div>
        </div>
        {children}
    </ModalContext.Provider>
}