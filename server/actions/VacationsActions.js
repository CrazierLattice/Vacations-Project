const Log = require("../../classes/Log.class");
const Vacation = require("../../classes/Vacation.class");
const Adapter = require("../dbconfig");

const getAllVacations = async (req, res) => {
  const select_q = `SELECT v.*,COUNT(follower_id) as followers
    FROM vacations v
    LEFT JOIN followed_vacations ON v.id = followed_vacations.vacation_id
    GROUP BY v.id`;
  try {
    Adapter.singleQuery(select_q, null, (error, results) => {
      let vacations = [];
      results.forEach((vacation) => {
        vacation = {
          ...vacation,
          starting_date: Vacation.parseDate(vacation.starting_date),
          ending_date: Vacation.parseDate(vacation.ending_date),
        };
        vacation = new Vacation(vacation);
        vacations.push(vacation);
      });
      res.status(201).json({ error: false, vacations });
      Log.logData(__filename, getAllVacations.name, "Vacations were fetched");
    });
  } catch (error) {
    console.log(error);
  }
};

const getFollowersByVacationId = async (req, res) => {
  const { vacationId } = req.params;
  try {
    const select_q = `SELECT COUNT(follower_id) as Followers, vacations.location
        FROM
            followed_vacations 
             INNER JOIN vacations ON vacation_id=vacations.id
                WHERE
                    vacation_id = ?`;
    Adapter.singleQuery(select_q, vacationId, (error, results) => {
      res.status(201).json({ error: false, results });
    });
  } catch (error) {
    console.log(error);
  }
};

const createNewVacation = async (req, res) => {
  try {
    const { description, location, startingDate, endingDate, image, price } =
      req.body;
    if (
      !description ||
      !location ||
      !startingDate ||
      !endingDate ||
      !image ||
      !price
    )
      return res
        .status(500)
        .json({ error: true, message: "Please fill the required fields." });
    if (startingDate < endingDate) {
      const post_q = `INSERT INTO vacations(description,location,starting_date,ending_date,image,price)
                VALUES(?,?,?,?,?,?)`;
      Adapter.singleQuery(
        post_q,
        [description, location, startingDate, endingDate, image, price],
        (error,
        (results) => {
          if (!error) {
            res
              .status(201)
              .json({ error: false, message: "Vacation added successfully." });
          }
        })
      );
    } else {
      res.status(403).json({
        error: true,
        message: "Please insert a valid date for the new vacation. ",
      });
    }
  } catch (error) {
    console.log(error);
  }
};

const deleteVacation = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ error: true, message: "Missing some data." });
    const delete_followed_vac_q = `DELETE FROM followed_vacations WHERE vacation_id=? `;
    const delete_vacation_q = `DELETE FROM vacations WHERE id=?`;
    Adapter.singleQuery(delete_vacation_q, id, (error, results) => {
      if (!results.affectedRows) {
        return res
          .status(200)
          .json({ error: true, message: "No vacation found to delete." });
      } else {
        Adapter.singleQuery(delete_followed_vac_q, id, (error, results) => {
          res
            .status(201)
            .json({ error: false, message: "Vacation deleted successfully." });
        });
      }
    });
  } catch (err) {
    console.log(err);
  }
};

const followVacation = async (req, res) => {
  try {
    const { followerId, vacationId } = req.params;
    if (!followerId || !vacationId)
      return res
        .status(404)
        .json({ error: true, message: "Missing some info." });
    const select_vacation_q =
      "SELECT * FROM followed_vacations WHERE follower_id=? AND vacation_id=?";
    Adapter.singleQuery(
      select_vacation_q,
      [followerId, vacationId],
      (error,
      (results) => {
        if (results.length) {
          if (vacation.length) {
            const unfollow_query = `DELETE FROM followed_vacations WHERE follower_id=? AND vacation_id=?`;
            Adapter.singleQuery(
              unfollow_query,
              [followerId, vacationId],
              (error, results) => {
                if (!error) {
                  return res.status(201).json({
                    error: false,
                    message: "Vacation unfollowed successfully",
                    data,
                  });
                }
              }
            );
            //No matched vacation - therefore, follow it.
          } else {
            const follow_query = `INSERT INTO followed_vacations(follower_id,vacation_id) VALUES(?,?)`;
            Adapter.singleQuery(
              follow_query,
              [followerId, vacationId],
              (error, results) => {
                if (!error) {
                  res.status(201).json({
                    error: false,
                    message: "Vacation followed successfully.",
                  });
                }
              }
            );
          }
        }
      })
    );
  } catch (err) {
    console.log(err);
  }
};

const getFollowedVacations = async (req, res) => {};

module.exports = {
  getAllVacations,
  getFollowersByVacationId,
  createNewVacation,
  deleteVacation,
  followVacation,
  getFollowedVacations,
};
