import React from 'react';

interface PaginatorProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

const PokePaginator: React.FC<PaginatorProps> = ({ currentPage, totalPages, onPageChange }) => {
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            onPageChange(page);
        }
    };

    return (
        <div className="flex justify-center mt-4">
            <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="px-4 py-2 mr-2 bg-gray-300 text-gray-700 rounded-md"
            >
                Previous
            </button>
            <span className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md">{currentPage}</span>
            <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="px-4 py-2 ml-2 bg-gray-300 text-gray-700 rounded-md"
            >
                Next
            </button>
        </div>
    );
};

export default PokePaginator;
