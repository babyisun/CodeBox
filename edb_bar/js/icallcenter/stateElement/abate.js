hojo.provide("icallcenter.stateElement.abate");hojo.declare("icallcenter.stateElement.abate",null,{constructor:function(a){this._base=a},_base:null,_callState:"stAbate",_changeToolBarState:function(b){hojo.publish("EvtCallToolBarChange",[b._callState])},_switchCallState:function(c){if(c.Event=="PeerStatus"){if(c.Exten==this._base._phone.sipNo){var d=false;if(c.PeerStatus=="Registered"){d=true};if(d&&this._base._curCallState._callState=="stAbate"){this._base._curCallState=this._base._getInvalid();this._changeToolBarState(this._base._curCallState)}}}},_publish:function(){}})