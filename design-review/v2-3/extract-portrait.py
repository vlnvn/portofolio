from pathlib import Path
import sys

sys.path.insert(0, str(Path('.tmp-tools').resolve()))
import cv2
import numpy as np
from PIL import Image

src = Path('IMG_6397.JPG.jpeg')
out = Path('design-review/v2-3/portrait')
out.mkdir(parents=True, exist_ok=True)

image = cv2.imread(str(src))
h, w = image.shape[:2]
scale = 0.5
small = cv2.resize(image, (int(w * scale), int(h * scale)), interpolation=cv2.INTER_AREA)
sh, sw = small.shape[:2]

mask = np.full((sh, sw), cv2.GC_BGD, np.uint8)

# Broad probable-person silhouette, drawn from the supplied photograph only.
poly = np.array([[390, 930], [430, 760], [535, 690], [680, 700], [790, 820],
                 [850, 980], [980, 1080], [1060, 1370], [930, 1620], [610, 1660],
                 [500, 1480], [450, 1280], [300, 1190], [300, 1050]], np.int32)
cv2.fillPoly(mask, [poly], cv2.GC_PR_FGD)

# Definite skin, hair and shirt cores guide GrabCut without synthesizing pixels.
for box in [(490, 770, 170, 210), (530, 950, 250, 360), (600, 1110, 220, 360),
            (365, 1025, 205, 130), (465, 935, 80, 170)]:
    x, y, bw, bh = box
    mask[y:y+bh, x:x+bw] = cv2.GC_FGD

bgd = np.zeros((1, 65), np.float64)
fgd = np.zeros((1, 65), np.float64)
cv2.grabCut(small, mask, None, bgd, fgd, 8, cv2.GC_INIT_WITH_MASK)
alpha = np.where((mask == cv2.GC_FGD) | (mask == cv2.GC_PR_FGD), 255, 0).astype('uint8')

# Preserve fine silhouette while reducing isolated background specks.
kernel = np.ones((3, 3), np.uint8)
alpha = cv2.morphologyEx(alpha, cv2.MORPH_OPEN, kernel)
alpha = cv2.GaussianBlur(alpha, (3, 3), 0)
alpha = cv2.resize(alpha, (w, h), interpolation=cv2.INTER_LINEAR)

rgba = cv2.cvtColor(image, cv2.COLOR_BGR2RGBA)
rgba[:, :, 3] = alpha
full = Image.fromarray(rgba)
full.save(out / '6397-waist-up-alpha-original.png', optimize=True)

# Crop out the lower body while retaining the naturally connected arms and torso.
bbox = alpha[:3350].nonzero()
if len(bbox[0]) == 0:
    raise RuntimeError('Portrait extraction produced an empty alpha matte')
x0, x1 = max(0, int(bbox[1].min()) - 40), min(w, int(bbox[1].max()) + 41)
y0, y1 = max(0, int(bbox[0].min()) - 40), min(3350, int(bbox[0].max()) + 41)
crop = full.crop((x0, y0, x1, y1))
crop.thumbnail((1100, 1500), Image.Resampling.LANCZOS)
crop.save(out / '6397-waist-up-alpha-curated.png', optimize=True)

# Environmental fallback: honest waist-up crop with no generative extension.
fallback = Image.open(src).crop((560, 1120, 2220, 3300))
fallback.thumbnail((1100, 1500), Image.Resampling.LANCZOS)
fallback.save(out / '6397-waist-up-environmental.jpg', quality=92, optimize=True)

print({'source': [w, h], 'crop': crop.size, 'alpha_bounds': [x0, y0, x1, y1]})
