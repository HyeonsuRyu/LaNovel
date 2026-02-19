from ..loader import load_model

model = load_model()
model.generate("신나는, 밝은, 여름밤, 바닷가, 파도소리, 별빛, 친구들과 함께", "test_bgm", duration_sec=10)