import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Registry = () => {
  const navigate = useNavigate();

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

    const response = await transaction_post_json('/transactions/new', form);
    console.log(response);
  };

  const transaction_post_json = async (url: string, form: any) => {
    const response = await axios.post(url, form, {
      headers: {
        "Content-Type": "application/json"
      }
    });
    return response;
  };

  return (
    <div className="w-full max-w-md mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">registry</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="薬局" className="block font-bold mb-2">
            薬局:
          </label>
          <input
            type="text"
            name="薬局"
            value={form.薬局}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="医療機関" className="block font-bold mb-2">
            医療機関:
          </label>
          <input
            type="text"
            name="医療機関"
            value={form.医療機関}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="薬の名前" className="block font-bold mb-2">
            薬の名前:
          </label>
          <input
            type="text"
            name="薬の名前"
            value={form.薬の名前}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="頻度" className="block font-bold mb-2">
            頻度:
          </label>
          <input
            type="text"
            name="頻度"
            value={form.頻度}
            onChange={handleChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        <div className="mb-4">
        <label htmlFor="量" className="block font-bold mb-2">
          量:
        </label>
        <input
          type="text"
          id="量"
          name="量"
          value={form.量}
          onChange={handleChange}
          className="appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
          type="submit"
          onClick={() => navigate("/Confirm")}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
          確認
      </button>

      </form>
    </div>
  );
};