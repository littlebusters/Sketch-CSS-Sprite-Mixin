var cssSpriteGenerator = cssSpriteGenerator || {};

cssSpriteGenerator.init = function( context, _type ) {
	this.context = context;
	this.doc = context.document;
	this.artboard = this.doc.currentPage().currentArtboard();
	if( !this.artboard ) this.artboard = this.doc.currentPage().artboards().objectAtIndex( 0 );

	this.pasteBoard = null;
	this.pasteBoard = NSPasteboard.generalPasteboard();
	this.pasteBoard.declareTypes_owner( [ NSPasteboardTypeString ], null );

	this.prefix = '';
	this.sepalator = '';
	this.termination = ';';
	this.wrapStart = ' nth( ';
	this.listIdx   = ', ';
	this.wrapEnd   = ' )';
	this.include = '@include ';
	this.ruleSetStart = '{';
	this.ruleSetClose = '}\n';
	this.interpolation = '#{';
	this.iteration = '@each ';

	switch ( _type ) {
		case 'scss':
			this.prefix = '$';
			this.sepalator = ':';
			break;
		case 'less':
			this.prefix = '@';
			this.sepalator = ':';
			this.wrapStart = ' extract( ';
			this.include = '.';
			this.interpolation = '@{';
			break;
		case 'stylus':
			this.prefix = '$';
			this.sepalator = ' =';
			this.termination = '';
			this.wrapStart = ' ';
			this.listIdx   = '[';
			this.wrapEnd   = ']';
			this.include = '';
			this.ruleSetStart = '';
			this.ruleSetClose = '\n';
			this.interpolation = '{';
			this.iteration = 'for ';
			break;
		default:
			this.prefix = '$';
			this.sepalator = ':';
			this.termination = '';
			this.include = '+';
			this.ruleSetStart = '';
			this.ruleSetClose = '\n';
			break;
	}
	var	bgiSize      = 'bgiSize';
	this.bgiSizeWVal = this.prefix + bgiSize + 'W';
	this.bgiSizeHVal = this.prefix + bgiSize + 'H';
}

cssSpriteGenerator.getMixinSet = function( _type ) {
	return this.getMixin( _type ) + this.getSpriteValue( _type ) + this.getSpriteList( _type ) + this.getLoopFunction( _type );
}

cssSpriteGenerator.getMixin = function( _type ) {
	var mixinName = 'cssSprite';

	switch ( _type ) {
		case 'scss':
			var varName = '$spriteVals',
				mixinStart = '@mixin ' + mixinName + '( ' + varName + ' ) {\n',
				bgImageStart = ' url( #{',
				bgImageEnd   = ' } )' + this.termination + '\n',
				i = 1;
			break;
		case 'less':
			var varName = '@spriteVals',
				mixinStart = '.' + mixinName + '( ' + varName + ' ) {\n',
				bgImageStart = ' e( %( \'url(%s)\',',
				bgImageEnd   = ' ) )' + this.termination + '\n',
				i = 1;
			break;
		case 'stylus':
			var varName = '$spriteVals',
				mixinStart = mixinName + '( ' + varName + ' )\n',
				bgImageStart = ' url(',
				bgImageEnd   = ' )' + this.termination + '\n',
				i = 0;
			break;
		default:
			var varName = '$spriteVals',
				mixinStart = '=' + mixinName + '( ' + varName + ' )\n',
				bgImageStart = ' url( #{',
				bgImageEnd   = ' } )' + this.termination + '\n',
				i = 1;
			break;
	}

	var mixin  = mixinStart
			   + '\twidth:' + this.wrapStart + varName + this.listIdx + ( i++ ) + this.wrapEnd + this.termination + '\n'
			   + '\theight:' + this.wrapStart + varName + this.listIdx + ( i++ ) + this.wrapEnd + this.termination + '\n'
			   + '\tbackground-repeat: no-repeat' + this.termination + '\n'
			   + '\tbackground-image:' + bgImageStart 
									   + this.wrapStart + varName + this.listIdx + ( i++ ) + this.wrapEnd 
									   + bgImageEnd
			   + '\tbackground-position:' + this.wrapStart + varName + this.listIdx + ( i++ ) + this.wrapEnd
										  + this.wrapStart + varName + this.listIdx + ( i++ ) + this.wrapEnd + this.termination + '\n'
			   + '\t@media only screen and ( -webkit-min-device-pixel-ratio: 2 ), '
			   + 'only screen and ( min-device-pixel-ratio: 2 ) ' + this.ruleSetStart + '\n'
			   + '\t\tbackground-image:' + bgImageStart 
									   + this.wrapStart + varName + this.listIdx + ( i++ ) + this.wrapEnd 
									   + bgImageEnd
			   + '\t\t' + 'background-size: ' + this.bgiSizeWVal + ' ' + this.bgiSizeHVal + this.termination + '\n'
			   + '\t' + this.ruleSetClose
			   + this.ruleSetClose;

	return mixin;
}

