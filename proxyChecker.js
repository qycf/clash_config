
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
$httpClient.get(url, function(error, response, data){
//let jsonData = JSON.parse(data)
 body = {
    title: "节点信息",
    content: data,
    icon: "network"
  }
 $done(body);
});


function getFlagEmoji(countryCode) {
    const codePoints = countryCode
      .toUpperCase()
      .split('')
      .map(char =>  127397 + char.charCodeAt());
    return String.fromCodePoint(...codePoints);
}