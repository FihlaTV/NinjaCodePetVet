let $edit = $('.edit');

$edit.on('click', (event) => {
    let $target = $(event.target);

    $target.hide();
    $target.next().show();

    let formText = event.target.parentElement.innerText;
    formText = formText.split(':');
    formText = formText[1].slice(1);

    let input = $target.prev();
    input.prev().hide();
    input.val(formText);
    input.show();

    let li = event.target.parentElement.parentElement;
    let updateBtn = li.lastElementChild;
    updateBtn.style.display = "block";
});

