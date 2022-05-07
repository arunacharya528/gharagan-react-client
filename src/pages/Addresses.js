import React, { useContext, useEffect, useState } from "react";
import { deleteAddress, getUser } from "../adapters/profile";
import { AddAddress, AddAdvertisement } from "../components/Addresses/Add";
import { EditAddress } from "../components/Addresses/Edit";
import { ModalContext } from "../context/ModalContext";
import { UserContext } from "../context/UserContext";
import { EditIcon, PlusIcon, TrashIcon } from "../icons";

export const Addresses = () => {

    const { user } = useContext(UserContext)
    const [addresses, setAddresses] = useState([]);
    const [isRefreshed, setRefresh] = useState(false)

    useEffect(() => {
        getUser('', user.id, 'addresses')
            .then(response => setAddresses(response.data))
            .catch(error => console.log(error))
    }, [isRefreshed])

    const { setModalData, openModal, closeModal } = useContext(ModalContext)

    const handleAddButtonClick = () => {
        setModalData(
            {
                title: "Add new address",
                body: <AddAddress refresh={() => { setRefresh(!isRefreshed); closeModal(); }} userId={user.id} />
            });
        openModal();
    }
    const handleEditButtonClick = (address) => {
        setModalData(
            {
                title: "Edit address",
                body: <EditAddress refresh={() => { setRefresh(!isRefreshed); closeModal(); }} address={address} />
            });
        openModal();
    }

    const handleDeleteButtonClick = (address) => {
        const confirmDeletion = () => {
            deleteAddress('', address.id)
                .then(response => { closeModal(); setRefresh(!isRefreshed) })
                .catch(error => console.log(error));
        }
        setModalData(
            {
                title: "Delete address",
                body: <>
                    <p>Are you sure you want to delete this address<br /><b>It would be permanently deleted from database</b></p>

                    <button className="btn btn-danger" onClick={e => confirmDeletion()}>Confirm deletion</button>
                </>
            });

        openModal();
    }


    return (
        <>
            <table class="table">
                <thead>
                    <tr>
                        <th scope="col">Address 1</th>
                        <th scope="col">Address 2</th>
                        <th scope="col">City</th>
                        <th scope="col">Telephone</th>
                        <th scope="col">Mobile</th>
                        <th scope="col">Action</th>
                    </tr>
                </thead>
                <tbody>
                    {addresses.map((address, index) =>
                        <tr key={index}>
                            <td>{address.address_line1}</td>
                            <td>{address.address_line2}</td>
                            <td>{address.city}</td>
                            <td>{address.telephone}</td>
                            <td>{address.mobile}</td>
                            <td >
                                <div className="d-flex flex-row flex-no-wrap">
                                    <button className="btn btn-outline-primary btn-sm mx-2" onClick={e => handleEditButtonClick(address)}>
                                        <EditIcon />
                                    </button>
                                    <button className="btn btn-outline-danger btn-sm" onClick={e => handleDeleteButtonClick(address)}>
                                        <TrashIcon />
                                    </button>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>

            <button type="button" className={"btn btn-primary d-flex align-items-center"} style={{ width: "auto" }} onClick={handleAddButtonClick}>
                <PlusIcon style={{ width: "2rem" }} /> Add new address
            </button>
        </>
    );
}