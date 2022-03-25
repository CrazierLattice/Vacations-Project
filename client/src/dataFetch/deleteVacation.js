//Delete vacation request.
export const deleteVacation = async(vacationId,token) => {

    await fetch(`https://caesaru-server.herokuapp.com/vacations/delete/${vacationId}`, {
        method:'DELETE',
        headers:{authorization:token}
    })
}