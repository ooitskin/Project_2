$(() => {
  console.log('jQuery Linked!');

  $('#myform').on('submit', (e) => {
    e.preventDefault();

    $.ajax('/users/profile', {
      method: 'POST',
      data: { url: $('#myurl').val() },
      success: response => {
        console.log(response);
        $(`<p>${response}</p>`).appendTo('#rendertext');
        $(`<img src="${$('#myurl').val()}">`).appendTo('#rendertext');
      }
    })

  });

  $('#save').on('click', (e) => {
    e.preventDefault();
    console.log("save click");

    const url = $("#myurl").val();
    const data = {};
    data["image"] = url;
    console.log('save', data)

    $.ajax('/users/profile2', {
      method: 'POST',
      data: data,
      success: response => {
        $(`<div>${response}</div>`).appendTo('#saved');
        window.location.replace('/users/profile');        
      }
    })
  });

  $('.delete').on('click', e => {
    e.preventDefault();
    const deleted = {};
    deleted.id = $(event.target).data().id
    console.log(deleted.id)
    $.ajax(`/users/profile2/${deleted.id}`, {
      method: 'DELETE',
      data: deleted,
      success: data => {
        console.log('deleted func data', data);
        window.location.replace('/users/profile');
      },
      error: err => console.log(err)
    })

  });




});