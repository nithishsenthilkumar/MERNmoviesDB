import React, { useState, useEffect } from "react";
import axios from "axios";

export default function TopRatedMovies() {
  const [movies, setMovies] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);

  const fetchTopRatedMovies = async (page) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/TopRated?page=${page}`
      );
      console.log(response.data);
      setMovies(response.data.data);
      setTotalPages(response.data.totalPages);
      console.log();
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    fetchTopRatedMovies(currentPage);
  }, [currentPage]);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="container-fluid h-screen justify-center items-center">
      <button onClick={() => handlePageChange(1)}>Top Rated Movies</button>
      <ul className="">
        {movies.map((movie) => (
          <li key={movie.id}>
            <h6>{movie.title}</h6>
            <p>{movie.overview}</p>
            <h2>{movie.release_date}</h2>
            <h3>{movie.vote_average}</h3>
            <img
              src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              alt={movie.title}
              className="w-1/6 h-1/6"
            />
          </li>
        ))}
      </ul>
      <div>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <br></br>
        <span>{`Page ${currentPage} of ${totalPages}`}</span>
        <br />
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
}
