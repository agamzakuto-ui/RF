import cv2
import numpy as np

# Read image file
image = cv2.imread('image.jpg')

# Convert to grayscale (optional, reduces data size)
gray_image = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

# Flatten to 1D array for transmission
data_array = gray_image.flatten()

# Normalize to range suitable for SDR (typically -1 to 1 or 0 to 1)
normalized_data = data_array.astype(np.float32) / 255.0

# For IQ data transmission (complex format used by SDRs):
# You can convert to complex numbers
iq_data = normalized_data.astype(np.complex64)

# Or create I and Q components separately
i_component = normalized_data
q_component = np.zeros_like(normalized_data)  # or add your Q data
complex_data = i_component + 1j * q_component

print(f"Original shape: {image.shape}")
print(f"Flattened array length: {len(data_array)}")
print(f"Data type: {complex_data.dtype}")
print(type(complex_data))
print(type(data_array))
print(complex_data)