let x, y, R;
let fail;

function onSubmit() {
    fail = false;
    checkR();
    checkY();
    checkX();
    $('#errorMessage').text("")
    if (!fail) {
        $.ajax({
            url: "php/data.php",
            type: "post",
            data: {'x': x, 'y': y, 'R': R, 'timeZone' : Intl.DateTimeFormat().resolvedOptions().timeZone},
            success: function (result) {
                console.log("IlyaLoh");
            }
        });
    }
}

function digitsAfterDot(x) {
    if (x.toString().includes('.'))
        return x.toString().split('.').pop().length;
    return 0;
}

function checkX() {
    x = $('input[name="default-radio-x"]:checked').val()
    if (x == null)
        sendError("X некорректен")
}

function checkY() {
    y = Number($('#y__').val().replace(",", "."));
    if (y === "" || y <= -3 || y >= 5 || !Number.isFinite(y))
        sendError("Y некорректен");
    else if (digitsAfterDot(y) >= 10)
        sendError("Введите меньше 10 знаков после запятой у У!")
}

function checkR() {
    R = $('input[name="default-radio-r"]:checked').val()
    if (R == null)
        sendError("R некорректен")
}

function sendError(message) {
    $('#errorMessage').text(message);
    fail = true;
}

let form = $('form__');
form.on("submit", function(event) {
    onSubmit();
    event.preventDefault();
})