import { fetchWrapper } from "@/lib/fetchWrapper"
import { getMoviesDto } from "@/schemas/getMovies.schema"
import { ExtendedMovieType, GenreType, getMoviesResponse } from "@/types/movies";

export const getMovies = async (filters: getMoviesDto) => {
    const queryParams = Object.keys(filters)
    //@ts-expect-error: 'k' always string and key of 'filters' 
    .map((k) => encodeURIComponent(k) + '=' + encodeURIComponent(filters[k]))
    .join('&');

    const response = await fetchWrapper<getMoviesResponse>("/api/discover/movie?"+queryParams+"&language=en-US", {
        method: "GET",
    })

    return response
}

export const getMovie = async (id: number) => {
    const response = await fetchWrapper<ExtendedMovieType>(`/api/movie/${id}?append_to_response=videos`, {
        method: "GET",
    })

    return response
}

export const getGenres = async () => {
    const response = await fetchWrapper<{genres: Array<GenreType>}>("/api/genre/movie/list?", {
        method: "GET",
    })
    return response
}