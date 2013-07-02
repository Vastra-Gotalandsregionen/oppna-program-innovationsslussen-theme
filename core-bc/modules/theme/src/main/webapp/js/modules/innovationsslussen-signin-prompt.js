AUI().add('innovationsslussen-signin-prompt',function(A) {
    var Lang = A.Lang,
        isNull = Lang.isNull,
        
        NAME = 'innovationsslussen-signin-prompt',
        NS = 'innovationsslussen-signin-prompt',
        
		// Custom Attributes
		SIGNIN_URL = 'signinUrl',
        
        CSS_HIDDEN = 'aui-helper-hidden'
    ;

    var InnovationsslussenSigninPrompt = A.Component.create(
            {
                ATTRS: {
                	
        			signinUrl: {
        				value: ''
        			},
                	
                	someAttr: {
                		value: null,
                	}
                	
                },
                EXTENDS: A.Component,
                NAME: NAME,
                NS: NS,
                
                prototype: {
                	
                	dialog: null,
                    
                    initializer: function(config) {
                        var instance = this;
                        
                    },
                    
                    renderUI: function() {
                        var instance = this;
                        
        				var width = 300;
        				var height = 150;
        				
        				var signinUrl = instance.get(SIGNIN_URL);
        				
        				var title = 'Logga in f&ouml;rst';
        				var bodyContent = '';
        				bodyContent += '<p>Du m&aring;ste vara inloggad f&ouml;r att f&aring; g&ouml;ra detta.</p>';
        				bodyContent += '<p><a href="'+  signinUrl + '">Logga in h&auml;r &raquo; </a></p>';
        				
        				var dialog = new A.Dialog({
        					bodyContent: bodyContent,
        					centered: true,
        					cssClass: 'innovationsslussen-dialog',
        					destroyOnClose: true,
        					modal: true,
        					title: title,
        					resizable: true,
        					height: height,
        					width: width
        				});
        				
        				dialog.render();

        				instance.dialog = dialog;
                        
                        
                    },
    
                    bindUI: function() {
                        var instance = this;
                        
                        // Destroy instance when dialog is destroyed
                        instance.dialog.on('destroy', function(e) {
                        	instance.destroy();
                        }, instance);
                    },
                    
                    _someFunction: function() {
                        var instance = this;
                    }

                }
            }
    );

    A.InnovationsslussenSigninPrompt = InnovationsslussenSigninPrompt;
        
    },1, {
        requires: [
	       'aui-base',
	       'aui-dialog',
	       'substitute'
      ]
    }
);
