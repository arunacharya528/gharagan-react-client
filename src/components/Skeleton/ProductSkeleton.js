import { StarIcon } from "../../icons";

export const ProductSkeleton = () => {
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