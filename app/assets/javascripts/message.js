$(function(){
  function buildHTML(message){



    if(message.image && message.content){
      var html = `<div class="message" data-message_id=` + message.id + `>` 
        `<div class="message">` 
          `<div class="message__info">` 
            `<div class="message__upper-info__user">` 
              message.user_name 
            `</div>` 
            `<div class="message__upper-info__date">` 
              message.date 
            `</div>` 
          `</div>` 
          `<div class="message__text">` 
            `<p class="lower-message__content">` 
              message.content 
            `</p>` 
              `<img src= "` + message.image+ `" class="lower-message__image" >` 
              `</div>` 
          `</div>` 
        `</div>`
} else if (message.content) {
    var html = `<div class="message" data-message_id=` + message.id + `>` 
    `<div class="message">` 
    `<div class="message__info">` 
      `<div class="message__upper-info__user">` 
        message.user_name 
      `</div>` 
      `<div class="message__upper-info__date">` 
        message.date 
      `</div>` 
    `</div>` 
    `<div class="message__text">` 
      `<p class="lower-message__content">` 
        message.content 
      `</p>` 
      `</div>`
  `</div>`
};
    return html;
  };


  $('.new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false,
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages').append(html);
      $('.new_message')[0].reset();
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight});
    })
    .fail(function() {
      alert('エラー');
   })
   .always(function(data){
    $('.submit-btn').prop('disabled', false);
   });
  });

  var reloadMessages = function() {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var href = 'api/messages#index {:format=>"json"}'
    var last_message_id = $('.message:last').data("message-id");
    $.ajax({
      url: href,
      type: 'Get',
      dataType: 'json',
      data: {id: last_message_id},
    })
    .done(function(messages) {
      var insertHTML = '';
      $.each(messages, function(i, message) {
        insertHTML += buildHTML(message);
        $('.messages').append(insertHTML);
      });
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      
    })
    .fail(function() {
      alert('error');
    });
    };
  };
  setInterval(reloadMessages, 5000);
});