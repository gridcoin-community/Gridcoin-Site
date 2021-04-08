function getLatestRelease() {
    $.ajax({
        type: 'GET',
        url: 'https://api.github.com/repos/gridcoin-community/Gridcoin-Research/releases/latest',
        crossDomain: true,
        dataType: 'json',
        success: function (data) {
            $('#wallet-version').text('Current Wallet Version: ' + data.name);
            
            String.prototype.includes = String.prototype.includes || function (val, start) {'use strict'; return this.indexOf(val, start) !== -1; };
            //IE11 support

            var has64BitHotfix = false;
            var has32BitHotfix = false;

            data.assets.forEach(function (assetFile) {
                
                const name = assetFile.name;
                const downloadURL = assetFile.browser_download_url;

                if (name.includes(".SHA256")) {
                    //ignore the checksums (note can't use "continue" so else if statements are used)
                }
                else if (name.includes("win64") && name.includes("hotfix")) {

                    has64BitHotfix = true;
                    $('#64-bit-windows').attr('href', downloadURL).show();

                }
                else if (name.includes("win64") && !has64BitHotfix) {

                    $('#64-bit-windows').attr('href', downloadURL).show();

                }
                else if (name.includes("win32") && name.includes("hotfix")) {
                    
                    has32BitHotfix = true;
                    $('#32-bit-windows').attr('href', downloadURL).show();
                    
                }
                else if (name.includes("win32") && !has32BitHotfix) {

                    $('#32-bit-windows').attr('href', downloadURL).show();

                }
            });
        }
    });
}

 $(document).ready(function () {
    getLatestRelease();
    $(function () {
        $('[data-toggle="tooltip"]').tooltip(); //Enabled bootstrap tooltips.
    })
});