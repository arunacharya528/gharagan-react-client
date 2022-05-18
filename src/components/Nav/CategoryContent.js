import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CategoryContext } from "../../context/CategoryContext";

export const CategoryMenu = ({ selectedTab, setSelectedTab, handleCategorySelection }) => {

    const { categories } = useContext(CategoryContext)
    const navigate = useNavigate();

    return (
        <>
            {categories.map((category, index) =>
                <li class={""} onClick={e => {
                    // setSelectedTab(category.id);
                    // handleCategorySelection(category)
                    navigate("?selectedCategory=" + category.id)
                }} key={index}>
                    <a className={(selectedTab === category.id ? 'active' : '')}>{category.name}</a>
                </li>
            )}
        </>

    );
}