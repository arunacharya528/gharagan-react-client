import { useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { CategoryContext } from "../../context/CategoryContext";
import { CategoryListSkeletion } from "../Skeleton/CategorySkeleton";
const queryString = require('query-string')

export const CategoryMenu = () => {

    const location = useLocation();
    const parsedData = queryString.parse(location.search);

    const { categories } = useContext(CategoryContext)
    const navigate = useNavigate();

    return (
        <>
            {categories.loading ?
                <CategoryListSkeletion />
                :
                categories.data.map((category, index) =>
                    <li class={""} onClick={e => {
                        navigate("?selectedCategory=" + category.id)
                    }} key={index} className={"capitalize "}>
                        <a className={(parsedData.selectedCategory === '' + category.id ? 'active' : '')}>{category.name}</a>
                    </li>
                )

            }


        </>

    );
}