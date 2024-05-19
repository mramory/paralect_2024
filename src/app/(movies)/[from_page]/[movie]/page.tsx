import { Breadcrumbs } from "@/components/Breadcrumbs"
import { ExtendedMovieCard } from "@/components/MovieCard"
import s from "@/scss/pages/MoviePage.module.scss"
import { MovieInfo } from "./_components/MovieInfo"
import { getMovie } from "@/requests/movies"

const MoviePage = async ({params}: {params: {movie: number}}) => {
    const movie = await getMovie(params.movie)

    return(
        <main className={s.page_wrapper}>
            <Breadcrumbs />
            <ExtendedMovieCard movie={movie.body} />
            <MovieInfo movie={movie.body} />
        </main>
    )
}

export default MoviePage