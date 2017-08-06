$(function() {
	//$('.para').html('this is added')
	alert("myjquery attendance running");

   $.ajaxSetup({beforeSend: function(xhr, settings){
      xhr.setRequestHeader('X-CSRFToken', 
                         '{{ csrf_token }}');
   }});

	$( "#dialog" ).dialog({
               autoOpen: false, 
               title: 'my dialog',
               modal: true,
               width: 500,
               height: 500,
               resizable: false,
               buttons: {
                  OK: function() {
                  	$(this).dialog("close");
                  }
               },

               
   });
            $( "#dbutt" ).click(function() {
               $( "#dialog" ).dialog( "open" );
            });


  $(document).on('click','.mb', function(e){
    e.preventDefault();
    var call = $(this).attr('rel');
    var an = "random";
    alert(call);
    create_post(call);
  });

  


   

});