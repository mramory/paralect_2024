
export type MovieType = {
    id: number
    genre_ids: Array<number>,
    original_title: string,
    poster_path: string,
    release_date: string,
    vote_average: number,
    vote_count: number
}

export type ExtendedMovieType = Omit<MovieType, "genre_ids"> & {
    runtime: number
    budget: number
    revenue: number
    genres: Array<{ id: number, name: string }>
    overview: string
    production_companies: Array<{
        id: number
        logo_path: string
        name: string
        origin_country: string
    }>
    videos: { results: Array<VideoType> }
}

export type GenreType = {
    id: number,
    name: string
}

type VideoType = {
    iso_639_1: string,
    iso_3166_1: string,
    name: string,
    key: string,
    site: string,
    size: number,
    type: string,
    official: boolean,
    published_at: string,
    id: string
}

export type MovieRating = {
    movie: MovieType,
    rating: number
}

export type getMoviesResponse = {
    page: number,
    results: Array<MovieType>,
    total_pages: number
    total_results: number
}