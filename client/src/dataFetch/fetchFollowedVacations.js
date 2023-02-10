import actionTypes from '../actions/actionsType'
export const fetchFollowedVacations = async (userId,dispatch,token) => {

    const res = await fetch(`${process.env.REACT_APP_API_URL}/vacations/followedvacations/${userId}`,{
        headers:{authorization:token}
    })
    const data = await res.json()
    dispatch({
        type:actionTypes.GET_FOLLOWED_VACATIONS,
        payload:{followedVacations:data.followedVacations,unfollowedVacations:data.unfollowedVacations,likes:data.likesData}
    })

}