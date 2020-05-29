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

    $("#back").click(function(){
        window.location.replace("start_faculty.html?facultyid="+fid+"&school="+school);
    })

    $("#add").click(function(){
        window.location.replace("add_faculty.html?facultyid="+fid+"&school="+school);
    })
    

    $("#school #all,#school #sas,#school #scope,#school #sce,#school #senses").click(function(){
        $("#default").fadeOut();
        $("#faculty").fadeOut();
        $("#alltab").fadeOut();
        $("#sastab").fadeOut();
        $("#scopetab").fadeOut();
        $("#scetab").fadeOut();
        $("#sensestab").fadeOut();
        $("#allfaculty").fadeOut();
        $("#sasfaculty").fadeOut();
        $("#scopefaculty").fadeOut();
        $("#scefaculty").fadeOut();
        $("#sensesfaculty").fadeOut();

        var id = this.id;
        $("#"+id+"tab").fadeIn();
    });

    $("#school #all,#school #sas,#school #scope,#school #sce,#school #senses").one("click",function(){
        $("#default").fadeOut();
        $("#faculty").fadeOut();
        $("#alltab").fadeOut();
        $("#sastab").fadeOut();
        $("#scopetab").fadeOut();
        $("#scetab").fadeOut();
        $("#sensestab").fadeOut();
        $("#allfaculty").fadeOut();
        $("#sasfaculty").fadeOut();
        $("#scopefaculty").fadeOut();
        $("#scefaculty").fadeOut();
        $("#sensesfaculty").fadeOut();
        $("#back").fadeIn();

        var id = this.id;
        $("#"+id+"tab").fadeIn();

        let dataform = {
            'schoolid' : id
        };

        $.ajax({
            type     : 'POST',
            url      : 'php/courses2.php',
            data     : dataform,
            datatype : 'text'
        }).done(function(response){
            $("#"+id+"tab").fadeIn();
            console.log(response);
            var courses = jQuery.parseJSON(response);
            for(var course in courses){
                $("#"+id+"content").append(
                    $("<tr />").append(
                        $("<td />").text(courses[course][0]),
                        $("<td />").text(courses[course][1]),
                        $("<td />").text(courses[course][2])
                    )
                );
            }
        });
    });

    
    $("#faculty #all,#faculty #sas,#faculty #scope,#faculty #sce,#faculty #senses").click(function(){
        $("#default").fadeOut();
        $("#school").fadeOut();
        $("#alltab").fadeOut();
        $("#sastab").fadeOut();
        $("#scopetab").fadeOut();
        $("#scetab").fadeOut();
        $("#sensestab").fadeOut();
        $("#allfaculty").fadeOut();
        $("#sasfaculty").fadeOut();
        $("#scopefaculty").fadeOut();
        $("#scefaculty").fadeOut();
        $("#sensesfaculty").fadeOut();

        var id = this.id;
        $("#"+id+"faculty").fadeIn();
    });

    $("#faculty #all,#faculty #sas,#faculty #scope,#faculty #sce,#faculty #senses").one("click",function(){
        $("#default").fadeOut();
        $("#school").fadeOut();
        $("#alltab").fadeOut();
        $("#sastab").fadeOut();
        $("#scopetab").fadeOut();
        $("#scetab").fadeOut();
        $("#sensestab").fadeOut();
        $("#allfaculty").fadeOut();
        $("#sasfaculty").fadeOut();
        $("#scopefaculty").fadeOut();
        $("#scefaculty").fadeOut();
        $("#sensesfaculty").fadeOut();
        $("#back").fadeIn();

        var id = this.id;
        $("#"+id+"faculty").fadeIn();

        let dataform = {
            'schoolid' : id
        };

        $.ajax({
            type     : 'POST',
            url      : 'php/faculty.php',
            data     : dataform,
            datatype : 'text'
        }).done(function(response){
            $("#"+id+"faculty").fadeIn();
            console.log(response);
            var courses = jQuery.parseJSON(response);
            for(var course in courses){
                $("#"+id+"contentfaculty").append(
                    $("<tr />").append(
                        $("<td />").text(courses[course][0]),
                        $("<td />").text(courses[course][1])
                    )
                );
            }
        });
    });

    var formData = {
        'facultyid' : fid,
        'school'   : school
    };

    $.ajax({
        type : 'POST',
        url  : 'php/facultycourses.php',
        data : formData,
        datatype : 'text'
    }).done(function(response){
        let courses = $.parseJSON(response);
        for(let course in courses){
            $("#center").append(
                $('<li />')
                    .attr("class", "list-group-item btn btn-outline-primary")
                    .append(
                    $('<a />')
                        .attr("class", "btn")
                        .text(courses[course][0] + " - " + courses[course][1])
                        .click(function(event){
                            event.preventDefault();
                            window.location.replace("course_faculty.html?facultyid="+fid+"&classroom="+courses[course][2]+"&school="+school);
                        })
                )
            );
        }
    });
});