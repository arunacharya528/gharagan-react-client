import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../../context/CategoryContext";
import { CategoryListSkeletion } from "../Skeleton/CategorySkeleton";

export const CategoryMenu = () => {

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
                    }} key={index}>
                        <a>{category.name}</a>
                    </li>
                )

            }


        </>

    );
}