function deleteCountry(country_id){
    $.ajax({
        url: '/countries/' + country_id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};


