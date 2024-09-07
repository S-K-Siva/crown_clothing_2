import "./directory.styles.scss";
import CategoryItem from "../categoryItem/categoryItem.component.jsx";
const Directory = ({categories}) => {
    return <div className = "categories-container">
        {
        categories.map((item,idx) => <CategoryItem category={item} key={idx}/>)
        }
    </div>;

};

export default Directory;