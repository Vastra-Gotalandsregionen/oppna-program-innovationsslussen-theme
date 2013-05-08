AUI.add('rp-placeholder-plugin', function(A) {
	var Lang = A.Lang,
	
		getClassName = A.ClassNameManager.getClassName,
	
		NAME = 'rp-placeholder-plugin',
		NS = 'rp-placeholder',
		
		// CSS
		CSS_PLACEHOLDER = getClassName('placeholder'),
		CSS_PLACEHOLDER_TEXT = getClassName('placeholder', 'text'),
		
		// Custom Attributes
		PLACEHOLDER = 'placeholder',
		
		// Property keys
		HOST = 'host'
	;
	
	// Feature test for placeholder
	var supportsInputPlaceholder = function(host) {
		// Return false if node is a textarea
		if(host.test('textarea')) {
			return false;
		}
		
		var i = document.createElement('input');
		return 'placeholder' in i;
	};	

	var RpPlaceholder = A.Component.create(
		{
            ATTRS: {
            	
                someAttr : {
                    value : ''
                }
                
            },
			
            EXTENDS: A.Plugin.Base,
			NAME: NAME,
			NS: NS,
	
			prototype: {
				
				_valueChangeHandler: null,
				_focusHandler: null,
				_blurHandler: null,
				_keydownHandler: null,				
				
				placeholderText: '',
				
				initializer: function() {
					var instance = this;
					
					var host = instance.get(HOST);
					
					if (!host.hasAttribute(PLACEHOLDER) || supportsInputPlaceholder(host)) {
						// return if host node does not have placeholder attribute
						// or if browser supports the placeholder attribute already
						return;
					}
					
					// Save placeholder value
					instance.placeholderText = host.getAttribute(PLACEHOLDER);

					// Add class to host input
					host.addClass(CSS_PLACEHOLDER);
					
					// Bind event listeners
					instance._bindPlaceholder();
					
					instance.show();
				},
				
				destructor: function() {
					var instance = this;
					
			        var host = instance.get(HOST);
			        
			        // Remove class from placeholder
			        host.removeClass(CSS_PLACEHOLDER);
			        
			        // Detach event listeners
			        instance._valueChangeHandler.detach();

		        	instance._blurHandler.detach();
		        	
		        	instance._focusHandler.detach();

		        	instance._keydownHandler.detach();
				},
				
				hide: function() {
					var instance = this;
					
					var host = instance.get(HOST);
					
			        if (host.hasClass(CSS_PLACEHOLDER_TEXT)) {
			            host.set('value', '');
			            host.removeClass(CSS_PLACEHOLDER_TEXT);
			        }
				},
				
				show: function() {
					var instance = this;
					
					var host = instance.get(HOST);
					var placeholderText = instance.placeholderText;
					
			        if (host.get('value') === '') {
			            host.set('value', placeholderText);
			            host.addClass(CSS_PLACEHOLDER_TEXT);
			        }

				},
				
				_bindPlaceholder: function() {
					
					var instance = this;
					
					var host = instance.get(HOST);
					
					instance._valueChangeHandler = host.on('valueChange', instance._handleValueChange, instance);

		        	instance._blurHandler = host.on('blur', instance._handleBlur, instance);
		        	
		        	instance._focusHandler = host.on('focus', instance._handleFocus, instance);
		        	
		        	instance._keydownHandler = host.after('keydown', instance._handleKeydown, instance);
				},
				
				_handleFocus: function(e) {
					var instance = this;
					
	                A.later(300, instance, function () {
	                	instance.hide();
	                });
				},

				_handleBlur: function(e) {
					var instance = this;
					
	                A.later(300, instance, function () {
	                	instance.show();
	                });
				},
				
			    _handleKeydown : function (e) {
			    	var instance = this;
			    	
			        var code = e.keyCode || e.which;

			        // Enter, shift, ctrl, option/alt, esc, left, up, right, down, command
			        var ignoreCodes = [13, 16, 17, 18, 27, 37, 38, 39, 40, 224];
			        if (!!~A.Array.indexOf(ignoreCodes, code)) {
			            return;
			        } 

			        instance.hide();
			    },
			    
			    _handleValueChange: function(e) {
	        		var instance = this;
	                if (e.newVal) {
	                	instance.hide();
	                }
			    },

				_someFunction: function() {}
				
			}
		}
	);

	A.namespace('Plugin').RpPlaceholder = RpPlaceholder;

	}, '1.0.1' ,{
		requires:[
		          'aui-component',
		          'plugin'
  		]
	}
);