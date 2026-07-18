export const defaultValues = {
  name: "",
  description: "",
  author: "",
  categoryId: "",
  subcategoryId: "",
  formatId: "",
  publicationYear: "",
  pageCount: "",
  weight: "",
  price: "",
  discount: "",
  stock: "",
  status: "",
  bookImage: null,
};


export const sortOptions = [
  { value: "default", label: "Default" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
  { value: "name-desc", label: "Name: Z-A" },
  { value: "createdAt-desc", label: "Newest First" },
  { value: "createdAt-asc", label: "Oldest First" },
];
