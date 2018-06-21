

function deletePreviousTeam(pid, tid){
  $.ajax({
      url: '/previous_teams/pid/' + pid + '/tid/' + tid,
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
