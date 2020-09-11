import React, { Fragment, useState, useEffect } from "react";
import {
  Button,
  Avatar,
  IconButton,
  AppBar,
  Tabs,
  Tab,
} from "@material-ui/core";

import { useStyles, StyledBadge } from "../../assests/style";
import ShareIcon from "@material-ui/icons/Share";
import { useDispatch } from "react-redux";
import { followRequest } from "../../Action/actionType";
import ShareComponent from "../ShareModal/Sharemodal";

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

const style = { height: "60px", width: "60px" };

function Follower({ users, userdata, token, id }) {
  const [State, setState] = useState("");
  const [GroupId, setGroupId] = useState(id);
  //share component
  const [Share, setShare] = useState(false);
  const handleShareShow = () => setShare(true);
  const handleShareClose = () => setShare(false);

  useEffect(() => {
    const isFollow = users.filter((user) => user.userId === userdata.email);

    isFollow[0] ? setState("Unfollow") : setState("follow");
    setGroupId(id);
  }, [userdata, users, id]);

  const dispatch = useDispatch();

  const handleFollow = () => {
    const data = {
      id: GroupId,
    };
    dispatch(followRequest({ data: data, token: token }));
  };
  const classes = useStyles();
  return (
    <div className="follower-box">
      <p className="following-heading">Followers</p>

      <div className="avatar">
        <div className={classes.Avatar1}>
          {users.map((user, index) => (
            <Fragment key={index}>
              <StyledBadge
                overlap="circle"
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "right",
                }}
                variant="dot"
              >
                <Avatar src={userdata.profile_image_url} style={style} />
              </StyledBadge>
            </Fragment>
          ))}
        </div>
      </div>

      <div className="follow-button">
        <Button
          variant="contained"
          className={classes.root}
          onClick={handleFollow}
        >
          {State}
        </Button>
        <IconButton className={classes.Iconbutton} onClick={handleShareShow}>
          <ShareIcon fontSize="large" />
        </IconButton>
        <ShareComponent
          show={Share}
          handleClose={handleShareClose}
          url={"https://frozen-inlet-78997.herokuapp.com/"}
        />
      </div>
    </div>
  );
}

export default Follower;
