

 $(document).ready(function () {

    let schoolarray = ["sas", "scope", "sce", "senses"];
    $("form").submit(function(event){
        let school = $("input[name=school]").val().toLowerCase();
        let name = $("input[name=studentname]").val();
        let id = $("input[name=studentid]").val();
        let password = $("input[name=password]").val();
        let confirmpassword = $("input[name=confirmpassword]").val();
        let phone = $("input[name=phone]").val().split(" ").join("");

        event.preventDefault();

        if(!(schoolarray.includes(school)))
        { 
            $("#client").css('display', 'block');
            setTimeout(function(){
                $("#client").css('display', 'none');
            }, 2010);
        }

        else if(!(password === confirmpassword))
        {
            $("#client2").css('display', 'block');
            setTimeout(function(){
                $("#client2").css('display', 'none');
            }, 2010);  
        }

        else{

        var formData = {
            'school'   : school,
            'name'     : name,
            'id'       : id,
            'password' : password,
            'phone'    : phone
        };

        $.ajax({
            type : 'POST',
            url  : 'php/create3.php',
            data : formData,
            dataType : 'text'
        })
          .done(function(mssg){
              if(mssg === "Student ID already exists."){
                $("#server").css('display', 'block');
            setTimeout(function(){
                $("#server").css('display', 'none');
            }, 2010); 
              }
              else if(mssg == "Succesfull")
              {window.location.replace("start_student.html?studentid="+id);}
          });

        }

    });
 });
 