"use client";

import { MoviesList } from "@/components/MoviesList";
import { Pagination } from "@/components/Pagination";
import { Search } from "@/components/ui/Search";
import { getGenres } from "@/requests/movies";
import s from "@/scss/pages/RatedPage.module.scss";
import { MovieRating, MovieType } from "@/types/movies";
import { Loader } from "@/components/ui/Loader";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const RatedPage = () => {
  const [ratedMoviesIds, setRatedMoviesIds] = useState<Array<number> | null>(
    null
  );
  const [ratedMovies, setRatedMovies] = useState<Array<MovieType>>([]);
  const [searchMovies, setSearchMovies] = useState<Array<MovieType>>([]);

  const [totalPages, setTotalPages] = useState(1);
  const searchParams = useSearchParams();

  const { data: genres, isPending } = useQuery({
    queryKey: ["genres_for_rated_page"],
    queryFn: () => getGenres(),
  });

  // extract rated movies ids form localStorage and set it to state
  useEffect(() => {
    if (localStorage.getItem("ratedMoviesIds")) {
      const ids =
        (JSON.parse(
          localStorage.getItem("ratedMoviesIds")!
        ) as Array<number>) || [];
      setRatedMoviesIds(ids);
    } else {
      setRatedMoviesIds([]);
    }
  }, []);

  // extract rated movies ids form state and set rated movies to state
  useEffect(() => {
    if (ratedMoviesIds) {
      for (const id of ratedMoviesIds) {
        const ratedMovie = JSON.parse(
          localStorage.getItem(id.toString())!
        ) as MovieRating;
        const movie = ratedMovie.movie;
        setRatedMovies((prev) => [...prev, movie]);
      }
    } else {
      setRatedMovies([]);
    }
  }, [ratedMoviesIds]);

  // setting movies according to search and page params
  useEffect(() => {
    const search = searchParams.get("search");
    const page = searchParams.get("page");
    let movies = [];
    if (search) {
      movies = ratedMovies.filter((movie) =>
        movie.original_title.toLowerCase().includes(search.toLowerCase())
      );
    } else {
      movies = ratedMovies;
    }

    setTotalPages(Math.ceil(movies.length / 20));

    if (page) {
      movies = movies.slice((+page - 1) * 20, +page * 20);
    } else {
      movies = movies.slice(0, 20);
    }
    setSearchMovies(movies);
  }, [searchParams, ratedMovies, searchParams]);

  if (isPending) {
    return <Loader />;
  }
  return (
    <main className={s.page_wrapper}>
      {ratedMoviesIds?.length ? (
        <div className={s.header}>
          <h1>Rated movies</h1>
          <Search onSubmit={() => {}} />
        </div>
      ) : null}
      <MoviesList
        page="rated"
        movies={searchMovies ? searchMovies : ratedMovies}
        genres={genres?.body.genres}
      />
      {ratedMoviesIds?.length ? (
        <Pagination defaultPage={1} total={totalPages} align="center" />
      ) : null}
    </main>
  );
};

export default RatedPage;
