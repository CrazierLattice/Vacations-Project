const router = require("express").Router();
const { Query } = require("../dbconfig");
const Adapter = require("../dbconfig");
const TokenVerification = require("../../classes/VerifyToken.class");
const Vacation = require("../../classes/Vacation.class");
const Log = require("../../classes/Log.class");
const { getAllVacations } = require("../actions/VacationsActions");

//Get all vacations
      
   router.get("/all", getAllVacations);

//Get the amount of followers for a vacation by the vacation's id
router.get(
  "/followers/:vacationId",
  TokenVerification.everyUser,
  async (req, res) => {
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
  }
);

//POST new vacation (admin only)
router.post("/new", TokenVerification.adminOnly, async (req, res) => {
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
});

//DELETE a vacation - admin only.
router.delete("/delete/:id", TokenVerification.adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    if (!id)
      return res
        .status(400)
        .json({ error: true, message: "Missing some data." });
    const delete_followed_vac_q = `DELETE FROM followed_vacations WHERE vacation_id=? `;
    delete_vacation_q = `DELETE FROM vacations WHERE id=?`;
    Adapter.singleQuery(delete_followed_vac_q, id, (error, results) => {
      if (!data.affectedRows)
        return res
          .status(200)
          .json({ error: true, message: "No vacation found to delete." });
    });
    res
      .status(201)
      .json({ error: false, message: "Vacation deleted successfully." });
  } catch (err) {
    console.log(err);
  }
});

//PUT - Follow / Unfollow after a vacation.
router.put(
  "/put/:followerId/:vacationId",
  TokenVerification.userOnly,
  async (req, res) => {
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
                    return res.status(201).json({
                      error: false,
                      message: "Vacation unfollowed successfully",
                      data:results,
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
  }
);

//Get only  the vacations that a user follows after them

router.get('/followedvacations/:userId',TokenVerification.userOnly,async(req,res)=>{
  const {userId} = req.params;

  const query = `SELECT vacations.*, COUNT(followed_vacations.follower_id) AS likes, 
  CASE WHEN followed_vacations.follower_id = ? THEN 'Followed' ELSE 'Not Followed' END AS Follow_status
FROM vacations
LEFT JOIN followed_vacations
ON vacations.id = followed_vacations.vacation_id
GROUP BY vacations.id`

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
})

// router.get(
//   "/followedvacations/:userId",
//   TokenVerification.userOnly,
//   async (req, res) => {
//     try {
//       const { userId } = req.params;
//       if (!userId)
//         return res
//           .status(500)
//           .json({ error: true, message: "Missing some info." });
//       const select_followed_vacations_query = `SELECT vacations.*, users.first_name as Followed_by
//       FROM vacations
//       INNER JOIN followed_vacations
//       ON vacations.id = followed_vacations.vacation_id
//       INNER JOIN users
//       ON users.id = followed_vacations.follower_id
//       WHERE followed_vacations.follower_id = ?`;
//     Adapter.singleQuery(select_followed_vacations_query,userId,(error,followedVacations) => {
//         Adapter.singleQuery(select_followed_vacations_query,userId,(error,followedVacations) => {
//           const followedVacationsIds = followedVacations
//           .map((vacation) => vacation.id)
//           .join();
//         let select_unfollowed_vacations_query = `SELECT * FROM vacations WHERE vacations.id NOT IN (${followedVacationsIds})`;
  
//         if (followedVacationsIds) {
//           select_unfollowed_vacations_query = `SELECT * FROM vacations WHERE vacations.id NOT IN (${followedVacationsIds})`;
//         } else {
//           select_unfollowed_vacations_query = `SELECT * FROM vacations WHERE vacations.id`;
//         }
//         Adapter.singleQuery(select_unfollowed_vacations_query,null,(error,unfollowedVacations) => {
//           let unfollowedVacationsIds = unfollowedVacations
//           .map((vacation) => vacation.id)
//           .join();
//             //whereIN is  a dynamic variable that changes according to the vacations that the user follows them.
//       let whereIN = "";
//       if (followedVacationsIds) {
//         if (unfollowedVacationsIds) {
//           whereIN = `IN(${followedVacationsIds},${unfollowedVacationsIds})`;
//         } else {
//           whereIN = `IN(${followedVacationsIds})`;
//         }
//       } else {
//         whereIN = `IN(${unfollowedVacationsIds})`;
//       }

//       const get_likes_q = `SELECT vacation_id,vacations.location, COUNT(follower_id) AS likes FROM followed_vacations 
//     inner join vacations on vacations.id = followed_vacations.vacation_id
//     WHERE vacation_id ${whereIN}
//     GROUP BY followed_vacations.vacation_id`;
//       Adapter.singleQuery(get_likes_q,null,(error,results) => {
//         return res.status(201).json({
//           error: false,
//           followedVacations,
//           unfollowedVacations: unfollowedVacations || [],
//           likesData: results,
//         });
//       });
//         });
//         })
//     })

//     } catch (error) {
//       console.log(error);
//     }
//   }
// );

//Edit a vacation - admin only.
router.put("/edit/:id", TokenVerification.adminOnly, async (req, res) => {
  try {
    const { id } = req.params;
    const { description, location, starting_date, ending_date, price, image } =
      req.body;
    if (
      !description ||
      !location ||
      !starting_date ||
      !ending_date ||
      !price ||
      !image
    )
      return res
        .status(403)
        .json({ error: true, message: "Please fill all the required fields." });
    if (starting_date < ending_date) {
      const update_vacation_q = `UPDATE vacations 
            SET description=?,location=?,starting_date=?,ending_date=?,price=?,image=?
            WHERE id=?`;
      Adapter.singleQuery(
        update_vacation_q,
        [description, location, starting_date, ending_date, price, image, id],
        (error, results) => {
          if (!error) {
            res.status(201).json({
              error: false,
              message: "Vacation edited successfully",
              results,
            });
          } else {
            res.status(500).json({ error: true, message: error });
          }
        }
      );
    } else {
      res.status(500).json({ error: true, message: "Invalid date." });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
