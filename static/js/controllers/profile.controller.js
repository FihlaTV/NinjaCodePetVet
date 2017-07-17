window.onload = function() {
    $('#nav-btn-all-animals').addClass('active');
    $('#password').hide();
};

let $edit = $('.edit');
$edit.on('click', (event) => {
    let $editButton = $(event.target);
    let div = event.target.parentElement.parentElement;

    $editButton.hide();
    let $okButton = $editButton.next();
    $okButton.show();

    let formText = event.target.parentElement.innerText;
    formText = formText.split(':');
    formText = formText[1];
    let password = $('#password');
    password.hide();

    if (formText === undefined) {
        formText = password.text();
    }

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
        password.hide();
    });

    let updateBtn = div.lastElementChild;
    updateBtn.style.display = "block";

    $(updateBtn).on('click', (event) => {
        event.preventDefault();
        let currentBtn = $(event.target).hide();
        cancelButton.hide();
        $okButton.hide();
        input.hide();
        inlineText.show();
        $editButton.show();
        password.hide();

        let currentId = $(div).children()[0].innerText;
        let ownerAddress = $(div).children()[1].innerText.split(':')[1];
        let ownerPhone = $(div).children()[2].innerText.split(':')[1];
        let ownerPassword = password.text();

        $.ajax({
            method: "PUT",
            url: "/profile",
            contentType: "application/json",
            data: JSON.stringify({
                _id: currentId,
                address: ownerAddress,
                phone: ownerPhone,
                password: ownerPassword,
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
        password.hide();
    })
});