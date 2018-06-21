function deletePosition(position_id){
    $.ajax({
        url: '/positions/' + position_id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};


