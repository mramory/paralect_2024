import * as z from "zod"

export const getMoviesSchema = z.object({
    with_genres: z.array(z.string()).optional(),
    primary_release_year: z.number().optional(),
    "vote_average.lte": z.number().optional(),
    "vote_average.gte": z.number().optional(),
    sort_by: z.string().optional(),
    page: z.number().optional()
})

export type getMoviesDto = z.infer<typeof getMoviesSchema>