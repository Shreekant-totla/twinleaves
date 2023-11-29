// ProductDetail.jsx
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import img1 from "../assets/img1.webp";

const ProductDetail = () => {
  const { hsCode, currentPage } = useParams();
  const [productDetails, setProductDetails] = useState(null);

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products?page=${currentPage}`
        );

        // Find the product in the list that matches the hsCode
        const product = response.data.products.find(
          (product) => product.hs_code === hsCode
        );

        if (product) {
          setProductDetails(product);
        } else {
          console.error("Product not found or hsCode does not match");
        }
      } catch (error) {
        console.error("Error fetching product details:", error);
      }
    };

    fetchProductDetails();
  }, [hsCode, currentPage]);

  if (!productDetails) {
    return <div className="text-center mt-8">Loading...</div>;
  }

  // Destructure product details for easier access
  const {
    brand,
    name,
    description,
    main_category,
    category_level_1,
    category_level_2,
    weights_and_measures,
    dimensions,
    mrp,
    hs_code,
    attributes,
  } = productDetails;

  return (
    <div className="flex max-w-3xl mx-auto mt-8 p-6 bg-white shadow-md rounded-md">
      <div className="mt-8">
        <img src={img1} alt="Product Image" className="w-full h-auto" />
      </div>
      <div>
        <h1 className="text-3xl font-bold mb-4">{name}</h1>
        <p className="mb-4">
          <span className="font-bold">Brand:</span> {brand}
        </p>
        <p className="mb-4">
          <span className="font-bold">Description:</span> {description}
        </p>
        <p className="mb-4">
          <span className="font-bold">Main Category:</span> {main_category}
        </p>
        <p className="mb-4">
          <span className="font-bold">Category Level 1:</span>{" "}
          {category_level_1}
        </p>
        <p className="mb-4">
          <span className="font-bold">Category Level 2:</span>{" "}
          {category_level_2}
        </p>
        <p className="mb-4">
          <span className="font-bold">Net Weight:</span>{" "}
          {weights_and_measures.net_weight}{" "}
          {weights_and_measures.measurement_unit}
        </p>
        <p className="mb-4">
          <span className="font-bold">Dimensions:</span> {dimensions.height} x{" "}
          {dimensions.width} x {dimensions.depth}
        </p>
        <p className="mb-4">
          <span className="font-bold">MRP:</span> {mrp.mrp} {mrp.currency}
        </p>
        <p className="mb-4">
          <span className="font-bold">HS Code:</span> {hs_code}
        </p>
        <p className="mb-4">
          <span className="font-bold">Food Type:</span> {attributes.food_type}
        </p>
      </div>
      {/* Add more details as needed */}
    </div>
  );
};

export default ProductDetail;
