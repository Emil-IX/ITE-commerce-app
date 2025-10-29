import { useState } from "react";
import { useShop } from "../context/ShopContextProvider";
import { XCircle } from "lucide-react";

function CategoryCarrusel() {

    const { selectCategory } = useShop()

    const [xButton, setxButton] = useState(false)

    const categories = [
        "Component", "Peripherals", "Storage", "Networking",
        "Audio&Video", "Smartphones", "Software", "Gaming",
        "Accessories", "Laptops"
    ];


    const addCategories = (category) => {
        selectCategory(category)
        setxButton(true)
    }

    const removeCatevories = () => {
        selectCategory(null)
        setxButton(false)
    }



    return (
        <>
            <div className="carrusel-container">
                <div className="carrusel-track">

                    {categories.map((category, index) => (
                        <div key={`first-${index}`}
                            className="categories"
                            onClick={() => addCategories(category)}
                        >
                            {category}
                        </div>

                    ))}

                    {categories.map((category, index) => (
                        <div
                            key={`second-${index}`}
                            className="categories"
                            onClick={() => addCategories(category)}
                        >
                            {category}
                        </div>
                    ))}

                </div>
            </div>
            {xButton && <div className="removeContainer">
                <XCircle
                    key={`reset-filter`}
                    className="reset-button"
                    onClick={() => removeCatevories()}
                >
                </XCircle>
            </div>

            }
        </>
    )
}

export default CategoryCarrusel