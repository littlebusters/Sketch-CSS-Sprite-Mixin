Sketch CSS Sprite Mixin
=======================

Generate a code of mixin for scss, less and stylus in Sketch. Code is copied to the clipboard when run the plugin.

Sprites name are group layer name of top-level, and the Sprite image name is an Artboard name.

## Usage

1. Select Artboard.
1. Choose **Plugins › Sketch Css Sprite Mixin › (Scss|Sass|Less|Stylus)**.
1. Genarated code to Clipboard.

![Screen Shot](https://github.com/littlebusters/Sketch-CSS-Sprite-Mixin/blob/master/css-sprite-generator-ss.png)

**SCSS**

```scss
@mixin cssSprite( $spriteVals ) {
	width: nth( $spriteVals, 1 );
	height: nth( $spriteVals, 2 );
	background-repeat: no-repeat;
	background-image: url( #{ nth( $spriteVals, 3 ) } );
	background-position: nth( $spriteVals, 4 ) nth( $spriteVals, 5 );
	@media only screen and ( -webkit-min-device-pixel-ratio: 2 ), only screen and ( min-device-pixel-ratio: 2 ) {
		background-image: url( #{ nth( $spriteVals, 6 ) } );
		background-size: $bgiSizeW $bgiSizeH;
	}
}
$icon-spritePath: '../img/icon-sprite';
$icon-spriteURL: $icon-spritePath + '.png';
$icon-spritex2URL: $icon-spritePath + '@2.png';
$bgiSizeW: 200px;
$bgiSizeH: 200px;
$instagram: 64px 64px $icon-spriteURL -100px -100px $icon-spritex2URL;
$pinterest: 64px 64px $icon-spriteURL 0px -100px $icon-spritex2URL;
$facebook: 64px 64px $icon-spriteURL -100px 0px $icon-spritex2URL;
$twitter: 64px 64px $icon-spriteURL 0px 0px $icon-spritex2URL;
$icon-spriteList: $instagram instagram, $pinterest pinterest, $facebook facebook, $twitter twitter;
@each $icon in $icon-spriteList {
	$icon-spriteName: nth( $icon, 2 );
	$icon-spriteClass: nth( $icon, 1 );
	.icon-#{$icon-spriteName} {
		@include cssSprite( $icon-spriteClass );
	}
}
```

**Sass**

```sass
=cssSprite( $spriteVals )
	width: nth( $spriteVals, 1 )
	height: nth( $spriteVals, 2 )
	background-repeat: no-repeat
	background-image: url( #{ nth( $spriteVals, 3 ) } )
	background-position: nth( $spriteVals, 4 ) nth( $spriteVals, 5 )
	@media only screen and ( -webkit-min-device-pixel-ratio: 2 ), only screen and ( min-device-pixel-ratio: 2 ) 
		background-image: url( #{ nth( $spriteVals, 6 ) } )
		background-size: $bgiSizeW $bgiSizeH
	

$icon-spritePath: '../img/icon-sprite'
$icon-spriteURL: $icon-spritePath + '.png'
$icon-spritex2URL: $icon-spritePath + '@2.png'
$bgiSizeW: 200px
$bgiSizeH: 200px
$instagram: 64px 64px $icon-spriteURL -100px -100px $icon-spritex2URL
$pinterest: 64px 64px $icon-spriteURL 0px -100px $icon-spritex2URL
$facebook: 64px 64px $icon-spriteURL -100px 0px $icon-spritex2URL
$twitter: 64px 64px $icon-spriteURL 0px 0px $icon-spritex2URL
$icon-spriteList: $instagram instagram, $pinterest pinterest, $facebook facebook, $twitter twitter
@each $icon in $icon-spriteList 
	$icon-spriteName: nth( $icon, 2 )
	$icon-spriteClass: nth( $icon, 1 )
	.icon-#{$icon-spriteName} 
		+cssSprite( $icon-spriteClass )
```

**Less**

```less
.cssSprite( @spriteVals ) {
	width: extract( @spriteVals, 1 );
	height: extract( @spriteVals, 2 );
	background-repeat: no-repeat;
	background-image: e( %( 'url(%s)', extract( @spriteVals, 3 ) ) );
	background-position: extract( @spriteVals, 4 ) extract( @spriteVals, 5 );
	@media only screen and ( -webkit-min-device-pixel-ratio: 2 ), only screen and ( min-device-pixel-ratio: 2 ) {
		background-image: e( %( 'url(%s)', extract( @spriteVals, 6 ) ) );
		background-size: @bgiSizeW @bgiSizeH;
	}
}
@icon-spritePath: '../img/icon-sprite';
@icon-spriteURL: '@{icon-spritePath}.png';
@icon-spritex2URL: '@{icon-spritePath}@2.png';
@bgiSizeW: 200px;
@bgiSizeH: 200px;
@instagram: 64px 64px @icon-spriteURL -100px -100px @icon-spritex2URL;
@pinterest: 64px 64px @icon-spriteURL 0px -100px @icon-spritex2URL;
@facebook: 64px 64px @icon-spriteURL -100px 0px @icon-spritex2URL;
@twitter: 64px 64px @icon-spriteURL 0px 0px @icon-spritex2URL;
@icon-spriteList: @instagram instagram, @pinterest pinterest, @facebook facebook, @twitter twitter;
@spriteCounter: length( @icon-spriteList );
.cssSpriteBuilder( @spriteCounter ) when ( @spriteCounter > 0 ) {
	.cssSpriteBuilder(( @spriteCounter - 1 ));
	@icon: extract( @icon-spriteList, @spriteCounter );
	@icon-spriteName: extract( @icon, 2 );
	@icon-spriteClass: extract( @icon, 1 );
	.icon-@{icon-spriteName} {
		.cssSprite( @icon-spriteClass );
	}
}
.cssSpriteBuilder( @spriteCounter );
```

**Stylus**

```stylus
cssSprite( $spriteVals )
	width: $spriteVals[0]
	height: $spriteVals[1]
	background-repeat: no-repeat
	background-image: url( $spriteVals[2] )
	background-position: $spriteVals[3] $spriteVals[4]
	@media only screen and ( -webkit-min-device-pixel-ratio: 2 ), only screen and ( min-device-pixel-ratio: 2 ) 
		background-image: url( $spriteVals[5] )
		background-size: $bgiSizeW $bgiSizeH
	

$icon-spritePath = '../img/icon-sprite'
$icon-spriteURL = $icon-spritePath + '.png'
$icon-spritex2URL = $icon-spritePath + '@2.png'
$bgiSizeW = 200px
$bgiSizeH = 200px
$instagram = 64px 64px $icon-spriteURL -100px -100px $icon-spritex2URL
$pinterest = 64px 64px $icon-spriteURL 0px -100px $icon-spritex2URL
$facebook = 64px 64px $icon-spriteURL -100px 0px $icon-spritex2URL
$twitter = 64px 64px $icon-spriteURL 0px 0px $icon-spritex2URL
$icon-spriteList = $instagram instagram, $pinterest pinterest, $facebook facebook, $twitter twitter
for $icon in $icon-spriteList 
	$icon-spriteName = $icon[1]
	$icon-spriteClass = $icon[0]
	.icon-{$icon-spriteName} 
		cssSprite( $icon-spriteClass )
```

## Installation

### with Sketch Runner

With Sketch Runner, just go to the `install` command and search for `css sprite mixin`. Runner allows you to manage plugins and do much more to speed up your workflow in Sketch. [Download Runner here](http://www.sketchrunner.com).

### with Sketchpacks

You can find this plugin in "[Sketchpacks](https://sketchpacks.com/)". Type `css sprite mixin` on the search box, then you click "INSTALL" button.

### with Manualy

Or, [Download the plugin zip](https://github.com/littlebusters/Sketch-Css-Sprite-Mixin/archive/master.zip) and unzip. Double-click the `Sketch CSS Sprite Mixin.sketchplugin` in the folder to install it.

## License

The MIT License (MIT)

(c) 2014 

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
