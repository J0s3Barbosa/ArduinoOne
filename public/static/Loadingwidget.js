window.onload=function(){
    $(document).on("click", ".show", function () {
        $.mobile.loading("show");
    });
    $(document).on("click", ".hide", function () {
        $.mobile.loading("hide");
    });
    } 
    
    
                $(document).on("mobileinit", function() {
                    $.mobile.loader.prototype.options.text = "Please wait..Magic is going on!";
                    $.mobile.loader.prototype.options.textVisible = true;
                    $.mobile.loader.prototype.options.theme = "e";
                    $.mobile.loader.prototype.options.html = "";
                });

                