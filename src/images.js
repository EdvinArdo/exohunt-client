export function loadImages(imagefiles) {
    return new Promise((resolve, reject) => {
        let count = 0;
        const total = imagefiles.length;
        const images = {};

        imagefiles.forEach(imagefile => {
            const image = new Image();
            image.onload = () => {
                count++;
                if (count >= total) {
                    resolve(images);
                }
            };
            image.src = './' + imagefile + '.png';
            images[imagefile] = image;
        })
    })
}
