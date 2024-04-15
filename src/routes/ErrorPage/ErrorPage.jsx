import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

export const ErrorPage = () => {
  const { status } = useSelector(state => state.error)

  return (
    <div className="error">
      <div className="status">{status}</div>
      <div className="data">Сторінка не знайдена або переміщена</div>

      <Link to="/">
        <span className={`txt-md link`}>
          перейти на головну
        </span>
      </Link>

    </div>
  );
}
