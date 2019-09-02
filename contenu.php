 
    <?php
    
    $json_source = file_get_contents("todo.json"); // Recupere le contenu du fichier todo.json
    $json_data = json_decode($json_source, true);
    $termsAccepted = false;

    $arr = array('todo' => array(),
                 'finish' => array());

    foreach($json_data as $v){
        if ($v['tache']!=null){
            if($v['checked'] == false)
                array_push($arr['todo'],"<p><input type='checkbox' name='choix' value='true' id='content'><span>".   $v['tache'].'</span>');
            else
                array_push($arr['finish'],"<p><input type='checkbox' name='choix' value='true' id='content' checked><span>".   $v['tache'].'</span>');
        }
    }
echo json_encode($arr);
?> 
    