"use client";

import { MovieCard } from "@/components/MovieCard";
import { useGetMovies } from "@/hooks/useGetMovies";
import s from "@/scss/components/MoviesList.module.scss";
import { FetchType } from "@/types/fetch";
import { GenreType, MovieType, getMoviesResponse } from "@/types/movies";
import { Loader } from "@/components/ui/Loader";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

interface MoviesListProps {
  initialData?: FetchType<getMoviesResponse>;
  genres?: Array<GenreType>;
  page: "movies" | "rated";
  movies?: Array<MovieType>;
}

export const MoviesList = ({
  initialData,
  genres,
  page,
  movies: ratedMovies,
}: MoviesListProps) => {
  const { data: movies, isFetching } = useGetMovies({
    initialData,
    enabled: page === "movies",
  });


  if (isFetching) {
    return <Loader />;
  }
  if (movies?.body.results?.length === 0 && page === "movies") {
    return (
      <div className={s.empty_movies}>
        <Image
          src="/images/no_movies.png"
          alt="no movies"
          width={310}
          height={252}
        />
        <p>We don't have such movies, look for another one</p>
      </div>
    );
  }
  else if(ratedMovies?.length === 0 && page === "rated"){
    return(
      <div className={s.empty_wrapper}>
        <div className={s.empty_movies}>
          <Image
            src="/images/no_rated_movies.png"
            alt="no movies"
            width={400}
            height={300}
          />
          <p>You haven't rated any films yet</p>
          <Button><Link href="/">Find movies</Link></Button>
        </div>
      </div>
    )
  }
  return (
    <ul className={s.container}>
      {page === "movies"
        ? movies?.body.results?.map((movie) => (
            <li key={movie.id}>
              <MovieCard page="movies" genres={genres} movie={movie} />
            </li>
          ))
        : ratedMovies?.map((movie) => (
            <li key={movie.id}>
              <MovieCard page={page} genres={genres} movie={movie} />
            </li>
          ))}
    </ul>
  );
};
