import torch
from transformers import pipeline

class MultiEmotionAnalyzer:
    def __init__(self):
        self.device = 0 if torch.cuda.is_available() else -1
        self.emotion_model_name = "Jinuuuu/KoELECTRA_fine_tunning_emotion"
        self.style_model_name = "MoritzLaurer/mDeBERTa-v3-base-mnli-xnli"
        self.emotion_pipe = None
        self.style_pipe = None

        self.emotion_map = {
            "happy": "Upbeat, energetic pop, bright synthesizer, cheerful, rhythmic, danceable, major key",
            "sad": "Sad, melancholic, slow tempo piano, cinematic strings, emotional, ambient, minor key",
            "angry": "Aggressive, heavy metal, distorted guitar, intense drums, fast tempo, dark, powerful",
            "anxious": "Tense, suspenseful, mysterious ambient, dissonant, fast heartbeat rhythm, thriller movie soundtrack",
            "embarrassed": "Quirky, confused, irregular rhythm, comedic, light pizzicato strings",
            "heartache": "Deeply emotional, slow cello, heartbreaking, lonely, minimalist, sentimental",
            "neutral": "Calm, lofi beats, soft piano, relaxing, neutral atmosphere"
        }

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
        if self.emotion_pipe is None:
            self.emotion_pipe = pipeline("text-classification", model=self.emotion_model_name, device=self.device)
        if self.style_pipe is None:
            self.style_pipe = pipeline("zero-shot-classification", model=self.style_model_name, device=self.device)

    def analyze(self, text):
        if self.emotion_pipe is None or self.style_pipe is None:
            self.load_models()

        emo_res = self.emotion_pipe(text)[0]
        emotion_label = emo_res['label']
        base_prompt = self.emotion_map.get(emotion_label, self.emotion_map["neutral"])

        style_res = self.style_pipe(text, self.style_candidates, hypothesis_template="이 문장의 분위기는 {}입니다.")
        top_style = style_res['labels'][0]
        style_suffix = self.style_map[top_style]

        final_prompt = base_prompt + style_suffix
        return final_prompt
