function encryptFile() {
    const fileInput = document.getElementById("fileInput").files[0];
    const password = document.getElementById("password").value;
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const encrypted = CryptoJS.AES.encrypt(event.target.result, password).toString();
        downloadFile(encrypted, fileInput.name + ".enc");
        document.getElementById("status").innerText = "File encrypted successfully.";
    };
    reader.readAsText(fileInput);
}

function decryptFile() {
    const fileInput = document.getElementById("fileInput").files[0];
    const password = document.getElementById("password").value;
    const reader = new FileReader();
    
    reader.onload = function(event) {
        const decrypted = CryptoJS.AES.decrypt(event.target.result, password).toString(CryptoJS.enc.Utf8);
        if (!decrypted) {
            document.getElementById("status").innerText = "Decryption failed. Wrong password?";
            return;
        }
        downloadFile(decrypted, fileInput.name.replace(".enc", ""));
        document.getElementById("status").innerText = "File decrypted successfully.";
    };
    reader.readAsText(fileInput);
}

function downloadFile(content, fileName) {
    const blob = new Blob([content], { type: "text/plain" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob);
    a.download = fileName;
    a.click();
}
