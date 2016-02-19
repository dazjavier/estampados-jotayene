<?php

$errors = array();  	// array to hold validation errors
$data		= array(); 		// array to pass back data

// validate the variables ======================================================
	if (empty($_POST['name']))
		$errors['name'] = 'Debes ingresar un nombre válido.';

	if (empty($_POST['email']) || filter_var($_POST['email'], FILTER_VALIDATE_EMAIL) === false)
		$errors['email'] = 'El email es requerido o no es válido.';

	if (empty($_POST['razon']))
		$errors['razon'] = 'Debes ingresar una razón de contacto.';

	if (empty($_POST['numero']) || !is_numeric($_POST['numero']))
		$errors['numero'] = 'Debes ingresar un número telefónico válido.';

	if (empty($_POST['mensaje']) || strlen($_POST['mensaje']) < 15)
		$errors['mensaje'] = 'Debes ingresar un mensaje válido y mayor a 15 caracteres.';

// return a response ===========================================================

// response if there are errors
if ( ! empty($errors)) {

	// if there are items in our errors array, return those errors
	$data['success'] = false;
	$data['errors']  = $errors;
} else {
	$from_who = htmlentities($_POST['email']);
	$to = "contacto@jotayene.cl";
	$subject = htmlentities($_POST['razon']);
	$msg = "Nombre: " . htmlentities($_POST['name']);
	$msg .= "\nNúmero telefónico: " . htmlentities($_POST['numero']);
	$msg .= "\nRazón: " . htmlentities($_POST['razon']);
	$msg .= "\nEmail: " . htmlentities($_POST['email']);
	$msg .= "\nMensaje: " . htmlentities($_POST['mensaje']);



	// if there are no errors, return a message
	$data['success'] = true;
	$data['message'] = 'Correo enviado con éxito!';

}