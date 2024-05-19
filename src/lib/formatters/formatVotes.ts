export const formatVotes = (vote_count: number) => {
    if(vote_count >= 1000000){
        return vote_count.toString().slice(0, -6)+"M"
    }
    else if(vote_count >= 1000){
        return vote_count.toString().slice(0, -3)+"K"
    }
    else{
        return vote_count
    }
}