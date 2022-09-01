import { Link } from "react-router-dom";
import { Loading } from "../../helpers/Loading";
import { ShortProductThumbnail } from "../Thumbnail/ShortProductThumbnail";

export const NavProductContainer = ({ title, products, link, forward }) => {


    return (
        <>
            {
                products.length === 0 ?
                    <div className="flex flex-col items-center justify-center py-10">
                        <span className="text-5xl font-semibold py-5">O.O</span>
                        No {title} available
                    </div>
                    :
                    <section className="">
                        <div className="flex justify-between py-3">
                            <span className="text-xl font-bold">{title}</span>
                            <span onClick={e => forward(link)} className="btn btn-sm btn-ghost rounded-full">More</span>
                        </div>
                        <div className="grid md:grid-cols-3 gap-5">
                            {
                                products.slice(0, 3).map((product, index) => <ShortProductThumbnail key={index} product={product} width={4} moveForward={link => forward(link)} />)
                            }
                        </div>
                    </section>

            }
        </>

    );
}