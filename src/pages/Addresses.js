import React,{ useContext, useEffect, useState } from "react";
import { getUser } from "../adapters/profile";
import { AddAddress, AddAdvertisement } from "../components/Addresses/Add";
import { Modal } from "../components/Modal";
import { UserContext } from "../context/UserContext";
import { EditIcon, PlusIcon, TrashIcon } from "../icons";

export const Addresses = () => {

    const { user } = useContext(UserContext)
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
        getUser('', user.id, 'addresses')
            .then(response => setAddresses(response.data))
            .catch(error => console.log(error))
    }, [])

    const handleAddButtonClick = () => {
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

            {/* <div class="collapse" id="add">
                <div class="card card-body">
                    Some placeholder content for the collapse component. This panel is hidden by default but revealed when the user activates the relevant trigger.
                </div>
            </div> */}


            {/* <SweetAlert title="Here's a message!" onConfirm={this.onConfirm} onCancel={this.onCancel} /> */}
            {/* <Modal
                button={{
                    icon: PlusIcon,
                    value: "Add new address",

                }}
                modal={{
                    title: "Add new Address",
                    body: <AddAdvertisement />,
                    size: ''
                }} /> */}
        </>
    );
}