var keystone = require('keystone');

/**
 * PostCategory Model
 * ==================
 */

var RomBoxCategory = new keystone.List('RomBoxCategory', {
	autokey: { from: 'name', path: 'key', unique: true }
});

RomBoxCategory.add({
	name: { type: String, required: true }
});

RomBoxCategory.relationship({ ref: 'RomBox', path: 'categories' });

RomBoxCategory.register();
