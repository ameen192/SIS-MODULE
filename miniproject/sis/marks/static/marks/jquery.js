$.ajaxSetup({ 
    cache: false 
});


$(function() {
	//$('.para').html('this is added')
	alert("myjquery running");

  

   $.ajaxSetup({beforeSend: function(xhr, settings){
      xhr.setRequestHeader('X-CSRFToken', 
                         '{{ csrf_token }}');
   }});

	// $( ".dialog" ).dialog({
 //               autoOpen: false, 
 //               title: 'my dialog',
 //               modal: true,
 //               width: 500,
 //               height: 500,
 //               resizable: false,
 //               buttons: {
 //                  OK: function() {
 //                  	$(this).dialog("close");
 //                  }
 //               },             
 //   });
            // $( ".selectstuds" ).click(function() {
            //    $( ".dialog" ).dialog( "open" );
            // });

//getDataSet
  $(document).on('click','.getDataSet', function() {
    var year = $('.year').val();
    var sem = $('.sem').val();
    $.ajax({
      url : "getDataSet/",
      data : {
        'year' : year,
        'sem' : sem
      },
      dataType: 'json',
      success : function(data) {
        if(data == null){
          alert("no dataset found");
          return;
        }
        $('.selectsubterm').hide();
        $('.ajaxbuttons').hide();
        $('.container').html('');
        $('.subject').empty();
        $('.subject').append($('<option>', {value:'all', text:'all'}));
        for (var i=0; i<data.length; i++) {
          $('.subject').append($('<option>', {value:data[i], text:data[i]}));
        }
        $('.selectsubterm').show();
        $('.ajaxbuttons').show();
      }
    });
  });








//view graphs
  $(document).on('click','.wholegraph', function(e){
    e.preventDefault();
    var term = $('.term').val();
    console.log("called graph");
      $.ajax({
        url : "wholegraph/",
        type : "POST",
        data : {
          'term' : term,
        },
        success : function(data) {
            console.log(data);
            $('.container').html(data)
        },
      });
  });


//view toppers
  $(document).on('click','.viewtoppers', function(e){
    e.preventDefault();
    var term = $('.term').val();
    var subject = $('.subject').val();
      $.ajax({
        url : "viewtoppers/",
        data : {
          'term' : term,
          'subject' : subject,
        },
        dataType: "json",
        success : function(data) {
            console.log(data);
            $('.container').html('<table class="table-bordered"><th><td>names</td><td>marks</td></th>');
            for (var i=0; i<data.length; i++) {
              $('.container').append("<tr><td>"+data[i][1]+"</td><td>"+data[i][0]+"</td></tr>");
            }
            $('.container').append('</table>');
        },
      });
  });


//select students
  $(document).on('click','.selectstuds', function(e){
    e.preventDefault();
      $.ajax({
        url : "selectstuds/",
        dataType: "json",
        success : function(data) {
            $( ".dialog" ).dialog({ 
               title: 'list of students, select max 5',
               modal: true,
               width: 700,
               height: 400,
               resizable: false,
               buttons: {
                  OK: function() {
                    $(this).dialog("close");
                  }
               },
            });
            $('.container').html('')
            $('.dialog').html('<table><tr><td>')
            for (var i=0; i<data.length; i++) {
              if(i % 3 ==0){
                $('.dialog').append("</tr><tr>");
              }
              $('.dialog').append("<td><input type='checkbox' name='usn' value="+data[i]+">"+data[i][0]+"&nbsp;&nbsp;&nbsp;"+data[i][1]+"</td>");
            } 
            $('.dialog').append("</tr></table><br><br><button class='selectedstuds btn btn-primary'>viewgraph</button>")  
        },
      });
  });

//selected stud button code
  $(document).on('click','.selectedstuds',function(){
    alert("selectedstuds clicked");
    var term = $('.term').val();
    var subject = $('.subject').val();
    var selected = [];
            $.each($("input[name='usn']:checked"), function(){            
                selected.push($(this).val());
            });
        $.ajax({
          url : "getMultiGraph/",
          data : {
            'selected' : selected,
            'term' : term,
            'subject' : subject,
          },
          success : function(data) {
            alert("inside selectedstuds success");
            $('.dialog').dialog("close");
            $('.container').html(data);
          }
        });
  });






//select stats
  $(document).on('click','.viewstats', function(e){
    e.preventDefault();
    var term = $('.term').val();
      $.ajax({
        url : "stats/", 
        data : {
          'term' : term
        },
        success : function(data) { 
            var pdata = JSON.parse(data);
            var mean = pdata['mean'];
            var deviation = pdata['deviation'];
            var max = pdata['max'];
            var min = pdata['min'];
            $('.container').html("<h3>mean&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;"+mean+"</h3><h3>deviation&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;"+deviation+"</h3><h3>max&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;"+max+"</h3><h3>min&nbsp;&nbsp;&nbsp;&nbsp;:&nbsp;"+min+"</h3");
        },
      });
  });


   // $(document).on('submit','#post-form', function(event){
   //     event.preventDefault();
   //     console.log("form submitted!")  // sanity check
   //     create_post();
   // });

   // AJAX for posting
   // function create_post(value) {
   //    alert(value);
   //    console.log("create post is working!") // sanity check
   //    $.ajax({
   //      url : "stats/", // the endpoint
   //      type : "POST", // http method
   //      data : { the_post : value }, // data sent with the post request
   //      // handle a successful response
   //      success : function(data) {
   //          $('#testtext').val(''); // remove the value from the input
   //          console.log(data); // log the returned json to the console
   //          console.log("success");
   //          alert("inside success")
   //          $('.stats').html(data)
            
   //          //var parsed_data = JSON.parse(data);
   //          //console.log(parsed_data['mean']);
   //          //$('.ajaxdata').html(parsed_data['mean'])
   //      },

   //      // handle a non-successful response
   //      error : function(xhr,errmsg,err) {
   //          $('#results').html("<div class='alert-box alert radius' data-alert>Oops! We have encountered an error: "+errmsg+
   //              " <a href='#' class='close'>&times;</a></div>"); // add the error to the dom
   //          console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
   //      }
   //    });
   // };

});