const moment = require('moment')

export const QADetail = ({ item }) => {

    return (
        <>
            <div className="">{item.question}</div>

            {
                item.answer !== null ?
                    <div className="py-3 pl-3 border-l-4 border-secondary">
                        <div className="flex flex-col">
                            <div className="flex flex-row space-x-2">
                                <div className="font-semibold">Replied</div>&emsp;
                                <div className="">{moment(item.updated_at).fromNow()}</div>
                            </div>
                            <div className="">{item.answer}</div>
                        </div>
                    </div>
                    : ''
            }
        </>
    );
}