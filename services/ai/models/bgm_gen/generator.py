import torch
import scipy.io.wavfile
from transformers import AutoProcessor, MusicgenForConditionalGeneration

class BGMGenerator:
    def __init__(self, model_id="facebook/musicgen-small"):
        self.model_id = model_id
        self.device = "cuda" if torch.cuda.is_available() else "cpu"
        self.processor = None
        self.model = None
        self.sampling_rate = None

    def load_model(self):
        self.processor = AutoProcessor.from_pretrained(self.model_id)
        self.model = MusicgenForConditionalGeneration.from_pretrained(self.model_id).to(self.device)
        self.sampling_rate = self.model.config.audio_encoder.sampling_rate

    def generate(self, prompt, output_filename="bgm_output", duration_sec=10):
        if self.model is None:
            self.load_model()

        inputs = self.processor(text=[prompt], padding=True, return_tensors="pt").to(self.device)
        max_tokens = int(duration_sec * 50)

        audio_values = self.model.generate(**inputs, do_sample=True, guidance_scale=3, max_new_tokens=max_tokens)
        audio_data = audio_values[0, 0].cpu().numpy()

        full_path = f"{output_filename}.wav"
        scipy.io.wavfile.write(full_path, rate=self.sampling_rate, data=audio_data)
        return full_path
