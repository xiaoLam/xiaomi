<?php
    header('content-type:text/html;charset="utf-8"');

    // var_dump($_POST);

    // 定义一个统一的返回格式
    $responseData = array("code" => 0,"message" => "");

    // 将通过post提交的数据全部取出
    $username = $_POST['username'];
    $password = $_POST['password'];

    // 对后台接收到的数据, 进行一个简单的判断
    if (!$username) {
        $responseData["code"] = 1;
        $responseData["message"] = "用户名不能为空";
        // 将数据按照统一的返回格式返回
        echo json_encode($responseData);
        exit;
    }

    if (!$password) {
        $responseData["code"] = 2;
        $responseData["message"] = "密码不能为空";
        echo json_encode($responseData);
        exit;
    }


    // 链接数据库, 判断用户名是否已经存在
    // PHP7语法  安装PHP5.6的语法
    // 天龙八部第一步 链接数据库 
    $link = mysql_connect("127.0.0.1","root","123456");
    // PHP7 $link = mysqli_connect();

    // 第二步 判断是否链接成功
    if (!$link) {
        $responseData['code'] = 3;
        $responseData['message'] = "服务器忙";
        // 返回到前台页面
        echo json_encode($responseData);
        exit;
    }

    // 第三步 设置字符集
    mysql_set_charset("utf8");

    // 第四步 选择数据库
    mysql_select_db("xiaomi");

    // 5. 准备sql语句进行 验证用户名和密码是否匹配
    $str = md5(md5(md5($password)."beijing")."zhonghuo");
    $sql = "select * from users where username='{$username}' and password='{$str}'";
    
    // 6. 发送sql语句
    $res = mysql_query($sql);

    // 7. 取出一行数据
    $row = mysql_fetch_assoc($res);
    // 如果 $row 如果$row的值不为空则用户名和密码输入正确
    if (!$row) { // 如果$row 不为空 则说明输入正确
        // 用户名重名
        $responseData["code"] = 4;
        $responseData["message"] = "用户名或密码错误";
        // 将数据按照同意的返回格式返回
        echo json_encode($responseData);
        exit;
    } else{
        $responseData["message"] = "登陆成功";
        // 将数据按照同意的返回格式返回
        echo json_encode($responseData);
    }

    
    // 8. 关闭数据库
    mysql_close($link);

?>