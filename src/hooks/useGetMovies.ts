"use client"

import { getMovies } from "@/requests/movies"
import { FetchType } from "@/types/fetch"
import { getMoviesResponse } from "@/types/movies"
import { useQuery } from "@tanstack/react-query"
import { useSearchParams } from "next/navigation"

interface useGetMoviesProps {
    initialData?: FetchType<getMoviesResponse>,
    enabled: boolean
}

export const useGetMovies = ({ initialData, enabled }: useGetMoviesProps) => {
    const searchParams = useSearchParams();

    const page = searchParams.get("page")
    const with_genres = searchParams.getAll("with_genres")
    const primary_release_year = searchParams.get("primary_release_year")
    const vote_average_gte = searchParams.get("vote_average.gte")
    const vote_average_lte = searchParams.get("vote_average.lte")
    const sort_by = searchParams.get("sort_by")

    const filters = {
        ...(page && { page: Number(page) }),
        ...(with_genres && { with_genres: with_genres }),
        ...(primary_release_year && { primary_release_year: Number(primary_release_year) }),
        ...(vote_average_gte && { "vote_average.gte": Number(vote_average_gte) }),
        ...(vote_average_lte && { "vote_average.lte": Number(vote_average_lte) }),
        ...(sort_by && { "sort_by": sort_by })
    }

    return useQuery({
        queryKey: ["get movies", filters],
        queryFn: () => getMovies(filters),
        initialData: searchParams.size === 0 ? initialData : undefined,
        enabled: enabled
    })
}