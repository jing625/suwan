


    function getParameterByName(name, url) {
        if (!url) url = window.location.href;
        name = name.replace(/[\[\]]/g, '\\$&');
        var regex = new RegExp('[?&]' + name + '(=([^&#]*)|&|#|$)'),
            results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, ' '));
    }

    $('input[name=inviteCode]').val(getParameterByName('inviteCode'))


    var host="https://api.youbidai.sealgame.cn";
    $.ajaxSetup({
        headers: {

           "X-Client-Id":"173fd104d933432bae87ad8d097441ba",

        }
    });


    jQuery.fn.serializeObject = function () {
        var results = {},
            arr = this.serializeArray();
        for (var i = 0, len = arr.length; i < len; i++) {
            obj = arr[i];
            //Check if results have a property with given name
            if (results.hasOwnProperty(obj.name)) {
                //Check if given object is an array
                if (!results[obj.name].push) {
                    results[obj.name] = [results[obj.name]];
                }
                results[obj.name].push(obj.value || '');
            } else {
                results[obj.name] = obj.value || '';
            }
        }
        return results;
    }

    


    var counter
    $('#getCaptchaButton').click(function () {

        var phoneNumber=$('input[name=phoneNumber]').val();

        if(!phoneNumber){

            alert('请输入手机号码');

            $(['input[name=phoneNumber]']).focus();
            return
        }


        if(!aliyunCaptchaResult){

            alert('请先进行滑动验证')
            return
        }



        clearInterval(counter);


        var count=60;
        $('#getCaptchaButton').prop("disabled",true).text(count+'s')

        counter= setInterval(function () {
            count--;
            $('#getCaptchaButton').text(count+'s')

            if(count===0){

                $('#getCaptchaButton').text('获取验证码').prop("disabled",false)
                clearInterval(counter);

            }
        },1000)




        var data={phoneNumber:phoneNumber}
        data.aliyunCaptchaSessionId=aliyunCaptchaResult.csessionid
        data.aliyunCaptchaSig=aliyunCaptchaResult.sig
        data.aliyunCaptchaNCToken=nc_token
        data.aliyunCaptchaScene="nc_register_h5"


        $.get(host+"/sms/register", data,function (data) {


            if(data.code===0){

            }else{
                alert(data.message)
                $('#getCaptchaButton').text('获取验证码').prop("disabled",false)
                clearInterval(counter);
            }

        });
    })



//    function  loadImageCaptcha() {
//
//        $.get(host+"/captcha",{channel:'register'} ,function (data) {
//
//
//
//            if(data.code===0){
//
//                $('#getImageCaptchaButton').attr('src',data.data.imageBase64)
//                $('[name=imageCaptchaKey]').val(data.data.key)
//
//
//            }else{
//
//
//                alert(data.message)
//            }
//
//
//        });
//    }


   $(function () {
//       loadImageCaptcha();
   })
    $('#getImageCaptchaButton').click(function () {

        loadImageCaptcha();


    })
    $('form').submit(function(e) {

        e.preventDefault();
        var data =$(this).serializeObject()

        $.post(host+"/user",data,  function (data) {

            if(data.code===0){



                location.href="download-app.html"
            }else{


                alert(data.message)
                $('#getCaptchaButton').text('获取验证码').prop("disabled",false)
                clearInterval(counter);
            }
        });


    })


