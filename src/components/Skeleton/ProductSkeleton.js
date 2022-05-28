export const ProductThumbnailSkeleton = () => {
    return (
        <div class="shadow w-full mx-auto rounded-xl bg-base-200">
            <div class="animate-pulse flex flex-col">
                <div class="bg-base-300 h-48 w-full rounded-t-xl"></div>
                <div class="flex-1 space-y-3 p-5">
                    <div class="h-2 bg-base-300 rounded w-1/2"></div>
                    <div class="h-4 bg-base-300 rounded"></div>
                    <div class="h-2 bg-base-300 rounded w-1/2"></div>
                    <div class="h-4 bg-base-300 rounded w-1/2"></div>
                </div>
            </div>
        </div>
    );
}

export const GeneralInfoSkeleton = () => {
    return (
        <div class="w-full mx-auto rounded-xl bg-base-200">
            <div class="animate-pulse grid md:grid-cols-2 gap-5">
                <div class="flex flex-row space-x-3">
                    <div className="flex flex-col space-y-3">
                        <div className="bg-base-300 h-24 w-36 rounded-xl" />
                        <div className="bg-base-300 h-24 w-36 rounded-xl" />
                        <div className="bg-base-300 h-24 w-36 rounded-xl" />
                    </div>
                    <div className="grow bg-base-300 h-80 rounded-xl">

                    </div>
                </div>
                <div class="space-y-5">
                    <div class="h-8 bg-base-300 rounded w-1/2"></div>
                    <div class="h-4 bg-base-300 rounded w-1/4"></div>

                    <div className="flex justify-between items-center">
                        <div className="flex flex-col space-y-2">
                            <div class="h-4 w-20 bg-base-300 rounded"></div>
                            <div class="h-4 w-20 bg-base-300 rounded"></div>
                        </div>
                        <div class="h-6 w-16 bg-base-300 rounded-full"></div>
                    </div>
                    <div className="flex flex-row flex-wrap space-x-2">
                        <div class="h-4 w-11 bg-base-300 rounded"></div>
                        <div class="h-4 w-20 bg-base-300 rounded"></div>
                        <div class="h-4 w-24 bg-base-300 rounded"></div>
                        <div class="h-4 w-14 bg-base-300 rounded"></div>
                        <div class="h-4 w-16 bg-base-300 rounded"></div>
                        <div class="h-4 w-12 bg-base-300 rounded"></div>
                        <div class="h-4 w-28 bg-base-300 rounded"></div>
                        <div class="h-4 w-13 bg-base-300 rounded"></div>

                    </div>
                    <div className="flex flex-row space-x-2">
                        <div class="h-10 grow bg-base-300 rounded"></div>
                        <div class="h-10 w-12 bg-base-300 rounded"></div>
                    </div>

                    <div class="h-2 bg-base-300 rounded"></div>
                    <div class="h-2 bg-base-300 rounded w-11/12"></div>
                    <div class="h-2 bg-base-300 rounded"></div>

                </div>
            </div>
        </div>
    )
}

export const SpecificationSkeleton = () => {


    return (
        <div class="w-full mx-auto rounded-xl bg-base-200">
            <div class="animate-pulse flex flex-col space-y-5">
                <div class="h-2 bg-base-300 rounded"></div>
                <div class="h-2 bg-base-300 rounded w-11/12"></div>
                <div class="h-2 bg-base-300 rounded"></div>
                <div class="h-2 bg-base-300 rounded w-11/12"></div>
                <div class="h-2 bg-base-300 rounded"></div>
                <div class="h-2 bg-base-300 rounded w-5/6"></div>
                <div class="h-2 bg-base-300 rounded w-1/2"></div>
            </div>
        </div>
    );
}

export const ReviewsSkeleton = () => {
    return (
        <div class="w-full mx-auto rounded-xl bg-base-200">
            <div class="animate-pulse grid lg:grid-cols-5 gap-20">

                <div className="lg:col-span-2 flex flex-col space-y-5">

                    <div className="flex flex-row flex-nowrap space-x-2">
                        <div class="h-3 w-8 bg-base-300 rounded "></div>
                        <div class="h-3 w-28 bg-base-300 rounded "></div>
                        <div class="h-3 w-36 bg-base-300 rounded "></div>
                    </div>

                    {Array(5).fill({}).map(() =>
                        <div className="flex flex-row flex-nowrap space-x-2">
                            <div class="h-3 w-8 bg-base-300 rounded "></div>
                            <div class="h-3 bg-base-300 rounded-full grow"></div>
                            <div class="h-3 w-8 bg-base-300 rounded "></div>
                        </div>
                    )}

                </div>

                <div className="lg:col-span-3 space-y-10">

                    {Array(3).fill({}).map(() =>
                        <div className="flex flex-col pb-10 space-y-5">
                            <div class="flex flex-row items-center space-x-2">
                                <div className="h-10 w-10 rounded-full bg-base-300"></div>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex flex-row space-x-2">
                                        <div className="h-5 w-24 bg-base-300 rounded"></div>
                                        <div className="h-5 w-24 bg-base-300 rounded"></div>
                                    </div>
                                    <div className="h-5 w-32 bg-base-300 rounded"></div>
                                </div>
                            </div>
                            <div className="flex flex-col space-y-5">
                                <div class="h-2 bg-base-300 rounded"></div>
                                <div class="h-2 bg-base-300 rounded"></div>
                                <div class="h-2 bg-base-300 rounded w-11/12"></div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );

}


export const QASkeleton = () => {


    return (
        <div class="w-full mx-auto rounded-xl bg-base-200">
            <div class="animate-pulse grid lg:grid-cols-5 gap-10">
                <div className="lg:col-span-2 flex flex-col space-y-5">
                    <div className="h-5 w-64 bg-base-300 rounded"></div>
                    <div className="h-64 bg-base-300 rounded"></div>
                    <div className="h-10 bg-base-300 rounded"></div>
                </div>
                <div className="lg:col-span-3 flex flex-col space-y-5">
                    {Array(2).fill({}).map(() =>
                        <div className="flex flex-col pb-10 space-y-5">
                            <div class="flex flex-row items-center space-x-2">
                                <div className="h-10 w-10 rounded-full bg-base-300"></div>
                                <div className="flex flex-col space-y-3">
                                    <div className="flex flex-row space-x-2">
                                        <div className="h-5 w-24 bg-base-300 rounded"></div>
                                        <div className="h-5 w-24 bg-base-300 rounded"></div>
                                    </div>
                                    
                                </div>
                            </div>
                            <div className="flex flex-col space-y-5">
                                <div class="h-2 bg-base-300 rounded"></div>
                                <div class="h-2 bg-base-300 rounded w-11/12"></div>
                            </div>

                            <div className="ml-8 py-3 flex flex-col pb-10 space-y-5">
                                <div class="flex flex-row items-center space-x-2">
                                    <div className="h-10 w-10 rounded-full bg-base-300"></div>
                                    <div className="flex flex-col space-y-3">
                                        <div className="flex flex-row space-x-2">
                                            <div className="h-5 w-24 bg-base-300 rounded"></div>
                                            <div className="h-5 w-24 bg-base-300 rounded"></div>
                                        </div>

                                    </div>
                                </div>
                                <div className="flex flex-col space-y-5">
                                    <div class="h-2 bg-base-300 rounded"></div>
                                    <div class="h-2 bg-base-300 rounded w-11/12"></div>
                                </div>
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}