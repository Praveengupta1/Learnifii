import React from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "react-router";
import { Link } from "react-router-dom";
import _ from "lodash";
import $ from "jquery";
import classnames from "classnames";
import LogoImage from "../assests/img/logo";
import { sitePagesInfo } from "./constants";
import { ButtonToolbar, Dropdown } from "react-bootstrap";
import Button from "./Buttons/index";
import LoginModal from "./LoginModal/index";
import Avatar from "./Avatar/index";
import { logout } from "./actions";
import mixpanel from "mixpanel-browser";
import { MixpanelProvider, MixpanelConsumer } from "react-mixpanel";
import { hotjar } from "react-hotjar";

hotjar.initialize("1535274", "6");

mixpanel.init("2a6714e6ecf66ce239038f5685ac2982");

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      menuActive: false,
      showLoginModal: false,
      loginModalType: "login",
      scrolled: false,
    };
    this.unmounted = false;
  }

  componentDidMount() {
    window.addEventListener("scroll", this.handleScroll);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
    this.unmounted = true;
  }

  handleScroll = () => {
    if ($(window).scrollTop() > 100) {
      this.setState({ scrolled: true });
    } else {
      this.setState({ scrolled: false });
    }
  };

  handleHamburgerClick = (event) => {
    event.preventDefault();
    const { menuActive } = this.state;
    if (menuActive) {
      this.closeMenu();
    } else {
      this.openMenu();
      $(document).one("click", { cb: () => this.closeMenu() }, function cls(e) {
        if ($(e.target).hasClass("menu_close")) {
          e.data.cb();
        } else {
          $(document).one("click", { cb: e.data.cb }, cls);
        }
      });
    }
  };

  openMenu = () => {
    if (!this.unmounted) {
      this.setState({ menuActive: true });
    }
  };

  closeMenu = () => {
    if (!this.unmounted) {
      this.setState({ menuActive: false });
    }
  };

  setLoginModalShow = (value, type) => {
    this.setState({ showLoginModal: value, loginModalType: type });
  };

  renderNavLinks = (type = "") => {
    const {
      match: { path },
      user,
      onLogout,
      profile,
    } = this.props;
    const { scrolled } = this.state;

    const activeUrl = path.substr(1);

    let linkClass = "";
    if (type === "main") {
      // no class
    } else if (type === "menu") {
      linkClass = "menu_mm";
    }

    return (
      <React.Fragment>
        {_.map(sitePagesInfo, (value, key) => (
          <li
            key={key}
            className={classnames(linkClass, {
              active:
                (key !== "home" && activeUrl.includes(key)) ||
                (activeUrl === "" && key === "home"),
            })}
          >
            {key === "blok" ? (
              <a
                href={blogRedirectUrl}
                target="_blank"
                onClick={() => {
                  mixpanel.track("Blog Button Clicked");
                }}
              >
                {value.name}
              </a>
            ) : (
              <Link to={`/${key}`}>{value.name}</Link>
            )}
          </li>
        ))}
        <li>
          <ButtonToolbar style={{ marginLeft: "-10px" }}>
            {!user ? (
              <React.Fragment>
                <Button
                  variant="light"
                  style={{ marginRight: "15px", minWidth: "100px" }}
                  onClick={() => {
                    mixpanel.track("Signup Button Clicked");
                    this.setLoginModalShow(true, "signup");
                  }}
                >
                  Signup
                </Button>
                <Button
                  variant="warning"
                  style={{ minWidth: "100px" }}
                  onClick={() => {
                    mixpanel.track("Login Button Clicked");
                    this.setLoginModalShow(true, "login");
                  }}
                >
                  Login
                </Button>
              </React.Fragment>
            ) : (
              <Dropdown alignRight>
                <Dropdown.Toggle
                  variant="light"
                  id="dropdown-basic"
                  size={scrolled ? "md" : "lg"}
                  style={{ transition: "all 0.15s linear" }}
                >
                  <div
                    style={{
                      display: "inline-block",
                      marginRight: "10px",
                      verticalAlign: "middle",
                    }}
                  >
                    {/* <Avatar
                      src={user.imageUrl}
                      name={user ? user.name : ''}
                      size={30}
                    />{' '} */}
                    {/* {user.name} */}
                    <span className="avatar">
                      {/* <label className="avatar-name">
                        <b> */}{" "}
                      {profile &&
                        (profile.data[0].profile_image_url ? (
                          <img
                            src={profile.data[0].profile_image_url}
                            className="header-profile-image"
                          />
                        ) : (
                          <label className="avatar-name">
                            <b>
                              {" "}
                              {profile.data[0].name.split(" ").map((word) => {
                                return word.charAt(0);
                              })}
                            </b>
                          </label>
                        ))}
                      {/* </b> */}
                      {/* </label> */}
                    </span>
                  </div>
                  <div
                    style={{
                      display: "inline-block",
                      marginRight: "8px",
                      verticalAlign: "middle",
                    }}
                  >
                    {/* {profile && profile.data[0].name} */}
                  </div>
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <Dropdown.Item>
                    <Link to="/myprofile">
                      <span
                        style={{ marginRight: "10px" }}
                        className="fa fa-user"
                      />
                      My Profile
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/myfavorites">
                      <span
                        style={{ marginRight: "6px" }}
                        className="fa fa-heart"
                      />
                      My Favorites
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/mybookings">
                      <span
                        style={{ marginRight: "6px" }}
                        className="fa fa-ticket"
                      />
                      My Bookings
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item>
                    <Link to="/referral">
                      <span
                        style={{ marginRight: "10px" }}
                        className="fa fa-gift"
                      />
                      Refer & Earn
                    </Link>
                  </Dropdown.Item>
                  <Dropdown.Item onClick={onLogout}>
                    <span
                      style={{ marginRight: "10px" }}
                      className="fa fa-power-off"
                    />
                    Logout
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            )}
          </ButtonToolbar>
        </li>
      </React.Fragment>
    );
  };

  render() {
    const { menuActive, showLoginModal, scrolled, loginModalType } = this.state;
    return (
      <React.Fragment>
        <header className={classnames("header", { scrolled })}>
          <div className="header_container">
            <div className="container">
              <div className="row">
                <div className="col">
                  <div className="header_content d-flex flex-row align-items-center justify-content-start">
                    <div className="logo_container">
                      <Link to="/">
                        <img
                          src={LogoImage}
                          className="logo_img"
                          alt="Learnifii Logo"
                        />
                      </Link>
                    </div>
                    <nav className="main_nav_contaner ml-auto">
                      <ul className="main_nav">
                        {this.renderNavLinks("main")}
                      </ul>
                      {
                        /* eslint-disable */
                        <div
                          className="hamburger menu_mm"
                          onClick={this.handleHamburgerClick}
                        >
                          <i
                            className="fa fa-bars menu_mm"
                            aria-hidden="true"
                          />
                        </div>
                        /* eslint-enable */
                      }
                    </nav>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </header>
        <div
          className={classnames(
            "menu d-flex flex-column align-items-end justify-content-start text-right menu_mm trans_400",
            { active: menuActive }
          )}
        >
          <div className="menu_close_container">
            <div className="menu_close">
              <div />
              <div />
            </div>
          </div>
          <nav className="menu_nav">
            <ul className="menu_mm">{this.renderNavLinks("menu")}</ul>
          </nav>
        </div>
        <LoginModal
          show={showLoginModal}
          onHide={() => this.setLoginModalShow(false, loginModalType)}
          type={loginModalType}
        />
      </React.Fragment>
    );
  }
}
Header.propTypes = {
  match: PropTypes.shape({
    path: PropTypes.string,
  }),
  user: PropTypes.object,
  onLogout: PropTypes.func,
  profile: PropTypes.object,
};

export default connect(
  (state) => ({ user: state.auth.user, profile: state.auth.profile }),
  {
    onLogout: logout,
  }
)(withRouter(Header));
