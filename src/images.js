export function loadImages(imageFiles) {
    return new Promise((resolve, reject) => {
        let count = 0;
        const total = imageFiles.length;
        const images = {};

        imageFiles.forEach(imagefile => {
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

export const imageFiles = [
    'grass-tile',
    'water-tile',
    'stone-tile',
    'character',
];
