AUI.add('rp-expanding-textarea-plugin', function(A) {
	
    var Lang = A.Lang,
    	isNull = Lang.isNull,
    	isString = Lang.isString,
	
		getClassName = A.ClassNameManager.getClassName,
	
		MIN_HEIGHT = 'minHeight,'
		
		NAME = 'rp-expanding-textarea-plugin',
		NS = 'rp-expanding-textarea',
		
		// Property keys
		HOST = 'host'
	;
	
    // This module is not yet finished
	var RpExpandingTextarea = A.Component.create(
		{
            ATTRS: {
            	
                minHeight : {
                    value : 100
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
					
					if (!host.test('textarea')) {
						// return if host is not a textarea
						return;
					}
					
					instance._updateSize();
					
					// Bind event listeners
					instance._bindTextarea();
				},
				
				destructor: function() {
					var instance = this;
					
			        var host = instance.get(HOST);
			        
			        // Detach event listeners
			        instance._valueChangeHandler.detach();

		        	instance._keydownHandler.detach();
				},
				
				_bindTextarea: function() {
					
					var instance = this;
					
					var host = instance.get(HOST);
					
					 instance._valueChangeHandler = host.on('valueChange', instance.updateSize, instance);
					 instance._keydownHandler = host.after('keydown', instance._updateSize, instance);
				},
				
				_getValueFromCssString: function(styleString) {
					var instance = this;
					
					var value = -1;
					
					if(isNull(styleString)) {
						return value;
					} else if(!isString(styleString)) {
						return value;
					}
					
					var replacedString = styleString.replace('px', '');
					var replacedString = styleString.replace('em', '');
					var replacedString = styleString.replace('%', '');
					
					value = parseInt(replacedString);

					return parseInt(value);
				},
				
				_updateSize: function() {
					var instance = this;
					
					var host = instance.get(HOST);

					var heightNew = -1;
					var minHeight = instance.get(MIN_HEIGHT);
					var computedHeight = instance._getValueFromCssString(host.getComputedStyle('height'));
					var scrollHeight = host.get('scrollHeight');
					
					// Determine if scrollHeight or computedHeight should be used
					if(scrollHeight > computedHeight) {
						heightNew = scrollHeight;
					} else {
						heightNew = computedHeight;
					}
					
					// Check against minHeight
					if(heightNew < minHeight && heightNew != -1) {
						heightNew = minHeight;
					}
					
					if(heightNew != -1) {
						host.setStyle('height', heightNew + 'px');
					}
					
				},

				_someFunction: function() {}
				
			}
		}
	);

	A.namespace('Plugin').RpExpandingTextarea = RpExpandingTextarea;

	}, '1.0.1' ,{
		requires:[
		          'aui-component',
		          'plugin'
  		]
	}
);