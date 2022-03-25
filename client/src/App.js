import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Link,
  useHistory,
  Redirect,
} from "react-router-dom";
import { LOG_OUT, RESET_VACATIONS } from "./actions/actionsType";
import Login from "./components/Login";
import Register from "./components/Register";
import Vacations from "./components/Vacations";
import Chart from "./components/adminPanel/Chart";
import AddVacation from "./components/adminPanel/AddVacation";
import { Box, Button } from "@material-ui/core";
import { getTokenData } from "./dataFetch/getTokenData";
import { fetchVacations } from "./dataFetch/fetchVacations";
import { fetchFollowedVacations } from "./dataFetch/fetchFollowedVacations";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";

const App = () => {
  const user = useSelector((state) => state.user);
  const { token } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (!user.length) {
      getTokenData(dispatch, history);
    }
    if (user?.role === "user") {
      fetchFollowedVacations(user.id, dispatch, token);
    } else if (user?.role === "admin") {
      fetchVacations(dispatch, token);
    }
  }, []);

  return (
    <Router>
      <Box justifyContent="space-evenly" display="flex">
        {user?.token && <h1>Welcome, {user.first_name}</h1>}
        {user?.token && (
          <>
            <Button
              variant="contained"
              color="primary"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={(e) => handleClick(e)}
            >
              Menu
            </Button>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              keepMounted
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              {user?.token && (
                <MenuItem
                  onClick={() => {
                    <Redirect to="/vacations" />;
                    handleClose();
                  }}
                >
                  <Link to="/vacations">Home</Link>
                </MenuItem>
              )}
              {user?.role === "admin" && (
                <MenuItem onClick={(e) => handleClose(e)}>
                  <Link to="/admin/addvacation">Add Vacation</Link>
                </MenuItem>
              )}
              {user?.role === "admin" && (
                <MenuItem onClick={(e) => handleClose(e)}>
                  <Link to="/admin/chart">Followers Chart</Link>
                </MenuItem>
              )}
              {!user?.token && (
                <MenuItem onClick={(e) => handleClose(e)}>
                  {" "}
                  <Link to="/login">Login</Link>
                </MenuItem>
              )}
              {!user?.token && (
                <MenuItem onClick={(e) => handleClose(e)}>
                  {" "}
                  <Link to="/register">Register</Link>
                </MenuItem>
              )}
              {user?.token?.length && (
                <MenuItem
                  onClick={(e) => {
                    handleClose(e);
                    localStorage.clear();
                    dispatch(
                      {
                        type: LOG_OUT,
                        payload: {},
                      },
                      {
                        type: RESET_VACATIONS,
                        payload: [],
                      }
                    );
                    history.push("/login");
                  }}
                >
                  {" "}
                  <Link to="/login">Logout</Link>
                </MenuItem>
              )}
            </Menu>
          </>
        )}
      </Box>

      <Switch>
        <Route exact path="/login" component={() => <Login />} />
        <Route exact path="/register" component={() => <Register />} />
        <Route exact path="/vacations" component={() => <Vacations />} />
        <Route
          exact
          path="/admin/addvacation"
          component={() => <AddVacation />}
        />
        <Route exact path="/admin/chart" component={() => <Chart />} />
        <Redirect from="/" to="/vacations" exact />
      </Switch>
    </Router>
  );
};

export default App;
