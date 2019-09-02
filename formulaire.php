<?php

    $allTasks = [];
    $stat=false;
    $newTask = $_POST['tache']; // Recupere la nouvelle tache
    $checked = $_POST['checked'];
    $content = file_get_contents("todo.json"); // Recupere le contenu du fichier todo.json
    $phpContent = json_decode($content); // Decode le fichier

    foreach ($phpContent as $value) {
        if($value->tache == $newTask) {
            $value->checked = $checked;
        }else{
            array_push($allTasks, $value);
        }
    };

    if ($newTask != "") {
        $newTask = filter_var($newTask, FILTER_SANITIZE_STRING); // Securise le contenu de la nouvelle tache
    } else {
        $newTask = null;
    }

    $task =  array(
        'tache' => $newTask,
        'checked' => ($checked == "true" ? true : false)
    ); // On créer la nouvelle tache dans un tableau

    array_push($allTasks, $task); // On push la nouvelle tache dans le tableau qui contient toutes nos tâches

    $json = json_encode($allTasks); // On encode le tableau contenant nos tache
    if(file_put_contents("todo.json", $json)) // on enregistre le contenu dans le fichier
        echo 'success';
    else
        echo 'failed';
    // ENJOY!
?>
