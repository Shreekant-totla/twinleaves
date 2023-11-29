import axios from "axios";
import React, { useEffect, useState } from "react";
import img1 from "../assets/img1.webp";
import { DataGrid } from "@mui/x-data-grid";
import SideBar from "./SideBar";
import Pagination from "./Pagination"; // Import the Pagination component
import { useNavigate } from "react-router-dom";

const DataGridItem = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [subCategoryFilteredData, setSubCategoryFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [sortModel, setSortModel] = useState([]);
  const navigate = useNavigate();

  const GroceryAndVegetableData = async () => {
    try {
      const response = await axios.get(
        `https://catalog-management-system-dev-ak3ogf6zea-uc.a.run.app/cms/products?page=${currentPage}`
      );
      setData(response.data.products);
      setFilteredData(response.data.products);
      setTotalPages(response.data.totalPages);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    GroceryAndVegetableData();
  }, [currentPage]);

  const handleRowClick = (params) => {
    // Retrieve the product details based on the selected row
    const selectedProductHsCode = params.row.hscode; // Assuming you have an 'hscode' field
    const selectedProductDetails = data.find(
      (product) => product.hs_code === selectedProductHsCode
    );

    // Redirect to the product detail page with the hs_code as a parameter
    navigate(`/product-detail/${selectedProductHsCode}/${currentPage}`);
  };

  const handleSearch = (searchQuery) => {
    if (searchQuery.trim() === "") {
      setFilteredData(data);
      setSubCategoryFilteredData([]);
    } else {
      const filtered = data.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredData(filtered);
      const subCategoryFiltered = subCategoryFilteredData.filter((item) =>
        item.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSubCategoryFilteredData(subCategoryFiltered);
    }
  };

  const handleCategoryChange = ({
    selectedCategory,
    selectedSubcategories,
  }) => {
    filterData(selectedCategory, selectedSubcategories);
  };

  const filterData = (category, subcategories) => {
    if (subcategories.length === 0) {
      setFilteredData(data);
      setSubCategoryFilteredData([]);
      return;
    }

    let filtered = data;

    if (
      (category === "Foodgrain, Oil & Masala" && subcategories.length > 0) ||
      (category === "Cleaning & Household" && subcategories.length > 0) ||
      (category === "Beverages" && subcategories.length > 0) ||
      (category === "SNACKS & BRANDED FOODS" && subcategories.length > 0)
    ) {
      filtered = filtered.filter(
        (item) =>
          subcategories.includes(item.category_level_2) ||
          subcategories.includes(item.category_level_1)
      );
      setSubCategoryFilteredData(filtered);
    } else {
      setSubCategoryFilteredData([]);
    }

    setFilteredData(filtered);
  };

  const columns = [
    {
      field: "id",
      headerName: "Sr No",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "hscode",
      headerName: "HS Code",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "image",
      headerName: "Image",
      width: 150,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <img
          src={img1}
          alt={`Image ${params.row.id}`}
          style={{ width: 150, height: 150 }}
        />
      ),
    },
    {
      field: "brand",
      headerName: "Brand",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "productname",
      headerName: "Product Name",
      width: 250,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "category",
      headerName: "Category",
      width: 200,
      align: "center",
      headerAlign: "center",
    },
    {
      field: "FoodType",
      headerName: "VEG / NON-VEG",
      width: 100,
      align: "center",
      headerAlign: "center",
      renderCell: (params) => (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {params.value === "VEG" ? (
            <span style={{ color: "green", fontWeight: "bold" }}>&#8226;</span>
          ) : (
            <span style={{ color: "red", fontWeight: "bold" }}>&#8226;</span>
          )}
          {params.value}
        </div>
      ),
    },
    {
      field: "mrp",
      headerName: "MRP",
      width: 100,
      align: "center",
      headerAlign: "center",
    },
  ];

  const calculateCustomId = (row, index) => {
    return row.id !== null ? row.id : (currentPage - 1) * 20 + index + 1;
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  const rows = (
    subCategoryFilteredData.length > 0 ? subCategoryFilteredData : filteredData
  ).map((row, index) => ({
    id: calculateCustomId(row, index),
    hscode: row.hs_code,
    image: (
      <img
        src={img1}
        alt={`Image ${index + 1}`}
        style={{ width: 150, height: 150 }}
      />
    ),
    brand: row.brand,
    productname: row.name,
    category: [row.main_category, row.category_level_1, row.category_level_2],
    FoodType: row.attributes.food_type,
    mrp: row.mrp.mrp,
  }));

  const handleSortModelChange = (newModel) => {
    setSortModel(newModel);
  };

  const sortedData = (
    subCategoryFilteredData.length > 0 ? subCategoryFilteredData : filteredData
  ).slice(); // Create a shallow copy of the array

  if (sortModel.length > 0) {
    const sortField = sortModel[0].field;
    const sortDirection = sortModel[0].sort;

    sortedData.sort((a, b) => {
      const valueA = a[sortField];
      const valueB = b[sortField];

      if (sortDirection === "asc") {
        return valueA - valueB;
      } else {
        return valueB - valueA;
      }
    });
  }

  const customStyles = {
    // Add any custom styles you need
    // For example, adjust font size, padding, etc.
    root: {
      fontSize: "14px",
      padding: "16px",
    },
    header: {
      fontSize: "16px",
    },
  };

  return (
    <div className="flex flex-wrap">
      <div className="w-full lg:w-1/5">
        {/* Adjust width for large screens and full width for small screens */}
        <SideBar
          onSearch={handleSearch}
          onCategoryChange={handleCategoryChange}
        />
      </div>
      <div className="w-full lg:w-4/5 mt-4 lg:mt-0">
        {/* Adjust width for large screens and full width for small screens */}
        <DataGrid
          rows={rows}
          columns={columns}
          pageSize={10}
          rowsPerPageOptions={[10]}
          getRowId={(row) => row.id}
          rowHeight={300}
          hideFooterPagination={true}
          onRowClick={handleRowClick}
          autoHeight
          disableColumnFilter
          disableColumnMenu
          disableColumnSelector
          density="compact"
          checkboxSelection
          sortModel={sortModel}
          onSortModelChange={handleSortModelChange}
          components={{
            Root: ({ style, ...rest }) => (
              <div style={{ ...style, ...customStyles.root }} {...rest} />
            ),
            Header: ({ style, ...rest }) => (
              <div style={{ ...style, ...customStyles.header }} {...rest} />
            ),
          }}
        />
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      </div>
    </div>
  );
};

export default DataGridItem;
