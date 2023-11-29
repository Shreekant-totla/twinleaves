import React, { useState } from "react";

const SideBar = ({ onSearch, onCategoryChange }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedSubcategories, setSelectedSubcategories] = useState([]);

  const handleSearch = () => {
    // Pass the search query, selected category, and subcategories to the parent component
    onSearch(searchQuery);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setSelectedSubcategories([]); // Reset subcategories when the category changes
    onCategoryChange({ selectedCategory: category, selectedSubcategories: [] });
  };

  const handleSubcategoryChange = (subcategory) => {
    const updatedSubcategories = [...selectedSubcategories];

    if (updatedSubcategories.includes(subcategory)) {
      // Remove subcategory if already selected
      updatedSubcategories.splice(updatedSubcategories.indexOf(subcategory), 1);
    } else {
      // Add subcategory if not selected
      updatedSubcategories.push(subcategory);
    }

    setSelectedSubcategories(updatedSubcategories);
    onCategoryChange({
      selectedCategory,
      selectedSubcategories: updatedSubcategories,
    });
  };

  return (
    <div className="w-5/6 mx-3 mt-5">
      <label>
        <strong>Product Name:</strong>
      </label>
      <input
        type="text"
        placeholder="Search by Product Name"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="border border-blue-800 mt-2 focus:outline-double"
      />
      <button className="bg-blue-300 rounded px-2 ml-1" onClick={handleSearch}>
        Search
      </button>

      {/* Category Dropdown */}
      <div className="mt-3">
        <label>
          <strong>Category:</strong>
        </label>
        <select
          className="border border-blue-500 px-2 py-1 mt-2 focus:outline-none focus:border-blue-800"
          value={selectedCategory}
          onChange={(e) => handleCategoryChange(e.target.value)}
        >
          <option value="">Select a category</option>
          <option value="Foodgrain, Oil & Masala">
            Foodgrain, Oil and Masala
          </option>
          <option value="Cleaning & Household">Cleaning and Household</option>
          <option value="Beverages">Beverages</option>
          <option value="SNACKS & BRANDED FOODS">
            Snacks and Branded Foods
          </option>
        </select>
      </div>

      {/* Subcategory Dropdown */}

      {selectedCategory && (
        <div className="mt-3">
          <label>
            <strong>Subcategory:</strong>
          </label>
          {/* Map through the subcategories based on the selected category */}
          {getSubcategories(selectedCategory).map((subcategory) => (
            <div key={subcategory}>
              <label>
                <input
                  type="checkbox"
                  value={subcategory}
                  onChange={() => handleSubcategoryChange(subcategory)}
                  checked={selectedSubcategories.includes(subcategory)}
                />{" "}
                {subcategory}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SideBar;

//Helper functions
function getSubcategories(category) {
  switch (category) {
    case "Foodgrain, Oil & Masala":
      return [
        "Edible Oil & Ghee",
        "Cooking Coconut Oil",
        "Salt, Sugar & Jaggery",
        "Dals & Pulses",
        "Urad & Other Dals",
        "Cereals & Millets",
        "Masala & Spices",
        "Whole Spices",
      ];
    case "Cleaning & Household":
      return ["Refreshner & Repellements", "Insects & Repellement"];
    case "Beverages":
      return ["Coffee", "Instant Coffee"];
    case "SNACKS & BRANDED FOODS":
      return ["READY TO COOK & EAT", "PAPADS READY TO FRY"];
    default:
      return [];
  }
}
