$(function() {
  $('#create-contact').click(function(){
    $('#form-new').fadeToggle();
  });

  $('#search').click( function(){
    var search_term = $('#term').val();
    event.preventDefault();

    $.ajax( {
      type: 'get',
      url: '/contacts/search',
      data: {term: search_term},
      success: function(data) {
        $('#contacts').html('');
        for (var i = 0; i < data.contacts.length; i++) {
          $('<div>').addClass('contact').html(
          $('<p>').text('Name: '+data.contacts[i].name
            ).add($('<p>').text('Email: '+data.contacts[i].email)
            ).add(($('<button>').addClass('delete').data('id', data.contacts[i].id).text('Delete'))
            ).add($('<hr>'))        
          ).prependTo('#contacts');
        }
      },
      dataType: 'json'
    });
    // $.get('/contacts/search', function(data) {
    //   console.log("helloo david i made it");
    // });
    // $.ajax({
    //   type: 'get',
    //   url: '/contacts/search',
    //   data: {"term": "this term"},
    //   success: function(data) {
    //     console.log(data.contacts);
    //     console.log("woohooo");
    //   },
    //   error: function(data){
    //     console.log('errorrrrr');
    //   },
    //   dataType: 'json',
    //   processData: false,
    //   contentType: false,
    //   cache: false


    // });


  });

  $('#new').click(function() {
    var form = $(this).parents('form');
    event.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/contacts',
      data: new FormData(form[0]),

      success: function(data) {
        console.log("success");
        console.log(data);
        $("form, input:not(input[type='submit'])").val("");
        $('<div>').addClass('contact').html(
          $('<p>').text('Name: '+data.name
            ).add($('<p>').text('Email: '+data.email)
            ).add(($('<button>').addClass('delete').data('id', data.id).text('Delete'))
            ).add($('<hr>'))        
          ).prependTo('#contacts');

      },
      error: function(data) {
        console.log("There was an error you fuckwit");
      },
      dataType: 'json',
      processData: false,
      contentType: false,
      cache: false
    });
  });

  $('#contacts').on('click', '.delete', function() {
    var div_to_delete = $(this).parent();
    div_to_delete.fadeOut();
    var id = div_to_delete.children('button').data('id');
    $.ajax({
      type: 'delete',
      url: '/contacts/'+String(id)
    });


  });






});