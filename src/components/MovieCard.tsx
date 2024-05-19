"use client";

import s from "@/scss/components/MovieCard.module.scss";
import Image from "next/image";
import { RateBtn } from "./RateBtn";
import { ExtendedMovieType, GenreType, MovieType } from "@/types/movies";
import { useState } from "react";
import { formatVotes } from "@/lib/formatters/formatVotes";
import Link from "next/link";
import { formatRuntime } from "@/lib/formatters/formatRuntime";
import { formatReleaseDate } from "@/lib/formatters/formatReleaseDate";
import { formatMoney } from "@/lib/formatters/formatMoney";
import { useSearchParams } from "next/navigation";

interface MovieCardProps {
  movie: MovieType;
  genres?: Array<GenreType>;
  page: "movies" | "rated"
}

export const MovieCard = ({ movie, genres, page }: MovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [errorImage, setErrorImage] = useState(false);
  const searchParams = useSearchParams()
  const params = new URLSearchParams(searchParams).toString().split("&").join("~")

  const handleOnLoadImage = () => {
    setImageLoaded(true);
  };

  return (
    <div className={s.container}>
      <Image
        className={
          s.movie_poster + " " + (imageLoaded ? s.movie_card_image_noblur : s.movie_card_image_blur)
        }
        onLoad={() => handleOnLoadImage()}
        src={errorImage ? "/images/no_img_small.svg" : process.env.NEXT_PUBLIC_IMAGES_URL + movie.poster_path}
        alt="movie img"
        width={119}
        height={170}
        sizes="(max-width: 700px) 100%"
        onError={() => {
          if (!errorImage) {
            setErrorImage(true);
          }
        }}
      />
      <div className={s.info}>
        <div className={s.movie_info}>
          <h2>
            <Link href={`/${page}/${movie.id}?slug=${movie.original_title}&callback_params=${params}`}>{movie.original_title}</Link>
          </h2>
          <p className={s.date}>{movie.release_date?.split("-")[0]}</p>
          <div className={s.raiting}>
            <Image
              src="/icons/goldStar.svg"
              width={28}
              height={28}
              alt="raiting"
            />
            <p className={s.raiting_number}>{movie.vote_average?.toFixed(1)}</p>
            <p className={s.raiters_quantity}>
              ({formatVotes(movie.vote_count)})
            </p>
          </div>
        </div>
        <p className={s.genres}>
          <span>Genres</span>
          {genres
            ? genres
                .filter((genre) => movie.genre_ids?.includes(genre.id))
                .map((genre, idx, arr) => {
                  if (idx !== arr.length - 1) {
                    return genre.name + ", ";
                  } else {
                    return genre.name;
                  }
                })
            : null}
        </p>
      </div>
      <RateBtn movie={movie} />
    </div>
  );
};

interface ExtendedMovieCardProps {
  movie: ExtendedMovieType;
}

export const ExtendedMovieCard = ({ movie }: ExtendedMovieCardProps) => {
  const [imageLoaded, setImageLoaded] = useState(false);
  const [errorImage, setErrorImage] = useState(false);

  const handleOnLoadImage = () => {
    setImageLoaded(true);
  };
  return (
    <div className={s.container}>
      <Image
        className={
          imageLoaded ? s.movie_card_image_noblur : s.movie_card_image_blur
        }
        onLoad={() => handleOnLoadImage()}
        src={errorImage ? "/images/no_img_big.svg" : process.env.NEXT_PUBLIC_IMAGES_URL + movie.poster_path}
        alt="movie img"
        width={250}
        height={352}
        onError={() => {
          if (!errorImage) {
            setErrorImage(true);
          }
        }}
      />
      <div className={s.info}>
        <div className={s.movie_info}>
          <h2>{movie.original_title}</h2>
          <p className={s.date}>{movie.release_date?.split("-")[0]}</p>
          <div className={s.raiting}>
            <Image
              src="/icons/goldStar.svg"
              width={28}
              height={28}
              alt="raiting"
            />
            <p className={s.raiting_number}>{movie.vote_average.toFixed(1)}</p>
            <p className={s.raiters_quantity}>
              ({formatVotes(movie.vote_count)})
            </p>
          </div>
        </div>
        <div className={s.extended_info}>
          <ul className={s.keys}>
            <li>Duration</li>
            <li>Premiere</li>
            <li>Budget</li>
            <li>Gross worldwide</li>
            <li>Genres</li>
          </ul>
          <ul className={s.values}>
            <li>{movie.runtime ? formatRuntime(movie.runtime) : "-"}</li>
            <li>{movie.release_date ? formatReleaseDate(movie.release_date) : "-"}</li>
            <li>{movie.budget ? formatMoney(movie.budget) : "-"}</li>
            <li>{movie.revenue ? formatMoney(movie.revenue) : "-"}</li>
            <li>
              {movie.genres.length ? movie.genres.map((genre, idx, arr) => {
                if (idx !== arr.length - 1) {
                  return genre.name + ", ";
                } else {
                  return genre.name;
                }
              }) : "No info"}
            </li>
          </ul>
        </div>
      </div>
      <RateBtn movie={movie} />
    </div>
  );
};
