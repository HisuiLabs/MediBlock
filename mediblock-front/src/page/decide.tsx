import { useNavigate } from "react-router-dom";

export const Decide = () => {
  const form = JSON.parse(localStorage.getItem("form") || "{}");
  const navigate = useNavigate();

  // JSON.stringify()を使って、フォームの内容を文字列化したデータをコンソールに出力する
  console.log(JSON.stringify(form));

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-4xl font-bold mb-8">Decide</h1>
      <div className="mb-4">
        <label htmlFor="pharmacy" className="mr-4">
          薬局:
        </label>
        <input
          type="text"
          id="pharmacy"
          name="pharmacy"
          value={form.薬局}
          readOnly
          className="border border-gray-300 px-4 py-2 rounded-lg w-80"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="clinic" className="mr-4">
          医療機関:
        </label>
        <input
          type="text"
          id="clinic"
          name="clinic"
          value={form.医療機関}
          readOnly
          className="border border-gray-300 px-4 py-2 rounded-lg w-80"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="medicine" className="mr-4">
          薬の名前:
        </label>
        <input
          type="text"
          id="medicine"
          name="medicine"
          value={form.薬の名前}
          readOnly
          className="border border-gray-300 px-4 py-2 rounded-lg w-80"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="frequency" className="mr-4">
          頻度:
        </label>
        <input
          type="text"
          id="frequency"
          name="frequency"
          value={form.頻度}
          readOnly
          className="border border-gray-300 px-4 py-2 rounded-lg w-80"
        />
      </div>
      <div className="mb-4">
        <label htmlFor="dosage" className="mr-4">
          量:
        </label>
        <input
          type="text"
          id="dosage"
          name="dosage"
          value={form.量}
          readOnly
          className="border border-gray-300 px-4 py-2 rounded-lg w-80"
        />
      </div>
      <button
        type="submit"
        onClick={() => navigate("/")}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        戻る
      </button>
    </div>
  );
};
