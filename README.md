Sketch CSS Sprite Mixin
=======================

Generate a code of mixin for scss, less and stylus in Sketch 3.

Sprites name are group layer name of top-level, and the Sprite image name is an Artboard name.

![Screen Shot](http://creative-tweet.net/img/github/css-sprite-generator-ss.png)

```scss
@mixin cssSprite( $spriteVals ) {
	width: nth( $spriteVals, 1 );
	height: nth( $spriteVals, 2 );
	background-repeat: no-repeat;
	background-image: url( #{ nth( $spriteVals, 3 ) } );
	background-position: nth( $spriteVals, 4 ) nth( $spriteVals, 5 );
}
$twitter-gray: 64px 64px '../img/sprite.png' -110px 0px;
$facebook-gray: 64px 64px '../img/sprite.png' -110px -233px;
$googlep-gray: 64px 64px '../img/sprite.png' -132px -133px;
$twitter: 64px 64px '../img/sprite.png' -24px -26px;
$facebook: 64px 64px '../img/sprite.png' -16px -258px;
$googlep: 64px 64px '../img/sprite.png' 0px -133px;
```

```less
.cssSprite( @spriteVals ) {
	width: extract( @spriteVals, 1 );
	height: extract( @spriteVals, 2 );
	background-repeat: no-repeat;
	background-image: e(%('url(%s)', extract( @spriteVals, 3 ) ) );
	background-position: extract( @spriteVals, 4 ) extract( @spriteVals, 5 );
}
@twitter-gray: 64px 64px '../img/sprite.png' -110px 0px;
@facebook-gray: 64px 64px '../img/sprite.png' -110px -233px;
@googlep-gray: 64px 64px '../img/sprite.png' -132px -133px;
@twitter: 64px 64px '../img/sprite.png' -24px -26px;
@facebook: 64px 64px '../img/sprite.png' -16px -258px;
@googlep: 64px 64px '../img/sprite.png' 0px -133px;
```

```stylus
cssSprite( $spriteVals )
	width: $spriteVals[0];
	height: $spriteVals[1];
	background-repeat: no-repeat;
	background-image: url( $spriteVals[2] );
	background-position: $spriteVals[3] $spriteVals[4];

$twitter-gray = 64px 64px '../img/sprite.png' -110px 0px;
$facebook-gray = 64px 64px '../img/sprite.png' -110px -233px;
$googlep-gray = 64px 64px '../img/sprite.png' -132px -133px;
$twitter = 64px 64px '../img/sprite.png' -24px -26px;
$facebook = 64px 64px '../img/sprite.png' -16px -258px;
$googlep = 64px 64px '../img/sprite.png' 0px -133px;
```

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