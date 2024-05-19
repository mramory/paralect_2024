"use client";

import { Modal, Rating } from "@mantine/core";
import { Button } from "@/components/ui/Button";
import { useDisclosure } from "@mantine/hooks";
import Image from "next/image";
import s from "@/scss/components/MovieCard.module.scss";
import sRate from "@/scss/components/RateBtn.module.scss"
import { ExtendedMovieType, MovieRating, MovieType } from "@/types/movies";
import { Controller, useForm } from "react-hook-form";
import { rateMovieDto, rateMovieSchema } from "@/schemas/rateMovie.schema";
import { StarIcon } from "./icons/starIcon";
import { zodResolver } from "@hookform/resolvers/zod"
import { useEffect, useState } from "react";

interface RateBtnProps {
  movie: MovieType | ExtendedMovieType
}

export const RateBtn = ({movie}: RateBtnProps) => {
  const [opened, { open, close }] = useDisclosure(false);
  const [movieRating, setMovieRating] = useState<MovieRating | null>(null)

  useEffect(() => {
    if(localStorage.getItem(movie.id.toString())){
      const value = JSON.parse(localStorage.getItem(movie.id.toString())!) as MovieRating || null
      setMovieRating(value)
      setValue("rating", value.rating)
    }
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<rateMovieDto>({
    resolver: zodResolver(rateMovieSchema),
    defaultValues: {
      rating: movieRating?.rating || 0
    }
  })

  const rateMovie = (data: rateMovieDto) => {
    if (typeof window !== "undefined") {
      // seting new rated movie to localStaorage
      localStorage.setItem(movie.id.toString(), JSON.stringify({...data, movie}))

      // seting new rated movie id to localStorage
      const ratedMoviesIds: Array<number> = JSON.parse(localStorage.getItem("ratedMoviesIds") || "[]")
      const filteredIds = ratedMoviesIds.filter((id) => id !== movie.id)
      const newRatedMoviesIds = ratedMoviesIds ? [...filteredIds, movie.id] : [movie.id]
      localStorage.setItem("ratedMoviesIds", JSON.stringify(newRatedMoviesIds))

      // seting new rated movie to state
      setMovieRating(JSON.parse(localStorage.getItem(movie.id.toString())!) as MovieRating || null)
    }
    close()
  }

  const deleteFromRated = () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem(movie.id.toString())
      const ratedMoviesIds: Array<number> = JSON.parse(localStorage.getItem("ratedMoviesIds") || "[]")
      const filteredIds = ratedMoviesIds.filter((id) => id !== movie.id)
      localStorage.setItem("ratedMoviesIds", JSON.stringify(filteredIds))
      setMovieRating(null)
    }
    close()
  }

  return (
    <>
      <Modal.Root
        classNames={{inner: sRate.inner, header: sRate.header, content: sRate.content}}
        centered
        opened={opened}
        onClose={close}
      >
        <Modal.Overlay />
        <Modal.Content>
          <Modal.Header>
            <Modal.Title>Your rating</Modal.Title>
            <button onClick={close}><Image src="/icons/close.svg" width={16} height={16} alt="close" /></button>
          </Modal.Header>
          <Modal.Body className={sRate.body}>
            <h3>The Green Mile</h3>
            <form onSubmit={handleSubmit(rateMovie)}>
              <Controller
                name="rating"
                control={control}
                render={({ field }) => <Rating {...field} id="rating" name="rating" className={sRate.stars} defaultValue={0} size="lg" count={10} />
              }
              />
              {errors && <p>{errors.rating?.message}</p>}
              <div className={sRate.btns}>
                  <Button fontWeight="700" type="submit">Save</Button>
                  <Button type="button" variant="text" onClick={() => deleteFromRated()}>Remove rating</Button>
              </div>
            </form>
          </Modal.Body>
        </Modal.Content>
      </Modal.Root>
      <button aria-label="rate movie" onClick={open} className={s.rate_btn}>
        <StarIcon color={movieRating ? "purple" : "grey"} />
        <span>{movieRating ? movieRating.rating : null}</span>
      </button>
    </>
  );
};
