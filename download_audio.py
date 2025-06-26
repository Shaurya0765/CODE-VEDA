import os
import requests
import shutil

# Define the audio URLs and their filenames
audio_files = [
    {
        "url": "https://archive.org/download/SarvaSukta/01ShriSuktam.mp3",
        "filename": "shri-suktam.mp3"
    },
    {
        "url": "https://archive.org/download/SarvaSukta/02PurushaSuktam.mp3",
        "filename": "purusha-suktam.mp3"
    },
    {
        "url": "https://www.freesound.org/data/previews/442/442983_4778055-lq.mp3",
        "filename": "om-chant.mp3"
    },
    {
        "url": "https://www.freesound.org/data/previews/411/411090_5121236-lq.mp3",
        "filename": "flute-bg.mp3"
    }
]

# Create the audio directory if it doesn't exist
audio_dir = "src/assets/audio"
os.makedirs(audio_dir, exist_ok=True)

# Download each audio file
for audio in audio_files:
    print(f"Downloading {audio['filename']}...")
    try:
        response = requests.get(audio["url"], stream=True)
        
        # Check if the request was successful
        if response.status_code == 200:
            with open(f"{audio_dir}/{audio['filename']}", 'wb') as f:
                response.raw.decode_content = True
                shutil.copyfileobj(response.raw, f)
            print(f"Successfully downloaded {audio['filename']}")
        else:
            print(f"Failed to download {audio['filename']}, status code: {response.status_code}")
    except Exception as e:
        print(f"Error downloading {audio['filename']}: {e}")

print("Audio download process complete!")
