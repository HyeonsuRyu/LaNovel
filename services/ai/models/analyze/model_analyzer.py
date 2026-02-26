import torch
from transformers import pipeline

class MultiEmotionAnalyzer:
    def __init__(self, model_path="./finetuned_weights"):
        # 백엔드 서버에 GPU가 있으면 GPU(0)를, 없으면 CPU(-1)를 자동으로 할당합니다.
        self.device = 0 if torch.cuda.is_available() else -1
        
        # 압축 해제된 로컬 파인튜닝 가중치 폴더를 바라봅니다.
        self.emotion_model_name = model_path
        self.style_model_name = "MoritzLaurer/mDeBERTa-v3-base-mnli-xnli"
        
        self.emotion_pipe = None
        self.style_pipe = None
        
        # 감정 라벨에 따른 음악적 특성 매핑
        self.emotion_map = {
            "happy": "Upbeat, energetic pop, bright synthesizer, cheerful, rhythmic",
            "sad": "Sad, melancholic, slow tempo piano, cinematic strings",
            "angry": "Aggressive, heavy metal, distorted guitar, intense drums",
            "anxious": "Tense, suspenseful, mysterious ambient",
            "embarrassed": "Quirky, confused, irregular rhythm, comedic",
            "heartache": "Deeply emotional, slow cello, heartbreaking",
            "neutral": "Calm, lofi beats, soft piano, relaxing"
        }
        
        # 분위기 라벨에 따른 음악적 특성 매핑
        self.style_map = {
            "미래/SF": ", futuristic, cyberpunk, electronic, sci-fi atmosphere, synthwave",
            "자연/힐링": ", nature sounds, forest, birds, acoustic guitar, organic, breeze",
            "도시/세련됨": ", city night, jazz, sophisticated, neon lights, lounge, lo-fi",
            "판타지/몽환": ", fantasy, magical, dreamy, ethereal, harp, chimes, orchestral",
            "액션/긴박함": ", action movie, epic, orchestral hits, fast pace, intense",
            "일상/카페": ", coffee shop, jazz piano, cozy, warm, background music",
            "운동/헬스": ", workout, gym, powerful beat, edm, hardstyle, running, fast tempo",
            "공포/스릴러": ", horror, scary, spooky, screaming, tense strings, dark ambient, creeping",
            "새벽/감성": ", dawn, late night, lo-fi hip hop, lonely, street light, quiet",
            "여행/드라이브": ", road trip, driving, refreshing, pop rock, freedom, breezy",
            "게임/8비트": ", 8-bit, chiptune, retro game, nintendo style, playful, arcade",
            "축제/파티": ", festival, party, edm, big room, hands up, celebration, fireworks",
            "카페/재즈": ", coffee shop, smooth jazz, saxophone, piano trio, warm, cozy"
        }
        self.style_candidates = list(self.style_map.keys())

    def load_models(self):
        """파이프라인 모델을 메모리에 로드합니다."""
        if self.emotion_pipe is None:
            self.emotion_pipe = pipeline("text-classification", model=self.emotion_model_name, device=self.device)
        if self.style_pipe is None:
            self.style_pipe = pipeline("zero-shot-classification", model=self.style_model_name, device=self.device)

    def analyze(self, text):
        """텍스트를 분석하여 최종 BGM 프롬프트를 반환합니다."""
        if self.emotion_pipe is None or self.style_pipe is None: 
            self.load_models()
            
        emo = self.emotion_pipe(text)[0]['label']
        sty = self.style_pipe(text, self.style_candidates)['labels'][0]
        
        return self.emotion_map.get(emo, self.emotion_map["neutral"]) + self.style_map[sty]

    def __getstate__(self):
        """Pickle로 .pth 저장 시, 용량이 큰 파이프라인 객체는 제외하고 직렬화합니다."""
        state = self.__dict__.copy()
        state['emotion_pipe'] = None
        state['style_pipe'] = None
        return state

    def __setstate__(self, state):
        """Pickle에서 로드될 때 상태를 복원합니다."""
        self.__dict__.update(state)