
 $(document).ready(function() {

    let schoolarray = ["sas", "scope", "sce", "senses"];
    $("#faculty").submit(function(event){

        var school = $("input[name=school]").val().toLowerCase();
         var facultyid = $("input[name=facultyid]").val();
         let password = $("input[name=password]").val();

         event.preventDefault();

         if(!(schoolarray.includes(school)))
        { 
            $("#client").css('display', 'block');
            setTimeout(function(){
                $("#client").css('display', 'none');
            }, 2010);
        }

        else{
         var formData = {
             'school'    : school,
             'facultyid' : facultyid,
             'password'  : password
         };

         $.ajax({
             type : 'POST',
             url  : 'php/index.php',
             data : formData,
             datatype : 'text'
         })
         .done(function(mssg){
             if(mssg == "Succesfull")
             {window.location.replace("start_faculty.html?facultyid="+facultyid+"&school="+school);}
             if(mssg == "Failed")
             {
                $("#server").css('display', 'block');
                setTimeout(function(){
                    $("#server").css('display', 'none');
                }, 2010);
             }
         });
        }
     });

     $("#student").submit(function(event){

        event.preventDefault();

        let sid = $("input[name=studentid]").val();
        let password = $("input[name=studentpassword]").val();

        var formData = {
            'sid'      : sid,
            'password' : password
        };

        $.ajax({
            type : 'POST',
            url  : 'php/indexstudent.php',
            data : formData,
            datatype : 'text'
        }).done(function(mssg){
            if(mssg == "Succesfull")
             window.location.replace("start_student.html?studentid="+sid);
             if(mssg == "Failed")
             {
                $("#server2").css('display', 'block');
                setTimeout(function(){
                    $("#server2").css('display', 'none');
                }, 2010);
            }
        });
     });
 });