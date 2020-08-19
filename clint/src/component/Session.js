import React, { useEffect, Fragment } from "react";
import PropTypes from "prop-types";
import { AppBar, Tabs, Tab, Box } from "@material-ui/core";
import { useStyles } from "../assests/style";
import Follower from "./Follower";
import Post from "./Post";
import Card from "./Card";
import { useSelector, useDispatch } from "react-redux";
import { fetchData } from "../Action/actionType";
import Skeleton from '@material-ui/lab/Skeleton';
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
    <Fragment>
      {
        groupInfo.groupdata.length === 0 && 
        <div className={classes.TabSkeleton} color="default">
          <AppBar position="static">
            <Tabs style={{ background: "white" }} value={value} onChange={handleChange} aria-label="simple tabs example">
              <Tab label={<Skeleton variant="rect"  height={50} width={150}/>} {...a11yProps(0)} />
            </Tabs>
          </AppBar>
          <TabPanel value={value} index={0}>
          <div className="Skeleton">
            <Skeleton variant="rect"  height={250} />
              <div className="card-skeleton" >
                <div className="profile-skeleton" >
                  <Skeleton variant="circle"  height={60} width={60}/>
                  <div className="discreption-skeleton">
                    <Skeleton variant="rect"  height={20} width={250}/>
                    <Skeleton variant="rect"  height={20} width={250}/>
                  </div>
                </div>
                <div className="image-skeleton">
                  <Skeleton variant="rect" height={400} />
                </div>
                <div className="action-skeleton">
                  <Skeleton variant="rect" width={100} height={30}/>
                  <Skeleton variant="rect" width={100} height={30}/>
                  <Skeleton variant="rect" width={100} height={30}/>
                </div>
              </div>
              <div className="card-skeleton" >
                <div className="profile-skeleton" >
                  <Skeleton variant="circle"  height={60} width={60}/>
                  <div className="discreption-skeleton">
                    <Skeleton variant="rect"  height={20} width={250}/>
                    <Skeleton variant="rect"  height={20} width={250}/>
                  </div>
                </div>
                <div className="image-skeleton">
                  <Skeleton variant="rect" height={400} />
                </div>
                <div className="action-skeleton">
                  <Skeleton variant="rect" width={100} height={30}/>
                  <Skeleton variant="rect" width={100} height={30}/>
                  <Skeleton variant="rect" width={100} height={30}/>
                </div>
              </div>
            
            
          </div>
          </TabPanel>
        </div>
      }
  { groupInfo.groupdata.length > 0 &&
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

  </div>}
    </Fragment>
  );
}
