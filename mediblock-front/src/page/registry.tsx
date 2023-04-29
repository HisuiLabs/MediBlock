import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Registry = () => {
  const navigate = useNavigate(); // useNavigateフックをインポート

  const [form, setForm] = useState({
    薬局: "",
    医療機関: "",
    薬の名前: "",
    頻度: "",
    量: "",
  });

  const handleChange = (event: any) => {
    setForm({ ...form, [event.target.name]: event.target.value });
  };

  const handleSubmit = async (event: any) => {
    event.preventDefault();

    // axiosを使ってPOSTリクエストを送信する
    const response = await transaction_post_json('/transactions/new', form);
    console.log(response);
  };
  //formの内容をjsonでPOSTする
  const transaction_post_json = async (url: string, form: any) => {
    const response = await axios.post(url, form, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response;
  };


  return (
    <div>
      <h1>registry</h1>
      <form onSubmit={handleSubmit}>
        <div>
          薬局:{" "}
          <input type="text" name="薬局" value={form.薬局} onChange={handleChange} />
        </div>
        <div>
          医療機関:{" "}
          <input
            type="text"
            name="医療機関"
            value={form.医療機関}
            onChange={handleChange}
          />
        </div>
        <div>
          薬の名前:{" "}
          <input
            type="text"
            name="薬の名前"
            value={form.薬の名前}
            onChange={handleChange}
          />
        </div>
        <div>
          頻度: <input type="text" name="頻度" value={form.頻度} onChange={handleChange} />
        </div>
        <div>
          量:{" "}
          <input
            type="text"
            name="量"
            value={form.量}
            onChange={handleChange}
          />
        </div>
        <button type="submit" onClick={() => navigate("/Confirm")}>
          確認
        </button>

      </form>
    </div>
  );
};
