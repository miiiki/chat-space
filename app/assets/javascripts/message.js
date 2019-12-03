$(function(){
  function buildHTML(message){
    if(message.image){
      var html = 
        `<div class="message">
          <div class="message__info">
            <div class="message__upper-info__user">
              ${message.user_name}
            </div>
            <div class="message__upper-info__date">
              ${message.date}
            </div>
          </div>
          <div class="message__text">
            <p class="lower-message__content">
              ${message.content}
            </p>
              <img src=${message.image} >
          </div>
        </div>`
} else {
    var html =
    `<div class="message">
    <div class="message__info">
      <div class="message__upper-info__user">
        ${message.user_name}
      </div>
      <div class="message__upper-info__date">
        ${message.date}
      </div>
    </div>
    <div class="message__text">
      <p class="lower-message__content">
        ${message.content}
      </p>
        <img src=${message.image} >
    </div>
  </div>`
}
    return html;
  }


  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: 'POST',
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildHTML(message);
      $('.messages').append(html);
      $('.messages').animate({ scrollTop: $('.messages')[0].scrollHeight});
      $('#new_message')[0].reset();
    })
    .fail(function() {
      alert("メッセージ送信に失敗しました");
   })
   .always(function(data){
    $('.submit-btn').prop('disabled', false);
   })
  })
});