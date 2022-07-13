import { useContext, useState } from 'react';
import toast from 'react-hot-toast';
import { postQA } from '../../adapters/qa';
import { UserContext } from '../../context/UserContext';
import { ProfileImage } from '../Avatar';
import { QADetail } from '../QADetail';
import { QASkeleton } from '../Skeleton/ProductSkeleton';

const moment = require('moment');
export const QAs = ({ product, onSubmit }) => {

    const { user } = useContext(UserContext);
    const [question, setQuestion] = useState('');

    const handleSubmission = () => {
        toast.promise(
            postQA(user.data.token, {
                user_id: user.id,
                product_id: product.data.id,
                question: question
            })
            , {
                loading: "Posting question",
                success: () => {
                    onSubmit();
                    setQuestion('');
                    return "Question posted"
                },
                error: "Error posting question"
            }
        )
    }
    return (
        <>
            {product.loading ?
                <QASkeleton />
                :
                <div className="grid lg:grid-cols-5 gap-10">
                    {
                        user !== null ?
                            <div className="lg:col-span-2 flex flex-col space-y-5">
                                <div className="font-bold text-2xl px-2">Questions and Answers</div>
                                <textarea class="textarea textarea-primary" rows={10} placeholder="Write your question. Admin would answer shortly." value={question} onChange={e => setQuestion(e.target.value)}></textarea>
                                <button className="btn btn-block btn-primary" onClick={handleSubmission}>Post question</button>
                            </div>
                            :
                            <div className='lg:col-span-2 flex flex-col text-center'>
                                <span className='text-5xl py-10'>( ･_･ )</span>
                                <span>Login to your account to ask questions</span>
                            </div>
                    }

                    <div className="lg:col-span-3 flex flex-col divide-y-2 space-y-5">
                        {product.data.question_answers.map((item, index) =>

                            <div className="flex flex-col pt-5 space-y-5">
                                <div className="flex flex-row space-x-3 items-center">
                                    <ProfileImage name={item.user.name} />
                                    <span className="font-semibold">{item.user.name}</span>
                                    <div className="">{moment(item.created_at).fromNow()}</div>
                                </div>
                                <QADetail item={item} />

                            </div>

                        )}
                    </div>
                </div>
            }

        </>
    )
}