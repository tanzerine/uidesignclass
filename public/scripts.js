document.addEventListener('DOMContentLoaded', function() {
    const canvas = document.getElementById('pixelCanvas');
    const context = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight+300;

    const text = "Works";
    const pixelSize = 10;

    // Load custom font
    const font = new FontFace('MyCustomFont', 'url(fonts/yachtingdemo-q22er.ttf)');
    font.load().then(function(loadedFont) {
        console.log('Custom font loaded');
        document.fonts.add(loadedFont);

        // Calculate the appropriate font size based on canvas width, make it larger
        context.font = `700px MyCustomFont`;
        context.textAlign = 'center';
        context.textBaseline = 'middle';
        context.fillStyle = '#000';

        function drawPixelatedText(offsets) {
            console.log('Drawing pixelated text with offsets', offsets);
            context.clearRect(0, 0, canvas.width, canvas.height);
            context.fillText(text, canvas.width / 2, canvas.height / 2);
            const imageData = context.getImageData(0, 0, canvas.width, canvas.height);
            const data = imageData.data;

            context.clearRect(0, 0, canvas.width, canvas.height);

            for (let y = 0; y < canvas.height; y += pixelSize) {
                for (let x = 0; x < canvas.width; x += pixelSize) {
                    const red = data[((canvas.width * y) + x) * 4];
                    const green = data[((canvas.width * y) + x) * 4 + 1];
                    const blue = data[((canvas.width * y) + x) * 4 + 2];
                    const alpha = data[((canvas.width * y) + x) * 4 + 3];

                    if (alpha > 0) {
                        // Calculate the average brightness of the pixel
                        const brightness = (red + green + blue) / 3;
                        const color = brightness > 127 ? '#fff' : '#000';
                        context.fillStyle = color;
                        context.fillRect((x + offsets[y / pixelSize]) % canvas.width, y, pixelSize, pixelSize);


                    }
                }
            }
            context.strokeStyle = '#00000010'; // Set the color of the lines
            for (let y = 0; y < canvas.height; y += pixelSize) {
                context.beginPath();
                context.moveTo(0, y);
                context.lineTo(canvas.width, y);
                context.stroke();
            }
        }

        

        let offsets = new Array(Math.ceil(canvas.height / pixelSize)).fill(0);

        function animate() {
            for (let i = 0; i < offsets.length; i++) {
                offsets[i] += 1 + (1/i*10); // Each row moves slightly faster than the one below
            }
            drawPixelatedText(offsets);
            requestAnimationFrame(animate);
        }

        animate();
    })
});
