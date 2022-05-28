import { QASkeleton } from '../Skeleton/ProductSkeleton';

const moment = require('moment');
export const QAs = ({ product }) => {


    return (
        <>
            {product.loading ?
                <QASkeleton />
                :
                <div className="grid lg:grid-cols-5 gap-10">
                    <div className="lg:col-span-2 flex flex-col space-y-5">
                        <div className="font-bold text-2xl px-2">Questions and Answers</div>
                        <textarea class="textarea textarea-primary" rows={10} placeholder="Write your question. Admin would answer shortly."></textarea>
                        <button className="btn btn-block btn-primary">Post question</button>
                    </div>
                    <div className="lg:col-span-3 flex flex-col divide-y-2 space-y-5">
                        {product.data.questions.map((question, index) =>

                            <div className="flex flex-col pt-5 space-y-5">
                                <div className="flex flex-row space-x-3 items-center">
                                    <img src={`https://ui-avatars.com/api/?background=0D8ABC&color=fff&name=${question.user.first_name}%20${question.user.last_name}&size=200`} className="rounded-full w-10 h-10" />
                                    <span className="font-semibold">{question.user.first_name + " " + question.user.last_name}</span>
                                    <div className="">{moment(question.created_at).fromNow()}</div>
                                </div>
                                <div className="">{question.query}</div>

                                {question.answers.map((answer, index) =>
                                    <div className="mx-4 py-3" key={index}>

                                        <div className="flex flex-col">
                                            <div className="flex flex-row space-x-3">
                                                <div className="font-semibold">By Seller</div>&emsp;
                                                <div className="">{moment(answer.created_at).fromNow()}</div>
                                            </div>
                                            <div className="">{answer.query}</div>
                                        </div>

                                    </div>

                                )}

                            </div>

                        )}
                    </div>
                </div>
            }

        </>
    )
}