// Plain javascript that runs before AUI is ready (to prevent content flashing

// Body
addCssClassName(document.body, 'js');

////Hide footer before positionFooter has been run
var plainOldJsfooterNode = document.getElementById('footer');
addCssClassName(plainOldJsfooterNode, 'aui-helper-hidden');

function addCssClassName(node, cssClassName) {
	if(node) {
		var newClassName = node.className + ' ' + cssClassName;
		node.className = newClassName;
	}
}

AUI().ready('innovationsslussen-theme', function(A) {
	
	var innovationsslussenTheme = new A.InnovationsslussenTheme().render();
});

Liferay.on('allPortletsReady',function() {
	AUI().use('aui-base', 'rp-footer-plugin', function(A) {
		var footerNode = A.one('#footer');
		if(footerNode) {
			footerNode.plug(A.Plugin.RpFooter);	
		}
	});
});