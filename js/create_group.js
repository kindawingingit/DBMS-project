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

    let n = 1;
    $("#add").click(function(event){
        event.preventDefault();
        n++;
        $(".studentids").append(
            $("<div />")
                        .attr("class", "form-group row")
                        .append(
                            $("<div />")
                                        .attr("class", "col-4"))
                        .append(
                            $("<div />")
                                        .attr("class", "col-8")
                                        .append(
                                            $("<input />")
                                                          .attr("type", "text")
                                                          .attr("class", "form-control")
                                                          .attr("name", "studentid"+n)
                                                          .attr("placeholder", "Student ID")
                                        )
                        )
                        );
    });

    $("#generate").click(function(){
        let sid = getUrlParameter('studentid');
        let classroom = getUrlParameter('classroom');
        let studentids = [];
        studentids[0] = sid;
        for(let i = 1; i<=n; i++)
        studentids[i] = $("input[name=studentid"+i+"]").val();
        let groupid = classroom + sid;
        for(let i = 1; i<=n; i++)
        groupid += $("input[name=studentid"+i+"]").val();
        $("input[name=groupid]").val(groupid);
    });

    let membersarray = ["yes", "no"];
    $("#submit").click(function(event){
        event.preventDefault();
        let members = $("input[name=members]").val().toLowerCase();
        if(membersarray.includes(members))
        {
            let sid = getUrlParameter('studentid');
            let classroom = getUrlParameter('classroom');
            let studentids = [];
            studentids[0] = sid;
            for(let i = 1; i<=n; i++)
            studentids[i] = $("input[name=studentid"+i+"]").val();
            let groupid = $("input[name=groupid]").val();
            let title = $("input[name=title]").val();
            let description = $("#description").val();
            let tags = $("input[name=tags]").val();

            if(classroom.includes("scope") || classroom.includes("SCOPE"))
                school = "scope";
            else if(classroom.includes("sce") || classroom.includes("SCE"))
                school = "sce";
            else if(classroom.includes("senses") || classroom.includes("SENSES"))
                school = "senses";
            else
                school = "sas";

            var formdata = {
                'groupid'    : groupid,
                'studentids' : studentids,
                'members'    : members,
                'title'      : title,
                'description': description,
                'tags'       : tags,
                'school'     : school
            };

            $.ajax({
                    type : 'POST',
                    url  : 'php/creategroup.php',
                    data : formdata,
                datatype : 'text'
            }).done(function(response){
                if(response == "Successfull")
                {
                    let sid = getUrlParameter('studentid');
                    window.location.replace('group.html?groupid='+groupid+"&school="+school);
                }
                else
                console.log(response);
            });
        }
        else
        {
            $("#client").css('display', 'block');
            setTimeout(function(){
                $("#client").css('display', 'none');
            }, 2010);
        }

    });

});