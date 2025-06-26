import os
import requests
import shutil
import random
import time
from PIL import Image, ImageDraw, ImageFont
import io

# Create the sponsors directory if it doesn't exist
sponsors_dir = "src/assets/images/sponsors"
os.makedirs(sponsors_dir, exist_ok=True)

# Function to generate a simple logo with text
def create_logo(name, filename, bg_color, text_color="#FFFFFF"):
    # Create an image with a background color
    width, height = 400, 200
    image = Image.new('RGB', (width, height), color=bg_color)
    draw = ImageDraw.Draw(image)
    
    # Add some decorative elements
    for i in range(5):
        x1 = random.randint(0, width)
        y1 = random.randint(0, height)
        x2 = random.randint(0, width)
        y2 = random.randint(0, height)
        draw.line((x1, y1, x2, y2), fill=text_color, width=1)
    
    # Draw a border
    draw.rectangle([(10, 10), (width-10, height-10)], outline=text_color, width=2)
    
    # Add text
    try:
        # Try to use a system font
        try:
            font = ImageFont.truetype("arial.ttf", 32)
        except:
            font = ImageFont.truetype("DejaVuSans.ttf", 32)
    except:
        # Fall back to default font
        font = ImageFont.load_default()
    
    # Calculate text position to center it
    text_width, text_height = draw.textsize(name, font=font)
    position = ((width-text_width)//2, (height-text_height)//2)
    
    # Draw the text
    draw.text(position, name, fill=text_color, font=font)
    
    # Save the image
    image.save(os.path.join(sponsors_dir, filename))
    print(f"Created logo for {name}")

# Generate logos for sponsors
sponsors = [
    {"name": "TechVeda", "filename": "techveda.png", "bg_color": "#FF6B35"},
    {"name": "Sanskrit Computing", "filename": "sanskrit-computing.png", "bg_color": "#8A4FFF"},
    {"name": "Dharma Cloud", "filename": "dharma-cloud.png", "bg_color": "#4CAF50"},
    {"name": "Mantra Labs", "filename": "mantra-labs.png", "bg_color": "#2196F3"},
    {"name": "AyurTech", "filename": "ayurtech.png", "bg_color": "#FF9800"},
    {"name": "Chakra Systems", "filename": "chakra-systems.png", "bg_color": "#9C27B0"},
    {"name": "Ganesha Innovations", "filename": "ganesha-innovations.png", "bg_color": "#F44336"},
    {"name": "Saraswati EdTech", "filename": "saraswati-edtech.png", "bg_color": "#3F51B5"},
    {"name": "Indra Networks", "filename": "indra-networks.png", "bg_color": "#009688"},
    {"name": "Vedic Computing Association", "filename": "vca.png", "bg_color": "#795548"},
    {"name": "Sanskrit Hackers", "filename": "sanskrit-hackers.png", "bg_color": "#607D8B"},
    {"name": "DevDharma", "filename": "devdharma.png", "bg_color": "#FFC107"}
]

# Create each logo
for sponsor in sponsors:
    create_logo(sponsor["name"], sponsor["filename"], sponsor["bg_color"])

print("All sponsor logos created successfully!")
