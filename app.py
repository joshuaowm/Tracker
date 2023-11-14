import os
import pandas as pd

from flask import Flask, render_template, request, jsonify

app = Flask(__name__)
app.static_folder = 'static'

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        try:
            data = request.files['file']
            if not data:
                return jsonify({"error1": "No file inputted"}), 400
            df = pd.read_csv(request.files['file'])
            coordinates = df[[df.columns[0], df.columns[1]]].values.tolist()
            return render_template("map.html", coordinates=coordinates)
        except Exception as e:
            return jsonify({"error3": str(e)}), 400
        
    else:
        return render_template("index.html")

if __name__ == "__main__":
    app.run(debug=True)