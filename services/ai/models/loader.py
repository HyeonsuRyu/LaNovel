import pickle

def load_model(path: str = './model.pkl'):
    with open(path, 'rb') as f:
        model = pickle.load(f)
    return model