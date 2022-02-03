import React from "react";
import "./Pagination.css"

const Pagination = ({ productPerPage, totalProducts, setCurrentPage }) => {
  const PageNumber = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productPerPage); i++) {
    PageNumber.push(i);
  }
  return (
    <div className="Pagin">
      {/* <nav> */}
        {/* <ul> */}
          {PageNumber &&
            PageNumber.map((number) => {
              return (
                // <li className="pagin" key={number}>
                  <a
                    onClick={() => {
                      setCurrentPage(number);
                    }}
                    href="#"
                  >
                    {number}
                  </a>
                // </li>
              );
            })}
        {/* </ul> */}
      {/* </nav> */}
    </div>
  );
};

export default Pagination;
