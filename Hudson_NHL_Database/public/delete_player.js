function deletePlayer(player_id){
    $.ajax({
        url: '/players/' + player_id,
        type: 'DELETE',
        success: function(result){
            window.location.reload(true);
        }
    })
};

function deletePeopleCert(pid, cid){
  $.ajax({
      url: '/people_certs/pid/' + pid + '/cert/' + cid,
      type: 'DELETE',
      success: function(result){
          if(result.responseText != undefined){
            alert(result.responseText)
          }
          else {
            window.location.reload(true)
          } 
      }
  })
};
