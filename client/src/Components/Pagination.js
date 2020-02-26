import React from 'react';
import ReactPaginate from 'react-paginate';

const Pagination = ({pageCount, paginationOnChange}) => {
  return (
    <ReactPaginate
      pageCount={pageCount}
      pageRangeDisplayed={3}
      marginPagesDisplayed={1}
      previousLabel={
        <React.Fragment>
          <span aria-hidden="true">&laquo;</span>
          <span className="sr-only">Previous</span>
        </React.Fragment>
      }
      nextLabel={
        <React.Fragment>
          <span aria-hidden="true">&raquo;</span>
          <span className="sr-only">Previous</span>
        </React.Fragment>
      }
      breakClassName={'page-item'}
      breakLinkClassName={'page-link'}
      containerClassName={'pagination justify-content-center'}
      pageClassName={'page-item'}
      pageLinkClassName={'page-link'}
      activeClassName={'active'}
      activeLinkClassName={'active'}
      previousClassName={'page-item'}
      nextClassName={'page-item'}
      onPageChange={paginationOnChange}
      previousLinkClassName={'page-link'}
      nextLinkClassName={'page-link'}
      disabledClassName={'disabled'}
    />
  );
}

export default Pagination;
