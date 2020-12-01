<?php
if (isset($_GET['code'])){ // check whether code is a query option in http request
    echo $_GET['code'];
}else{
    echo "NO CODE";
}
?>