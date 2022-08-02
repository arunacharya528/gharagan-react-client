import { Link } from "react-router-dom";
import { Loading } from "../../helpers/Loading";
import { ShortProductThumbnail } from "../Thumbnail/ShortProductThumbnail";

export const NavProductContainer = ({ title, products, link, forward }) => {

    
    return (
        <section className="mb-4">
            <div className="flex justify-between py-3">
                <span className="text-xl font-bold">{title}</span>
                <span onClick={e => forward(link)} className="btn btn-sm btn-ghost rounded-full">More</span>
            </div>
            <div className="flex overflow-auto flex-auto space-x-5">
                {products.length === 0 ?
                    <Loading />
                    : products.slice(0, 3).map((product, index) => <ShortProductThumbnail key={index} product={product} width={4} moveForward={link => forward(link)} />)
                }
            </div>
        </section>
    );
}