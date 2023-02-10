//Delete vacation request.
export const deleteVacation = async(vacationId,token) => {

    await fetch(`${process.env.REACT_APP_API_URL}/vacations/delete/${vacationId}`, {
        method:'DELETE',
        headers:{authorization:token}
    })
}