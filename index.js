// Checking page title
  //Creating Elements
  document.getElementById("footer").remove();

  var btn = document.createElement("BUTTON")
  btn.onclick = function() {
    toggle()
  }
  btn.style.backgroundColor = "green"
  btn.style.color = "white"
  var inputText = document.getElementById("edit-szo").value

  var t = document.createTextNode(inputText);
  //btn.appendChild(t);
  //Appending to DOM 
  document.body.appendChild(btn);



  var myDiv = document.createElement("DIV")
  
  myDiv.id = "myDIV"
  myDiv.style.display = "none"

  document.body.appendChild(myDiv)


  //chrome.storage.sync.clear()
  //chrome.storage.sync.set({"dictionary":{}}, function(){} )
  
if (!document.getElementById("talalat-table") || document.getElementsByClassName("messages error").length > 0 ) {
  console.log("nincs talalt table")
}else{
  chrome.storage.sync.get(["dictionary"], function(items){
  
    if (items.dictionary[inputText] === undefined) {
      items.dictionary[inputText] = [new Date().toISOString()]
    }else{
      items.dictionary[inputText].push(new Date().toISOString())
    }

    chrome.storage.sync.set( items , function(){
    });

    chrome.storage.sync.get(["dictionary"], function(items){

      btn.textContent = (items.dictionary[inputText].length);
      
      if(items.dictionary[inputText].length > 5){
        btn.style.backgroundColor = "red"
      }

      var html = "";
      items.dictionary[inputText].forEach(x => {
        html += x + '<br>'
      });
      myDiv.innerHTML = html
    })
    
  })
}

function download(){
  chrome.storage.sync.get(["dictionary"], function(items){  
    downloadObjectAsJson(items.dictionary, "dictionary")
  })
}
function downloadObjectAsJson(exportObj, exportName){
  var dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj).replaceAll('\\n', ''))
  var downloadAnchorNode = document.createElement('a');
  downloadAnchorNode.setAttribute("href",     dataStr);
  downloadAnchorNode.setAttribute("download", exportName + ".json");
  document.body.appendChild(downloadAnchorNode); // required for firefox
  downloadAnchorNode.click();
   downloadAnchorNode.remove();
}
function toggle() {
  var x = document.getElementById("myDIV");
  if (x.style.display === "none") {
    x.style.display = "block";
  } else {
    x.style.display = "none";
  }
}
var downloadBtn = document.createElement("BUTTON")
downloadBtn.textContent = "Download" 
downloadBtn.onclick = function() {
  download()
}
document.body.appendChild(downloadBtn);
downloadBtn.style.backgroundColor = "green"
downloadBtn.style.color = "white"
