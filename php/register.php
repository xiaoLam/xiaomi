<?php
    header('content-type:text/html;charset="utf-8"');

    // var_dump($_POST);

    // 定义一个统一的返回格式
    $responseData = array("code" => 0,"message" => "");

    // 将通过post提交的数据全部取出
    $username = $_POST['username'];
    $password = $_POST['password'];
    $repassword = $_POST['repassword'];
    $createtime = $_POST['createtime'];

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

    if ($repassword != $password) {
        $responseData["code"] = 3;
        $responseData["message"] = "两次密码输入不一致";
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
        $responseData['code'] = 4;
        $responseData['message'] = "服务器忙";
        // 返回到前台页面
        echo json_encode($responseData);
        exit;
    }

    // 第三步 设置字符集
    mysql_set_charset("utf8");

    // 第四步 选择数据库
    mysql_select_db("xiaomi");

    // 5. 准备sql语句进行 验证用户名是否重名 插入操作
    $sql = "select * from users where username='{$username}'";
    
    // 6. 发送sql语句
    $res = mysql_query($sql);

    // 7. 取出一行数据
    $row = mysql_fetch_assoc($res);
    // 如果 $row 的值为null 说明连一条语句都查询不出来 说明没有这个用户名
    if ($row) { // 如果$row 不为空 则说明重名了
        // 用户名重名
        $responseData["code"] = 5;
        $responseData["message"] = "用户名已存在";
        // 将数据按照同意的返回格式返回
        echo json_encode($responseData);
        exit;
    }

    // 能进行到这里 说明用户名可以注册了
    // 将密码md5加密 md5规则可以自己设定 但是后面解密也要用相同的规则
    $str = md5(md5(md5($password)."beijing")."zhonghuo");
    // 准备sql语句 存储用户名 密码 创建时间
    $sql2 = "insert into users(username,password,createtime) values('{$username}','{$str}',{$createtime})";

    // 发送sql语句
    $res2 = mysql_query($sql2);

    if(!$res2) { // 如果$res2 为真则说明注册成功 如果为假则说明注册失败
        $responseData['code'] = 6;
        $responseData['message'] = "注册失败";
        // 返回到前台页面
        echo json_encode($responseData);
    } else {
        $responseData['message'] = "注册成功";
        // 返回到前台页面
        echo json_encode($responseData);
    };
    
    // 8. 关闭数据库
    mysql_close($link);

?>