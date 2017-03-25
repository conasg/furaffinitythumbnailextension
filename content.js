var i = 0;
var posts = document.evaluate("//figure[contains(@class,'t-image')]", document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);
function furaffinitythumbs() {
    if(i<posts.snapshotLength) {
        var thumb = posts.snapshotItem(i);
        var thumboclk = document.evaluate("(.//b/u/a)", thumb, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if(thumboclk != null) {
            thumboclk.setAttribute("onclick", "");
        }
        var thumbimg = document.evaluate("(.//b/u/a)/img", thumb, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue;
        if(thumbimg != null) {
            var posturl = "https://www.furaffinity.net" + document.evaluate(".//a/@href", thumb, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null).singleNodeValue.textContent.toString();
            var http = new XMLHttpRequest();
            http.open("GET", posturl, false);
            http.send(null);
            var response = http.responseText;
            try {
                var image = "https:" + response.match(/data-fullview-src="([^"]+)"/)[1];
                if(image != null) {
                    thumbimg.setAttribute("src", image);
                }
            } catch(error) {
                console.log("Attempted to load Flash file, skipping...");
            }
            div = null;
            http = null;
        }
        i++;
        setTimeout(furaffinitythumbs, 0);
    }
}
furaffinitythumbs();