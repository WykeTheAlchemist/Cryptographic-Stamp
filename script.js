const photoUpload = document.getElementById('photo-upload');

const watermarkBtn = document.getElementById('watermark-btn');

const watermarkedPhoto = document.getElementById('watermarked-photo');

const downloadLink = document.getElementById('download-link');



watermarkBtn.addEventListener('click', () => {

	const photo = photoUpload.files[0];

	const reader = new FileReader();

	reader.onload = (e) => {

		const photoData = e.target.result;

		const stamp = generateCryptographicStamp();

		const watermarkedPhotoData = addWatermark(photoData, stamp);

		watermarkedPhoto.src = watermarkedPhotoData;

		downloadLink.href = watermarkedPhotoData;

		downloadLink.style.display = 'block';

	};

	reader.readAsDataURL(photo);

});



function generateCryptographicStamp() {

	// Generate a random cryptographic stamp (e.g., using a hash function)

	const stamp = crypto.randomUUID();

	return stamp;

}



function addWatermark(photoData, stamp) {

	// Add the watermark to the photo data (e.g., using Canvas API)

	const canvas = document.createElement('canvas');

	const ctx = canvas.getContext('2d');

	const photo = new Image();

	photo.src = photoData;

	canvas.width = photo.width;

	canvas.height = photo.height;

	ctx.drawImage(photo, 0, 0);

	ctx.font = '24px Arial';

	ctx.textAlign = 'right';

	ctx.textBaseline = 'bottom';

	ctx.fillStyle = 'rgba(255, 255, 255, 0.5)';

	ctx.fillText(stamp, canvas.width - 10, canvas.height - 10);

	return canvas.toDataURL('image/jpeg');

}

