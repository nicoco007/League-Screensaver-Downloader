<?php
$path = filter_var($_GET["path"], FILTER_SANITIZE_URL);
$filename = basename($path);

$ch = curl_init();
curl_setopt($ch, CURLOPT_URL, "http://screensavers.riotgames.com/" . $path);
curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
curl_setopt($ch, CURLOPT_HEADER, 1);

$response = curl_exec($ch);

$header_size = curl_getinfo($ch, CURLINFO_HEADER_SIZE);
$header = substr($response, 0, $header_size);
$body = substr($response, $header_size);

$response_code = curl_getinfo($ch, CURLINFO_HTTP_CODE);

header("Access-Control-Allow-Origin: *");

if ($response_code === 200 && isset($_GET["download"]) && $_GET["download"] === "true")
  header(sprintf('Content-Disposition: attachment; filename="%s"', $filename));

foreach (explode("\r\n", $header) as $i => $line)
  if ($i > 0)
    header($line);

print $body;
