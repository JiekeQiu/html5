<?php
  // 连接数据路
  include 'connect.php';
  // 查询语句
  $sql = "SELECT * FROM goodlist";

  // 执行语句
  $res=$conn->query($sql);
  $row=$res->fetch_all(MYSQL_ASSOC);
  // $row=$res->num_rows;
  echo json_encode($row,JSON_UNESCAPED_UNICODE);
?>