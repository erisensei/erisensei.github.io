#!/usr/bin/env python3
"""
Image Compression Script for Eri's Travel Photos
Compresses all images in travel_photos directory for faster website loading
"""

import os
import sys
from PIL import Image
import glob

def compress_image(input_path, output_path, max_size=(1200, 1200), quality=85):
    """
    Compress an image while maintaining aspect ratio
    
    Args:
        input_path: Path to input image
        output_path: Path to save compressed image
        max_size: Maximum width/height (maintains aspect ratio)
        quality: JPEG quality (1-100)
    """
    try:
        # Open image
        with Image.open(input_path) as img:
            # Convert to RGB if necessary (for JPEG)
            if img.mode in ('RGBA', 'LA', 'P'):
                img = img.convert('RGB')
            
            # Calculate new size maintaining aspect ratio
            img.thumbnail(max_size, Image.Resampling.LANCZOS)
            
            # Save compressed image
            img.save(output_path, 'JPEG', quality=quality, optimize=True)
            
            # Get file sizes
            original_size = os.path.getsize(input_path)
            compressed_size = os.path.getsize(output_path)
            compression_ratio = (1 - compressed_size / original_size) * 100
            
            print(f"✓ {os.path.basename(input_path)}: {original_size/1024/1024:.1f}MB → {compressed_size/1024/1024:.1f}MB ({compression_ratio:.1f}% smaller)")
            
    except Exception as e:
        print(f"✗ Error processing {input_path}: {e}")

def main():
    # Create compressed directory if it doesn't exist
    compressed_dir = "travel_photos/compressed"
    os.makedirs(compressed_dir, exist_ok=True)
    
    # Get all image files
    image_extensions = ['*.jpg', '*.jpeg', '*.png', '*.bmp', '*.tiff']
    image_files = []
    
    for ext in image_extensions:
        image_files.extend(glob.glob(f"travel_photos/{ext}"))
        image_files.extend(glob.glob(f"travel_photos/{ext.upper()}"))
    
    if not image_files:
        print("No image files found in travel_photos directory!")
        return
    
    print(f"Found {len(image_files)} images to compress...")
    print("=" * 50)
    
    total_original_size = 0
    total_compressed_size = 0
    
    # Process each image
    for image_path in image_files:
        filename = os.path.basename(image_path)
        name, ext = os.path.splitext(filename)
        
        # Convert to .jpg for consistency
        output_filename = f"{name}.jpg"
        output_path = os.path.join(compressed_dir, output_filename)
        
        # Get original file size
        original_size = os.path.getsize(image_path)
        total_original_size += original_size
        
        # Compress image
        compress_image(image_path, output_path)
        
        # Get compressed file size
        compressed_size = os.path.getsize(output_path)
        total_compressed_size += compressed_size
    
    print("=" * 50)
    print(f"Compression complete!")
    print(f"Total original size: {total_original_size/1024/1024:.1f}MB")
    print(f"Total compressed size: {total_compressed_size/1024/1024:.1f}MB")
    print(f"Space saved: {(total_original_size - total_compressed_size)/1024/1024:.1f}MB")
    print(f"Compression ratio: {(1 - total_compressed_size/total_original_size)*100:.1f}%")
    print(f"\nCompressed images saved to: {compressed_dir}/")

if __name__ == "__main__":
    main() 