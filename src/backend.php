<?php
if(isset($_FILES['files']))
{
	for($count = 0; $count < count($_FILES['files']['name']); $count++)
	{
		move_uploaded_file($_FILES['files']['tmp_name'][$count], 'files/' . basename($_FILES['files']['name'][$count]));
	}

	echo 'success';
}
?>