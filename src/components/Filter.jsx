import React, { useState, useRef, useEffect } from "react";
import Styled from "styled-components";
import { FaFilter } from "react-icons/fa";
import { BsCaretDown } from "react-icons/bs";

function Filter({ filterMenuItems, filterName }) {
  const [filterMenu, setFilterMenu] = useState(false);
  const ref = useRef();

  useEffect(() => {
    const checkIfClickedOutside = (e) => {
      // If the menu is open and the clicked target is not within the menu,
      // then close the menu
      if (filterMenu && ref.current && !ref.current.contains(e.target)) {
        setFilterMenu(false);
      }
    };

    document.addEventListener("mousedown", checkIfClickedOutside);

    return () => {
      // Cleanup the event listener
      document.removeEventListener("mousedown", checkIfClickedOutside);
    };
  }, [filterMenu]);

  return (
    <Wrapper>
      <div className="filter-container" ref={ref}>
        <div
          onClick={() => setFilterMenu(!filterMenu)}
          className="filter-design"
        >
          {filterName}
          <BsCaretDown />
        </div>

        <div className={filterMenu ? " filter-menu" : "hide-menu"}>
          <div className="filter-menu-inner">
            {filterMenuItems.map((item, i) => {
              return (
                <div
                  className="filter-menu-item"
                  onClick={() => {
                    item.action(item.name);
                    setFilterMenu(false);
                  }}
                  key={i}
                >
                  {item.name}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </Wrapper>
  );
}

export default Filter;

const Wrapper = Styled.div`
.filter-container{
  position:relative;
}
.filter-design{
    background:grey;
    padding:5px;
    cursor:pointer;
}
.filter-menu{
  width:250px;
  position: absolute;
  display: flex;
  height:120px;
  z-index:999;
  justify-content:center;
  align-items:center;
  background-color:#fff;
  border:2px solid #A9A9A9	;
  bottom:-5.5rem;
  left:2rem;
  border-radius:10px;
  padding:0px 10px;
  overflow-y:scroll;
  
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none; 
 
}

.filter-menu::-webkit-scrollbar { 
width:5px;
  
}
.filter-menu::-webkit-scrollbar-thumb {
    background: #888;

}
.filter-menu::-webkit-scrollbar-track {
  background: #f1f1f1;
 

}

.hide-menu{
  display:none;
}
.filter-menu-inner{
 
  display:flex;
  flex-direction:column;
  justify-content:space-between;
  height:100%;
   

}
.filter-menu-item{
  cursor:pointer;
  min-width:150px;
}

.icon{
        font-size:1.5rem;
        cursor:pointer;
        
    }



    
`;
