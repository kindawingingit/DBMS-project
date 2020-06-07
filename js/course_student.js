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

    $("#view").click(function(event){
        event.preventDefault();
        let sid = getUrlParameter('studentid');
        window.location.replace("viewstudent.html?studentid="+sid);
    })

    $("#marks").click(function(event){
        event.preventDefault();
        let sid = getUrlParameter('studentid');
        window.location.replace("markstudent.html?studentid="+sid);
    })

    $("#edit").click(function(event){
        event.preventDefault();
        let sid = getUrlParameter('studentid');
        window.location.replace("editstudent.html?studentid="+sid);
    })

    $("#home").click(function(event){
        event.preventDefault();
        let sid = getUrlParameter('studentid');
        window.location.replace("start_student.html?studentid="+sid);
    }) 

    $("#register").click(function(event){
        event.preventDefault();
        let sid = getUrlParameter('studentid');
        window.location.replace("register_student.html?studentid="+sid);
    })

    var sid = getUrlParameter('studentid');
    var cid = getUrlParameter('courseid');
    var school;

    if(cid.includes("scope") || cid.includes("SCOPE"))
    school = "scope";
    else if(cid.includes("sce") || cid.includes("SCE"))
    school = "sce";
    else if(cid.includes("senses") || cid.includes("SENSES"))
    school = "senses";
    else
    school = "sas";

    $("#mygroup").click(function(event){
        event.preventDefault();
        let sid = getUrlParameter('studentid');
        let cid = getUrlParameter('courseid');
        window.location.replace("group.html?studentid="+sid+"&courseid="+cid);
    })


    var formData = {
        'studentid' : sid,
        'courseid'  : cid,
        'school'    : school
    };

    $.ajax({
        type : 'POST',
        url  : 'php/classroomstudent.php',
        data : formData,
        datatype : 'text'
    }).done(function(response){
        console.log(response);
        response = jQuery.parseJSON(response);
        let classroom = response[0][0];
        console.log(classroom);
        var formData2 = {
            'studentid' : sid,
            'classroom' : classroom,
            'courseid'  : cid,
            'school' : school
        };

        if(response[0][1] == "" && response != null){
            $(".create").attr("id", classroom);
        }
        else{
            $("#creatediv").hide();
        }

        $.ajax({
            type     : 'POST',
            url      : 'php/projects.php',
            data     : formData2,
            datatype : 'text'
        }).done(function(response){
            console.log(response);
            var projects = jQuery.parseJSON(response);
            for(var project in projects){
                if (projects[project][4] === "yes")
                {
                    var requiredclass = "badge badge-success"
                    var required = "Required";
                }
                else
                {
                    var requiredclass = "badge badge-danger"
                    var required = "Not Required";
                }
             let sid = getUrlParameter("studentid");
             let groupid = projects[project][0];
             var formData5 = {
                 'studentid' : sid,
                 'groupid'   : groupid,
                 'school'    : school
             };

             $.ajax({
                 type : 'POST',
                 url : 'php/applycheck.php',
                 data : formData5,
                 datatype : 'text'
             }).done(function(response){
                 var disabled;
                 if(response === "Found")
                 disabled = true;
                 else
                 disabled = false;

            $("#thing").append(
                $("<div />")
                            .attr("class", "row")
                            .append(
                                $("<div />")
                                            .attr("class", "col-2")
                            )
                            .append(
                                $("<div />")
                                           .attr("class", "col-9")
                                           .append(
                                                $("<div />")
                                                            .attr("class", "card text-white bg-dark mb-3")
                                                            .append(
                                                                $("<div />")
                                                                            .attr("class", "card-header")
                                                                            .append(
                                                                                $("<span />")
                                                                                             .attr("class", requiredclass)
                                                                                             .text(required)
                                                                            )
                                                            )
                                                            .append(
                                                                $("<div />")
                                                                            .attr("class", "card-body")
                                                                            .append(
                                                                                $("<h5 />")
                                                                                            .attr("class", "card-title")
                                                                                            .text(projects[project][1])
                                                                                    )
                                                                            .append(
                                                                                $("<p />")
                                                                                          .attr("class", "card-text")
                                                                                          .text(projects[project][2])
                                                                                    )
                                                                            .append(
                                                                                $("<p />")
                                                                                          .attr("class", "card-text")
                                                                                          .attr("id", "studentids")
                                                                                          .text("Team members : ")
                                                                            )
                                                                            .append(
                                                                                $("<div />")
                                                                                            .attr("class", "card-footer")
                                                                                            .attr("id", "tags")
                                                                                            .append(
                                                                                                $("<button />")
                                                                                                               .attr("class", "btn btn-success apply")
                                                                                                               .text("Apply")
                                                                                                               .attr("disabled", disabled)
                                                                                                               .attr("id", projects[project][0])
                                                                                                               .css("float", "right")
                                                                                            )
                                                                             )
                                                             )
                                            )
                            )
            );
            let tags = projects[project][3].split(",");
            for(var i = 0; i<tags.length; i++){
                $("#tags").append(
                    $("<span />")
                                .attr("class", "badge badge-light")
                                .text(tags[i])
                                .css("marginLeft", "10px")
                    );
                }

             var formData3 = {
                 'groupid' : projects[project][0],
                 'school'  : school
             };   
             $.ajax({
                 type : 'POST',
                 url  : 'php/members.php',
                 data : formData3,
                 datatype : 'text'  
             }).done(function(response){
                 console.log(response);
                 let sid = getUrlParameter("studentid");
                response = $.parseJSON(response);
                let studentids = response; 
                for(studentid in studentids){
                    $("#studentids").append(
                        $("<span />")
                                     .attr("class", "badge badge-light btn profile")
                                     .text(studentids[studentid])
                                     .attr("id", studentids[studentid])
                                     .css("marginLeft", "10px")
                    );
                }
     
                $(".profile").click(function(){
                    let sid2 = this.id;
                    window.location.replace("viewstudent.html?studentid="+sid+"&search="+sid2);
                });
             });

             $(".apply").click(function(event){
                let groupid  = this.id;
                event.preventDefault();
                var formData4 ={
                    'studentid' : sid,
                    'groupid'   : groupid,
                    'school'    : school
                };
                $.ajax({
                    type : 'POST',
                    url  : 'php/applications.php',
                    data : formData4,
                    datatype : 'text'
                }).done(function(response){
                    if(response === "Successfull")
                    {
                        $(".apply").attr("disabled", "true");
                    }
                });
             });
            });

             }

             });
        
        

    });

    $(".create").click(function(event){
        event.preventDefault();
        let sid = getUrlParameter('studentid');        
        let classroom  = this.id;
        window.location.replace("create_group.html?classroom="+classroom+"&studentid="+sid);
    });


});