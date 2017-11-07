﻿hojo.provide("icallcenter.stateElement.base");hojo.declare("icallcenter.stateElement.base",null,{constructor:function(a){this._phone=a},_phone:null,_curPeerState:null,_curCallState:null,_oldCurCallState:null,_getHold:function(){if(this._phone._hold==null){this._phone._hold= new icallcenter.stateElement.hold(this)};return this._phone._hold},_getInvalid:function(){if(this._phone._invalid==null){this._phone._invalid= new icallcenter.stateElement.invalid(this)};return this._phone._invalid},_getAbate:function(){if(this._phone._abate==null){this._phone._abate= new icallcenter.stateElement.abate(this)};return this._phone._abate},_getPeerState:function(){if(this._phone._peerState==null){this._phone._peerState= new icallcenter.stateElement.peerState(this)};return this._phone._peerState},_getConsultationLink:function(){if(this._phone._consultationLink==null){this._phone._consultationLink= new icallcenter.stateElement.link.consultationLink(this)};return this._phone._consultationLink},_getInnerLink:function(){if(this._phone._innerLink==null){this._phone._innerLink= new icallcenter.stateElement.link.innerLink(this)};return this._phone._innerLink},_getDialoutLink:function(){if(this._phone._dialoutLink==null){this._phone._dialoutLink= new icallcenter.stateElement.link.dialoutLink(this)};return this._phone._dialoutLink},_getListenLink:function(){if(this._phone._listenLink==null){this._phone._listenLink= new icallcenter.stateElement.link.listenLink(this)};return this._phone._listenLink},_getNormalLink:function(){if(this._phone._normalLink==null){this._phone._normalLink= new icallcenter.stateElement.link.normalLink(this)};return this._phone._normalLink},_getThreeWayCallLink:function(){if(this._phone._threeWayCallLink==null){this._phone._threeWayCallLink= new icallcenter.stateElement.link.threeWayCallLink(this)};return this._phone._threeWayCallLink},_getInnerRing:function(){if(this._phone._innerRing==null){this._phone._innerRing= new icallcenter.stateElement.ring.innerRing(this)};return this._phone._innerRing},_getNormalRing:function(){if(this._phone._normalRing==null){this._phone._normalRing= new icallcenter.stateElement.ring.normalRing(this)};return this._phone._normalRing},_getConsultationRinging:function(){if(this._phone._consultationRinging==null){this._phone._consultationRinging= new icallcenter.stateElement.ringring.consultationRinging(this)};return this._phone._consultationRinging},_getInnerRinging:function(){if(this._phone._innerRinging==null){this._phone._innerRinging= new icallcenter.stateElement.ringring.innerRinging(this)};return this._phone._innerRinging},_getListenRing:function(){if(this._phone._listenRing==null){this._phone._listenRing= new icallcenter.stateElement.ring.listenRing(this)};return this._phone._listenRing},_getNormalRinging:function(){if(this._phone._normalRinging==null){this._phone._normalRinging= new icallcenter.stateElement.ringring.normalRinging(this)};return this._phone._normalRinging},_bussiness:function(){},_switchState:function(b){this._setCallObject(b);this._setMonitorObjects(b);if(b.Event=="PeerStatus"){if(b.Exten==this._phone.sipNo){if(b.PeerStatus=="Registered"&&(this._phone.extenType=="gateway"||this._phone.extenType=="sip")){if(this._curCallState==null){this._curCallState=this._getInvalid();this._curCallState._changeToolBarState(this._curCallState)}else {if(this._curCallState._callState=="stAbate"){this._curCallState=this._getInvalid();this._curCallState._changeToolBarState(this._curCallState)}}}else {if(b.PeerStatus!="Registered"&&(this._phone.extenType=="gateway"||this._phone.extenType=="sip")){this._curCallState=this._getAbate();this._curCallState._changeToolBarState(this._curCallState)}}}}else {if(this._curPeerState==null){this._curPeerState=this._getPeerState()};if(this._curCallState==null){this._curCallState=this._getInvalid();if(this._phone.extenType=="Local"){this._curCallState._changeToolBarState(this._curCallState)}};this._curPeerState._switchPeerState(b);this._curCallState._switchCallState(b)}},_setCallObject:function(b){if(b.Event=="ChannelStatus"){if(b.Exten==this._phone.sipNo){if(b.ChannelStatus=="Ring"){this._phone._curChannel=b.Channel;if(b.ChannelType=="listen"){}else {if(b.ChannelType=="dialout"){var c="";if(b.Data.CallSheetID){c=b.Data.CallSheetID};this._phone.callObject={callSheetId:c,originCallNo:b.FromCid,originCalledNo:b.FromDid,callType:"dialout",offeringTime:icallcenter.hojotools.dateParse( new Date(b.Timestamp*1000)),data:b.Data,status:"notDeal",monitorFilename:""};if(this._phone.dialoutData){this._phone.callObject.data=this._phone.dialoutData;this._phone.dialoutData=null};hojo.publish("EvtDialing",[this._phone.callObject])}}}else {if(b.ChannelStatus=="Ringing"){this._phone._curChannel=b.Channel;this._phone._otherChannel=b.LinkedChannel.Channel;if(b.LinkedChannel.ChannelType=="dialTransfer"||b.LinkedChannel.ChannelType=="transfer"){if(b.Link){var d=b.LinkedChannel;var c="";if(d.Data&&d.Data.CallSheetID){c=d.Data.CallSheetID};this._phone._callId=d.Uniqueid;this._phone.callObject={callSheetId:c,originId:d.Uniqueid,originCallNo:d.FromCid,originCalledNo:d.FromDid,callType:d.ChannelType,queue:d.Queue,location:d.Location,callId:d.Uniqueid,skillgroupNo:d.Queue,monitorFilename:"",offeringTime:icallcenter.hojotools.dateParse( new Date(b.Timestamp*1000)),data:{},agent:b.Data.Agent,status:"notDeal",beginTime:"",endTime:""};if(d.Data){this._phone.callObject.data=d.Data;this._phone.callObject.data.callSheetId=c};hojo.publish("EvtRing",[this._phone.callObject])}};if(b.LinkedChannel.ChannelType=="normal"){if(b.Link){var d=b.LinkedChannel;console.info("_setCallObject============");console.dir(d);if(this._phone._callId!=d.Uniqueid){this._phone._callId=d.Uniqueid;var c="";if(d.Data&&d.Data.CallSheetID){c=d.Data.CallSheetID};this._phone.callObject={callSheetId:c,originId:d.Uniqueid,originCallNo:d.FromCid,originCalledNo:d.FromDid,callType:d.ChannelType,callId:d.Uniqueid,queue:d.Queue,location:d.Location,skillgroupNo:d.Queue,monitorFilename:"",offeringTime:icallcenter.hojotools.dateParse( new Date(b.Timestamp*1000)),data:{},beginTime:"",endTime:"",agent:b.Data.Agent,ivrkey:d.Data.IVRKEY,callerCity:d.CallerCity,callerProvince:d.CallerProvince,queueName:d.QueueName,status:"notDeal"};if(d.Data){this._phone.callObject.data=d.Data;this._phone.callObject.data.callSheetId=c};hojo.publish("EvtRing",[this._phone.callObject])}}};if(this._phone._isLooting){this._phone._isLooting=false};this._phone._curChannel=b.Channel}else {if(b.ChannelStatus=="Link"){this._phone._curChannel=b.Channel;var d=b.LinkedChannel;this._phone._otherChannel=d.Channel;this._phone.callObject.callType=b.ChannelType;if(!this._phone.callObject.beginTime){this._phone.callObject.beginTime=icallcenter.hojotools.dateParse( new Date(b.Timestamp*1000))};var c="";if(d.Data&&d.Data.CallSheetID){c=d.Data.CallSheetID};this._phone.callObject.originCallNo=d.FromCid;this._phone.callObject.originCalledNo=d.FromDid;this._phone.callObject.callSheetId=c;this._phone.callObject.originId=d.Uniqueid;this._phone.callObject.queue=d.Queue;this._phone.callObject.location=d.Location;this._phone.callObject.callId=d.Uniqueid;this._phone.callObject.skillgroupNo=d.Queue;this._phone.callObject.status="dealing";if(b.RingTime){this._phone.callObject.offeringTime=icallcenter.hojotools.dateParse( new Date(b.RingTime*1000))};if(d.Data){this._phone.callObject.data=d.Data;this._phone.callObject.data.callSheetId=c};hojo.publish("EvtConnected",[this._phone.callObject])}else {if(b.ChannelStatus=="Unlink"){this._phone._curChannel=b.Channel;this._phone._callId=""}else {if(b.ChannelStatus=="Hangup"){console.info("Hangup============");console.dir(b);this._phone._curChannel=b.Channel;this._phone._callId="";if(this._phone._curChannel==b.Channel){if(b.ChannelType=="normal"||b.ChannelType=="dialout"||b.ChannelType=="dialTransfer"||b.ChannelType=="transfer"||b.ChannelType=="webcall"||b.ChannelType=="inner"){this._phone.callObject.endTime=icallcenter.hojotools.dateParse( new Date(b.Timestamp*1000));this._phone.callObject.ringTime=icallcenter.hojotools.dateParse( new Date(b.Data.RingTime*1000));if(b.ChannelType=="dialout"||b.ChannelType=="dialTransfer"){this._phone.callObject.data=b.Data};hojo.publish("EvtHangup",[this._phone.callObject])}else {if(b.ChannelType=="listen"){this._phone._otherChannel="";hojo.publish("EvtEndListen",[])}}}}}}}}}}},_setMonitorObjects:function(b){if(b.Event=="ChannelStatus"){if(b.ChannelStatus=="Hangup"){if(b.UserID==undefined){return}};var h=this._getUserViaSipNum(b.Exten);if(!h){return};if(b.ChannelStatus=="Down"){h.callStatus="Down";h.channel=b.Channel;this._updateQueueInfo()}else {if(b.ChannelStatus=="Ring"){h.callStatus="Ring";h.called=false;h.C5Status=b.C5Status;h.timestamp=b.Timestamp;h.channel=b.Channel;if(b.C5Status=="OutboundCall"||b.C5Status=="InboundCall"||b.C5Status=="listen"){h.callNo=b.Data.ListenExten}else {if(b.FromDid){h.callNo=b.FromDid}};hojo.publish("EvtMonitorPeer",[h])}else {if(b.ChannelStatus=="Ringing"){h.called=true;h.callStatus="Ringing";h.C5Status=b.C5Status;h.channel=b.Channel;h.linkedChannel=b.LinkedChannel.Channel;if(b.ChannelType=="dialTransfer"){h.callNo=b.FromDid}else {h.callNo=b.FromCid};h.timestamp=b.Timestamp;hojo.publish("EvtMonitorPeer",[h])}else {if(b.ChannelStatus=="Up"){if(b.ChannelType=="listen"){h.callNo=b.Data.ListenExten;h.timestamp=b.Timestamp;h.C5Status=b.C5Status;h.callStatus=b.ChannelType;h.linked=true;h.channel=b.Channel;hojo.publish("EvtMonitorPeer",[h])}}else {if(b.ChannelStatus=="Link"){h.timestamp=b.Timestamp;h.C5Status=b.C5Status;linked=true;h.channel=b.Channel;h.linkedChannel=b.LinkedChannel.Channel;h.callStatus=b.ChannelType;if(b.ChannelType=="dialout"||b.ChannelType=="dialTransfer"){h.callNo=b.LinkedChannel.FromDid}else {h.callNo=b.LinkedChannel.FromCid};hojo.publish("EvtMonitorPeer",[h])}else {if(b.ChannelStatus=="Unlink"){}else {if(b.ChannelStatus=="Hangup"){if(h.channel==b.Channel){if(this._phone._otherChannel==b.Channel&&(this._curCallState._callState=="stListening"||this._curCallState._callState=="stListened")){this._phone.hangup()};h.C5Status=b.C5Status;h.callNo="";h.callStatus="Idle";h.timestamp=b.Timestamp;linked=false;h.channel="";h.linkedChannel="";hojo.publish("EvtMonitorPeer",[h])};this._updateQueueInfo()}}}}}}}}else {if(b.Event=="QueueParams"){var j={};j=this._queryQueueItem(b);if(j){if(b.Removed){j.removed=true};j.queueName=b.DisplayName;j.idleAgentCount=b.Members-b.BusyMembers;j.busyAgentCount=b.BusyMembers;j.totalAgentCount=b.Members;j.queueWaitCount=b.Calls;j.abadonedCalls=b.Abandoned;j.totalCalls=b.TotalCalls;j.DisplayName=b.DisplayName;j.members=[];for(var e in b.QueueMember){var g=b.QueueMember[e];j.members[g]=g};hojo.publish("EvtMonitorQueue",[j])}else {j={queueName:b.DisplayName,queueId:b.Queue,idleAgentCount:b.Members-b.BusyMembers,busyAgentCount:b.BusyMembers,totalAgentCount:b.Members,queueWaitCount:b.Calls,abadonedCalls:b.Abandoned,DisplayName:b.DisplayName,totalCalls:b.TotalCalls,members:[],removed:false};for(var e in b.QueueMember){var g=b.QueueMember[e];j.members[g]=g};this._phone.monitorQueues[b.Queue]=j};this._updateQueueInfo()}else {if(b.Event=="QueueMemberAdded"){var j=this._queryQueueItem(b);if(j){if(!j.members[b.Exten]){j.members[b.Exten]=b.Exten;j.totalAgentCount++;this._updateQueueInfo()}}else {}}else {if(b.Event=="QueueMemberRemoved"){var j=this._queryQueueItem(b);if(j){if(j.members[b.Exten]){delete j.members[b.Exten];j.totalAgentCount--;this._updateQueueInfo()}}else {}}else {if(b.Event=="QueueMemberPaused"){}else {if(b.Event=="Join"){var j=this._queryQueueItem(b);if(j){j.queueWaitCount++;hojo.publish("EvtMonitorQueue",[j])}else {};hojo.publish("EvtQueueEntryAdd",[b])}else {if(b.Event=="Leave"){var j=this._queryQueueItem(b);if(j){j.totalCalls++;j.queueWaitCount--;if(j.queueWaitCount<0){j.queueWaitCount=0};hojo.publish("EvtMonitorQueue",[j])}else {};hojo.publish("EvtQueueEntryRemove",[b])}else {if(b.Event=="QueueCallerAbandon"){var j=this._queryQueueItem(b);if(j){j.abadonedCalls++;hojo.publish("EvtMonitorQueue",[j])}else {};hojo.publish("EvtQueueEntryRemove",[b])}else {if(b.Event=="UserStatus"){var f=false;if(b.PeerStatus=="Registered"){f=true};if(!this._phone.monitorPeers[b.UserID]){var h={exten:b.Exten,sipNo:b.SipNum,name:b.User,DisplayName:b.DisplayName,loginExten:b.LoginExten,peerStatus:b.PeerStatus,status:b.Status,C5Status:b.C5Status,busy:b.Busy,extenType:b.ExtenType,login:b.Login,userId:b.UserID,user:b.User,localNo:b.Local,register:f,InCalls:b.InCalls,InComplete:b.InComplete,OutCalls:b.OutCalls,OutComplete:b.OutComplete,linked:false,channel:"",linkedChannel:"",called:false,callStatus:"Idle",callNo:"",timestamp:b.Login?(b.BusyTimestamp):"",busyTimestamp:b.BusyTimestamp,loginTimestamp:b.LoginTimestamp,busyType:b.BusyType};this._phone.monitorPeers[b.UserID]=h;hojo.publish("EvtMonitorPeer",[h])}else {var h=this._phone.monitorPeers[b.UserID];h.peerStatus=b.PeerStatus;h.status=b.Status;h.exten=b.Exten;h.sipNo=b.SipNum;h.C5Status=b.C5Status;h.busy=b.Busy;h.extenType=b.ExtenType;h.login=b.Login;h.loginExten=b.LoginExten;h.name=b.User;h.DisplayName=b.DisplayName;h.userId=b.UserID;h.user=b.User;h.localNo=b.Local;h.register=f;h.InCalls=b.InCalls;h.InComplete=b.InComplete;h.OutCalls=b.OutCalls;h.OutComplete=b.OutComplete;h.busyTimestamp=b.BusyTimestamp;h.loginTimestamp=b.LoginTimestamp;h.busyType=b.BusyType;h.timestamp=h.login?(h.busyTimestamp):"";hojo.publish("EvtMonitorPeer",[h]);this._updateQueueInfo()}}else {if(b.Event=="UserBusy"){if(this._phone.monitorPeers[b.UserID]){var h=this._phone.monitorPeers[b.UserID];h.busy=b.Busy;h.busyType=b.BusyType;h.busyTimestamp=b.BusyTimestamp;h.timestamp=h.login?(h.busyTimestamp):"";h.loginTimestamp=b.LoginTimestamp;hojo.publish("EvtMonitorPeer",[h]);this._updateQueueInfo()}}else {if(b.Event=="UserCallsUpdate"){if(this._phone.monitorPeers[b.UserID]){var h=this._phone.monitorPeers[b.UserID];h.InCalls=b.InCalls;h.InComplete=b.InComplete;h.OutCalls=b.OutCalls;h.OutComplete=b.OutComplete;hojo.publish("EvtMonitorPeer",[h]);this._updateQueueInfo()}}else {if(b.Event=="UserSignIn"){if(this._phone.monitorPeers[b.UserID]){var h=this._phone.monitorPeers[b.UserID];h.extenType=b.ExtenType;h.login=b.Login;h.sipNo=b.SipNum;hojo.publish("EvtMonitorPeer",[h]);this._updateQueueInfo()}}else {if(b.Event=="UserSignOut"){if(this._phone.monitorPeers[b.UserID]){var h=this._phone.monitorPeers[b.UserID];h.extenType=b.ExtenType;h.sipNo=b.SipNum;h.login=b.Login;hojo.publish("EvtMonitorPeer",[h]);this._updateQueueInfo()}}else {if(b.Event=="TrunkStatus"){if(!this._phone.monitorServiceNos[b.ServiceNo]){var k={serviceNo:b.ServiceNo,inCalls:b.InCalls,inLost:b.InLost,inComplete:b.InComplete,outCalls:0,outComplete:0};this._phone.monitorServiceNos[b.ServiceNo]=k}else {var k=this._phone.monitorServiceNos[b.ServiceNo];k.inCalls=b.InCalls,k.inLost=b.InLost,k.inComplete=b.InComplete,k.outCalls=0,k.outComplete=0};hojo.publish("EvtMonitorServiceNo",[this._phone.monitorServiceNos[b.ServiceNo]])}else {if(b.Event=="PeerStatus"){var f=false;if(b.PeerStatus=="Registered"){f=true};var h=this._getUserViaSipNum(b.Exten);if(h){h.register=f;h.status=b.Status;hojo.publish("EvtMonitorPeer",[h]);this._updateQueueInfo()}}else {if(b.Event=="AccountStatus"){this._phone.accountCalls=b;hojo.publish("EvtAccountStatus",[b])}}}}}}}}}}}}}}}}},_getUserViaExten:function(l){if(!this._phone.monitorPeers){return null};for(var e in this._phone.monitorPeers){if(this._phone.monitorPeers[e].exten==l){return this._phone.monitorPeers[e]}};return null},_queryQueueItem:function(b){if(!this._phone.monitorQueues){return null};for(var e in this._phone.monitorQueues){if(this._phone.monitorQueues[e].queueId==b.Queue){return this._phone.monitorQueues[e]}};return null},_getUserViaSipNum:function(m){if(!this._phone.monitorPeers){return null};for(var e in this._phone.monitorPeers){var n=this._phone.monitorPeers[e].sipNo;if(this._phone.monitorPeers[e].sipNo==m){return this._phone.monitorPeers[e]}};return null},_getQueueInfo:function(){var o="";for(var e in this._phone.monitorQueues){var r=this._phone.monitorQueues[e];if(r==null){continue};var q=r.members;for(var p in q){var h=this._getUserViaSipNum(q[p]);if(h!=null){o+=(h.exten+","+h.busyType+";")}}};return o},_updateQueueInfo:function(){for(var e in this._phone.monitorQueues){var r=this._phone.monitorQueues[e];var q=r.members;r.busyAgentCount=0;r.idleAgentCount=0;for(var p in q){var h=this._getUserViaSipNum(q[p]);if(h){if(h.extenType=="sip"){if(!h.register||!h.login||h.busy||h.callStatus!="Idle"){r.busyAgentCount++}else {r.idleAgentCount++}}else {if(h.extenType=="gateway"){if(!h.register||h.busy||h.callStatus!="Idle"){r.busyAgentCount++}else {r.idleAgentCount++}}else {if(h.extenType=="Local"){if(h.busy||h.callStatus!="Idle"){r.busyAgentCount++}else {r.idleAgentCount++}}else {r.busyAgentCount++}}}}else {r.idleAgentCount++}};hojo.publish("EvtMonitorQueue",[r])}}})