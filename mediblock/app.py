from flask import Flask, jsonify, request

app = Flask(__name__)

@app.route('/transaction/new', methods=['POST'])
def new_transaction():
    data = request.get_json()
    薬局 = data['薬局']
    医療機関 = data['医療機関']
    薬の名前 = data['薬の名前']
    頻度 = data['頻度']

    # ここで取得したデータを使用して必要な処理を実行します

    response = {'message': '登録が完了しました'}
    return jsonify(response), 200

if __name__ == '__main__':
    app.run(debug=True)
