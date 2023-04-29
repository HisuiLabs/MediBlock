import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();
    return (
      <div>
        <h1>home</h1>
        <div>
          <button type="submit" onClick={() => navigate("/registry")}>
            登録
          </button>
          <button type="submit" onClick={() => navigate("/decide")}>
            確認
          </button>

        </div>
      </div>
    );
  };
