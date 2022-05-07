import React, { useContext, useEffect, useState } from "react";
import { getUser } from "../adapters/profile";
import { AddAddress, AddAdvertisement } from "../components/Addresses/Add";
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
                                    <button className="btn btn-outline-primary mx-2">
                                        <EditIcon />
                                    </button>
                                    <button className="btn btn-outline-danger">
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