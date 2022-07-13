import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { getUser } from "../adapters/profile";
import { deleteQA } from "../adapters/qa";
import { QADetail } from "../components/QADetail";
import { UserContext } from "../context/UserContext";
const moment = require('moment')


export const QuestionAnswers = () => {

    const [qas, setQAS] = useState([]);
    const { user } = useContext(UserContext)
    const [isRefreshed, setRefresh] = useState(false);

    useEffect(() => {
        getUser(user.data.token, "questionAnswers")
            .then(reponse => setQAS(reponse.data))
            .catch(error => console.log(error))
    }, [isRefreshed])

    const handleDeletion = (id) => {
        toast.promise(
            deleteQA(user.data.token, id)
            ,
            {
                loading: "Deleting QA instance",
                success: () => {
                    setRefresh(!isRefreshed);
                    return "Successfully deleted QA instance"
                },
                error: "Error deleting QA instance"
            }
        )
    }
    return (
        <div className="flex flex-col divide-y divide-gray-500">
            {qas.map((item) =>
                <div className="flex flex-col py-8 space-y-3">
                    <div className="flex flex-row space-x-3">
                        <Link to={"/product/" + item.product.id} className="font-bold">{item.product.name}</Link>
                        <span>{moment(item.created_at).fromNow()}</span>
                    </div>
                    <QADetail item={item} />
                    <div>
                        <button className="btn btn-error btn-sm btn-outline" onClick={e => handleDeletion(item.id)}>Delete</button>
                    </div>
                </div>
            )}
        </div>
    );
}