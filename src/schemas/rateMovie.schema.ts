import * as z from "zod"

export const rateMovieSchema = z.object({
    rating: z.number().min(0).max(10)
})

export type rateMovieDto = z.infer<typeof rateMovieSchema>