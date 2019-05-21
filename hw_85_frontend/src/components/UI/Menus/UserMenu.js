import React, {Fragment} from 'react';
import {DropdownItem, DropdownMenu, DropdownToggle, NavItem, NavLink, UncontrolledDropdown} from "reactstrap";
import {NavLink as RouterNavLink} from "react-router-dom";
import {apiURL} from "../../../constants";


const style={
    width: "50px",
    height: '50px',
    borderRadius: '50%'
};

const UserMenu = ({user, logout}) => (
    <Fragment>
        <NavItem>
            <NavLink tag={RouterNavLink} to="/trackHistory" exact>TrackHistory</NavLink>
        </NavItem>
        <NavItem>
            <NavLink tag={RouterNavLink} to="/artists/new" exact>Add new artist</NavLink>
        </NavItem>
        <NavItem>
            <NavLink tag={RouterNavLink} to="/albums/new" exact>Add new album</NavLink>
        </NavItem>
        <NavItem>
            <NavLink tag={RouterNavLink} to="/tracks/new" exact>Add new track</NavLink>
        </NavItem>
        <UncontrolledDropdown nav inNavbar>
            <DropdownToggle nav caret>
                {user.facebookId ?
                    <img src={user.avatarImage} alt="avatar" style={style}/>
                    : <img src={apiURL + '/uploads/' + user.avatarImage} alt="avatar"   style={style}/>
                }
                Hello, {user.displayName}
            </DropdownToggle>
            <DropdownMenu right>
                <DropdownItem>
                    Show profile
                </DropdownItem>
                <DropdownItem divider/>
                <DropdownItem onClick={logout}>
                    Log out
                </DropdownItem>
            </DropdownMenu>
        </UncontrolledDropdown>
    </Fragment>
);

export default UserMenu;