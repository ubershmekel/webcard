(function() {
    function getParams() {
        var match,
            pl = /\+/g, // Regex for replacing addition symbol with a space
            search = /([^&=]+)=?([^&]*)/g,
            decode = function(s) { return decodeURIComponent(s.replace(pl, " ")); },
            query = window.location.search.substring(1);

        var urlParams = {};
        while (match = search.exec(query)) {
            urlParams[decode(match[1])] = decode(match[2]);
        }
        return urlParams;
    }

    var defaultData = {
        text: "This could be your business card.\nModify it, bookmark it.\nLet others snap a picture.",
        color: "#fff",
        background: "#2bf",
        fontSize: "3vw",
    };

    // window.fitText(document.getElementById("text"));
    var app = new Vue({
        el: '#the-app',
        data: defaultData,
        created() {
            console.log("query", window.location.search);
            var params = getParams();
            var keys = Object.keys(defaultData);
            for (var i = 0; i < keys.length; i++) {
                var key = keys[i];
                if (params[key]) {
                    this[key] = params[key];
                }
            }
        },
        watch: {
            $data: {
                handler: function(val, oldVal) {
                    // console.log("changed", val);
                    var keys = Object.keys(defaultData);
                    keys.sort();
                    var query = '?' + keys
                        .map(k => encodeURIComponent(k) + '=' + encodeURIComponent(this[k]))
                        .join('&');
                    // console.log("query url built", query);
                    history.replaceState({}, "", query);
                },
                deep: true
            }
        },
    })
})();