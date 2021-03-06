define(['resources/preloader'], function(R) {
	R.type.TiledMap = function (data, tileset) {
		console.log(123,data);
		var self = this;

		this.numTilesW = 0;
		this.numTilesH = 0;
		this.tileXSize = 0;
		this.tileYSize = 0;
		this.tiles = [];

		this.tileset = tileset;

		this.getTilesetCoordinates = function(gid) {
			var ry = Math.floor(gid / self.tilesetNumTilesW);
			var rx = gid - ry * self.tilesetNumTilesW;
			return {
				x : rx - 1,
				y : ry
			}
		};

		this.parse = function(data) {

			// XML Processing
			var mapXml = data.getElementsByTagName("map")[0];
			this.numTilesW = parseFloat(mapXml.getAttribute("width"));
			this.numTilesH = parseFloat(mapXml.getAttribute("height"));
			this.tileXSize = parseFloat(mapXml.getAttribute("tilewidth"));
			this.tileYSize = parseFloat(mapXml.getAttribute("tileheight"));
			var xmltileList = mapXml.getElementsByTagName("layer")[0]
			.getElementsByTagName("tile");

			this.tilesetNumTilesW = this.tileset.width / this.tileXSize;
			this.tilesetNumTilesH = this.tileset.height / this.tileYSize;

			var a = [];
			var y = 0;
			for ( var x = 0; x < xmltileList.length; x++) {
				var tile = new R.type.TiledMap.Tile(x * this.tileXSize - y * this.tileXSize * this.numTilesW,
					y * this.tileYSize,
					this.tileXSize, 
					this.tileYSize, 
					xmltileList[x].getAttribute("gid")
					);
				
				a[x - y * this.numTilesW] = tile;
				if ((x + 1) % this.numTilesW == 0) {
					self.tiles[y] = a;
					a = [];
					y++;
				}
			}
		}

		this.parse(data);
	}

	R.type.TiledMap.Tile = function (x1, y1, w1, h1, gid1) {
		//	console.log(x1, y1, w1, h1, gid1);
		this.x = x1;
		this.y = y1;
		this.w = w1;
		this.h = h1;
		this.gid = gid1;
	};
});
