
let server = ""
let proxy = $surge.selectGroupDetails().decisions["🥰 Proxy"]
let nodes = JSON.parse($persistentStore.read("sub-store")).nodes
for (let i = 0; i < nodes.length; i++) {
  if (nodes[i].name == proxy) {
    server = nodes[i].server
    break
  }
}
let url = `http://192.168.31.109:3001/ipInfo?server=${server}`
let body = {}
$httpClient.get(url, function(error, response, data){
//let jsonData = JSON.parse(data)
content = '当前：'+ proxy+'\n'+data
 body = {
    title: "节点出入口信息",
    content: content,
    icon: "network"
  }
});

$httpClient.get("http://ip-api.com/json", function(error, response, data){
    let jsonData = JSON.parse(data)
    let ip = jsonData.query
    let country = jsonData.country
    let emoji = getFlagEmoji(jsonData.countryCode)
    let city = jsonData.city
    let isp = jsonData.isp
    body.content += `出口：\nIP: ${ip}\nISP: ${isp}\n位置: ${emoji}${country} - ${city}`
    $done(body);
});



function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}
