hojo.provide("icallcenter.callProcessor");
hojo.require("hojo.io.script");

hojo.declare("icallcenter.callProcessor", null, {
    _phone: null,

    constructor: function (phone) {
        this._phone = phone;
        var evtHandle = this._phone.register("EvtRing", this, "onRing");
        this._phone._handles.push(evtHandle);
        var evtHandle = this._phone.register("EvtHangup", this, "onHangup");
        this._phone._handles.push(evtHandle);
		evtHandle = this._phone.register("EvtDialing", this, "onDialing");
		this._phone._handles.push(evtHandle);
		evtHandle = this._phone.register("EvtPeerStatusChanged", this, "peerStatusChanged"); 
		this._phone._handles.push(evtHandle);
		evtHandle = this._phone.register("EvtCallStatusChanged", this, "callStatusChanged"); 
		this._phone._handles.push(evtHandle);
		evtHandle = this._phone.register("EvtConnected", this, "EvtConnected"); 
		this._phone._handles.push(evtHandle);
		evtHandle = this._phone.register("EvtLogon", this, "EvtLogon"); 
		this._phone._handles.push(evtHandle);
		evtHandle = this._phone.register("EvtMonitorQueue" , this, "EvtMonitorQueue");
        this._phone._handles.push(evtHandle);
    },
    onRing: function (data) {
        console.info("onRing==================")
        console.dir(data)
    	var callsheetId = data.callSheetId; //ͨ����¼id
		var agent = data.agent; //��ϯ
		var callNo = data.originCallNo;//����
		var calledNo = data.originCalledNo;//����
		var callType = data.callType; 
		var status = data.status;
		var ringTime= data.offeringTime;
		var beginTime= "";
		var endTime= "";
		var monitorFilename= "";
		hojo.byId("icallcenter.dialout.input").value = callNo;
		var str = "";
		if(data.callerProvince && data.callerCity){
			str += "来电归属地："+data.callerProvince + "   " + data.callerCity;
		}
		if(data.callType == 'transfer'){
			str += "转接来电来自座席：" + data.data.Agent;
		}
		hojo.byId("memo_info_div").innerHTML = str;
		alert("agent:" + agent +";callNo:" + callNo+";calledNo:"+calledNo+";callType:"+callType+";status:"+status+";ringTime:"+ringTime+";beginTime:"+beginTime+";endTime:"+endTime+";monitorFilename:"+monitorFilename);
    },
    
    onHangup: function(data) {
		hojo.byId("memo_info_div").innerHTML = "";
        console.info("onHangup=============")
		console.log(data);
		var callsheetId = data.callSheetId;
		var agent = data.agent;
		var callNo = data.originCallNo;
		var calledNo = data.originCalledNo;
		var callType = data.callType;
		var status = data.status;
		var ringTime= data.ringTime;
		var beginTime= data.beginTime;
		var endTime= data.endTime;
		var monitorFilename= data.data.MonitorFilename;
		//alert("agent:" + agent +";callNo:" + callNo+";calledNo:"+calledNo+";callType:"+callType+";status:"+status+";ringTime:"+ringTime+";beginTime:"+beginTime+";endTime:"+endTime+";monitorFilename:"+monitorFilename);
	   	var phoneJson = {
	    		Command: "Action",
	    		Action: "Hangup",
	    		ActionID: "Hangup"+Math.random(),
	    		CallsheetId: callsheetId,
	    		CallNo: callNo,
	    		CalledNo: calledNo,
	    		CallType: callType,
	    		RingTime: ringTime,
	    		Agent: agent,
	    		Status: status,
	    		BeginTime: beginTime,
	    		EndTime: endTime,
	    		MonitorFilename: monitorFilename
		};
	   	this.sendAction(phoneJson);
    },
    
    onDialing: function(data) {//坐席响铃触发
        console.info("onDialing======================")
		console.log(data);
		var callsheetId = data.callSheetId;
		var agent = "";
		var callNo = data.originCallNo;//����
		var calledNo = data.originCalledNo;//����
		var callType = data.callType;
		var status = data.status;
		var ringTime= data.offeringTime;
		var beginTime= "";
		var endTime= "";
		var monitorFilename= "";
	   	var phoneJson = {
	    		Command: "Action",
	    		Action: "Dialing",
	    		ActionID: "Dialing"+Math.random(),
	    		CallsheetId: callsheetId,
	    		CallNo: callNo,
	    		CalledNo: calledNo,
	    		CallType: callType,
	    		RingTime: ringTime,
	    		Agent: agent,
	    		Status: status,
	    		BeginTime: beginTime,
	    		EndTime: endTime,
	    		MonitorFilename: monitorFilename
		};
	   	this.sendAction(phoneJson);
    },
    
    EvtConnected: function(data) {//接听触发
        console.info("EvtConnected======================")
		var callsheetId = data.callSheetId;
		var agent = "";
		var callNo = data.originCallNo;//����
		var calledNo = data.originCalledNo;//����
		var callType = data.callType;
		var status = data.status;
		var ringTime= data.offeringTime;
		var beginTime= data.beginTime;
		var endTime= "";
		var monitorFilename= "";
	   	var phoneJson = {
	    		Command: "Action",
	    		Action: "Connected",
	    		ActionID: "Connected"+Math.random(),
	    		CallsheetId: callsheetId,
	    		CallNo: callNo,
	    		CalledNo: calledNo,
	    		CallType: callType,
	    		RingTime: ringTime,
	    		Agent: agent,
	    		Status: status,
	    		BeginTime: beginTime,
	    		EndTime: endTime,
	    		MonitorFilename: monitorFilename
		};
	   	this.sendAction(phoneJson);
    },
    
    EvtLogon: function(data) {
    	var status = data; 
	   	var phoneJson = {
	    		Command: "Action",
	    		Action: "Logon",
	    		ActionID: "Logon" + Math.random(),
	    		Status: status
		};
	   	this.sendAction(phoneJson);
    },
    
    peerStatusChanged: function(data) {
//    	var peerStatus = data; 
//	   	var phoneJson = {
//	    		Command: "Action",
//	    		Action: "Peer",
//	    		ActionID: "Peer" + Math.random(),
//	    		Status: peerStatus
//		};
//	   	this.sendAction(phoneJson);
    },
    
    callStatusChanged: function(data) {
//    	var peerStatus = data; 
//	   	var phoneJson = {
//	    		Command: "Action",
//	    		Action: "Call",
//	    		ActionID: "Call" + Math.random(),
//	    		Status: peerStatus
//		};
//	   	this.sendAction(phoneJson);
    },
    
    EvtMonitorQueue: function (queueItem) {
    	//var isMySelfQueue = false;
       // for(var i in queueItem.members){
       // 	var member = queueItem.members[i];
       // 	if(member == this._phone.sipNo) {
                  //������������Լ���
      //          isMySelfQueue = true;
       // 	}
      //  }
      //  if(isMySelfQueue == true) {
      //  	alert(queueItem.queueName); 
      //  	alert(queueItem.idleAgentCount);
      //  	alert(queueItem.queueWaitCount);
      //  } 
    },
    
    sendAction: function(json) {
    	//hojo.byId("icallcenter.iframe").src="http://localhost:15062/?json=" + hojo.toJson(json) + "&random=" + Math.floor(Math.random()*100000);
    }
    
});