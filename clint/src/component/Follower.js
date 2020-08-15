import React, { Fragment } from "react";
import { Button, Avatar, IconButton } from "@material-ui/core";

import { useStyles, StyledBadge } from "../assests/style";
import ShareIcon from "@material-ui/icons/Share";

const style = { height: "60px", width: "60px" };
function Follower({ users }) {
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
                <Avatar alt="Remy Sharp" style={style}>
                  {user.userName.split("")[0]}
                </Avatar>
              </StyledBadge>
            </Fragment>
          ))}
        </div>
      </div>
      <div className="follow-button">
        <Button variant="contained" className={classes.root}>
          FOLLOW
        </Button>
        <IconButton aria-label="delete" className={classes.margin}>
          <ShareIcon fontSize="large" />
        </IconButton>
      </div>
    </div>
  );
}

export default Follower;
