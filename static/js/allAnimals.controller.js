window.onload = function() {
    $('#nav-btn-all-animals').addClass('active');
};

let $edit = $('.edit');

$edit.on('click', (event) => {
    let $editButton = $(event.target);
    let li = event.target.parentElement.parentElement;

    $editButton.hide();
    let $okButton = $editButton.next();
    $okButton.show();

    let formText = event.target.parentElement.innerText;
    formText = formText.split(':');
    formText = formText[1];

    let input = $editButton.prev();
    let inlineText = input.prev();
    inlineText.hide();
    input.val(formText);
    input.show();

    $okButton.on('click', () => {
        input.hide();
        $okButton.hide();
        $editButton.show();

        inlineText.text(input.val());
        inlineText.show();
    });

    let updateBtn = li.lastElementChild;
    updateBtn.style.display = "block";

    $(updateBtn).on('click', (event) => {
        event.preventDefault();
        let currentBtn = $(event.target).hide();
        cancelButton.hide();
        $okButton.hide();
        input.hide();
        inlineText.show();
        $editButton.show();

        let currentId = $(li).children()[0].innerText;
        let ownerAddress = $(li).children()[6].innerText.split(':')[1];
        let ownerPhone = $(li).children()[7].innerText.split(':')[1];
        let checkUp = $(li).children()[8].innerText.split(':')[1];


        $.ajax({
            method: "PUT",
            url: "/animals",
            contentType: "application/json",
            data: JSON.stringify({
                _id: currentId,
                ownerAddress: ownerAddress,
                ownerPhone: ownerPhone,
                checkUp: checkUp,
            })
        })
    });

    let cancelButton = $(updateBtn).prev().show();

    cancelButton.on('click', (event) => {
        event.preventDefault();
        let $cancelButton = $(event.target);
        $cancelButton.next().hide();
        $cancelButton.hide();
        input.hide();
        inlineText.show();
        $editButton.show();
        $okButton.hide();
    })
});
