$(document).ready(function get(){
      // DO POST
      $.ajax({
            type : "GET",
            url : "https://limitless-escarpment-64461.herokuapp.com/ajaxCall",
            data : JSON.stringify(formData),
            dataType : 'json'
          })
        .done(function(posts){
          console.log('GET response:', JSON.stringify(posts,"",2));
          $('#getResponse').html(JSON.stringify(posts,"",2));
        });
        .fail(function(jqXHR, textStatus, err){
          console.log('AJAX error response: ',textStatus);
        });
}
