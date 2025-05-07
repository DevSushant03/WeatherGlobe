import { NavLink } from "react-router-dom";
import errorImg from "/src/assets/errorImg.png";
export const ErrorPage = ({ err ,seterr}) => {
  return (
    <>
      <div href="/error" className="ErrorSection">
        <figure>
          <img width="200px" src={errorImg} alt="errorImage" />
        </figure>

        <h2>{err}</h2>
        <button onClick={()=>seterr(null)}>
          retry

        </button>
      </div>
    </>
  );
};
