const month = [
    "January","February","March","April","May","June","July",
    "August","September","October","November","December"
]

export const formatReleaseDate = (data: string) => {
    const nums = data.split("-")
    return `${month[+nums[1]]} ${nums[2]}, ${nums[0]}`
}