import { Filters } from "@/components/Filters";
import { MoviesList } from "@/components/MoviesList";
import s from "@/scss/pages/HomePage.module.scss"
import { Pagination } from "@/components/Pagination"
import { getGenres, getMovies } from "@/requests/movies";

export default async function HomePage({searchParams}: {searchParams: { [key: string]: string | string[] | undefined }}) {
  const movies = getMovies(searchParams) // it's need only for pagination, so it is not awaited
  const genres = await getGenres() // this cached for 2 hours

  return (
    <main className={s.page_wrapper}>
      <h1>Movies</h1>
      <div>
        <Filters genres={genres.body.genres} />
        <MoviesList page="movies" genres={genres.body.genres} />
        {(await movies).body.total_results ? <Pagination defaultPage={(await movies).body.page} total={(await movies).body.total_pages} align="end" /> : null}
      </div>
    </main>
  );
}
