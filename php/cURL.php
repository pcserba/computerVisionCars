<?php
header('Content-Type: application/json');


if(isset($_FILES['up']))
{
	$extension = pathinfo($_FILES['up']['name'], PATHINFO_EXTENSION);
	
	$new_name = time() . '.' . $extension;

	move_uploaded_file($_FILES['up']['tmp_name'], "../img/".$new_name);

};
$post = array ('file' => '../img/'.$new_name);
//$post = array ('file' => '../img/test.jpg');
$curl = curl_init();
curl_setopt($curl, CURLOPT_POSTFIELDS, file_get_contents($post[file]));
curl_setopt($curl, CURLOPT_POST, true);
curl_setopt($curl, CURLOPT_URL, "https://api.carnet.ai/v2/mmg/detect?box_offset=0&box_min_width=100&box_min_height=100&box_min_ratio=1");
curl_setopt($curl, CURLOPT_HTTPHEADER, array('api-key: 91761936-0b93-4f6e-919e-2a8ccc2f635d','accept: application/json','Content-Type: application/octet-//stream'));

$response = curl_exec($curl);
$err = curl_error($curl);

curl_close($curl);

if ($err) {
	echo "cURL Error #:" . $err;
} else {
}?>