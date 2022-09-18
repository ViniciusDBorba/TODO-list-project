
export const UserOptionsDropdown = ({email, onClickLogout}) => {
    return (
        <div className='user-options-drowpdown'>
            <span>{email}</span>
            <span className='logout-button' onClick={onClickLogout}>Logout</span>
        </div>
    )
}