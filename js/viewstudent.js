

 $(document).ready(function(){

    var getUrlParameter = function getUrlParameter(sParam) {
        var sPageURL = window.location.search.substring(1),
            sURLVariables = sPageURL.split('&'),
            sParameterName,
            i;
    
        for (i = 0; i < sURLVariables.length; i++) {
            sParameterName = sURLVariables[i].split('=');
    
            if (sParameterName[0] === sParam) {
                return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
            }
        }
    };

    var sid = getUrlParameter("studentid");

    $("#home").click(function(event){
        event.preventDefault();
        window.location.replace("start_student.html?studentid="+sid);
    })

    $("#edit").click(function(event){
        event.preventDefault();
        window.location.replace("editstudent.html?studentid="+sid);
    })

    var sid = getUrlParameter('studentid');
    var search = getUrlParameter("search");
    if(search == undefined){
        var formData = {
            'sid' : sid
        };
    }
    else{
        var formData = {
            'sid' : search
        };
    }

    $.ajax({
        type : 'POST',
        url  : 'php/viewstudent.php',
        data : formData,
        datatype : 'text'
    }).done(function(response){
        var courses = jQuery.parseJSON(response);
        for( var course in courses){
            $("#tablecontent").append(
                $("<tr />").append(
                    $("<td />").text(courses[course][0]),
                    $("<td />").text(courses[course][1]),
                    $("<td />").text(courses[course][2])
                )
            );
                
        }
    });
    
    $.ajax({
        type : 'POST',
        url  : 'php/studentdetails.php',
        data : formData,
        datatype : 'text'
    }).done(function(response){
        response = $.parseJSON(response);
        $("#name").text(response[0][0]);
        $("#phone").text(response[0][1]);
    });
 });