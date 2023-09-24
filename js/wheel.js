const colors = ["#FFD699", "#FFB6C1", "#AEC6CF", "#C2B280"]; // Slightly lighter pastel colors
const canvas = document.getElementById("wheel-canvas");
const pointerContainer = document.querySelector(".pointer-container");
const ctx = canvas.getContext("2d");

const wheelRadius = canvas.width / 2;
const centerX = wheelRadius;
const centerY = wheelRadius;
const sliceAngle = (2 * Math.PI) / items.length;

let currentRotation = 0; // Track the current rotation angle

// Function to draw a wheel segment
function drawSegment(startAngle, endAngle, color, text) {
    // Draw black lines between segments
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, wheelRadius, startAngle, endAngle);
    ctx.closePath();
    ctx.strokeStyle = "#000"; // Black color for lines
    ctx.lineWidth = 2; // Line width
    ctx.stroke();

    // Fill segment with color
    ctx.beginPath();
    ctx.moveTo(centerX, centerY);
    ctx.arc(centerX, centerY, wheelRadius, startAngle, endAngle);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();

    // Draw text
    const textRadius = wheelRadius * .82; // Adjust the text position
    const angle = (startAngle + endAngle) / 2; // No need to rotate text
    const x = centerX + textRadius * Math.cos(angle);
    const y = centerY + textRadius * Math.sin(angle);

    ctx.save(); // Save the current canvas state
    ctx.translate(x, y); // Translate to the text position
    ctx.rotate(angle); // Rotate text by 90 degrees within its slice
    ctx.fillStyle = "white"; // White text color
    ctx.font = "16px Arial"; // Adjust font size
    ctx.textAlign = "center"; // Center-align text
    ctx.fillText(text, 0, 0); // Draw text at (0, 0)
    ctx.restore(); // Restore the canvas state
}


// Draw the wheel segments
items.forEach((item, index) => {
    const startAngle = index * sliceAngle;
    const endAngle = startAngle + sliceAngle;
    const color = colors[index % colors.length];
    drawSegment(startAngle, endAngle, color, item);
});


function spinWheel() {
    randomDegree = 3600 + Math.floor(Math.random() * 3600); // Random rotation between 3600 - 7200 degrees

    canvas.style.transform = `rotate(${randomDegree}deg)`;

    // Prevent multiple spins by disabling the button
    document.querySelector(".spin-button").hidden = true;


    let selectedSegment = (Math.floor((19 - (randomDegree % 360) / (360 / items.length))) + items.length) % items.length;

    // If selectedSegment is 0, set it to items.length
    if (selectedSegment === 0) {
        selectedSegment = items.length;
    }

    selectedItem = items[selectedSegment - 1];

    canvas.addEventListener('transitionend', () => {
        console.log("Selected Item:", selectedItem);
        console.log("URL: ", urls[selectedSegment - 1]);

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        sleep(400).then(() => { 
            document.getElementById('wheel').style.animation="shake 0.5s infinite"; 
            sleep(750).then(() => { 
                window.location.href = urls[selectedSegment - 1];
            });
        });  
    });
}