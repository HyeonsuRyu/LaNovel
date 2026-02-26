import torch
import scipy.io.wavfile
import os
import uuid
from transformers import AutoProcessor, MusicgenForConditionalGeneration

class BGMGenerator:
    def __init__(self, model_id="facebook/musicgen-small"):
        self.model_id = model_id
        # 백엔드 서버 환경에 맞춰 GPU(cuda) 또는 CPU를 자동으로 세팅합니다.
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        
        self.processor = None
        self.model = None

    def load_model(self):
        """서버 구동 시 또는 최초 생성 시 모델을 메모리에 로드합니다."""
        self.processor = AutoProcessor.from_pretrained(self.model_id)
        self.model = MusicgenForConditionalGeneration.from_pretrained(self.model_id).to(self.device)
        self.sampling_rate = self.model.config.audio_encoder.sampling_rate

    def generate(self, prompt, duration_sec=10):
        """텍스트 프롬프트를 바탕으로 오디오 파형을 생성하고 .wav 파일로 저장합니다."""
        if self.model is None: 
            self.load_model()
            
        inputs = self.processor(text=[prompt], padding=True, return_tensors="pt").to(self.device)
        
        # 음원 생성 (안정적인 품질을 위해 샘플링 및 가이던스 스케일 적용)
        audio = self.model.generate(
            **inputs, 
            do_sample=True, 
            guidance_scale=3, 
            max_new_tokens=int(duration_sec * 50)
        )
        
        # 덮어쓰기 방지를 위해 UUID로 고유한 파일명 생성 (예: bgm_1a2b3c4d.wav)
        path = f"bgm_{uuid.uuid4().hex[:8]}.wav"
        scipy.io.wavfile.write(path, rate=self.sampling_rate, data=audio[0, 0].cpu().numpy())
        
        return path

    def __getstate__(self):
        """Pickle 직렬화 시 무거운 딥러닝 모델/프로세서 객체는 메모리에서 제외합니다."""
        state = self.__dict__.copy()
        state['model'] = None
        state['processor'] = None
        return state

    def __setstate__(self, state):
        """Pickle 로드 시 제외했던 상태를 복원합니다."""
        self.__dict__.update(state)