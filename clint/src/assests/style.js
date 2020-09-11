import { makeStyles, withStyles } from "@material-ui/core/styles";
import Badge from "@material-ui/core/Badge";
import { indigo } from "@material-ui/core/colors";
export const useStyles = makeStyles((theme) => ({
  TabSkeleton: {
    marginTop: "10px",
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    "& .MuiTabs-indicator": {
      background: "white",
    },
    "& .MuiTab-textColorPrimary": {
      margin: "10px",
    },
    "& .Mui-selected": {
      color: "white",
      background: "white",
      "&:focus": {
        outline: "none",
      },
    },

    "& .MuiTabPanel-root": {
      padding: "0",
    },
  },
  Tabs: {
    marginTop: "10px",
    flexGrow: 1,
    width: "100%",
    backgroundColor: theme.palette.background.paper,
    "& .MuiTabs-indicator": {
      background: "#f07114",
    },
    "& .MuiTab-textColorPrimary": {
      margin: "10px",
      borderRadius: 3,
      border: "1px solid #f07114",
    },
    "& .Mui-selected": {
      color: "white",
      background: "linear-gradient(45deg, #f07114 30%,  #f07114 90%)",
      "&:focus": {
        outline: "none",
      },
    },

    "& .MuiTabPanel-root": {
      padding: "0",
    },
  },

  root: {
    background: "linear-gradient(45deg, #f07114 30%,  #f07114 90%)",
    borderRadius: 3,
    border: 0,
    color: "white",
    height: 48,
    padding: "0 px",
    fontWeight: "400",
    "&:focus": {
      outline: "0",
    },
  },
  button: {
    borderRadius: 3,
    height: 48,
    border: 0,
    padding: "0px",
    fontWeight: "400",
    "&:focus": {
      outline: "0",
    },
  },

  Avatar1: {
    "& > *": {
      itemAlign: "center",
      margin: theme.spacing(3),
      "&:before": {
        content: '""',
        position: "absolute",
        top: "-8px",
        left: "-8px",
        background:
          "linear-gradient(45deg, rgba(240,113,20,1) 0%, rgba(240,113,20,1) 40%, rgba(127,160,131,1) 70%, rgba(114,165,143,1) 85%, rgba(0,212,255,1) 100%)",
        width: "calc(100% + 16px)",
        height: "calc(100% + 16px)",
        borderRadius: "50%",
      },
    },
  },

  paper: {
    margin: "3%",
    padding: "2% 5% 2% 5%",
    "& p": {
      lineHeight: "25px",
      wordSpacing: "2px",
      margin: "5px",
      "& a": {
        color: "#1b6ca8",
        textDecoration: "none",
        wordSpacing: "5px",
      },
    },
  },
  Iconbutton: {
    "&:focus": {
      outline: "none",
    },
  },
  iconstyle: {
    fontSize: 30,
    color: "#3e4248",
  },
  input: {
    display: "none",
  },
  cards: {
    margin: "20px auto",
    maxWidth: 900,
  },
  media: {
    height: 0,
    margin: "2%",
    paddingTop: "56.25%", // 16:9
  },

  avatarpost: {
    backgroundColor: indigo[100],
    color: "#7986cb",
  },
  comment: {
    display: "flex",
    "& input": {
      width: "90%",
      lineHeight: "50px",
      border: "1px solid gray",
      margin: "auto auto auto 20px",
      borderRadius: "50px",
      padding: "2px 2px 2px 10px",
      fontSize: "25px",
      "&:focus": {
        outline: "none",
      },
    },
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  papermodal: {
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

export const StyledBadge = withStyles((theme) => ({
  badge: {
    backgroundColor: "#44b700",
    color: "#44b700",
    boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
    "&::after": {
      position: "absolute",
      top: 0,
      left: 0,
      width: "100%",
      height: "100%",
      borderRadius: "50%",
      animation: "$ripple 1s infinite ease-in-out",
      border: "1px solid currentColor",
      content: '""',
    },
  },
  "@keyframes ripple": {
    "0%": {
      transform: "scale(.8)",
      opacity: 0.5,
    },
    "100%": {
      transform: "scale(2.4)",
      opacity: 0,
    },
  },
}))(Badge);
