$(document).ready(function() {

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

    var fid = getUrlParameter("facultyid");
    var school = getUrlParameter("school");
    var groupid = getUrlParameter("groupid");
    var classroom = getUrlParameter("classroom");

    $("#home").click(function(){
        window.location.replace("start_faculty.html?facultyid="+fid+"&school="+school);
    })

    $("#add").click(function(){
        window.location.replace("add_faculty.html?facultyid="+fid+"&school="+school);
    })


    var formData ={
        'school' : school,
        'groupid': groupid
    };

    $.ajax({
        type : 'POST',
        url  : 'php/viewmarks.php',
        data : formData,
        datatype : 'text' 
    }).done(function(response){
        marks = $.parseJSON(response);
        $("input[name=review1]").val(marks[0][0]);
        $("input[name=review2]").val(marks[0][1]);
        $("input[name=review3]").val(marks[0][2]);

    });

    $("form").submit(function(event){
        event.preventDefault();
        let review1 = $("input[name=review1]").val();
        let review2 = $("input[name=review2]").val();
        let review3 = $("input[name=review3]").val();

        var formData2 = {
            'school' : school,
            'groupid': groupid,
            'review1': review1,
            'review2': review2,
            'review3': review3
        };

        $.ajax({
            type : 'POST',
            url  : 'php/uploadmarks.php',
            data : formData2,
            datatype : 'text'
        }).done(function(response){
            if(response === "Successfull")
            window.location.replace("course_faculty.html?facultyid="+fid+"&classroom="+classroom+"&school="+school);
        });

    });

});