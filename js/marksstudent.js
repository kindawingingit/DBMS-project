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

    var sid = getUrlParameter("studentid");

    $("#view").click(function(event){
        event.preventDefault();
        window.location.replace("viewstudent.html?studentid="+sid);
    })

    $("#marks").click(function(event){
        event.preventDefault();
        window.location.replace("markstudent.html?studentid="+sid);
    })

    $("#edit").click(function(event){
        event.preventDefault();
        window.location.replace("editstudent.html?studentid="+sid);
    })

    $("#home").click(function(event){
        event.preventDefault();
        window.location.replace("start_student.html?studentid="+sid);
    }) 

    $("#register").click(function(event){
        event.preventDefault();
        window.location.replace("register_student.html?studentid="+sid);
    })

    var sid = getUrlParameter('studentid');
    var formData = {
        'sid' : sid
    };

    $.ajax({
        type : 'POST',
        url  : 'php/courses.php',
        data : formData,
        datatype : 'text'
    }).done(function(response){
        courses = $.parseJSON(response);
        for(course in courses){
            var coursename = courses[course][0];
            let cid = courses[course][1];

            $(".container").append(
                $("<div />")
                            .text(coursename)
                            .append(
                $("<table />")
                             .attr("class", "table table-striped table-hover table-dark table-border")
                             .attr("id", cid)
                             .append(
                                 $("<thead />")
                                              .append(
                                                  $("<tr />")
                                                            .append(
                                                                $("<th />").text("Review 1")
                                                            )
                                                            .append(
                                                                $("<th />").text("Review 2")
                                                            )
                                                            .append(
                                                                $("<th />").text("Review 3")
                                                            )
                                              )
                             )
            )
            );

            var school;
            if(cid.includes("scope") || cid.includes("SCOPE"))
                school = "scope";
            else if(cid.includes("sce") || cid.includes("SCE"))
                school = "sce";
            else if(cid.includes("senses") || cid.includes("SENSES"))
                school = "senses";
            else
                school = "sas";
            
            var formData2 = {
                'studentid' : sid,
                'courseid'  : cid,
                'school'    : school
            };

            $.ajax({
                type     : 'POST',
                url      : 'php/groups.php',
                data     : formData2,
                datatype : 'text'
            }).done(function(response){
                if(response !== "Not found")
                {
                    console.log(response);
                    response = $.parseJSON(response);

                    $("#"+cid).append(
                        $("<tbody />")
                                      .append(
                                          $("<tr />")
                                                    .append(
                                                        $("<td />")
                                                                  .text((response[0][5]))
                                                    )
                                                    .append(
                                                        $("<td />")
                                                                  .text((response[0][6]))
                                                    )
                                                    .append(
                                                        $("<td />")
                                                                  .text((response[0][7]))
                                                    )
                                      )
                    );
                }
            });
        }
    });
});