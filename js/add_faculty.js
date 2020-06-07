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

    var fid = getUrlParameter('facultyid');
    var school = getUrlParameter('school');

    $("#home").click(function(){
        window.location.replace("start_faculty.html?facultyid="+fid+"&school="+school);
    })

    $("#generate").click(function(event){
        event.preventDefault();

        var id   = $("input[name=courseid]").val();
        var slot = $("input[name=slot]").val();
        var fid = getUrlParameter('facultyid');

        var str = fid + id + slot;
        $("input[name=classroom]").val(str); 
    });

    let slotarray = ["A1", "A2","B1", "B2","C1", "C2","D1", "D2","E1", "E2","F1", "F2","G1", "G2"];
    $("form").submit(function(event){
        event.preventDefault();

        var id   = $("input[name=courseid]").val();
        var slot = $("input[name=slot]").val();
        var fid = getUrlParameter('facultyid');
        var school = getUrlParameter('school');
        var classroom = $("input[name=classroom]").val();

        if(!slotarray.includes(slot))
        {
            $("#client").css('display', 'block');
            setTimeout(function(){
                $("#client").css('display', 'none');
            }, 2010);
        }
        else{
            var formData = {
                'id'         : id,
                'slot'       : slot,
                'facultyid'  : fid,
                'school'     : school,
                'classroom'  : classroom
            };

            $.ajax({
                type     : "POST",
                url      : "php/create2.php",
                data     : formData,
                datatype : "text"
            }).done(function(response){
                if(response == "Succesfull")
                {
                    window.location.replace("start_faculty.html?facultyid="+fid+"&school="+school);
                }
            });
        }

    })
 });