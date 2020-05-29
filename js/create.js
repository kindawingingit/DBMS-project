

 $(document).ready(function () {

    let schoolarray = ["sas", "scope", "sce", "senses"];
    $("form").submit(function(event){
        let school = $("input[name=school]").val().toLowerCase();
        let name = $("input[name=facultyname]").val();
        let id = $("input[name=facultyid]").val();
        let password = $("input[name=password]").val();
        let confirmpassword = $("input[name=confirmpassword]").val();

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
            'password' : password
        };

        $.ajax({
            type : 'POST',
            url  : 'php/create.php',
            data : formData,
            dataType : 'text'
        })
          .done(function(mssg){
              if(mssg === "Faculty ID already exists."){
                $("#server").css('display', 'block');
            setTimeout(function(){
                $("#server").css('display', 'none');
            }, 2010); 
              }
              else if(mssg == "Succesfull")
              {window.location.replace("create2.html?facultyid="+id+"&school="+school);}
              else
              console.log(mssg);
          });

        }

    });
 });
 