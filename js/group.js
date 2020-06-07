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
    var cid = getUrlParameter("courseid");

    $("#view").click(function(event){
        event.preventDefault();
        window.location.replace("viewstudent.html?studentid="+sid);
    })

    $("#back").click(function(){
        window.location.replace('course_student.html?studentid='+sid+"&courseid="+cid);
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
    });

    var groupid = getUrlParameter('groupid');
    var school = getUrlParameter('school');
    if(sid === undefined && cid === undefined){
        var formData2 = {
            'studentid' : '',
            'courseid'  : '',
            'groupid'   : groupid,
            'school'    : school
        };
    }
    else{
        if(cid.includes("scope") || cid.includes("SCOPE"))
        school = "scope";
        else if(cid.includes("sce") || cid.includes("SCOPE"))
        school = "sce";
        else if(cid.includes("senses") || cid.includes("SCOPE"))
        school = "senses";
        else
        school = "sas";
        var formData2 ={
            'studentid' : sid,
            'courseid'  : cid,
            'school'    : school
        }
    }

    $.ajax({
        type     : 'POST',
        url      : 'php/groups.php',
        data     : formData2,
        datatype : 'text'
    }).done(function(response){
        console.log(response);
        response = jQuery.parseJSON(response);
        var groupid = response[0][0];
        $("#groupid").text(response[0][0]);
        $("#title").text(response[0][1]);
        $("#description").text(response[0][2]);
        $("#tags").text(response[0][3]); 
        $("#members").text(response[0][4]);

        var groupid = response[0][0];
        var formData = {
            'groupid' : response[0][0],
            'school'  : school
        };

        $.ajax({
            type : 'POST',
            url  : 'php/members.php',
            data : formData,
            datatype : 'text'
        }).done(function(response){
            console.log(response);
            response = $.parseJSON(response);
           let studentids = response; 
           let sid = getUrlParameter("studentid");
           for(studentid in studentids){
               $("#team").append(
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

        $.ajax({
            type : 'POST',
            url  : 'php/applicationshow.php',
            data : formData,
            datatype : 'text'
        }).done(function(response){
            applications = $.parseJSON(response);

            $(".container").append(
                $("<table />")
                              .text("Applications:")
                              .css("width", "300px")
                              .css("position", "absolute")
                              .css("left", "600px")
                              .attr("class", "table table-striped table-hover table-dark table-border")
                              .append(
                                  $("<tbody />")
                                               .attr("id", "applicationstable")
                              )
            );
            for(application in applications){
                $("#applicationstable")
                              .append(
                                  $("<tr />")
                                            .append(
                                                $("<td />")
                                                          .append(
                                                                $("<span />")
                                                                            .attr("class", "btn badge badge-light profile")
                                                                            .text(applications[application])
                                                                            .attr("id",applications[application])
                                                                )
                                                            .append(
                                                                $("<button />")
                                                                                .attr("class", "btn btn-success")
                                                                                .attr("id",applications[application])
                                                                                .text("Accept")
                                                                                .css("marginLeft", "20px")
                                                            )
                                                            .append(
                                                                $("<button />")
                                                                               .attr("class", "btn btn-danger")
                                                                               .attr("id",applications[application])
                                                                               .text("Reject")
                                                                               .css("marginLeft", "20px")
                                                                )
                                                )
                                    );
            }
            $(".profile").click(function(){
                let sid2 = this.id;
                window.location.replace("viewstudent.html?studentid="+sid+"&search="+sid2);
            });

            $(".btn-success").click(function(event){
                event.preventDefault();
                let sid = this.id;
                let cid = getUrlParameter("courseid");
                var formData4 = {
                    'groupid' : groupid,
                    'school'  : school,
                    'studentid' : sid,
                    'courseid' : cid
                };
                $.ajax({
                    type : 'POST',
                    url  : 'php/accept.php',
                    data : formData4,
                    datatype : 'text'
                }).done(function(response){
                    window.location.reload();
                });
            });

            $(".btn-danger").click(function(event){
                event.preventDefault();
                let sid = this.id;
                var formData5 = {
                    'groupid' : groupid,
                    'school'  : school,
                    'studentid' : sid
                };
                $.ajax({
                    type : 'POST',
                    url  : 'php/reject.php',
                    data : formData5,
                    datatype : 'text'
                }).done(function(response){
                    window.location.reload();
                });
            });

        });

        $("#editgroup").click(function(event){
            event.preventDefault();
            let title = $("#title").text();
            $("#title")
                        .text("")
                        .append(
                            $("<input />")
                                          .val(title)
                                          .attr("class", "form-control")
                                          .attr("id", "titleupdate")
                        );   
            
            let description = $("#description").text();
            $("#description")
                        .text("")
                        .append(
                            $("<input />")
                                          .val(description)
                                          .attr("class", "form-control")
                                          .attr("id", "descriptionupdate")
                        ); 
                        
            let tags = $("#tags").text();
            $("#tags")
                        .text("")
                        .append(
                            $("<input />")
                                          .val(tags)
                                          .attr("class", "form-control")
                                          .attr("id", "tagsupdate")
                        ); 
            
            let more = $("#members").text();
            $("#members")
                        .text("")
                        .append(
                            $("<input />")
                                          .val(more)
                                          .attr("class", "form-control")
                                          .attr("id", "membersupdate")
                        );
            
            $("#buttons").append(
                $("<button />")
                              .text("Update Details")
                              .attr("class", "btn btn-dark")
                              .attr("id", "update")
            );

            $("#update").click(function(event){
                event.preventDefault();

                let cid = getUrlParameter('courseid');
                if(cid.includes("scope"))
                    school = "scope";
                else if(cid.includes("sce"))
                    school = "sce";
                else if(cid.includes("senses"))
                    school = "senses";
                else
                school = "sas";

                let groupid = $("#groupid").text();
                let title = $("#titleupdate").val();             
                let description = $("#descriptionupdate").val();
                let tags = $("#tagsupdate").val();
                let members = $("#membersupdate").val();

                var formData3 = {
                    'groupid' : groupid,
                    'title'   : title,
                    'description' : description,
                    'tags'    : tags,
                    'members' : members,
                    'school' : school
                };

                $.ajax({
                    type : 'POST',
                    url  : 'php/updategroup.php',
                    data : formData3,
                    datatype : 'text'
                }).done(function(response){
                    if(response === "Successfull")
                    window.location.reload();
                })

            });
    
        });

    });

    $("#upload").submit(function(event){
        event.preventDefault();
        let link = $("input[name=link]").val();
        formData6 = {
            'link' : link,
            'studentid' : sid,
            'courseid' : cid,
            'school' : school
        };
        
        $.ajax({
            type : 'POST',
            url : 'php/uploadlink.php',
            data : formData6,
            datatype : 'text'
        }).done(function(response){
            if(response === "Successfull")
            $("input[name=link]").val("");
        })
    });

    $("#report").submit(function(event){
        event.preventDefault();
        $.ajax({
            url : 'php/uploadreport.php',
            cache : false,
            contentType : false,
            processData : false,
            data : new FormData(this),
            type : 'POST',
            success: function(respone){
                if(respone === "Successfull")
                $("input[name=file]").val("");
            }
        });
    });

});