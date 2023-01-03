import React from "react";
import {
  IoChevronBackCircleSharp,
  IoChevronForwardCircleSharp,
} from "react-icons/io5";

import Styled from "styled-components";

function Pagination({ total, page, setPage }) {
  const handleNext = () => {
    console.log(page);
    if (page <= total - 1) {
      setPage(page + 1);
    }
    return;
  };
  const handlePrev = () => {
    //const totalPage=Math.ceil(total/10)
    console.log(page);

    if (page > 1) {
      setPage(page - 1);
    }
    return;
  };
  return (
    <Wrapper className="overflow-auto">
      <div className="d-flex justify-content-center align-items-center ">
        <span onClick={() => handlePrev()} className="icons cursor-pointer">
          <IoChevronBackCircleSharp />
        </span>
        <div className="text-muted total-text">
          <span className="mx-1">{page}</span>
          <span className="total-middle-text">of</span>
          <span className="mx-1">{total}</span>
        </div>
        <span onClick={() => handleNext()} className="icons cursor-pointer">
          <IoChevronForwardCircleSharp />
        </span>
      </div>
    </Wrapper>
  );
}

export default Pagination;

const Wrapper = Styled.div`
    .icons{
        font-size:30px;
        margin:0 40px;
        color:var(--sidebar-color);
    }
    .total-text{
        letter-spacing:1px;
    }
    .total-middle-text{
        font-size:15px;
    }
    .cursor-pointer{
        cursor:pointer;
    }
`;
