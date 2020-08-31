import React from 'react'
import { Menu, Container, Button } from 'semantic-ui-react'

interface INavBar{
    openCreateForm:()=>void;
}

export const NavBar:React.FC<INavBar> = ({openCreateForm}) => {
    return (
        <Menu fixed="top" inverted>
            <Container>
                <Menu.Item header>
                    <img src="/assets/Images/logo.png" alt="logo" style={{marginRight:'10px'}}/>
                    Reactivities
                </Menu.Item>
                <Menu.Item name='Activities'/>
                <Menu.Item >
                    <Button positive content="Create Activity" onClick={()=>openCreateForm()} />
                </Menu.Item>
            </Container>
      </Menu>
    )
}
