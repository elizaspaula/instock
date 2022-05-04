import "./MainButton.scss";
import { Link } from "react-router-dom";

function MainButton(props) {
  return <Link className="button__btn btn size  button__btn--wh" {...props}></Link>;
}

export default MainButton;
