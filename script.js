function calculate() {
    const ip = [parseInt(document.getElementById("ip1").value), parseInt(document.getElementById("ip2").value), parseInt(document.getElementById("ip3").value), parseInt(document.getElementById("ip4").value)];
    const mask = [parseInt(document.getElementById("mask1").value), parseInt(document.getElementById("mask2").value), parseInt(document.getElementById("mask3").value), parseInt(document.getElementById("mask4").value)];
    
    // Validate inputs
    if (ip.some(octet => isNaN(octet) || octet < 0 || octet > 255) || mask.some(octet => isNaN(octet) || octet < 0 || octet > 255)) {
        alert("Please enter valid numbers between 0 and 255 for each field.");
        return;
    }

    // Convert IP and Mask to binary strings
    const ipBinary = ip.map(octet => octet.toString(2).padStart(8, '0')).join('.');
    const maskBinary = mask.map(octet => octet.toString(2).padStart(8, '0')).join('.');
    
    // Calculate network address and broadcast address
    const network = ip.map((octet, index) => octet & mask[index]);
    const broadcast = ip.map((octet, index) => octet | (~mask[index] & 255));
    
    // Calculate the number of hosts
    const maskBits = mask.map(octet => octet.toString(2)).join('').replace(/0/g, '').length;
    const hostCount = Math.pow(2, 32 - maskBits) - 2;

    // Display results
    document.getElementById("binaryIp").textContent = ipBinary;
    document.getElementById("networkAddress").textContent = network.join('.');
    document.getElementById("broadcastAddress").textContent = broadcast.join('.');
    document.getElementById("hostCount").textContent = hostCount;
}
