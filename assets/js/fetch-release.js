function getLatestRelease() {
    $.ajax({
        type: 'GET',
        url:'https://api.github.com/repos/gridcoin-community/Gridcoin-Research/releases/latest',
        crossDomain: true,
        dataType: 'json',
        success: function(data) { 
            $('#wallet-version').text('Current Wallet Version: ' + data.name); 
            
            String.prototype.endsWith = "".endsWith || function(s){return !this.split(s).pop();} //IE11 support

            data.assets.forEach(function(assetFile) {

                if (assetFile.name.endsWith("win64-setup.exe") || assetFile.name.endsWith("win64-setup-hotfix.exe")){ 
                    //hotfixes come after in alphabetical order so the link will end up being the hotfix over the non-hotfix

                    $('#64-bit-windows').attr('href', assetFile.browser_download_url).show()

                } 

                if (assetFile.name.endsWith("win32-setup.exe") || assetFile.name.endsWith("win32-setup-hotfix.exe")){

                    $('#32-bit-windows').attr('href', assetFile.browser_download_url).show()

                }
            });
        }
    });
}

 $(document).ready(function() {
    getLatestRelease();
    $(function () {
        $('[data-toggle="tooltip"]').tooltip() //Enabled bootstrap tooltips.
    })
}); 