var FileUploadService = function(){
    var self = this;
    function handleError( s, xhr, status, e ){
        // If a local callback was specified, fire it
        if ( s.error ) {
            s.error.call( s.context || s, xhr, status, e );
        }
        // Fire the global callback
        if ( s.global ) {
            (s.context ? $(s.context) : $.event).trigger( "ajaxError", [xhr, s, e] );
        }
    }
    function addEvent(eventName,element,fn){
        element.attachEvent ? element.attachEvent("on"+eventName,fn) : element.addEventListener(eventName,fn,false);
    }
    function removeListener(eventName,element,fn){
        element.detachEvent?element.detachEvent('on'+eventName,fn):element.removeEventListener(element,fn,false);
    }
    function createUploadIframe(id){
        var frameId = 'jUploadFrame' + id;
        var io = document.createElement('div');
        io.innerHTML = '<iframe id="' + frameId + '" name="' + frameId + '" src="javascript:false"/>';
        $(io).css('display', 'none');
        document.body.appendChild(io);
        return io;
    }
    function createUploadForm(id,fileElementId,data){
        var formId = 'jUploadForm' + id;
        var fileId = 'jUploadFile' + id;
        var form = $('<form  action="" method="POST" name="' + formId + '" id="' + formId + '" enctype="multipart/form-data" runat="server" target=""></form>');
        if(data) {
            for(var i in data) {
                $('<input type="hidden" name="' + i + '" value="' + data[i] + '" />').appendTo(form);
            }
        }
        var oldElement = $('#' + fileElementId);
        var newElement = $(oldElement).clone();
        $(oldElement).attr('id', fileId);
        $(oldElement).before(newElement);
        $(oldElement).appendTo(form);
        $(form).css('display', 'none');
        $(form).appendTo('body');
        return form;
    }
    function uploadHttpData( r, type ) {
        var data = !type;
        data = type == "xml" || data ? r.responseXML : r.responseText;
        switch(type){
            case 'script':
                $.globalEval( data );
                break;
            case 'JSON':
                if(document.all) { //IE
                    //alert(data);
                    data = $.parseJSON(data);
                }else{
                    var data_txt = $(data).text();
                    if(typeof data_txt !== 'object'){
                        data = $.parseJSON(data_txt);
                    }
                }
                break;
            case 'html':
                $("<div>").html(data).evalScripts();
                break;
        }
        return data;
    }
    self.init = function(s){
        var id = new Date().getTime();
        createUploadIframe(id);
        createUploadForm(id, s.fileElementId, (typeof(s.data)=='undefined'?false:s.data));
        var frameId = 'jUploadFrame' + id;
        var formId = 'jUploadForm' + id;
        var xml = {};
        try {
            var form = $('#' + formId);
            $(form).attr('action', s.url);
            $(form).attr('target', frameId);
            if (form.encoding) {
                $(form).attr('encoding', 'multipart/form-data');
            } else {
                $(form).attr('enctype', 'multipart/form-data');
            }
            $(form).submit(function(){
                var io = document.getElementById(frameId);
                var uploadCallback = function(){
                    var xml = {};
                    if (io.contentWindow) {
                        xml.responseText = io.contentWindow.document.body ? io.contentWindow.document.body.innerHTML : null;
                    } else if (io.contentDocument) {
                        xml.responseText = io.contentDocument.document.body ? io.contentDocument.document.body.innerHTML : null;
                    }
                    if (xml.responseText != null) {
                        $(form).remove();
                        $(io).remove();
                        var data = uploadHttpData(xml, s.dataType);
                        if (s.success)
                            s.success(data, 0);
                    }
                };
                if(document.all) { //IE
                    addEvent("load", io,uploadCallback);
                }else{
                    $('#' + frameId).off().on('load',uploadCallback);
                }
            });
            $(form).submit();
        } catch (e) {
            handleError(s, xml, null, e);
        }
    };
};

jQuery.extend({
    FileUpload:function(s){
        var FileUpload = new FileUploadService();
        FileUpload.init(s);
        FileUpload = null;
    }
});