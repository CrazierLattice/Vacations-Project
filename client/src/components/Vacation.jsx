import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import DeleteIcon from "@material-ui/icons/Delete";
import clsx from "clsx";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import CardMedia from "@material-ui/core/CardMedia";
import CardContent from "@material-ui/core/CardContent";
import CardActions from "@material-ui/core/CardActions";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import { red } from "@material-ui/core/colors";
import FavoriteSharpIcon from "@material-ui/icons/FavoriteSharp";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { handleFollow } from "../dataFetch/handleFollow";
import EditIcon from "@material-ui/icons/Edit";
import { useSelector } from "react-redux";
import DeleteVacationModal from "./adminPanel/DeleteVacationModal";
import EditVacationModal from "./adminPanel/EditVacationModal";

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 0,
    paddingTop: "56.25%", // 16:9
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));
const Vacation = ({ vacation, update, setUpdate, likes }) => {
  // const followers = likes.vacation_id = vacation.id
  const { id, role, token } = useSelector((state) => state.user);
  const classes = useStyles();
  const [expanded, setExpanded] = useState(false);
  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const handleOpenEditModal = () => {
    setOpenEditModal(true);
  };
  const handleCloseEditModal = () => {
    setOpenEditModal(false);
  };

  const handleOpenDeleteModal = () => {
    setOpenDeleteModal(true);
  };
  const handleCloseDeleteModal = () => {
    setOpenDeleteModal(false);
  };
  return (
    <div className="vacation">
      <Card className={classes.root}>
        <CardHeader title={vacation.location} />
        <CardMedia
          className={classes.media}
          image={vacation.image}
          title="Paella dish"
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="h6">
            Vacation in {vacation.location} <br />
            Starting at: <br /> {vacation.starting_date.slice(0, 10)} <br />
            Ending at: <br /> {vacation.ending_date.slice(0, 10)} <br />
            Price: {vacation.price} &#8362;
          </Typography>
        </CardContent>
        <CardActions disableSpacing>
          {role === "user" && (
            <IconButton
              onClick={async () => {
                await handleFollow(id, vacation.id);
                setUpdate(update + 1);
              }}
            >
              {likes?.likes || 0}{" "}
              <FavoriteSharpIcon
                color={vacation["Followed_by"] ? "secondary" : ""}
              />
            </IconButton>
          )}

          {role === "admin" && (
            <>
              {vacation?.followers || 0}{" "}
              <FavoriteSharpIcon color={"secondary"} />
              <IconButton onClick={handleOpenEditModal}>
                <EditIcon color="primary" />
              </IconButton>
              <EditVacationModal
                update={update}
                setUpdate={setUpdate}
                open={openEditModal}
                token={token}
                vacation={vacation}
                handleClose={handleCloseEditModal}
              />
              <IconButton onClick={handleOpenDeleteModal}>
                <DeleteIcon color="error" />
              </IconButton>
              <DeleteVacationModal
                update={update}
                setUpdate={setUpdate}
                token={token}
                vacation={vacation}
                open={openDeleteModal}
                handleClose={handleCloseDeleteModal}
              />
            </>
          )}
          <IconButton
            className={clsx(classes.expand, {
              [classes.expandOpen]: expanded,
            })}
            onClick={handleExpandClick}
            aria-expanded={expanded}
            aria-label="show more"
          >
            <ExpandMoreIcon />
          </IconButton>
        </CardActions>
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography paragraph>{vacation.description}</Typography>
          </CardContent>
        </Collapse>
      </Card>
    </div>
  );
};
export default Vacation;
