const allPlatforms = ["win64", "win32", "macos_arm", "macos"];
var platformsMissed = [...allPlatforms];

function show(element){
    element.style.display = "";
}
 
function doOtherPlatformsMatch(targetPlatform, name){
    
    for (let comparePlatform of allPlatforms){

        if (comparePlatform.length >= targetPlatform.length // don't match macos for macos_arm but do the other way around 
            && comparePlatform !== targetPlatform 
            && name.includes(targetPlatform)
            && name.includes(comparePlatform)
            ){
            return true;
        }
        
    }

    return false;
}

function updateDownloads(data, platforms=allPlatforms, previousVersion=false) {
    
    if(!previousVersion){
        document.getElementById("wallet-version").textContent  = 'Current Wallet Version: ' + data.name;
    }

    let hotfixes = [];

    for (let assetFile of data.assets) {
        
        const name = assetFile.name;
        const downloadURL = assetFile.browser_download_url;

        if (name.includes(".SHA256")) {
            continue;
        }

        for (let platform of platforms){
            if (name.includes(platform) && !doOtherPlatformsMatch(platform,name)){

                if (name.includes("hotfix")){
                    hotfixes.push(platform);
                } else if (hotfixes.includes(platform)){
                    break; //if a hotfix already exists, don't update the file
                } 
                
                const platformButton = document.getElementById(platform);
                platformButton.href = downloadURL;
                show(platformButton);

                if (name.includes("min")){
                    const startOfMinVersion = name.indexOf("min-") + 4; 
                    const endOfFilename = name.lastIndexOf(".");
                    const minVersion = name.slice(startOfMinVersion, endOfFilename);

                    platformButton.textContent += " (min OS: " + minVersion + ")";
                }

                if(previousVersion){
                    const versionWarn = document.getElementById(platform + "-version-warn");
                    versionWarn.textContent += data.name;
                    show(versionWarn);
                }

                platformsMissed = platformsMissed.filter(value => value !== platform); //remove platform from missed list
                
                break;
            }
        }
    }
}

function fillInMissing(){
    if(platformsMissed.length > 0){
        fetch("https://api.github.com/repos/gridcoin-community/Gridcoin-Research/releases")
            .then(releases => releases.json())
            .then(releases =>{
                for (let release of releases){
                    updateDownloads(release, platformsMissed, true);
                    if (platformsMissed.length === 0){
                        break;
                    }
                }
            })
    }
}

if (document.getElementById("wallet-version")){ //only get version data on pages where version number and download links are needed
    fetch("https://api.github.com/repos/gridcoin-community/Gridcoin-Research/releases/latest")
        .then(response => response.json())
        .then(updateDownloads)
        .then(fillInMissing)
}

//Enable bootstrap tooltips.
var tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'))
var tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl)
})