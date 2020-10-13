import base64
from PIL import Image
from io import BytesIO

with open("video.mp4", "rb") as image_file:
    data = base64.b64encode(image_file.read())

im = Image.open(BytesIO(base64.b64decode(data)))
im.save('video.png', 'PNG')

