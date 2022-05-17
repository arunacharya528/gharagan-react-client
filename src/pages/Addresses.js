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

                    <button className="btn btn-error" onClick={e => confirmDeletion()}>Confirm deletion</button>
                </>
            });

        openModal();
    }


    return (
        <>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-5">
                {addresses.map((address, index) =>

                    <div class="card hover:shadow-xl bg-base-200 ease-in-out duration-300" key={index}>
                        <div class="card-body flex flex-col">
                            <h2 class="card-title">{address.city}</h2>
                            <div className="flex flex-col grow">
                                <span>{address.address_line1}</span>
                                <span>{address.address_line2}</span>
                                <span>{address.delivery.region}</span>
                                <span>{address.telephone}</span>
                                <span>{address.mobile}</span>

                                <span className="text-right font-semibold">Delivery charge: Rs.{address.delivery.price}</span>
                            </div>
                            <div class="card-actions justify-end">
                                <div className="flex flex-row">
                                    <div className="tooltip" data-tip="Edit">
                                        <button className="btn btn-sm mx-1 btn-secondary btn-square" onClick={e => handleEditButtonClick(address)}>
                                            <EditIcon />
                                        </button>
                                    </div>
                                    <div className="tooltip" data-tip="Delete">
                                        <button className="btn btn-sm mx-1 btn-error btn-square" onClick={e => handleDeleteButtonClick(address)}>
                                            <TrashIcon />
                                        </button>
                                    </div>

                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>

                <button className="btn gap-2 btn-primary mt-4" onClick={handleAddButtonClick}>
                    <PlusIcon className="w-6 h-6" />
                    Add new Address
                </button>
        </>
    );
}