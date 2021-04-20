/* eslint-env browser */
import React, { useState } from 'react';
import Cropper from 'react-easy-crop';
import Slider from '@material-ui/core/Slider';
import PropTypes from 'prop-types';

import './imageCropper.css';

const ImageCropper = ({ imageSrc, setCropped }) => {
  // Used for cropping profile pictures
  const [crop, setCrop] = useState({
    x: 0,
    y: 0,
  });
  const [croppedArea, setCroppedArea] = useState(null);
  const [zoom, setZoom] = useState(1);

  const handleCropComplete = (croppedAreaPercentage, croppedAreaPixels) => {
    setCroppedArea(croppedAreaPixels);
  };

  const createImage = (url) => new Promise((resolve, reject) => {
    const image = new Image();
    image.addEventListener('load', () => resolve(image));
    image.addEventListener('error', (error) => reject(error));
    image.setAttribute('crossOrigin', 'anonymous'); // needed to avoid cross-origin issues on CodeSandbox
    image.src = url;
  });

  function getRadianAngle(degreeValue) {
    return (degreeValue * Math.PI) / 180;
  }

  const getCroppedImg = async (imageS, pixelCrop, fileExtension, rotation = 0) => {
    const image = await createImage(imageS);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');

    const maxSize = Math.max(image.width, image.height);
    const safeArea = 2 * ((maxSize / 2) * Math.sqrt(2));

    // set each dimensions to double largest dimension to allow for a safe area for the
    // image to rotate in without being clipped by canvas context
    canvas.width = safeArea;
    canvas.height = safeArea;

    // translate canvas context to a central location on image to allow rotating around the center.
    ctx.translate(safeArea / 2, safeArea / 2);
    ctx.rotate(getRadianAngle(rotation));
    ctx.translate(-safeArea / 2, -safeArea / 2);

    // draw rotated image and store data.
    ctx.drawImage(
      image,
      safeArea / 2 - image.width * 0.5,
      safeArea / 2 - image.height * 0.5,
    );

    const data = ctx.getImageData(0, 0, safeArea, safeArea);

    // set canvas width to final desired crop size - this will clear existing context
    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    // paste generated rotate image with correct offsets for x,y crop values.
    ctx.putImageData(
      data,
      0 - safeArea / 2 + image.width * 0.5 - pixelCrop.x,
      0 - safeArea / 2 + image.height * 0.5 - pixelCrop.y,
    );

    // As Base64 string
    // return canvas.toDataURL("image/jpeg");
    return canvas.toDataURL(`image/${fileExtension}`);
  };

  // Gets the original file extension from a base 64 string
  const extractImageFileExtensionFromBase64 = (base64Data) => (
    base64Data.substring('data:image/'.length, base64Data.indexOf(';base64'))
  );

  // To convert dataUrl (which we get from our blob) to a a file object
  const dataURLtoFile = (dataurl, filename) => {
    const arr = dataurl.split(',');
    const mime = arr[0].match(/:(.*?);/)[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);

    while (n >= 0) {
      u8arr[n] = bstr.charCodeAt(n);
      n -= 1;
    }

    return new File([u8arr], filename, { type: mime });
  };

  const handleSaveButtonClicked = async () => {
    console.log('done!');
    const fileExtension = extractImageFileExtensionFromBase64(imageSrc);
    const fileName = `test.${fileExtension}`;
    const base64CroppedImage = await getCroppedImg(imageSrc, croppedArea, fileExtension);
    setCropped(dataURLtoFile(base64CroppedImage, fileName));
  };
  return (
    <div className="crop-container">
      <div className="cropper-container">
        <>
          <div className="cropper">
            <Cropper
              image={imageSrc}
              crop={crop}
              zoom={zoom}
              aspect={1}
              onCropChange={setCrop}
              onZoomChange={setZoom}
              onCropComplete={handleCropComplete}
            />
          </div>
          <div className="slider">
            <Slider
              min={1}
              max={3}
              step={0.1}
              value={zoom}
              onChange={(e, z) => setZoom(z)}
            />
          </div>
        </>
      </div>
      <div className="container-buttons">
        <button onClick={handleSaveButtonClicked} type="button">Save</button>
      </div>
    </div>
  );
};

ImageCropper.propTypes = {
  imageSrc: PropTypes.string.isRequired,
  setCropped: PropTypes.func.isRequired,
};

export default ImageCropper;
