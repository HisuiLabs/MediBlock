import { useNavigate } from "react-router-dom";

export const Confirm = () => {
  const form = JSON.parse(localStorage.getItem("form") || "{}");
  const navigate = useNavigate();

  console.log(JSON.stringify(form));

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <h1 className="text-3xl font-bold mb-6">Confirm</h1>
      <div className="flex flex-col gap-2">
        <div className="flex gap-2">
          <label htmlFor="pharmacy">薬局:</label>
          <input
            type="text"
            name="pharmacy"
            id="pharmacy"
            value={form.薬局}
            readOnly
            className="bg-gray-100 px-2 py-1 rounded-lg"
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="hospital">医療機関:</label>
          <input
            type="text"
            name="hospital"
            id="hospital"
            value={form.医療機関}
            readOnly
            className="bg-gray-100 px-2 py-1 rounded-lg"
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="medicine">薬の名前:</label>
          <input
            type="text"
            name="medicine"
            id="medicine"
            value={form.薬の名前}
            readOnly
            className="bg-gray-100 px-2 py-1 rounded-lg"
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="frequency">頻度:</label>
          <input
            type="text"
            name="frequency"
            id="frequency"
            value={form.頻度}
            readOnly
            className="bg-gray-100 px-2 py-1 rounded-lg"
          />
        </div>
        <div className="flex gap-2">
          <label htmlFor="amount">量:</label>
          <input
            type="text"
            name="amount"
            id="amount"
            value={form.薬の名前}
            readOnly
            className="bg-gray-100 px-2 py-1 rounded-lg"
          />
        </div>
      </div>
      <div className="flex gap-2 mt-6">
        <button
          type="button"
          onClick={() => navigate("/registry")}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          戻る
        </button>
        <button
          type="button"
          onClick={() => navigate("/")}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition-colors duration-300"
        >
          完了
        </button>
      </div>
    </div>
  );
};
