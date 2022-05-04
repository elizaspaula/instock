import './EditButton.scss';
import editIcon from '../../assets/icons/edit-24px.svg';
import { Link } from "react-router-dom";

function EditButton({route}) {
  return (
    <Link to={`${route}`} className='edit-button'>
        <img className='edit-button__icon' src={editIcon} alt="Edit icon"/>
        <p className='edit-button__text'>Edit</p>
    </Link>
  )
}

export default EditButton;