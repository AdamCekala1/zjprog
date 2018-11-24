var {Shop, Item} = require('../src/gilded_rose.js');

const mockValues =  fixtureItems = [
  new Item('+5 Dexterity Vest', 10, 20),
  new Item('Aged Brie', 2, 0),
  new Item('Elixir of the Mongoose', 5, 7),
  new Item('Sulfuras, Hand of Ragnaros', 0, 80),
  new Item('Sulfuras, Hand of Ragnaros', -1, 80),
  new Item('Sulfuras, Hand of Ragnaros', 5, 80),
  new Item('Backstage passes to a TAFKAL80ETC concert', 15, 20),
  new Item('Backstage passes to a TAFKAL80ETC concert', 10, 49),
  new Item('Backstage passes to a TAFKAL80ETC concert', 5, 49),
  new Item('Backstage passes to a TAFKAL80ETC concert', -1, 49),
  // this conjured item does not work properly yet
];

const conjuredValues = [
  new Item('Conjured Mana Cake', 3, 6),
  new Item('Conjured Mana Cake', 3, 0),
];

describe("Gilded Rose", function() {
  const maxQuality = 50;
  let fixtureItems;

  it("should foo", function() {
    const gildedRose = new Shop([ new Item("foo", 0, 0) ]);
    const items = gildedRose.updateQuality();
    expect(items[0].name).toEqual("foo");
  });

  describe('Aged Brie' , () => {
    beforeEach(() => {
      fixtureItems = mockValues;
    });

    it("should increases in Quality the older it gets", function() {
      const fixedItem = fixtureItems[1];
      const sellIn = fixedItem.sellIn -1;
      const quality = fixedItem.quality === maxQuality ? maxQuality : fixedItem.quality + 1;
      const newExpectedItem = new Item(fixedItem.name, sellIn, quality);

      const gildedRose = new Shop([fixedItem]);

      expect(gildedRose.updateQuality()[0]).toEqual(newExpectedItem);
    });

    it("should not change in Quality if Q. is equal 50", function() {
      const fixedItem = fixtureItems[1];

      fixedItem.quality = 50;

      const sellIn = fixedItem.sellIn -1;
      const quality = fixedItem.quality === maxQuality ? maxQuality : fixedItem.quality + 1;
      const newExpectedItem = new Item(fixedItem.name, sellIn, quality);

      const gildedRose = new Shop([fixedItem]);

      expect(gildedRose.updateQuality()[0]).toEqual(newExpectedItem);
    });
  });

  describe('+5 Dexterity Vest' , () => {
    beforeEach(() => {
      fixtureItems = mockValues;
    });

    it("should quality descrease adter day pass", function() {
      const fixedItem = fixtureItems[0];
      const sellIn = fixedItem.sellIn -1;
      const quality = fixedItem.quality === 0 ? 0 : fixedItem.quality - 1;
      const newExpectedItem = new Item(fixedItem.name, sellIn, quality);

      const gildedRose = new Shop([fixedItem]);

      expect(gildedRose.updateQuality()[0]).toEqual(newExpectedItem);
    });

    it("min quality should be 0", function() {
      const fixedItem = fixtureItems[0];

      fixedItem.quality = 0;

      const sellIn = fixedItem.sellIn -1;
      const quality = fixedItem.quality === 0 ? 0 : fixedItem.quality - 1;
      const newExpectedItem = new Item(fixedItem.name, sellIn, quality);

      const gildedRose = new Shop([fixedItem]);

      expect(gildedRose.updateQuality()[0]).toEqual(newExpectedItem);
    });
  });

  describe('Elixir of the Mongoose' , () => {
    beforeEach(() => {
      fixtureItems = mockValues;
    });

    it("should quality descrease adter day pass", function() {
      const fixedItem = fixtureItems[2];
      const sellIn = fixedItem.sellIn -1;
      const quality = fixedItem.quality === 0 ? 0 : fixedItem.quality - 1;
      const newExpectedItem = new Item(fixedItem.name, sellIn, quality);

      const gildedRose = new Shop([fixedItem]);

      expect(gildedRose.updateQuality()[0]).toEqual(newExpectedItem);
    });

    it("min quality should be 0", function() {
      const fixedItem = fixtureItems[2];

      fixedItem.quality = 0;

      const sellIn = fixedItem.sellIn -1;
      const quality = fixedItem.quality === 0 ? 0 : fixedItem.quality - 1;
      const newExpectedItem = new Item(fixedItem.name, sellIn, quality);

      const gildedRose = new Shop([fixedItem]);

      expect(gildedRose.updateQuality()[0]).toEqual(newExpectedItem);
    });
  });

  describe('Sulfuras, Hand of Ragnaros' , () => {
    beforeEach(() => {
      fixtureItems = mockValues;
    });

    it("should doesnt change quality", function() {
      const fixedItem = fixtureItems[3];
      const quality = fixedItem.quality;
      const newExpectedItem = new Item(fixedItem.name, fixedItem.sellIn , quality);

      const gildedRose = new Shop([fixedItem]);

      expect(gildedRose.updateQuality()[0]).toEqual(newExpectedItem);
    });

    it("should doesnt change quality", function() {
      const fixedItem = fixtureItems[4];
      const sellIn = fixedItem.sellIn;
      const quality = fixedItem.quality;
      const newExpectedItem = new Item(fixedItem.name, sellIn, quality);

      const gildedRose = new Shop([fixedItem]);

      expect(gildedRose.updateQuality()[0]).toEqual(newExpectedItem);
    });

    it("should doesnt change quality", function() {
      const fixedItem = fixtureItems[5];
      const sellIn = fixedItem.sellIn;
      const quality = fixedItem.quality;
      const newExpectedItem = new Item(fixedItem.name, sellIn, quality);

      const gildedRose = new Shop([fixedItem]);

      expect(gildedRose.updateQuality()[0]).toEqual(newExpectedItem);
    });
  });

  describe('Backstage passes to a TAFKAL80ETC concert' , () => {
    beforeEach(() => {
      fixtureItems = mockValues;
    });

    it("increase by 1 if more than 10 days", function() {
      const fixedItem = fixtureItems[6];
      const sellIn = fixedItem.sellIn -1;
      const quality = fixedItem.quality + 1>= 50 ? 50 : fixedItem.quality + 1;
      const newExpectedItem = new Item(fixedItem.name, sellIn, quality);

      const gildedRose = new Shop([fixedItem]);

      expect(gildedRose.updateQuality()[0]).toEqual(newExpectedItem);
    });

    it("increase by 2 if 10 or less days. More than 5 days", function() {
      const fixedItem = fixtureItems[7];
      const sellIn = fixedItem.sellIn -1;
      const quality = fixedItem.quality + 2 >= 50 ? 50 : fixedItem.quality + 2;
      const newExpectedItem = new Item(fixedItem.name, sellIn, quality);

      const gildedRose = new Shop([fixedItem]);

      expect(gildedRose.updateQuality()[0]).toEqual(newExpectedItem);
    });

    it("increase by 3 if 5 or less days. More than 0 days", function() {
      const fixedItem = fixtureItems[8];
      const sellIn = fixedItem.sellIn -1;
      const quality = fixedItem.quality + 3 >= 50 ? 50 : fixedItem.quality + 3;
      const newExpectedItem = new Item(fixedItem.name, sellIn, quality);

      const gildedRose = new Shop([fixedItem]);

      expect(gildedRose.updateQuality()[0]).toEqual(newExpectedItem);
    });

    it("quality is 0 after the concert", function() {
      const fixedItem = fixtureItems[9];
      const sellIn = fixedItem.sellIn - 1;
      const quality = 0;
      const newExpectedItem = new Item(fixedItem.name, sellIn, quality);

      const gildedRose = new Shop([fixedItem]);

      expect(gildedRose.updateQuality()[0]).toEqual(newExpectedItem);
    });
  });

  describe('Conjured Mana Cake' , () => {
    beforeEach(() => {
      fixtureItems = conjuredValues;
    });

    it("quality is 2 lower after day pass", function() {
      const fixedItem = fixtureItems[0];
      const sellIn = fixedItem.sellIn - 1;
      const quality = fixedItem.quality - 2 >= 0 ? fixedItem.quality - 2 : 0;
      const newExpectedItem = new Item(fixedItem.name, sellIn, quality);

      const gildedRose = new Shop([fixedItem]);

      expect(gildedRose.updateQuality()[0]).toEqual(newExpectedItem);
    });

    it("quality is 0 if before is 0", function() {
      const fixedItem = fixtureItems[1];
      const sellIn = fixedItem.sellIn - 1;
      const quality = 0;
      const newExpectedItem = new Item(fixedItem.name, sellIn, quality);

      const gildedRose = new Shop([fixedItem]);

      expect(gildedRose.updateQuality()[0]).toEqual(newExpectedItem);
    });
  });
});

