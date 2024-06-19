import React from "react";
import Pagination from "@mui/material/Pagination";

// eslint-disable-next-line react/prop-types
const Paginate = ( {totalPages, onChange} ) => {
  return (
    <Pagination
      count={totalPages}
      color="primary"
      onChange={(_event, currentPage) => onChange(currentPage)}
    />
  );
};

export default Paginate;
