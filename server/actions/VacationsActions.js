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
        const {id,description,location,starting_date,ending_date,price,image,followers} = vacation;
        vacations.push(
          new Vacation(id,
          description,
          location,
          Vacation.parseDate(starting_date), 
          Vacation.parseDate(ending_date),
           price,
           image,
           followers));
      })
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
      "SELECT * FROM followed_vacations WHERE follower_id=? AND vacation_id=? GROUP BY vacation_id";
    Adapter.singleQuery(
      select_vacation_q,
      [followerId, vacationId],
      (error,results) => {
        if (results.length) {
          if (results[0]['vacation_id'] == vacationId) {
            const unfollow_query = `DELETE FROM followed_vacations WHERE follower_id=? AND vacation_id=?`;
            Adapter.singleQuery(
              unfollow_query,
              [followerId, vacationId],
              (error, results) => {
                if (!error) {
                  console.log(results);
                  return res.status(201).json({
                    error: false,
                    message: "Vacation unfollowed successfully",
                  });
                }
              }
            );
          } 
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
    );
  } catch (err) {
    console.log(err);
  }
};

const getFollowedVacations = async (req, res) => {
  const {userId} = req.params;

  const query = `SELECT vacations.*, 
  (CASE WHEN followed_vacations2.follower_id IS NOT NULL THEN 'Followed' ELSE 'Not Followed' END) AS Follow_status,
  COUNT(followed_vacations.follower_id) AS likes
FROM vacations
LEFT JOIN followed_vacations AS followed_vacations2
ON vacations.id = followed_vacations2.vacation_id AND followed_vacations2.follower_id = ?
LEFT JOIN followed_vacations
ON vacations.id = followed_vacations.vacation_id
GROUP BY vacations.id
`

const followingVacations = [];
const unfollowedVacations = [];
let likesData = [];
Adapter.singleQuery(query,userId,(error,results) => {
  results.forEach(vacation => {
    vacation['Follow_status'] === 'Followed' ? followingVacations.push(vacation) : unfollowedVacations.push(vacation);
    likesData.push({vacation_id:vacation.id,vacation_location:vacation.location,likes:vacation.likes});
  });
  return res.json({
    error: false,
    followedVacations:followingVacations,
    unfollowedVacations,
    likesData
  });
  
})
  
};

module.exports = {
  getAllVacations,
  getFollowersByVacationId,
  createNewVacation,
  deleteVacation,
  followVacation,
  getFollowedVacations,
};
