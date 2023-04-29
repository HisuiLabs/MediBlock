import { useNavigate } from "react-router-dom";
export const Decide = () => {
  const form = JSON.parse(localStorage.getItem("form") || "{}");
  const navigate = useNavigate();

  // JSON.stringify()を使って、フォームの内容を文字列化したデータをコンソールに出力する
  console.log(JSON.stringify(form));
  
  //registry.tsxのフォームの内容を表示する

  return (
    <div>
      <h1>Decide
      </h1>
      <div>
        薬局: <input type="text" name="薬局" value={form.薬局} readOnly />
      </div>
      <div>
        医療機関: <input type="text" name="医療機関" value={form.医療機関} readOnly />
      </div>
      <div>
        薬の名前: <input type="text" name="薬の名前" value={form.薬の名前} readOnly />
      </div>
      <div>
        頻度: <input type="text" name="頻度" value={form.頻度} readOnly />
      </div>
      <div>
          量:{" "}
          <input
            type="text"
            name="量"
            value={form.薬の名前} readOnly
          />
        </div>
      <button type="submit" onClick={() => navigate("/")}>
        戻る
      </button>
    </div>

  );
};
