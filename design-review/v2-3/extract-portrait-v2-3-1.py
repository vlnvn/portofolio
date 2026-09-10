from pathlib import Path
import os
import sys

ROOT = Path(__file__).resolve().parents[2]
sys.path.insert(0, str(ROOT / ".tmp-tools"))
os.environ["U2NET_HOME"] = str(ROOT / ".tmp-tools" / "models")

import cv2
import numpy as np
from PIL import Image, ImageDraw
from rembg import new_session, remove


SOURCE = ROOT / "IMG_6397.JPG.jpeg"
OUT = ROOT / "design-review" / "v2-3" / "portrait"
OUT.mkdir(parents=True, exist_ok=True)

# Honest waist-up source crop. It removes the legs, most desk area, and excess room
# before segmentation; no pixels are generated or reconstructed.
source = Image.open(SOURCE).convert("RGB")
crop_box = (520, 1080, 2240, 3240)
waist_up = source.crop(crop_box)

session = new_session("u2netp")
rgba = remove(
    waist_up,
    session=session,
    alpha_matting=True,
    alpha_matting_foreground_threshold=225,
    alpha_matting_background_threshold=18,
    alpha_matting_erode_size=5,
    post_process_mask=True,
    decontaminate=True,
).convert("RGBA")

array = np.array(rgba)
alpha = array[:, :, 3]

# Keep the largest connected foreground region to remove isolated room fragments.
binary = (alpha >= 18).astype(np.uint8)
count, labels, stats, _ = cv2.connectedComponentsWithStats(binary, 8)
if count > 1:
    largest = 1 + int(np.argmax(stats[1:, cv2.CC_STAT_AREA]))
    alpha[labels != largest] = 0

# Preserve firm edges while softly suppressing low-confidence color fringe.
alpha[alpha < 10] = 0
alpha = cv2.GaussianBlur(alpha, (3, 3), 0.45)
array[:, :, 3] = alpha
rgba = Image.fromarray(array, "RGBA")

bbox = rgba.getbbox()
if bbox is None:
    raise RuntimeError("Portrait extraction produced an empty alpha matte")
x0, y0, x1, y1 = bbox
pad = 24
bbox = (max(0, x0 - pad), max(0, y0 - pad), min(rgba.width, x1 + pad), min(rgba.height, y1 + pad))
result = rgba.crop(bbox)
result.thumbnail((1200, 1500), Image.Resampling.LANCZOS)
result.save(OUT / "6397-waist-up-alpha-v231.png", optimize=True)

# Truthful environmental fallback, tightened to waist-up and with no generated fill.
fallback = waist_up.copy()
fallback.thumbnail((1200, 1500), Image.Resampling.LANCZOS)
fallback.save(OUT / "6397-waist-up-environmental-v231.jpg", quality=93, optimize=True)


def preview(background: str, path: Path) -> None:
    canvas = Image.new("RGB", (1440, 900), background)
    subject = result.copy()
    subject.thumbnail((760, 790), Image.Resampling.LANCZOS)
    canvas.paste(subject, (610, 110), subject)
    draw = ImageDraw.Draw(canvas)
    draw.text((72, 70), "VALENSIUS\nALVEN", fill="#131B2A" if background == "#F3F6FB" else "#E8EDF5")
    canvas.save(path, quality=90, optimize=True)


preview("#F3F6FB", OUT / "preview-v231-light.jpg")
preview("#070C16", OUT / "preview-v231-dark.jpg")

print({"source": source.size, "crop_box": crop_box, "result": result.size, "bbox": bbox})
