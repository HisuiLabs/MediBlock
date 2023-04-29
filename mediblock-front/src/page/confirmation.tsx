export const Confirm = () => {
  const form = JSON.parse(localStorage.getItem("form") || "{}");

  // JSON.stringify()を使って、フォームの内容を文字列化したデータをコンソールに出力する
  console.log(JSON.stringify(form));

  return (
    <div>
      <h1>Confirm</h1>
      <div>
        <h2>
          <dt>薬局</dt>
          <dd>{form.薬局}</dd>
        </h2>
        <h2>
          <dt>医療機関</dt>
          <dd>{form.医療機関}</dd>
        </h2>
        <h2>
          <dt>薬の名前</dt>
          <dd>{form.薬の名前}</dd>
        </h2>
        <h2>
          <dt>頻度</dt>
          <dd>{form.頻度}</dd>
        </h2>
        <button type="submit">登録</button>
      </div>
    </div>
  );
};
