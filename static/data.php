<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
print(file_get_contents("https://screensaver.riotgames.com/v2/latest/content/data.json", false, null, 0, 100000000));
