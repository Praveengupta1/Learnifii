import React, { useEffect } from "react";
import PropTypes from "prop-types";
import { AppBar, Tabs, Tab, Box } from "@material-ui/core";
import { useStyles } from "../assests/style";
import Follower from "./Follower";
import Post from "./Post";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../Action/actionType";
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`scrollable-force-tabpanel-${index}`}
      aria-labelledby={`scrollable-force-tab-${index}`}
      {...other}
    >
      {value === index && <Box div={3}>{children}</Box>}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `scrollable-force-tab-${index}`,
    "aria-controls": `scrollable-force-tabpanel-${index}`,
  };
}

export default function ScrollableTabsButtonForce() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const dispatch = useDispatch();
  const groupInfo = useSelector((state) => state.group);

  useEffect(() => {
    dispatch(fetchData());
  }, [dispatch, groupInfo.loading]);
  return (
    <div className={classes.Tabs}>
      <AppBar position="static" color="default">
        <Tabs
          style={{ background: "white" }}
          value={value}
          onChange={handleChange}
          variant="scrollable"
          scrollButtons="on"
          indicatorColor="primary"
          textColor="primary"
          aria-label="scrollable force tabs example"
        >
          {groupInfo.groupdata.map((group, index) => (
            <Tab
              key={index}
              label={group.groupName}
              {...a11yProps(`${index}`)}
            />
          ))}
        </Tabs>
      </AppBar>
      {groupInfo.groupdata.map((group, index) => (
        <TabPanel key={index} value={value} index={index}>
          <Follower users={group.followerGroupUser} />
          <Post id={group._id} />
          <Card posts={group.groupPost} id={group._id} />
        </TabPanel>
      ))}
    </div>
  );
}
