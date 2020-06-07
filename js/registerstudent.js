
 $(document).ready(function() {

    $("#home").click(function(event){
        event.preventDefault();
        let sid = getUrlParameter('studentid');
        window.location.replace("start_student.html?studentid="+sid);
    })

    $("#marks").click(function(event){
        event.preventDefault();
        let sid = getUrlParameter('studentid');
        window.location.replace("markstudent.html?studentid="+sid);
    })

    $("#view").click(function(event){
        event.preventDefault();
        let sid = getUrlParameter('studentid');
        window.location.replace("viewstudent.html?studentid="+sid);
    })

    $("#edit").click(function(event){
        event.preventDefault();
        let sid = getUrlParameter('studentid');
        window.location.replace("editstudent.html?studentid="+sid);
    })

    $("#back").click(function(){
        let sid = getUrlParameter('studentid');
        window.location.replace("start_student.html?studentid="+sid);
    })

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

    

    $("#generate").click(function(event){
        event.preventDefault();

        var id   = $("input[name=courseid]").val();
        var slot = $("input[name=slot]").val();
        var fid  = $("input[name=facultyid]").val(); 
        
        if(!slotarray.includes(slot))
        {
            $("#client2").css('display', 'block');
            setTimeout(function(){
                $("#client2").css('display', 'none');
            }, 2010);
        }

        var str = fid + id + slot;
        $("input[name=classroom]").val(str); 
    });

    let slotarray = ["A1", "A2","B1", "B2","C1", "C2","D1", "D2","E1", "E2","F1", "F2","G1", "G2"];
    let schoolarray = ["sas", "scope", "sce", "senses"];
    $("form").submit(function(event){
        event.preventDefault();

        var school = $("input[name=school]").val().toLowerCase(); 
        var classroom = $("input[name=classroom]").val();
        var cid = $("input[name=courseid]").val();
        var skills = $("input[name=skills]").val();
        var sid = getUrlParameter("studentid");

        if(!(schoolarray.includes(school)))
        { 
            $("#client1").css('display', 'block');
            setTimeout(function(){
                $("#client1").css('display', 'none');
            }, 2010);
        }


        else{

            var ctr = 0;

            var formData = {
                'studentid'  : sid,
                'school'     : school,
                'classroom'  : classroom
            };

            $.ajax({
                type     : "POST",
                url      : "php/registerstudent.php",
                data     : formData,
                datatype : "text"
            }).done(function(response){
                console.log(response);
                if(response == "Succesfull")
                {
                    if(document.getElementById("defaultCheck1").checked)
                    ctr++;
                }
                else
                alert(response);

                

            });

            var formData2 = {
                'studentid': sid,
                'courseid' : cid,
                'skills'   : skills
            };
    
            $.ajax({
                type     : 'POST',
                url      : 'php/create4.php',
                data     : formData2,
                datatype : 'text'
            });
            
        }

        
        if(ctr == 1)
        {
            window.location.replace("register_student.html?studentid="+sid);
        }
        else
        {
            window.location.replace("start_student.html?studentid="+sid);
        }

    })
 });
 