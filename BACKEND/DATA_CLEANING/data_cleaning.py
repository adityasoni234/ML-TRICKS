import pandas as pd
import numpy as np
import matplotlib.pyplot as plt
from sklearn.preprocessing import LabelEncoder
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split

data = pd.read_csv("/Users/adityasoni234/Desktop/NIFTY50_all.csv")

print(data.head())
print(data.info())

data = data.dropna()

print(f"Dataset Size: {data.shape}")

le = LabelEncoder()

# Identify object (categorical) columns
categorical_columns = data.select_dtypes(include=['object']).columns

# Apply label encoding to categorical columns
for column in categorical_columns:
    data[column] = le.fit_transform(data[column])

# Verify the changes
print("\nDataset info after label encoding:")
print(data.info())

# Reload the dataset from the uploaded file
file_path = "/Users/adityasoni234/Desktop/NIFTY50_all.csv"
data = pd.read_csv("/Users/adityasoni234/Desktop/NIFTY50_all.csv")