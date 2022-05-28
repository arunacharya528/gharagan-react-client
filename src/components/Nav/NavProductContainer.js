import { Link } from "react-router-dom";
import { Loading } from "../../helpers/Loading";
import { ShortProductThumbnail } from "../Product/ShortProductThumbnail";

export const NavProductContainer = ({ title, products, link, forward }) => {

    console.log(products);
    return (
        <section className="mb-4">
            <div className="flex justify-between py-3">
                <span className="text-xl font-bold">{title}</span>
                <span onClick={e => forward(link)} className="btn btn-sm btn-ghost rounded-full">More</span>
            </div>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-5 items-stretch">
                {products.length === 0 ?
                    <Loading />
                    : products.slice(0, 5).map((product, index) => <ShortProductThumbnail key={index} product={product} width={4} moveForward={link => forward(link)} />)
                }
            </div>
        </section>
    );
}