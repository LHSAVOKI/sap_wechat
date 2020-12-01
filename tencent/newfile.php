<html>
 <head>
  <title>PHP 测试</title>
 </head>
 <body>
 <?php 
 
 function getReqSign($params /* 关联数组 */, $appkey /* 字符串*/)
 {
     // 1. 字典升序排序
     ksort($params);
     
     // 2. 拼按URL键值对
     $str = '';
     foreach ($params as $key => $value)
     {
         if ($value !== '')
         {
             $str .= $key . '=' . urlencode($value) . '&';
         }
     }
     
     // 3. 拼接app_key
     $str .= 'app_key=' . $appkey;
     
     // 4. MD5运算+转换大写，得到请求签名
     $sign = strtoupper(md5($str));
     return $sign;
 }
 
 function doHttpPost($url, $params)
 {
     $curl = curl_init();
     
     $response = false;
     do
     {
         // 1. 设置HTTP URL (API地址)
         curl_setopt($curl, CURLOPT_URL, $url);
         
         // 2. 设置HTTP HEADER (表单POST)
         $head = array(
         'Content-Type: application/x-www-form-urlencoded'
             );
         curl_setopt($curl, CURLOPT_HTTPHEADER, $head);
         
         // 3. 设置HTTP BODY (URL键值对)
         $body = http_build_query($params);
         curl_setopt($curl, CURLOPT_POST, true);
         curl_setopt($curl, CURLOPT_POSTFIELDS, $body);
         
         // 4. 调用API，获取响应结果
         curl_setopt($curl, CURLOPT_HEADER, false);
         curl_setopt($curl, CURLOPT_NOBODY, false);
         curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
         curl_setopt($curl, CURLOPT_SSL_VERIFYHOST, true);
         curl_setopt($curl, CURLOPT_SSL_VERIFYPEER, false);
         $response = curl_exec($curl);
         if ($response === false)
         {
             $response = false;
             break;
         }
         
         $code = curl_getinfo($curl, CURLINFO_HTTP_CODE);
         if ($code != 200)
         {
             $response = false;
             break;
         }
     } while (0);
     
     curl_close($curl);
     return $response;
 }
 
 
 // 应用密钥
 $appkey = 'LHGNH0usjUTRRRSA';
 
 $params = array(
     'app_id'     => '2107823355',
     'time_stamp' => strval(time()),
     'nonce_str'  => strval(rand()),
     'text'       => '腾讯AI开放平台',
     'sign'       => '',
 );
 
 // 计算sign参数（接口请求签名）
 $params['sign'] = getReqSign($params, $appkey);
 
 $url = 'https://api.ai.qq.com/fcgi-bin/nlp/nlp_wordseg';
 $response = doHttpPost($url, $params);
 echo $response;
 
 ?>
 </body>
</html>