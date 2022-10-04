<?php

if ($_SERVER["REQUEST_METHOD"] == "POST" && setting()) {
    session_start();
    $start = microtime(true);
    $x = $_POST['x'];
    $y = $_POST['y'];
    $r = $_POST['r'];
    $count = 0;

    if (checker($x, $y, $r) == false){
        echo "error";
    }
    else {
        $check = check_circle($x, $y, $r) || check_square($x, $y, $r) || check_triangle($x, $y, $r);


        $time = number_format(microtime(true) - $start, 6);
        $dt = new DateTime("now", new DateTimeZone('Europe/Moscow'));
        $dt = $dt->format('H:i:s');

        $otv = "";
        if ($check) {
            $otv = "Точка попала в область видимости";
        } else {
            $otv = "Точка не попала в облась видимости";
        }

        $result = $dt . "|" . $time . "|" . $x . "|" . $y . "|" . $r . "|" . $otv . "|";

        if (!isset($_SESSION['results'])) {
            $_SESSION['results'] = array();
        }
        array_push($_SESSION['results'], $result);


        echo $dt . "|" . $time . "|" . $x . "|" . $y . "|" . $r . "|" . $otv . "|";
    }
}
else {
    echo "error";
}

function check_circle($x, $y, $r) {
    if($y<=$r && $y>=0 && $x>=0 && $x<=$r && ($x^2+$y^2<=$r^2)) {
        return true;
    }
    else{
        return false;
    }
}

function check_square($x, $y, $r) {
    if ($y<=0 && $y>=-$r && $x>=0 && $x<=$r) {
        return true;
    }
    else{
        return false;
    }
}

function check_triangle($x, $y, $r) {
    if ($y<=$r/2 && $y>=0 && $x<=0 && $x>=-$r/2 && ($x+$y<=$r)){
        return true;
    }
    else{
        return false;
    }
}

function setting() {
    return isset($_POST["x"]) and isset($_POST["y"]) and isset($_POST["r"]);
}


function checker($x, $y, $r) {
    if ($x <= 4 and $x >= -4 && $y < 5 and $y > -5 and $r >= 1 and $r <=3){
        return true;
    }
    else{
        return false;
    }
}