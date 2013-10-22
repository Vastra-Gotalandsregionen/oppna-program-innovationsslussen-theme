AUI.add('rp-action-confirmation-plugin', function(A) {
	
	var	Lang = A.Lang,
		getClassName = A.ClassNameManager.getClassName,
		NAME = 'rp-action-confirmation-plugin',
		NS = 'rp-action-confirmation-plugin',
		
		DATA_CONFIRM_MSG = 'data-confirm-msg',
		
		TEXT_DEFAULT_MSG = '&Auml;r du s&auml;ker p&aring; att du vill g&ouml;ra detta?',
		TEXT_DEFAULT_TITLE = '&Auml;r du s&auml;ker?',
	
		// Custom Attributes
		WIDTH = 'width',
	
		// Property keys
		HOST = 'host'
	;
	
	var TPL_DIALOG_CONTENTS = '<div class="rp-action-confirmation-dialog-bd"></div>';
	
	var RpActionConfirmation = A.Component.create({
		
		ATTRS:
			{
	            width: {
	            value: 600
            }
        },

        EXTENDS: A.Plugin.Base,
        NAME: NAME,
        NS: NS,

        prototype: {
        	dialog: null,
        	msg: '',
        	url: '',

			initializer: function() {
				var instance = this;
				
				var host = instance.get(HOST);
				
				instance.url = host.getAttribute('href');
				
				if(host.hasAttribute(DATA_CONFIRM_MSG)) {
					instance.msg = host.getAttribute(DATA_CONFIRM_MSG);
				}
				else {
					instance.msg = TEXT_DEFAULT_MSG;
				}
				
				//data-confirm-msg

				instance._initLinks();
			},

			_initLinks: function() {
				var instance = this;
		
				var host = instance.get(HOST);
				
				host.removeClass('requires-confirmation');
				host.addClass('requires-confirmation-active');
				
				host.on('click', instance._onHostClick, instance);
			},
			
			_onHostClick: function(e) {
				var instance = this;
				
				e.halt();
				
				var width = 250;
				var height = 150;
				
				var dialog = new A.Dialog({
					bodyContent: instance.msg,
					centered: true,
					cssClass: 'rp-confirm-dialog',
					align: { node: null, points: [A.WidgetPositionAlign.TC, A.WidgetPositionAlign.TC] },
					destroyOnClose: true,
					modal: true,
					title: TEXT_DEFAULT_TITLE,
					resizable: false,
					height: height,
					width: width,
					buttons: [{
						text: 'Avbryt',
						handler: function() {
							instance._haltAction();
						}
					},{
						text: 'Ja',
						handler: function() {
							instance._confirmAction();
						}
					}]
				});
				
				dialog.render();

				instance.dialog = dialog;

				// Listen for when the iframe is available to be modified
				//A.on('available', instance._onIframeAvailable, '#' + iframeId, null, null, instance);
			},
			
			_confirmAction: function () {
				var instance = this;
				
				// Should now continue with action
				instance.dialog.close();
				if(instance.url != '') {
					window.location.href = instance.url;	
				}
			},
			
			_haltAction: function () {
				var instance = this;
				instance.dialog.close();
			},

			_someFunction: function() {}
        	}

		}
	);

	A.namespace('Plugin').RpActionConfirmation = RpActionConfirmation;

	}, '1.0.1' ,{
		requires:[
			'aui-component',
			'aui-dialog',
			'plugin'
		]
	}
);
