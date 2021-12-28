function updateDownloads(data) {
    document.getElementById("wallet-version").textContent  = 'Current Wallet Version: ' + data.name;

    var has64BitHotfix = false;
    var has32BitHotfix = false;

    const windows64el = document.getElementById("64-bit-windows")
    const windows32el = document.getElementById("32-bit-windows")


    data.assets.forEach(function (assetFile) {
        
        const name = assetFile.name;
        const downloadURL = assetFile.browser_download_url;

        if (name.includes(".SHA256")) {
            //ignore the checksums (note can't use "continue" so else if statements are used)
        }
        else if (name.includes("win64") && name.includes("hotfix")) {

            has64BitHotfix = true;
            windows64el.href = downloadURL;
            windows64el.style.display=""; //show the button

        }
        else if (name.includes("win64") && !has64BitHotfix) {
            
            windows64el.href = downloadURL;
            windows64el.style.display = ""; 

        }
        else if (name.includes("win32") && name.includes("hotfix")) {
            
            has32BitHotfix = true;
            windows32el.href = downloadURL;
            windows32el.style.display="";
            
        }
        else if (name.includes("win32") && !has32BitHotfix) {

            windows32el.href = downloadURL;
            windows32el.style.display="";
        }
    })
}

if (document.getElementById("wallet-version")){ //only get version data on pages where version number and download links are needed
    fetch("https://api.github.com/repos/gridcoin-community/Gridcoin-Research/releases/latest")
        .then(response => response.json())
        .then(updateDownloads)
}

//Enable bootstrap tooltips.
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})