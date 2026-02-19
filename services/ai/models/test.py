import pickle
from models.analyze.analyzer import MultiEmotionAnalyzer
from models.bgm_gen.generator import BGMGenerator

# analyze 모델 테스트
with open("services/ai/models/analyze/model.pkl", "rb") as f:
    analyze_model = pickle.load(f)

print(type(analyze_model))
print(analyze_model.analyze("오늘 기분이 좀 우울해"))

# bgm_gen 모델 테스트
with open("services/ai/models/bgm_gen/model.pkl", "rb") as f:
    bgm_model = pickle.load(f)

print(type(bgm_model))
output_file = bgm_model.generate("Calm, lofi beats, soft piano, relaxing atmosphere")
print("생성된 파일:", output_file)

