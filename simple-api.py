from fastapi import FastAPI, Form
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import numpy as np
from pycaret.clustering import *
from pycaret.classification import load_model, predict_model

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/request/")
def request(total_eve_calls: int = Form(...),
            total_day_calls: int = Form(...),
            total_night_calls: int = Form(...),
            total_day_minutes: float = Form(...),
            total_day_charge: float = Form(...)):

    model = get_model()

    index = pd.Series(['Total eve calls', 'Total day calls', 'Total night calls', 'Total day minutes', 'Total day charge'])
    dataset = pd.Series([total_eve_calls, total_day_calls, total_night_calls, total_day_minutes, total_day_charge])

    dataframe = pd.DataFrame([index, dataset])
    dataframe.columns = index
    dataframe = dataframe.iloc[1:, :]

    predict = predict_model(model, dataframe)
    print(predict)
    result = predict['Label'].astype(str)[1]
    probability = predict['Score'].astype(float)[1] * 100

    return {"result": result, "probability": probability}

def get_model():
    model = load_model('deployment_28042023')
    return model
