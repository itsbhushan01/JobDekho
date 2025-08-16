import { Menu, Avatar, Switch, rem } from '@mantine/core';
import {
  

  IconMessageCircle,
  IconUserCircle,
  IconFileText,
  IconMoon,
  IconSun,
  IconLogout2,
} from '@tabler/icons-react';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { removeUser } from '../Slices/UserSlice';

function ProfileMenu() {
    const [checked,unChecked]=useState(false)
    const [opened,setOpened]=useState(false)
    const dispatch=useDispatch();
    const navigate=useNavigate();
    const user=useSelector((state:any)=>state.user);
    const handleLogout=()=>{
    
      dispatch(removeUser())
      navigate("/login");
    }
  return (
    <Menu shadow="md" width={200} opened={opened} onChange={setOpened}>
      
    <Menu.Target>
        <div className="flex items-center gap-2 cursor-pointer">
            <Avatar src='/public/JobPortalResources/avatar.png' alt="its me"/>
            <div>{user.name}</div>
        </div>
      </Menu.Target>
      <Menu.Dropdown onChange={()=>setOpened(true)}>
        <Link to={"/profile"}>
            <Menu.Item leftSection={<IconUserCircle size={14} />}>
            Profile
            </Menu.Item>
        </Link>
        <Menu.Item leftSection={<IconMessageCircle size={14} />}>
          Messages
        </Menu.Item>
        <Menu.Item leftSection={<IconFileText size={14} />}>
          Resume
        </Menu.Item>
        <Menu.Item
          leftSection={<IconMoon size={14} />}
          rightSection={
            <Switch size='md' color='mineShaft.4' onLabel={<IconSun
            style={{width:rem(16),height:rem(16)}}
            stroke={2.5}
            color="yellow"
            />}
            
            offLabel={<IconMoon 
            style={{width: rem(16),height:rem(16)}}
            stroke={2.5}
            color='cyan'
            />}

            checked={checked}
            onChange={(e)=>unChecked(e.currentTarget.checked)}

            
            >
            
            </Switch>
          }
        >
          Dark Mode
        </Menu.Item>

        <Menu.Divider />

        
        
        <Menu.Item
          color="red"
          leftSection={<IconLogout2 size={14} 
         
          />}
           onClick={handleLogout}
        >
          Logout
        </Menu.Item>
      </Menu.Dropdown>
      
    </Menu>
  );
}

export default ProfileMenu