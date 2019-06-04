function getLatestRelease() {
    $.ajax({
        type: 'GET',
        url:'https://api.github.com/repos/gridcoin-community/Gridcoin-Research/releases/latest',
        crossDomain: true,
        dataType: 'json',
        success: function(data) { 
            $('#wallet-version').text('Current Wallet Version: ' + data['name']); 
        }
    });
}

 $(document).ready(function() {
   getLatestRelease();
}); 