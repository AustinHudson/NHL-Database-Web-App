function updatePreviousTeam(pid, tid){
    $.ajax({
        url: '/previous_teams/pid/' + pid + '/tid/'+ tid,
        type: 'PUT',
        data: $('#update-previous-team').serialize(),
        success: function(result){
            window.location.replace("/previous_teams");
        }
    })
};