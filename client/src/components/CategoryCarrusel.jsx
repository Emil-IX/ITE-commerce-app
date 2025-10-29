

function CategoryCarrusel() {

    const categories = [
        "PC Components", "Peripherals", "Storage", "Networking",
        "Audio&Video", "Smartphones", "Software", "Gaming",
        "Accessories", "Laptops"
    ];

    return (
        <>
            <div className="carrusel-container">
                <div className="carrusel-track">
                    {categories.map((category, index) => (
                    <div key={`first-${index}`} className="categories">{category}</div>
                    ))}

                    {categories.map((category, index) => (
                    <div key={`second-${index}`} className="categories">{category}</div>
                    ))}
                   
                </div>
            </div>
        </>
    )
}

export default CategoryCarrusel