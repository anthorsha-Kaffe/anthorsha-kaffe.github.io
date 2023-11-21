jQuery(document).ready(function() {

   //Captcha
   $('.captcha-button').click(function() {
     $( ".not-a-robot-text" ).fadeOut( 500 );
     $( ".not-a-robot-icon i" ).delay( 499 ).fadeIn( 500 );
     $( ".captcha-button" ).delay( 1500 ).fadeOut( 0 );
     $( ".button-parent" ).html( '<button style="display:none" class="submit-form button border-radius text-white background-primary" type="submit">Enviar mensaje</button>' );
     $( ".submit-form.button" ).delay( 1500 ).fadeIn( 0 );   
   });

   $('.ajax-form').each(function(index, element) {
       $(this).submit(function(e) {

           //Stop form submission & check the validation
           e.preventDefault();
           window.error = false;           
           //text, textarea
           $(element).find('.required').each(function() {           
               // Variable declaration               
               var required = $(element).find(this);
               var required_val = $(element).find(this).val();

               // Form field validation 
               if (required_val.length == 0) {
                   window.error = true;
                   $(this).parent().find('.form-error').fadeIn(500);
                   $(element).find('.mail-success').fadeOut(500);
               } else { 
                   $(this).parent().find('.form-error').fadeOut(500);
                   $(element).find('.mail-fail').fadeOut(500);  
               }
           });
           
           //email
           $(element).find('.email').each(function() {           
               // Variable declaration               
               var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
               var email = $(this).val();   
               // Form field validation 
               if (!filter.test(email)) {
                   window.error = true; 
                   $(this).parent().find('.form-error').fadeIn(500);
                   $(element).find('.mail-success').fadeOut(500);
               } else { 
                   $(this).parent().find('.form-error').fadeOut(500);
                   $(element).find('.mail-fail').fadeOut(500);  
               }
           });            
                      
           // If there is no validation error, next to process the mail function
           if (window.error == false) {
                var formObj = $(this);
                var formURL = formObj.attr("action");
                var formData = new FormData(this);
                $.ajax ({
                    url: 'resp-email.php',
                    type: 'POST',
                    data:  formData,
                    mimeType:"multipart/form-data",
                    contentType: false,
                    cache: false,
                    processData:false,
                success: function(data, textStatus, jqXHR)
                {
                    //If the email is sent successfully, reset form
                    $(element).each(function() {
                       this.reset();
                    });
                    //Display the success message
                    $(element).find('.mail-success').fadeIn(500);
                },
                error: function(jqXHR, textStatus, errorThrown) 
                {
                    //Display the error message
                    $(element).find('.mail-success').fadeOut(500);
                    $(element).find('.mail-fail').fadeIn(500);
                }          
                });
                e.preventDefault(); //Prevent Default action. 
                e.unbind();
            }   
       });
   });
});