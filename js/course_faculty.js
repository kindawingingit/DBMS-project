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

    $("#add").click(function(){
        window.location.replace("add_faculty.html?facultyid="+fid+"&school="+school);
    })

    $("#view").click(function(){
        window.location.replace("viewmarks.html?facultyid="+fid+"&school="+school+"&classroom="+classroom);
    })

    var formData = {
        'facultyid' : fid,
        'school'    : school,
        'classroom' : classroom
    };

    $.ajax({
        type : 'POST',
        url  : 'php/facultyprojects.php',
        data : formData,
        datatype : 'text'
    }).done(function(response){
        let groupids = $.parseJSON(response);
        let groups =[];
        for(groupid in groupids){
            if(groups.includes(groupids[groupid][0]))
            continue
            else
            {
                groups.push(groupids[groupid][0]);
            }
        }

        for(let groupid in groups){
            var formData2 = {
                'school' : school,
                'groupid': groups[groupid]
            };

            $.ajax({
                type : 'POST',
                url  : 'php/facultyshow.php',
                data : formData2,
                datatype : 'text'
            }).done(function(response){
                console.log(response);
                let project = $.parseJSON(response);
                console.log(typeof(project[0][5]));
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
                                                                                .attr("class", "card-body")
                                                                                .append(
                                                                                    $("<h5 />")
                                                                                                .attr("class", "card-title")
                                                                                                .text(project[0][1])
                                                                                        )
                                                                                .append(
                                                                                    $("<p />")
                                                                                              .attr("class", "card-text")
                                                                                              .text(project[0][2])
                                                                                        )
                                                                                .append(
                                                                                    $("<p />")
                                                                                              .attr("class", "card-text")
                                                                                              .attr("id", "studentids")
                                                                                              .text("Team members : ")
                                                                                )
                                                                                .append(
                                                                                    $("<div />")
                                                                                                .html('<a href="'+project[0][5]+'">Github Link</a>')
                                                                                )
                                                                                .append(
                                                                                    $("<button />")
                                                                                                   .attr("class", "btn btn-success download")
                                                                                                   .text("Download Project Report")
                                                                                                   .attr("id", project[0][0])
                                                                                )
                                                                                .append(
                                                                                    $("<div />")
                                                                                                .attr("class", "card-footer")
                                                                                                .attr("id", "tags")
                                                                                                .append(
                                                                                                    $("<a />")
                                                                                                                   .attr("class", "btn btn-success upload")
                                                                                                                   .text("Upload Marks")
                                                                                                                   .attr("id", project[0][0])
                                                                                                                   .css("float", "right")
                                                                                                )
                                                                                                
                                                                                 )
                                                                 )
                                                )
                                )
                );

                $(".upload").click(function(event){
                    event.preventDefault();
                    let groupid = this.id;
                    window.location.replace("uploadmarks.html?facultyid="+fid+"&groupid="+groupid+"&school="+school+"&classroom="+classroom);
                });

                $(".download").click(function(event){
                    event.preventDefault();
                    let groupid = this.id;
                    let file_url = "php/Uploads/"+groupid+".docx";
                    $.ajax({
                        url : file_url,
                        method : 'GET',
                        xhrFields : {
                            responseType : 'blob'
                        },
                        success : function(data){
                            var a = document.createElement('a');
                            var url = window.URL.createObjectURL(data);
                            a.href = url;
                            a.download = groupid+" Project Report";
                            a.click();
                            a.remove();
                            window.URL.revokeObjectURL(url);
                        }
                    });
                })


                let tags = project[0][3].split(",");
            for(var i = 0; i<tags.length; i++){
                $("#tags").append(
                    $("<span />")
                                .attr("class", "badge badge-light")
                                .text(tags[i])
                                .css("marginLeft", "10px")
                    );
                }
            
                var formData3 = {
                    'groupid' : project[0][0],
                    'school'  : school
                };   
                $.ajax({
                    type : 'POST',
                    url  : 'php/members.php',
                    data : formData3,
                    datatype : 'text'  
                }).done(function(response){
                    let sid = getUrlParameter("studentid");
                   response = $.parseJSON(response);
                   let studentids = response; 
                   for(studentid in studentids){
                       $("#studentids").append(
                           $("<span />")
                                        .attr("class", "badge badge-light")
                                        .text(studentids[studentid])
                                        .attr("id", studentids[studentid])
                                        .css("marginLeft", "10px")
                       );
                   }

                });
            });


        }
    });
});
