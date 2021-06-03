import {
    Divider,
    List,
    ListItem,
    ListItemIcon,
} from '@material-ui/core'
import ListItemText from '@material-ui/core/ListItemText'
import AddIcon from '@material-ui/icons/Add'
import ExitToAppTwoToneIcon from '@material-ui/icons/ExitToAppTwoTone'
import StarIcon from '@material-ui/icons/Star'
import firebase from 'firebase'
import { useRouter } from 'next/router'
import React from 'react'

import { useCurrentUser } from '../../lib/useCurrentUser'

import {
    SideBarDrawer,
    SideBarPageContent,
    SideBarRoot,
    SidebarTitle,
    SideBarUsername,
} from './SideBar.styles'

const menuItems = [
    {
        icon: <AddIcon />,
        path: '/dashboard',
        text: 'Dashboard',
    },
    {
        icon: <StarIcon />,
        path: '/favorites',
        text: 'Favorites',
    },
]

export const SideBar: React.FunctionComponent = (props) => {
    const router = useRouter()
    const user = useCurrentUser()

    const handleLogout = () => {
        void firebase
            .auth()
            .signOut()
            .then(() => {
                void router.push('/')
            })
    }

    return (
        <SideBarRoot>
            <SideBarDrawer>
                <List>
                    <SidebarTitle>
                        4Later
                    </SidebarTitle>
                    <SideBarUsername>
                        {user.username}
                    </SideBarUsername>
                    <Divider />
                    {menuItems.map((item) => (
                        <ListItem
                            button={true}
                            key={item.text}
                            onClick={(() => {
                                void router.push(item.path)
                            })}
                        >
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text} />
                        </ListItem>
                    ))}
                </List>
                <List>
                    <ListItem
                        button={true}
                        onClick={handleLogout}
                    >
                        <ListItemIcon>
                            <ExitToAppTwoToneIcon />
                        </ListItemIcon>
                        <ListItemText primary="Logout" />
                    </ListItem>
                </List>
            </SideBarDrawer>
            <SideBarPageContent>
                {props.children}
            </SideBarPageContent>
        </SideBarRoot>
    )
}
