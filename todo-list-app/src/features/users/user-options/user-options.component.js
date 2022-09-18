import { FiChevronUp, FiChevronDown } from 'react-icons/fi';
import { useAuth } from '../auth/auth.context';
import { UserOptionsDropdown } from './user-options-dropdown.component';
import { logout } from '../users.service';
import { useEffect, useRef, useState } from 'react';
import { useNavigate } from "react-router-dom";
import '../../../styles/user-options.css'

export const UserOptions = () => {
    const { user, setUser } = useAuth()
    const [showDropdown, setShowDropdown] = useState(false)
    const userOptionsRef = useRef()

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (userOptionsRef.current && !userOptionsRef.current.contains(event.target)) {
                setShowDropdown(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside)
        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [userOptionsRef])

    const onClickUserOptions = () => {
        setShowDropdown(!showDropdown)
    }

    const onClickLogout = () => {
        logout().then(res => {
            if (res.status === 200) {
                setUser(null)
            }
        })
        
    }

    const renderUserOptionsDropdown = () => {
        if (showDropdown) {
            return (<UserOptionsDropdown email={user.email} onClickLogout={onClickLogout}/>)
        }
    }

    return (
        <div ref={userOptionsRef} className="user-options">
            <div className='header-info-wrapper' onClick={onClickUserOptions}>
                <span className='simple-text user-name'>{user.name}</span>
                {showDropdown ? <FiChevronUp/> : <FiChevronDown/>}
            </div>
            {renderUserOptionsDropdown()}
        </div>
    )
}