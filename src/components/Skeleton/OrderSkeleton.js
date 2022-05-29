export const OrderThumbnailSkeleton = () => {

    return (
        <div className="bg-base-200 rounded-md shadow-sm">
            <div className="animate-pulse">
                <div className="flex flex-col md:flex-row items-center py-5 px-7 space-y-5 md:space-y-0">

                    <div className="flex flex-col md:flex-row space-y-5 md:space-x-10 md:space-y-0 grow w-full md:w-auto">
                        <div className="flex flex-col space-y-2">
                            <div className="h-5 w-24 bg-base-300 rounded"></div>
                            <div className="h-5 w-20 bg-base-300 rounded"></div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div className="h-5 w-24 bg-base-300 rounded"></div>
                            <div className="h-5 w-20 bg-base-300 rounded"></div>
                        </div>
                        <div className="flex flex-col space-y-2">
                            <div className="h-5 w-24 bg-base-300 rounded"></div>
                            <div className="h-5 w-20 bg-base-300 rounded"></div>
                        </div>

                    </div>
                    <div className="flex flex-col md:flex-row space-y-5 md:space-x-10 md:space-y-0 w-full md:w-auto">
                        <div className="h-8 w-28 bg-base-300 rounded"></div>
                        <div className="h-8 w-28 bg-base-300 rounded"></div>
                    </div>
                </div>

                <div className="h-40 flex flex-col items-center justify-center">
                    <div className="h-3 w-5/6 bg-base-300 rounded" />
                </div>

                <div className="py-5 flex flex-col items-center justify-center">
                    <div className="h-2 w-3/6 bg-base-300 rounded" />
                </div>

            </div>
        </div>

    );
}

export const OrderDetailSkeleton = () => {

    return (
        <div className="">
            <div className="animate-pulse flex flex-col space-y-5">
                <div className="h-8 w-40 bg-base-300 rounded" />
                <div className="flex justify-between">
                    <div className="h-4 w-48 bg-base-300 rounded" />

                    <div className="h-4 w-32 bg-base-300 rounded" />
                </div>

                <div className="flex flex-row items-center space-x-5">
                    <div className="h-40 w-40 rounded bg-base-300"></div>
                    <div className="flex flex-col grow space-y-2 h-40">
                        <div className="w-48 h-4 rounded bg-base-300"></div>
                        <div className="w-40 h-4 rounded bg-base-300"></div>
                        <div className="w-36 h-4 rounded bg-base-300"></div>
                        <div className="grow"></div>
                        <div className="flex justify-between">
                            <div className="w-36 h-4 rounded bg-base-300"></div>
                            <div className="w-36 h-4 rounded bg-base-300"></div>
                        </div>

                    </div>
                </div>
                <div className="flex flex-row items-center space-x-5">
                    <div className="h-40 w-40 rounded bg-base-300"></div>
                    <div className="flex flex-col grow space-y-2 h-40">
                        <div className="w-48 h-4 rounded bg-base-300"></div>
                        <div className="w-40 h-4 rounded bg-base-300"></div>
                        <div className="w-36 h-4 rounded bg-base-300"></div>
                        <div className="grow"></div>
                        <div className="flex justify-between">
                            <div className="w-36 h-4 rounded bg-base-300"></div>
                            <div className="w-36 h-4 rounded bg-base-300"></div>
                        </div>

                    </div>
                </div>

                <div className="bg-base-200 grid md:grid-cols-3 p-5 gap-5">
                    <div className="flex flex-col space-y-5">
                        <div className="h-5 bg-base-300 w-40"></div>
                        <div className="h-4 bg-base-300 w-full rounded"></div>
                        <div className="h-4 bg-base-300 w-full rounded"></div>
                        <div className="h-4 bg-base-300 w-full rounded"></div>
                    </div>

                    <div className="flex flex-col space-y-5">
                        <div className="h-5 bg-base-300 w-40"></div>
                        <div className="h-4 bg-base-300 w-full rounded"></div>
                        <div className="h-4 bg-base-300 w-full rounded"></div>
                        <div className="h-4 bg-base-300 w-full rounded"></div>
                    </div>

                    <div className="flex flex-col space-y-5">
                        <div className="flex justify-between">
                            <div className="h-5 w-24 bg-base-300"></div>
                            <div className="h-5 w-32 bg-base-300"></div>
                        </div>
                        <div className="flex justify-between">
                            <div className="h-5 w-24 bg-base-300"></div>
                            <div className="h-5 w-32 bg-base-300"></div>
                        </div>
                        <div className="flex justify-between">
                            <div className="h-5 w-24 bg-base-300"></div>
                            <div className="h-5 w-32 bg-base-300"></div>
                        </div>
                        <div className="flex justify-between">
                            <div className="h-5 w-24 bg-base-300"></div>
                            <div className="h-5 w-32 bg-base-300"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}