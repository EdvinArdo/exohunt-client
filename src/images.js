export function loadImages(imagefiles) {
    return new Promise((resolve, reject) => {
        let count = 0;
        const total = imagefiles.length;
        const images = {};

        for (let i = 0; i < imagefiles.length; i++) {
            const image = new Image();
            image.onload = () => {
                count++;
                if (count >= total) {
                    resolve(images);
                }
            };
            image.src = './' + imagefiles[i] + '.png';
            images[imagefiles[i]] = image;
        }
    })
}
