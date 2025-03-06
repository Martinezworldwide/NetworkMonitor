// Check Internet Connection Status
function updateConnectionStatus() {
    const statusElement = document.getElementById('connection-status');
    if (navigator.onLine) {
        statusElement.innerHTML = "✅ Online";
        statusElement.style.color = "lightgreen";
    } else {
        statusElement.innerHTML = "❌ Offline";
        statusElement.style.color = "red";
    }
}

// Run a Ping Test
function runPingTest() {
    const pingStart = Date.now();
    fetch("https://www.google.com/images/branding/googlelogo/1x/googlelogo_light_color_92x30dp.png")
        .then(() => {
            const pingEnd = Date.now();
            document.getElementById('ping-result').innerHTML = `Ping: ${pingEnd - pingStart} ms`;
        })
        .catch(() => {
            document.getElementById('ping-result').innerHTML = "❌ Ping failed (possibly offline)";
        });
}

// Run a Speed Test
function runSpeedTest() {
    const imageUrl = "https://upload.wikimedia.org/wikipedia/commons/3/3a/Cat03.jpg";
    const startTime = Date.now();
    
    let img = new Image();
    img.onload = function() {
        const endTime = Date.now();
        const duration = (endTime - startTime) / 1000;
        const fileSizeInBits = 500000; // Approximate size of test image (500 KB)
        const speedMbps = (fileSizeInBits / duration) / (1024 * 1024);
        
        document.getElementById('speed-result').innerHTML = `Speed: ${speedMbps.toFixed(2)} Mbps`;
    };
    img.src = imageUrl + "?t=" + startTime; // Prevent caching
}

// Fetch IP & ISP Information
function fetchIPInfo() {
    fetch("https://ipinfo.io/json?token=YOUR_API_KEY")
        .then(response => response.json())
        .then(data => {
            document.getElementById('ip-info').innerHTML = 
                `🌍 IP: ${data.ip} <br> 🏢 ISP: ${data.org}`;
        })
        .catch(() => {
            document.getElementById('ip-info').innerHTML = "❌ Failed to fetch IP info";
        });
}

// Run checks on page load
updateConnectionStatus();
fetchIPInfo();

// Re-check connection status every 5 seconds
setInterval(updateConnectionStatus, 5000);
