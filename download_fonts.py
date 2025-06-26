import os
import requests
import shutil

# Define the font URLs and their filenames
fonts = [
    {
        "url": "https://github.com/virtualvinodh/aksharamukha-fonts/raw/master/Sanskrit2003.ttf",
        "filename": "Sanskrit2003.ttf"
    },
    {
        "url": "https://github.com/virtualvinodh/aksharamukha-fonts/raw/master/siddhanta.ttf",
        "filename": "siddhanta.ttf"
    },
    {
        "url": "https://github.com/virtualvinodh/aksharamukha-fonts/raw/master/chandas1-2.ttf",
        "filename": "chandas1-2.ttf"
    },
    {
        "url": "https://github.com/tonsky/FiraCode/raw/master/distr/ttf/FiraCode-Regular.ttf",
        "filename": "FiraCode-Regular.ttf"
    },
    {
        "url": "https://github.com/tonsky/FiraCode/raw/master/distr/ttf/FiraCode-Bold.ttf",
        "filename": "FiraCode-Bold.ttf"
    },
    {
        "url": "https://github.com/google/fonts/raw/main/ofl/raviprakash/RaviPrakash-Regular.ttf",
        "filename": "RaviPrakash-Regular.ttf"
    }
]

# Create the fonts directory if it doesn't exist
fonts_dir = "src/assets/fonts"
os.makedirs(fonts_dir, exist_ok=True)

# Download each font
for font in fonts:
    print(f"Downloading {font['filename']}...")
    try:
        response = requests.get(font["url"], stream=True)
        
        # Check if the request was successful
        if response.status_code == 200:
            with open(f"{fonts_dir}/{font['filename']}", 'wb') as f:
                response.raw.decode_content = True
                shutil.copyfileobj(response.raw, f)
            print(f"Successfully downloaded {font['filename']}")
        else:
            print(f"Failed to download {font['filename']}, status code: {response.status_code}")
    except Exception as e:
        print(f"Error downloading {font['filename']}: {e}")

print("Font download process complete!")
