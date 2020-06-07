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
    var classroom = getUrlParameter("classroom");

    $("#home").click(function(){
        window.location.replace("start_faculty.html?facultyid="+fid+"&school="+school);
    })

    $("#back").click(function(){
        window.location.replace("course_faculty.html?facultyid="+fid+"&school="+school+"&classroom="+classroom);
    })

    $("#add").click(function(){
        window.location.replace("add_faculty.html?facultyid="+fid+"&school="+school);
    })

    $("#view").click(function(){
        window.location.replace("viewmarks.html?facultyid="+fid+"&school="+school+"&classroom="+classroom);
    })

    var formData = {
        'school' : school,
        'classroom' : classroom
    };

    $.ajax({
        type : 'POST',
        url  : 'php/viewclassroom.php',
        data : formData,
        datatype : 'text'
    }).done(function(response){
        console.log(response);
        let groups = $.parseJSON(response);
        let avgclass = 0;
        let i = 0;
        let pass = 0;
        let fail = 0;
        for(let group in groups){
            let total = (parseInt(groups[group][2])/5) + (parseInt(groups[group][3])*(0.3)) + (parseInt(groups[group][4])*0.5);
            avgclass += total;
            i++;
            if(total > 50)
            pass++;
            else
            fail++;
            $("#table").append(
                $("<tr />")
                          .append(
                              $("<td />")
                                        .text(groups[group][0])
                          )
                          .append(
                            $("<td />")
                                      .text(groups[group][1])
                          )
                          .append(
                            $("<td />")
                                      .text(groups[group][2])
                          )   
                          .append(
                            $("<td />")
                                      .text(groups[group][3])
                          )
                          .append(
                            $("<td />")
                                      .text(groups[group][4])
                          )
                          .append(
                            $("<td />")
                                      .text(total)
                          )
            );
        }
        avgclass = avgclass / i;
        $("#average").text("Average Marks : "+avgclass);
        $("#pass").text("No. of students passed: "+pass);
        $("#fail").text("No. of students failed: "+fail);
    });

});