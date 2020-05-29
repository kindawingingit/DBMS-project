
 $(document).ready(function(){

    $("#home").click(function(event){
        event.preventDefault();
        let sid = getUrlParameter('studentid');
        window.location.replace("start_student.html?studentid="+sid);
    })

    $("#view").click(function(event){
        event.preventDefault();
        let sid = getUrlParameter('studentid');
        window.location.replace("viewstudent.html?studentid="+sid);
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

    $("form").submit(function(event){
        let id = getUrlParameter('studentid');
        let cid = $("input[name=courseid]").val();
        let skills = $("input[name=skills]").val();

        event.preventDefault();

        var formData = {
            'studentid': id,
            'courseid' : cid,
            'skills'   : skills
        };

        $.ajax({
            type     : 'POST',
            url      : 'php/editstudent.php',
            data     : formData,
            datatype : 'text'
        }).done(function(response){
            if(response == "Succesfull")
            {
                if(document.getElementById("defaultCheck1").checked){
                    $("#success").css('display', 'block');
                    setTimeout(function(){
                        $("#success").css('display', 'none');
                    }, 2010); 
                    window.location.replace("editstudent.html?studentid="+id);
                }
                else
                window.location.replace("start_student.html?studentid="+id);
            }
            else
            alert(response);
        })
    });
 });