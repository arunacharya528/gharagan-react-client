import React, { createContext, useEffect, useState } from "react"

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
        <div class={"modal pointer-events-auto pb-2 " + (isModalOpen ? "visible opacity-100" : "invisible")}>
            <div class={"modal-box relative " + modalData.size}>
                <button class="btn btn-sm btn-circle absolute right-2 top-2" onClick={e => setIsModalOpen(false)}>✕</button>
                <h3 class="font-bold text-lg">{modalData.title}</h3>
                <div className="py-4">{modalData.body}</div>
            </div>
        </div>
        {children}
    </ModalContext.Provider>
}