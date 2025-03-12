import numpy as np
import pandas as pd
from sklearn.model_selection import train_test_split, cross_val_score
from sklearn.preprocessing import LabelEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier, RandomForestRegressor
from sklearn.linear_model import LogisticRegression, LinearRegression, Ridge, Lasso
from sklearn.svm import SVC, SVR
from sklearn.tree import DecisionTreeClassifier, DecisionTreeRegressor
from sklearn.naive_bayes import GaussianNB
from sklearn.cluster import KMeans, DBSCAN
from sklearn.decomposition import PCA
from sklearn.metrics import accuracy_score, mean_squared_error

def analyze_dataset(df, target_column=None):
    """
    Analyze dataset and determine the type of ML problem and model category.
    """
    if target_column:
        y = df[target_column]
        X = df.drop(columns=[target_column])
    else:
        X = df.copy()
        y = None
    
    # Handling categorical values
    for col in X.select_dtypes(include=['object']).columns:
        X[col] = LabelEncoder().fit_transform(X[col])
    
    # Handling missing values
    imputer = SimpleImputer(strategy='mean')
    X = pd.DataFrame(imputer.fit_transform(X), columns=X.columns)
    
    # Determine problem type and model category
    if target_column:
        if y.nunique() < 20:
            problem_type = 'classification'
            model_category = 'Supervised Learning - Classification'
        else:
            problem_type = 'regression'
            model_category = 'Supervised Learning - Regression'
    else:
        problem_type = 'clustering'
        model_category = 'Unsupervised Learning - Clustering'
    
    return X, y, problem_type, model_category

def select_best_model(X, y, problem_type):
    """
    Select the best model based on dataset characteristics.
    """
    models = {}
    
    if problem_type == 'classification':
        models = {
            'Logistic Regression': LogisticRegression(),
            'Random Forest': RandomForestClassifier(),
            'Decision Tree': DecisionTreeClassifier(),
            'Naive Bayes': GaussianNB(),
            'SVM': SVC()
        }
    elif problem_type == 'regression':
        models = {
            'Linear Regression': LinearRegression(),
            'Ridge Regression': Ridge(),
            'Lasso Regression': Lasso(),
            'Random Forest': RandomForestRegressor(),
            'Decision Tree': DecisionTreeRegressor(),
            'SVM': SVR()
        }
    else:
        models = {
            'K-Means Clustering': KMeans(n_clusters=3),
            'DBSCAN': DBSCAN(),
            'PCA': PCA(n_components=2)
        }
    
    best_model = None
    best_score = float('-inf') if problem_type == 'classification' else float('inf')
    
    for model_name, model in models.items():
        if problem_type in ['classification', 'regression']:
            scores = cross_val_score(model, X, y, cv=5, scoring='accuracy' if problem_type == 'classification' else 'neg_mean_squared_error')
            avg_score = np.mean(scores)
            
            if (problem_type == 'classification' and avg_score > best_score) or (problem_type == 'regression' and avg_score < best_score):
                best_score = avg_score
                best_model = model_name
        else:
            best_model = 'K-Means Clustering' if problem_type == 'clustering' else 'PCA'
            best_score = 'N/A'
    
    return best_model, best_score

def auto_model_selection(df, target_column=None):
    """
    Automatically selects the best ML model and category for the given dataset.
    """
    X, y, problem_type, model_category = analyze_dataset(df, target_column)
    best_model, best_score = select_best_model(X, y, problem_type)
    print(f"Model Category: {model_category}")
    print(f"Problem Type: {problem_type}")
    print(f"Best Model: {best_model} with score: {best_score}")
    return best_model, model_category

# Example usage:
# df = pd.read_csv('your_dataset.csv')
# best_model, model_category = auto_model_selection(df, 'target_column')