cssSpriteGenerator.getSpriteValue = function( _type ) {
	var layers = this.artboard.layers(),
		spriteVariable = '',
		imageName      = this.artboard.name();
		imagePath      = '../img/' + imageName;

	spritePathVariableName  = this.prefix + imageName + 'Path';
	spriteVariable += spritePathVariableName + this.sepalator + ' \'' + imagePath + '\'' + this.termination + '\n';

	spriteURLVariable = [
						this.prefix + imageName + 'URL', '.png', 
						this.prefix + imageName + 'x2URL', '@2.png'
						];

	for ( var i = 0; i < spriteURLVariable.length; i += 2 ) {
		spriteVariable += spriteURLVariable[i] + this.sepalator + ' ';
		if ( 'less' == _type ) {
			spriteVariable += '\'@{' + imageName + 'Path}' + spriteURLVariable[i + 1] + '\'';
		} else {
			spriteVariable += spritePathVariableName + ' + \'' + spriteURLVariable[i + 1] + '\'';
		}
		spriteVariable += this.termination + '\n';
	};

	spriteVariable += this.bgiSizeWVal + this.sepalator + ' ' + this.artboard.frame().width() + 'px' + this.termination + '\n';
	spriteVariable += this.bgiSizeHVal + this.sepalator + ' ' + this.artboard.frame().height() + 'px' + this.termination + '\n';
	
	for (var i = layers.count() - 1; i >= 0; i--) {
		var layer = layers.objectAtIndex( i );
			spriteVariable += this.prefix + layer.name() + this.sepalator
							+ ' ' + layer.frame().width() + 'px' 
							+ ' ' + layer.frame().height() + 'px'
							+ ' ' + spriteURLVariable[0]
							+ ' ' + ( 0 - layer.frame().x() ) + 'px' 
							+ ' ' + ( 0 - layer.frame().y() ) + 'px' 
							+ ' ' + spriteURLVariable[2]
							+ this.termination + '\n';
	};
	return spriteVariable;
}

cssSpriteGenerator.getSpriteList = function( _type ) {
	var layers = this.artboard.layers();
	var spriteList = this.prefix + this.artboard.name() + 'List' + this.sepalator;

	for (var i = layers.count() - 1; i >= 0; i--) {
		var layer = layers.objectAtIndex( i );
		spriteList += ' ' + this.prefix + layer.name() + ' ' + layer.name() + ',';
	};
	spriteList = spriteList.substr( 0, spriteList.length - 1 ) + this.termination + '\n';

	return spriteList;
}

cssSpriteGenerator.getLoopFunction = function( _type ) {
	var spriteList = this.prefix + this.artboard.name() + 'List';
	var className  = this.prefix + this.artboard.name() + 'Name';
	var spriteVals = this.prefix + this.artboard.name() + 'Class';
	var pickupIcon = this.prefix + 'icon';
	var baseIndex  = ( 'stylus' != _type ) ? 1 : 0;

	if ( 'less' == _type ) {
		var loopFnc  = '@spriteCounter: length( ' + spriteList + ' );\n';
			loopFnc += '.cssSpriteBuilder( @spriteCounter ) when ( @spriteCounter > 0 ) {\n';
			loopFnc += '\t.cssSpriteBuilder(( @spriteCounter - 1 ));\n';
			loopFnc += '\t' + pickupIcon + ': extract( ' + spriteList + ', @spriteCounter );\n';
	} else {
		var loopFnc  = this.iteration + pickupIcon + ' in ' + spriteList + ' ' + this.ruleSetStart + '\n';
	}
		loopFnc += '\t' + className + this.sepalator + this.wrapStart + pickupIcon + this.listIdx + ( baseIndex + 1 ) + this.wrapEnd + this.termination + '\n';
		loopFnc += '\t' + spriteVals + this.sepalator + this.wrapStart + pickupIcon + this.listIdx + baseIndex + this.wrapEnd + this.termination + '\n';
	if ( 'less' == _type ) {
		loopFnc += '\t.icon-' + this.interpolation + this.artboard.name() + 'Name' + '} ' + this.ruleSetStart + '\n';
	} else {
		loopFnc += '\t.icon-' + this.interpolation + className + '} ' + this.ruleSetStart + '\n';
	}
		loopFnc += '\t\t' + this.include + 'cssSprite( ' + spriteVals + ' )' + this.termination + '\n';
		loopFnc += '\t' + this.ruleSetClose + this.ruleSetClose;

	if ( 'less' == _type ) {
			loopFnc += '.cssSpriteBuilder( @spriteCounter );\n';
	}

	return loopFnc;
}

