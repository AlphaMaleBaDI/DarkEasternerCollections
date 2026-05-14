from PIL import Image, ImageDraw, ImageFont
import os

# Paths
input_path = r'C:\Users\mails\.gemini\antigravity\brain\960e9b17-c472-4c4e-b7b6-4b93fea92544\og_image_cinematic_black_skin_v4_1778743388996.png'
output_path = r'd:\my programming\DarkEasternerCollections\public\og-image.jpg'

# Target dimensions
TARGET_W = 1200
TARGET_H = 630

# Load square image
img = Image.open(input_path)
img_w, img_h = img.size # 1024, 1024

# Create black canvas
canvas = Image.new('RGB', (TARGET_W, TARGET_H), (10, 10, 10))

# Crop original parts (Assuming a split 50/50 layout in the square image)
# Left half (Text): 0 to 512
# Right half (Model): 512 to 1024
left_part = img.crop((0, 0, 512, 1024))
right_part = img.crop((512, 0, 1024, 1024))

# Resize right part to be a 630x630 square on the right side
right_part_resized = right_part.resize((630, 630), Image.Resampling.LANCZOS)
canvas.paste(right_part_resized, (TARGET_W - 630, 0))

# Resize left part to fill the remaining 570 width
left_part_resized = left_part.resize((570, 630), Image.Resampling.LANCZOS)
canvas.paste(left_part_resized, (0, 0))

# Save as JPG
canvas.save(output_path, 'JPEG', quality=95, optimize=True)

print(f"Successfully refined landscape OG image at {output_path}")
