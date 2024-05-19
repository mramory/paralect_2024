export const formatRuntime = (runtime: number) => {
    const hours = Math.floor(runtime/60)
    let minutes: string | number = runtime - (hours*60)
    if (minutes < 10){
        minutes = "0"+minutes
    }
    return `${hours}h ${minutes}m`
}