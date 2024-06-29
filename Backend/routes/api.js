const express = require("express");
const axios = require("axios");

const router = express.Router();

router.all("/TopRated", async (req, res) => {
  console.log("inside");
  const page = parseInt(req.query.page) || 1;
  const pagesize = parseInt(req.query.pagesize) || 5;

  console.log("pagesize = ", page);
  try {
    const options = {
      method: "GET",
      url: `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${page}`,
      headers: {
        accept: "application/json",
        Authorization:
          "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkMmFkY2ZkNGMwZjJlMzlkMTBmNzYyZGFhYTNlODZjMyIsInN1YiI6IjY1YWQxMzdhNTQ0YzQxMDBlZGMyNzIyMSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.EviGGuaY2Rhuj5jCLajTJzBtnUUBFW60oUIQsijJLxs",
      },
    };

    const response = await axios.request(options);
    const topratedmovies = response.data.results;
    const totalPages = Math.ceil(topratedmovies.length / pagesize);
    const startIndex = (page - 1) * pagesize;
    const paginatedData = topratedmovies.slice(
      startIndex,
      startIndex + pagesize
    );
    res.json({
      topratedmovies,
      totalPages,
      currentPage: page,
      data: paginatedData,
    });
  } catch (error) {
    console.log({ message: error.message });
  }
});

module.exports = router;
