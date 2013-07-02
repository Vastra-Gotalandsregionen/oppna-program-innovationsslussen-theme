AUI.add('innovationsslussen-signin-prompt-link-plugin', function(A) {
	
	var	Lang = A.Lang,
		getClassName = A.ClassNameManager.getClassName,
		NAME = 'innovationsslussen-signin-prompt-link-plugin',
		NS = 'innovationsslussen-signin-prompt-link-plugin',
	
		// Custom Attributes
		SIGNIN_URL = 'signinUrl',
	
		// Property keys
		HOST = 'host',
		
		CSS_SIGNIN_LINK = 'signin-link'
	;
	
	var TPL_IFRAME = '<iframe class="content-iframe" title="" frameborder="0" allowfullscreen src="{url}" width="100%" height="100%" scrolling="yes"></iframe>';

	var InnovationsslussenSigninPromptLink = A.Component.create({
		
		ATTRS: {
			
			signinUrl: {
				value: ''
			},
			
			someAttr: {
				value: null
			}
	
		},        

        EXTENDS: A.Plugin.Base,
        NAME: NAME,
        NS: NS,

        prototype: {
        	signinPromt: null,

			initializer: function() {
				var instance = this;
				
				var host = instance.get(HOST);
				
				var signinLink = A.one('.' + CSS_SIGNIN_LINK);
				if(signinLink) {
					var signinUrl = signinLink.getAttribute('href');
					instance.set(SIGNIN_URL, signinUrl);
				}

				instance._initLinks();
			},
			
			_initLinks: function() {
				var instance = this;
				
				var host = instance.get(HOST);
				
				host.on('click', instance._onHostClick, instance);
			},
			

			_onHostClick: function(e) {
				var instance = this;
				e.halt();

				var linkNode = e.currentTarget;
				
				var signinUrl = instance.get(SIGNIN_URL);

				var signinPromt = new A.InnovationsslussenSigninPrompt({
					signinUrl: signinUrl
				});
				
				signinPromt.render();

				instance.signinPromt = signinPromt;
			},

			_someFunction: function() {}
        	}

		}
	);

	A.namespace('Plugin').InnovationsslussenSigninPromptLink = InnovationsslussenSigninPromptLink;

	}, '1.0.1' ,{
		requires:[
			'aui-component',
			'innovationsslussen-signin-prompt',
			'plugin'
		]
	}
);
